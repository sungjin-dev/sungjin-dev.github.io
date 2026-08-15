---
title: " [SQLD 특별편] SQL 함수/프로시저 및 패턴/템플릿/스니펫 정리"
excerpt: "위치, 상관관계, NULL 함정, 그리고 성능까지"
categories: [sql]
order: 12
tags:
  - 프로시저
  - 패턴
  - 템플릿
  - 스니펫
toc: true
toc_sticky: true
---

# SQLD 핵심 정리


## 0. 먼저 잡고 갈 것 — SQL 논리적 실행 순서

이 순서 하나로 아래 내용의 절반이 설명된다. 별칭 문제, ROWNUM 함정, 윈도우 함수의 ORDER BY 문제가 전부 여기서 나온다.

```text
<svg viewBox="0 0 680 196" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SQL 논리적 실행 순서와 자주 틀리는 지점">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .box{fill:#f4f4f5;stroke:#c4c4c8}
    .warn{fill:#fdeeeb;stroke:#d3705c}
    .ln{stroke:#9b9b9f;fill:none}
    .ah{fill:#9b9b9f}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .box{fill:#26262a;stroke:#55555c}
      .warn{fill:#3a2420;stroke:#c9705e}
      .ln{stroke:#7c7c84} .ah{fill:#7c7c84}
    }
  </style>
  <defs>
    <marker id="ahq1" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 z" class="ah"/>
    </marker>
  </defs>
  <text x="2" y="16" class="h">논리적 실행 순서 · 코랄은 자주 틀리는 지점</text>
  <rect x="4" y="34" width="102" height="34" rx="6" class="box"/>
  <text x="55" y="56" class="t" text-anchor="middle">FROM</text>
  <text x="55" y="86" class="t" text-anchor="middle">집합 만들기</text>
  <line x1="108" y1="51" x2="116" y2="51" class="ln" marker-end="url(#ahq1)"/>
  <rect x="118" y="34" width="102" height="34" rx="6" class="warn"/>
  <text x="169" y="56" class="t" text-anchor="middle">WHERE</text>
  <text x="169" y="86" class="t" text-anchor="middle">행 필터</text>
  <text x="169" y="102" class="t" text-anchor="middle">별칭 사용 X</text>
  <line x1="222" y1="51" x2="230" y2="51" class="ln" marker-end="url(#ahq1)"/>
  <rect x="232" y="34" width="102" height="34" rx="6" class="box"/>
  <text x="283" y="56" class="t" text-anchor="middle">GROUP BY</text>
  <text x="283" y="86" class="t" text-anchor="middle">그룹 묶기</text>
  <line x1="336" y1="51" x2="344" y2="51" class="ln" marker-end="url(#ahq1)"/>
  <rect x="346" y="34" width="102" height="34" rx="6" class="box"/>
  <text x="397" y="56" class="t" text-anchor="middle">HAVING</text>
  <text x="397" y="86" class="t" text-anchor="middle">그룹 필터</text>
  <line x1="450" y1="51" x2="458" y2="51" class="ln" marker-end="url(#ahq1)"/>
  <rect x="460" y="34" width="102" height="34" rx="6" class="warn"/>
  <text x="511" y="56" class="t" text-anchor="middle">SELECT</text>
  <text x="511" y="86" class="t" text-anchor="middle">열 · 별칭</text>
  <text x="511" y="102" class="t" text-anchor="middle">윈도우 함수</text>
  <line x1="564" y1="51" x2="572" y2="51" class="ln" marker-end="url(#ahq1)"/>
  <rect x="574" y="34" width="102" height="34" rx="6" class="box"/>
  <text x="625" y="56" class="t" text-anchor="middle">ORDER BY</text>
  <text x="625" y="86" class="t" text-anchor="middle">정렬</text>
  <text x="625" y="102" class="t" text-anchor="middle">별칭 사용 O</text>
  <line x1="4" y1="120" x2="676" y2="120" class="ln"/>
  <text x="2" y="142" class="t">ROWNUM은 WHERE 단계에서 부여 → 정렬 후 상위 N은 인라인 뷰가 필요</text>
  <text x="2" y="164" class="t">윈도우 함수는 SELECT 단계 → OVER 안의 ORDER BY는 출력 순서가 아니다</text>
  <text x="2" y="186" class="t">별칭은 SELECT에서 생성 → WHERE에서는 못 쓰고 ORDER BY에서는 쓸 수 있다</text>
</svg>
```

---

## 1. NULL과 조건 함수

### 1-1. NULL의 기본 성질

| 상황 | 결과 |
| :--- | :--- |
| `NULL = NULL` | TRUE가 아니라 **UNKNOWN** (조건 불만족 처리) |
| `NULL + 100` | NULL (연산에 NULL이 끼면 전부 NULL) |
| 비교 방법 | `IS NULL` / `IS NOT NULL` 만 사용 |
| 집계 함수 | NULL은 **무시**하고 계산 |

```text
-- 급여 3명: 100, 200, NULL
SUM(sal)   → 300
AVG(sal)   → 150   (300/2, NULL은 분모에서도 빠진다)
COUNT(sal) → 2     (NULL 제외)
COUNT(*)   → 3     (행 개수 그대로)
```

■ `AVG`는 NULL을 0으로 치지 않는다. 0으로 보고 싶으면 `AVG(NVL(sal,0))`.
■ `COUNT(NULL)`은 NULL만 세라는 뜻인데 NULL은 집계 대상이 아니므로 **항상 0**이다.

### 1-2. NULL 관련 함수

| 함수 | DB | 의미 | 예시 |
| :--- | :---: | :--- | :--- |
| `NVL(A, B)` | Oracle | A가 NULL이면 B | `NVL(comm, 0)` → NULL이면 0 |
| `ISNULL(A, B)` | SQL Server | 위와 동일 | `ISNULL(comm, 0)` |
| `NVL2(A, B, C)` | Oracle | A가 NULL이 **아니면** B, NULL이면 C | `NVL2(comm, '있음', '없음')` |
| `COALESCE(A, B, C…)` | 공통 | 앞에서부터 첫 번째 NULL 아닌 값 | `COALESCE(tel1, tel2, '미등록')` |
| `NULLIF(A, B)` | 공통 | 두 값이 **같으면 NULL**, 다르면 A | `NULLIF(sal, 0)` → 0이면 NULL |

○ `NULLIF`는 "0으로 나누기" 방지에 자주 쓴다. `a / NULLIF(b, 0)` → b가 0이면 에러 대신 NULL.

### 1-3. DECODE vs CASE

```text
DECODE(기준값, 조건1, 결과1, 조건2, 결과2, ... , 기본값)
```

```text
-- 부서번호를 한글 이름으로
SELECT ename, DECODE(deptno, 10, '인사', 20, '개발', '기타') AS dname
FROM   emp;

-- 같은 내용을 CASE로
SELECT ename,
       CASE deptno WHEN 10 THEN '인사'
                   WHEN 20 THEN '개발'
                   ELSE '기타' END AS dname
FROM   emp;
```

| 비교 항목 | DECODE | CASE |
| :--- | :--- | :--- |
| 지원 DB | Oracle 전용 | Oracle, SQL Server 공통 |
| 비교 조건 | `=` 만 가능 | `=`, `>`, `<`, `BETWEEN`, `IN` 등 |
| 기본값 처리 | 마지막 인자 (생략 시 NULL) | `ELSE` (생략 시 NULL) |
| 자료형 | 결과값들이 같은 자료형이어야 함(첫 결과 기준으로 변환) | 상대적으로 유연 |
| 유연성 | 낮음 | 높음 |

■ **NULL 처리가 다르다.** 시험 단골이다.

```text
DECODE(comm, NULL, '없음', '있음')                    → NULL이면 '없음'  (같다고 판단)
CASE WHEN comm = NULL THEN '없음' ELSE '있음' END      → 항상 '있음'      (UNKNOWN)
CASE WHEN comm IS NULL THEN '없음' ELSE '있음' END     → '없음'          (올바른 작성법)
```

■ CASE에서 비교가 UNKNOWN이 되면 **에러가 아니라 다음 WHEN으로 넘어간다.** 다 못 맞추면 ELSE(없으면 NULL).

---

## 2. 집합 연산자

```text
<svg viewBox="0 0 680 176" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="집합 연산자 네 가지의 결과 영역 비교">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .cir{fill:none;stroke:#9b9b9f}
    .res{fill:#dcefe3;stroke:none}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .cir{stroke:#7c7c84}
      .res{fill:#244432}
    }
  </style>
  <defs>
    <clipPath id="clipItr"><circle cx="402" cy="98" r="38"/></clipPath>
    <mask id="maskMns">
      <circle cx="572" cy="98" r="38" fill="#fff"/>
      <circle cx="618" cy="98" r="38" fill="#000"/>
    </mask>
  </defs>
  <text x="85" y="20" class="h" text-anchor="middle">UNION</text>
  <text x="255" y="20" class="h" text-anchor="middle">UNION ALL</text>
  <text x="425" y="20" class="h" text-anchor="middle">INTERSECT</text>
  <text x="595" y="20" class="h" text-anchor="middle">MINUS / EXCEPT</text>
  <text x="44" y="48" class="t">A</text>
  <text x="122" y="48" class="t">B</text>
  <text x="214" y="48" class="t">A</text>
  <text x="292" y="48" class="t">B</text>
  <text x="384" y="48" class="t">A</text>
  <text x="462" y="48" class="t">B</text>
  <text x="554" y="48" class="t">A</text>
  <text x="632" y="48" class="t">B</text>
  <circle cx="62" cy="98" r="38" class="res"/>
  <circle cx="108" cy="98" r="38" class="res"/>
  <circle cx="62" cy="98" r="38" class="cir"/>
  <circle cx="108" cy="98" r="38" class="cir"/>
  <circle cx="232" cy="98" r="38" class="res"/>
  <circle cx="278" cy="98" r="38" class="res"/>
  <circle cx="232" cy="98" r="38" class="cir"/>
  <circle cx="278" cy="98" r="38" class="cir"/>
  <text x="255" y="102" class="t" text-anchor="middle">×2</text>
  <circle cx="448" cy="98" r="38" class="res" clip-path="url(#clipItr)"/>
  <circle cx="402" cy="98" r="38" class="cir"/>
  <circle cx="448" cy="98" r="38" class="cir"/>
  <circle cx="572" cy="98" r="38" class="res" mask="url(#maskMns)"/>
  <circle cx="572" cy="98" r="38" class="cir"/>
  <circle cx="618" cy="98" r="38" class="cir"/>
  <text x="85" y="164" class="t" text-anchor="middle">합집합 · 중복 제거</text>
  <text x="255" y="164" class="t" text-anchor="middle">그대로 · 중복 유지</text>
  <text x="425" y="164" class="t" text-anchor="middle">교집합 · 중복 제거</text>
  <text x="595" y="164" class="t" text-anchor="middle">차집합 · 중복 제거</text>
</svg>
```

| 특징 | UNION | UNION ALL | INTERSECT | MINUS(EXCEPT) |
| :--- | :---: | :---: | :---: | :---: |
| 중복 제거 | O | **X** | O | O |
| 정렬 발생 | O | **X** | O | O |
| 성능 | 느림 | **빠름** | 느림 | 느림 |

○ 중복을 제거하려면 값을 비교해야 하므로 정렬이 따라온다. 즉 **UNION ALL만 정렬이 없어서 빠르다.**
○ MINUS는 Oracle, EXCEPT는 SQL Server 용어다.

### 공통 규칙

- 각 SELECT의 **컬럼 개수와 자료형이 순서대로 일치**해야 한다. 컬럼 이름은 달라도 된다.
- 결과 컬럼명은 **첫 번째 SELECT문 기준**으로 정해진다.
- `ORDER BY`는 맨 마지막에 딱 한 번만 쓸 수 있다.

### 우선순위

- SQL 표준: `INTERSECT`가 가장 높고, `UNION`과 `EXCEPT(MINUS)`는 동급으로 위에서 아래로 처리된다.
- 다만 예전 Oracle 버전은 모두 동급으로 순차 처리했다. 실무·시험 모두 **괄호로 명시하는 것이 안전**하다.

■ **상호 배타적(mutually exclusive) 관계**인 두 엔터티는 겹치는 인스턴스가 없도록 설계됐으므로 `UNION`과 `UNION ALL`의 **결과 건수가 같다**. 이때는 성능상 UNION ALL을 쓰는 것이 좋다.

---

## 3. 그룹 함수 (ROLLUP · CUBE · GROUPING SETS)

### 3-1. 만들어지는 그룹 개수

| 함수 | 그룹 개수 | `(지역, 상품)` 기준으로 생성되는 조합 |
| :--- | :---: | :--- |
| `ROLLUP(A, B)` | **N + 1 = 3** | (A,B) → (A) → () |
| `CUBE(A, B)` | **2ᴺ = 4** | (A,B), (A), (B), () |
| `GROUPING SETS` | 지정한 만큼 | 내가 적은 조합만 |

```text
ROLLUP(지역, 상품)   :  (지역,상품) → (지역) → ()          오른쪽부터 하나씩 떼어낸다
CUBE(지역, 상품)     :  (지역,상품)   (지역)   (상품)   ()   가능한 모든 조합
```

동일한 표현으로 바꾸면 이렇게 된다.

```text
GROUP BY ROLLUP(A, B)  =  GROUP BY GROUPING SETS((A,B), (A), ())
GROUP BY CUBE(A, B)    =  GROUP BY GROUPING SETS((A,B), (A), (B), ())
```

### 3-2. 컬럼 순서

| 구문 | 컬럼 순서가 결과에 영향? |
| :--- | :--- |
| 일반 `GROUP BY A, B` | **없음** (그룹 결과 집합 동일) |
| `ROLLUP(A, B)` | **있음** — 오른쪽부터 떼므로 A, B를 바꾸면 소계 종류가 달라진다 |
| `CUBE(A, B)` | 없음 (모든 조합을 만들므로 결과 집합 동일) |

### 3-3. GROUPING 함수

집계 행(소계·총계)에서는 해당 컬럼이 NULL로 표시된다. 그런데 이 NULL이 **원래 데이터의 NULL인지 소계 때문인지 구분이 안 된다.** 이걸 구분해주는 게 `GROUPING`이다.

| 반환값 | 의미 |
| :---: | :--- |
| **1** | 그 컬럼이 그룹화에 사용되지 않은 행 = **소계/총계 행** |
| **0** | 그 컬럼이 실제로 그룹화에 사용된 일반 행 |

```text
SELECT DECODE(GROUPING(deptno), 1, '전체합계', deptno) AS 부서,
       SUM(sal)
FROM   emp
GROUP BY ROLLUP(deptno);
```

| 부서 | SUM(sal) |
| :--- | ---: |
| 10 | 3000 |
| 20 | 5000 |
| 전체합계 | 8000 |

○ 여러 컬럼을 한 번에 판별하려면 `GROUPING_ID(A, B)`를 쓴다. 비트값으로 0,1,2,3이 나온다.

---

## 4. 윈도우 함수

```text
WINDOW_FUNCTION([인자]) OVER ( [PARTITION BY 컬럼] [ORDER BY 절] [WINDOWING 절] )
```

- **반드시 `OVER()` 와 함께** 쓴다.
- `PARTITION BY` = 그룹을 나눈다(그룹 함수의 GROUP BY와 비슷하지만 **행이 줄어들지 않는다**).
- ■ `OVER` 안의 `ORDER BY`는 **계산 순서**를 정할 뿐 출력 순서를 보장하지 않는다. 화면 정렬은 쿼리 맨 끝의 `ORDER BY`로 따로 해야 한다.

### 4-1. 순위 함수 세 가지

| 이름 | 점수 | RANK() | DENSE_RANK() | ROW_NUMBER() |
| :--- | ---: | :---: | :---: | :---: |
| 가 | 90 | 1 | 1 | 1 |
| 나 | 90 | 1 | 1 | 2 |
| 다 | 80 | **3** | **2** | 3 |
| 라 | 70 | 4 | 3 | 4 |

| 함수 | 동순위 | 다음 순위 |
| :--- | :--- | :--- |
| `RANK()` | 허용 | **건너뜀** (1,1,3) |
| `DENSE_RANK()` | 허용 | 건너뛰지 않음 (1,1,2) |
| `ROW_NUMBER()` | 없음 | 무조건 고유값 (1,2,3) |

### 4-2. 그룹별 1등 뽑기 (실전 패턴)

```text
SELECT *
FROM ( SELECT 지점, 매출,
              ROW_NUMBER() OVER (PARTITION BY 지점 ORDER BY 매출 DESC) AS rn
       FROM   sales )
WHERE rn = 1;
```

○ 공동 1등까지 모두 필요하면 `ROW_NUMBER` 대신 `RANK`를 쓴다.

### 4-3. 그 밖의 윈도우 함수

| 분류 | 함수 | 의미 |
| :--- | :--- | :--- |
| 순위 | `RANK`, `DENSE_RANK`, `ROW_NUMBER` | 위 참고 |
| 순위(비율) | `CUME_DIST`, `PERCENT_RANK`, `NTILE(n)`, `RATIO_TO_REPORT` | 누적비율 / n등분 / 비중 |
| 행 순서 | `FIRST_VALUE`, `LAST_VALUE` | 윈도우 내 첫 행·마지막 행 값 |
| 행 순서 | `LAG(컬럼, n)`, `LEAD(컬럼, n)` | n행 앞/뒤 값 (증감 계산에 사용) |
| 집계 | `SUM`, `AVG`, `MAX`, `MIN`, `COUNT` + OVER | 누적합 등 |

### 4-4. WINDOWING 절

```text
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW   -- 처음부터 현재 행까지 (누적)
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING           -- 앞 1행 ~ 뒤 1행
RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING  -- 전체
```

| 키워드 | 기준 |
| :--- | :--- |
| `ROWS` | **물리적인 행 개수** |
| `RANGE` | **논리적인 값의 범위** (같은 값이면 한 덩어리로 취급) |

■ `ORDER BY`만 쓰고 WINDOWING을 생략하면 기본값은 `RANGE UNBOUNDED PRECEDING ~ CURRENT ROW`(누적)다. `ORDER BY`도 없으면 파티션 전체가 대상이다.

---

## 5. TOP-N 쿼리

### 5-1. ROWNUM (Oracle 가상 컬럼)

- 조회 **결과에 임시로 붙는 순번**이다. 테이블에 저장된 값이 아니다.
- **1부터** 시작하고, WHERE 조건을 통과한 행에 순서대로 붙는다.
- 대표적인 가상 컬럼: `ROWNUM`(조회 순번), `ROWID`(행의 물리적 주소), `LEVEL`(계층 깊이).

■ **ROWNUM은 WHERE 단계에서 붙고, ORDER BY는 그 뒤에 실행된다.**

```text
SELECT * FROM emp WHERE ROWNUM = 1;    -- 정상 (1건)
SELECT * FROM emp WHERE ROWNUM = 2;    -- 결과 없음 (!)
SELECT * FROM emp WHERE ROWNUM <= 3;   -- 정상 (3건)
```

○ `ROWNUM = 2`가 안 되는 이유: 첫 행이 조건에 안 맞아 버려지면, 다음 행이 **다시 1번**을 받는다. 그래서 영원히 2가 되지 못한다. `>` 나 `= 2` 같은 조건은 쓸 수 없다고 외워두면 된다.

```text
-- 급여 상위 3명 (정렬 먼저, ROWNUM은 나중에)
SELECT *
FROM ( SELECT * FROM emp ORDER BY sal DESC )
WHERE ROWNUM <= 3;
```

### 5-2. Oracle 12c 이상 — FETCH

```text
SELECT 컬럼
FROM   테이블
ORDER BY 정렬기준
[ OFFSET n ROWS ]
[ FETCH { FIRST | NEXT } m { ROW | ROWS } | p PERCENT ROWS { ONLY | WITH TIES } ];
```

```text
SELECT ename, sal FROM emp
ORDER BY sal DESC
OFFSET 0 ROWS FETCH FIRST 3 ROWS ONLY;   -- 인라인 뷰 없이 상위 3명
```

### 5-3. SQL Server — TOP

```text
SELECT TOP (3) [PERCENT] [WITH TIES] ename, sal
FROM   emp
ORDER BY sal DESC;
```

| 옵션 | 의미 |
| :--- | :--- |
| `PERCENT` | 건수가 아니라 비율 |
| `WITH TIES` | 동점자까지 포함 → **반드시 `ORDER BY` 필요** |

○ `WITH TIES`는 Oracle의 `FETCH ... WITH TIES`와 같은 개념이다.

---

## 6. 계층형 질의 (Oracle)

### 6-1. 데이터와 트리 모양

```text
사원번호  이름        상위사원번호
   1     대표이사        NULL
   2     영업팀장         1
   3     개발팀장         1
   4     사원A            2

[1] 대표이사              LEVEL 1   (START WITH 대상, 루트)
 ├─ [2] 영업팀장          LEVEL 2
 │    └─ [4] 사원A        LEVEL 3   ISLEAF = 1 (말단)
 └─ [3] 개발팀장          LEVEL 2   ISLEAF = 1
```

### 6-2. 기본 구문

```text
SELECT LEVEL, 사원번호, 이름
FROM   사원
START WITH 상위사원번호 IS NULL          -- 어디서 시작할지 (루트 조건)
CONNECT BY PRIOR 사원번호 = 상위사원번호  -- 어떻게 이어갈지 (전개 조건)
ORDER SIBLINGS BY 이름;                  -- 같은 부모를 둔 형제끼리만 정렬
```

○ 실행 순서: `START WITH` → `CONNECT BY`(전개) → `WHERE`(전개가 끝난 결과를 필터). 즉 WHERE로 중간 노드를 빼도 그 아래 자식은 이미 전개된 뒤라 남는다.

### 6-3. 전개 방향

`PRIOR`가 붙은 쪽이 **이전 행(방금 읽은 행)** 이다.

| 작성 형태 | 방향 | 예시 |
| :--- | :--- | :--- |
| `PRIOR 자식키 = 부모참조컬럼` | **순방향** (부모 → 자식) | `PRIOR 메뉴ID = 상위메뉴ID` |
| `자식키 = PRIOR 부모참조컬럼` | **역방향** (자식 → 부모) | `메뉴ID = PRIOR 상위메뉴ID` |

■ 헷갈리면 이렇게 본다. PRIOR가 **PK 쪽**에 붙으면 아래로(순방향), **FK 쪽**에 붙으면 위로(역방향) 간다.

### 6-4. 계층 관련 키워드

| 키워드 | 의미 |
| :--- | :--- |
| `LEVEL` | 깊이. 루트가 1 |
| `CONNECT_BY_ISLEAF` | 말단이면 1, 아니면 0 |
| `CONNECT_BY_ISCYCLE` | 순환 감지 시 1 (`NOCYCLE`과 함께 써야 사용 가능) |
| `SYS_CONNECT_BY_PATH(컬럼, '구분자')` | 루트부터 현재까지의 경로를 문자열로 |
| `CONNECT_BY_ROOT 컬럼` | 그 행이 **어느 루트에서 뻗어 나왔는지** 루트의 값 |
| `NOCYCLE` | 순환이 생겨도 에러 없이 멈춤 — 안전하게 쓰려면 붙이는 것이 좋다 |

```text
SYS_CONNECT_BY_PATH(이름, '/')  →  /대표이사/영업팀장/사원A
```

### 6-5. START WITH vs CONNECT_BY_ROOT

- `START WITH` : **어떤 행이 루트가 될 자격이 있는지** 판단하는 조건. 결과 루트는 1개일 수도 여러 개일 수도 있다.
- `CONNECT_BY_ROOT` : 결과로 나온 **각 행마다** 그 행이 속한 루트의 값을 붙여주는 연산자.

```text
SELECT 사원번호, 이름, LEVEL,
       CONNECT_BY_ROOT 이름 AS 최상위자
FROM   사원
START WITH 상위사원번호 IS NULL
CONNECT BY PRIOR 사원번호 = 상위사원번호;
```

○ `PRIOR`는 **바로 위 부모**만 알려줄 뿐 꼭대기 값을 자동으로 가져오지 않는다. 그래서 루트가 하나뿐이어도 매 행에 루트 값을 붙이려면 `CONNECT_BY_ROOT`가 필요하다. 안 쓰면 셀프 조인이나 서브쿼리로 우회해야 한다.

### 6-6. Oracle vs SQL Server

| 항목 | Oracle | SQL Server |
| :--- | :--- | :--- |
| 구문 | `START WITH ~ CONNECT BY` | `WITH` 재귀 CTE + `UNION ALL` |
| 전개 방식 | 내장 계층 확장 | 재귀 호출로 단계별 전개 |
| 시작점 | `START WITH` | CTE의 **앵커 멤버** |
| 반복 조건 | `CONNECT BY` | CTE 내부 JOIN 조건(**재귀 멤버**) |

---

## 7. 조인

### 7-1. 종류 요약

| 조인 | 결과 |
| :--- | :--- |
| `INNER JOIN` | 양쪽 조건이 맞는 행만 |
| `LEFT / RIGHT OUTER JOIN` | 기준 테이블은 전부 + 없는 쪽은 NULL |
| `FULL OUTER JOIN` | 양쪽 다 전부 |
| `CROSS JOIN` | 곱집합(M × N) |
| `NATURAL JOIN` | 같은 이름 컬럼으로 자동 조인 |

■ `CROSS JOIN`은 **조인 조건을 쓰면 안 된다.** `ON`을 붙이면 오류다.
■ `NATURAL JOIN`은 공통 컬럼에 **별칭(alias)을 붙일 수 없고** `USING`/`ON`도 못 쓴다.
■ `USING (컬럼)` 을 쓸 때도 해당 컬럼에는 테이블 접두사를 붙이면 안 된다.

### 7-2. Oracle 전용 아우터 조인 `(+)`

`(+)`는 **데이터가 부족해서 NULL을 채워 넣어야 하는 쪽**에 붙인다. 즉 기준 테이블의 반대쪽이다.

```text
-- 표준 문법
FROM  부서 d LEFT JOIN 사원 e
      ON d.부서번호 = e.부서번호 AND e.직무 = '영업'

-- Oracle 전용
FROM  부서 d, 사원 e
WHERE d.부서번호 = e.부서번호(+)
  AND e.직무(+) = '영업';        -- 일반 조건에도 (+)를 붙여야 조인 조건으로 처리된다
```

■ 부족한 쪽 테이블의 일반 조건에 `(+)`를 빼먹으면 아우터 조인이 **사실상 이너 조인으로 바뀐다.** 반대로 기준 테이블에 대한 조건은 `(+)` 없이 WHERE에 그대로 쓴다.

---

## 8. 서브쿼리

### 8-1. 위치별 분류

| 이름 | 위치 | 특징 |
| :--- | :--- | :--- |
| **스칼라 서브쿼리** | SELECT 절 | 반드시 **1행 1컬럼**만 반환 |
| **인라인 뷰** | FROM 절 | 결과를 테이블처럼 사용 |
| **중첩 서브쿼리** | WHERE / HAVING 절 | 조건 비교용 |

### 8-2. 반환 행 수별 분류

| 종류 | 반환 | 사용 연산자 |
| :--- | :--- | :--- |
| 단일 행 | 1행 | `=`, `>`, `<`, `>=`, `<=`, `<>` |
| 다중 행 | 여러 행 | `IN`, `ANY`, `ALL`, `EXISTS` |
| 다중 컬럼 | 여러 컬럼 | `(a, b) IN (SELECT …)` |

■ 단일 행 연산자(`=`)에 여러 행이 오면 에러가 난다.

### 8-3. ORDER BY 사용 여부

| 위치 | ORDER BY |
| :--- | :--- |
| 인라인 뷰(FROM 절) | **가능** |
| 스칼라 서브쿼리 | 의미 없음 — 1행만 나오므로 정렬할 대상이 없다 |
| WHERE 절 중첩 서브쿼리 | 시험 기준 **사용하지 않는다** (조건 비교용이라 정렬이 무의미) |

### 8-4. 그 밖에

- 서브쿼리는 메인 쿼리를 **필터링하거나 값을 계산**하는 용도라, 스칼라 서브쿼리·중첩 서브쿼리는 결과 행 수를 늘리지 않는다.
- 연관 서브쿼리는 메인 쿼리의 컬럼을 참조한다. `EXISTS`가 대표적이다.
- Oracle 12c부터는 `LATERAL` 키워드로 **인라인 뷰 안에서 메인 쿼리 컬럼 참조**가 가능하다. (`CROSS APPLY`, `OUTER APPLY`도 같은 목적)

---

## 9. 문자열 함수와 정규 표현식

### 9-1. Oracle vs SQL Server

| 기능 | Oracle | SQL Server |
| :--- | :--- | :--- |
| 문자열 자르기 | `SUBSTR(문자열, 시작, [길이])` — 길이 생략 가능 | `SUBSTRING(문자열, 시작, 길이)` — **길이 생략 불가** |
| 문자열 연결 | `'A' || 'B'` | `'A' + 'B'` 또는 `CONCAT()` |
| 연결 중 NULL | NULL은 **무시**하고 이어 붙임 | 하나라도 NULL이면 **결과 전체 NULL** (`CONCAT()`은 NULL 무시) |
| 문자열 표기 | 작은따옴표 `'문자'` | 동일 |
| 시작 위치 | 1부터 | 1부터 |

```text
Oracle      : '홍' || NULL || '길동'  →  '홍길동'
SQL Server  : '홍' +  NULL +  '길동'  →  NULL
```

### 9-2. LIKE

- 와일드카드: `%`(0자 이상), `_`(정확히 1자)
- ■ Oracle의 `LIKE`는 **대소문자를 구분한다.** 구분 없이 찾으려면 `WHERE LOWER(컬럼) LIKE 'e%'`.
- ○ SQL Server는 기본 콜레이션이 대소문자 구분 없음(CI)인 경우가 많아 결과가 다를 수 있다.
- 와일드카드 자체를 찾으려면 `LIKE '100\%' ESCAPE '\'`.

### 9-3. 정규 표현식 함수

| 함수 | 문법 | 용도 |
| :--- | :--- | :--- |
| `REGEXP_LIKE` | `(문자열, 패턴 [, 옵션])` | 조건절에서 일치 여부 판단 |
| `REGEXP_SUBSTR` | `(문자열, 패턴 [, 시작위치 [, 발생순서 [, 옵션 [, 그룹번호]]]])` | 일치하는 부분 추출 |
| `REGEXP_INSTR` | `(문자열, 패턴 [, 시작위치 [, 발생순서 [, 리턴옵션 [, 옵션 [, 그룹번호]]]]])` | 일치 위치 반환 |
| `REGEXP_COUNT` | `(문자열, 패턴 [, 시작위치 [, 옵션]])` | 일치 횟수 |
| `REGEXP_REPLACE` | `(문자열, 패턴 [, 대체문자 [, 시작위치 [, 발생순서 [, 옵션]]]])` | 치환 |

**매칭 옵션**

| 옵션 | 의미 |
| :---: | :--- |
| `i` | 대소문자 무시 |
| `c` | 대소문자 구분 |
| `n` | `.` 이 개행문자에도 일치 |
| `m` | 다중 행 모드 |
| `x` | 공백 무시 |

```text
SELECT REGEXP_INSTR('apple banana cherry', '[a-z]+', 1, 2, 1) FROM dual;
                                            ↑  ↑  ↑
                        시작위치 1 ──────────┘  │  │
                        2번째 일치 = 'banana' ──┘  │
                        리턴옵션 1 ────────────────┘
-- 0 = 일치가 시작되는 위치 / 1 = 일치가 끝난 다음 위치
-- 'banana'는 7~12번째 → 결과 13
```

### 9-4. 탐욕적 vs 비탐욕적

| 구분 | 표기 | 동작 |
| :--- | :--- | :--- |
| 탐욕적(greedy) | `*`, `+`, `{n,}` | **가능한 한 길게** 매칭 |
| 비탐욕적(lazy) | `*?`, `+?`, `{n,}?` | **가능한 한 짧게** 매칭 |

```text
문자열 : <a><b>
'<.*>'   →  <a><b>    (끝까지 먹는다)
'<.*?>'  →  <a>       (최소한만 먹는다)
```

---

## 10. PIVOT / UNPIVOT / MERGE

### 10-1. PIVOT — 행을 열로

```text
SELECT * FROM 판매
PIVOT ( SUM(금액) FOR 분기 IN ('1Q' AS Q1, '2Q' AS Q2) );
```

### 10-2. UNPIVOT — 열을 행으로

```text
SELECT * FROM 판매요약
UNPIVOT ( 금액 FOR 분기 IN (Q1 AS '1분기', Q2 AS '2분기') );
```

■ UNPIVOT의 `AS` 뒤 값은 **결과 행의 데이터 값**으로 들어간다. SELECT 절에서 쓰는 별칭(컬럼 이름 바꾸기)과는 성격이 다르다. 위 예시에서 `Q1` 열의 데이터는 `분기` 컬럼에 `'1분기'`라는 **값**으로 표시된다.

### 10-3. MERGE — 있으면 UPDATE, 없으면 INSERT

```text
MERGE INTO 타겟테이블 T             -- 병합을 받는 쪽
USING 소스테이블 S                  -- 병합할 데이터
   ON (T.ID = S.ID)                 -- 짝을 맞추는 조건
WHEN MATCHED THEN
   UPDATE SET T.이름 = S.이름
WHEN NOT MATCHED THEN
   INSERT (ID, 이름) VALUES (S.ID, S.이름);
```

○ `WHEN MATCHED THEN UPDATE ... DELETE WHERE 조건` 형태로 삭제까지 한 번에 처리할 수 있다.
○ 두 절 중 하나만 써도 된다.

---

## 11. DML · DDL · 트랜잭션

### 11-1. DELETE vs TRUNCATE vs DROP

| 항목 | DELETE | TRUNCATE | DROP |
| :--- | :--- | :--- | :--- |
| 분류 | DML | **DDL** | DDL |
| WHERE 사용 | **가능** | **불가 (전체 삭제)** | 불가 |
| 롤백 | 가능 | 불가 (Auto Commit) | 불가 |
| 저장 공간 | 유지 | **반환** (최초 상태로) | 테이블 자체 삭제 |
| 테이블 구조 | 남음 | 남음 | **사라짐** |
| 속도 | 느림 | 빠름 | 빠름 |

### 11-2. 트랜잭션 특성 (ACID)

| 특성 | 의미 |
| :--- | :--- |
| 원자성(Atomicity) | 전부 반영되거나 전부 취소되거나 |
| 일관성(Consistency) | 실행 전후로 DB가 모순 없는 상태 유지 |
| 고립성(Isolation) | 수행 중인 트랜잭션에 다른 트랜잭션이 끼어들지 못함 |
| 지속성(Durability) | 완료된 결과는 영구 보존 |

■ 같은 세션(트랜잭션) 안에서는 `COMMIT`을 하지 않아도 **내가 방금 한 DML 결과가 내 SELECT에는 바로 보인다.** 다른 세션에서 안 보일 뿐이다.
■ DDL을 실행하면 앞선 DML이 **자동 커밋**된다.

### 11-3. 고립성 수준

| 레벨 | 이름 | 설명 |
| :---: | :--- | :--- |
| 0 | Read Uncommitted | 커밋되지 않은 데이터도 읽음 |
| 1 | **Read Committed** | 커밋된 데이터만 읽음 (Oracle · SQL Server 기본값) |
| 2 | Repeatable Read | 읽은 행은 고정되지만 새 행 INSERT는 보임 |
| 3 | Serializable | 완전 고립. 성능 저하 |

| 격리 수준 | DIRTY READ | NON-REPEATABLE READ | PHANTOM READ |
| :--- | :---: | :---: | :---: |
| Read Uncommitted | 발생 | 발생 | 발생 |
| Read Committed | 막음 | 발생 | 발생 |
| Repeatable Read | 막음 | 막음 | 발생 |
| Serializable | 막음 | 막음 | 막음 |

| 문제 | 뜻 |
| :--- | :--- |
| DIRTY READ | 아직 **커밋 안 된 값**을 읽음 |
| NON-REPEATABLE READ | 같은 행을 두 번 읽었는데 **값이 바뀜** (UPDATE 때문) |
| PHANTOM READ | 같은 조건으로 두 번 읽었는데 **없던 행이 생김** (INSERT 때문) |

○ Oracle은 실제로 Read Committed와 Serializable만 지원한다. 표는 표준 기준이다.

---

## 12. DCL — 권한

```text
GRANT 권한 ON 객체 TO 사용자 [WITH GRANT OPTION];
REVOKE 권한 ON 객체 FROM 사용자;
```

| 항목 | 시스템 권한 | 객체 권한 |
| :--- | :--- | :--- |
| 예시 | `CREATE SESSION`, `CREATE TABLE` | `SELECT`, `INSERT` … `ON 테이블` |
| 문장 | `GRANT CREATE SESSION TO 유저;` | `GRANT SELECT ON 사원 TO 유저;` |
| `ON` 절 | 없음 | **필요** |
| 재부여 옵션 | `WITH ADMIN OPTION` | `WITH GRANT OPTION` |
| 회수 시 연쇄 | **연쇄 회수 안 됨** | **연쇄 회수 됨** |
| 용도 | DB 접속, 객체 생성 등 전반 | 특정 테이블·뷰·시퀀스 접근 |

■ 옵션을 생략하면 **부여받은 권한을 남에게 다시 줄 수 없다.**

### 롤(ROLE)

권한을 묶어놓은 꾸러미다. 사용자마다 권한을 일일이 주는 수고를 덜어준다.

| 롤 | 내용 |
| :--- | :--- |
| `CONNECT` | DB 접속 관련 권한 |
| `RESOURCE` | 테이블 등 자원 **생성** 권한 |
| `DBA` | 전체 관리 권한 |

```text
GRANT CONNECT, RESOURCE TO 유저;
REVOKE CONNECT FROM 유저;
```

---

## 13. 모델링 · 관계 대수 (1과목)

### 13-1. 무결성 4가지

| 종류 | 내용 |
| :--- | :--- |
| **개체 무결성** | 기본키는 **NULL 불가 + 중복 불가** |
| 참조 무결성 | 외래키는 부모의 기본키 값이거나 NULL |
| 도메인 무결성 | 컬럼 값이 정의된 자료형·범위 안에 있어야 함 |
| 사용자 정의 무결성 | 업무 규칙에 따른 제약 |

■ 시험에서 "개체 무결성"이 나오면 곧바로 **Primary Key**를 떠올리면 된다.

### 13-2. 제약조건 비교

| 제약 | 중복 | NULL |
| :--- | :---: | :---: |
| PRIMARY KEY | 불가 | **불가** |
| UNIQUE | 불가 | **가능** |

### 13-3. 식별자

| 분류 기준 | 종류 |
| :--- | :--- |
| 대표성 | 주식별자 / 보조식별자 |
| 생성 여부 | **본질식별자**(업무에서 나옴) / **인조식별자**(시스템이 부여) |
| 속성 수 | 단일식별자 / 복합식별자 |
| 범위 | 내부식별자 / 외부식별자(FK) |

■ 본질식별자든 인조식별자든 식별자인 이상 **중복·NULL은 허용되지 않는다.**
■ 다만 인조식별자(시퀀스 등)는 시스템이 값을 자동 부여하므로, **내용이 똑같은 중복 레코드가 들어갈 수 있다.** 그래서 별도의 중복 방지 로직(UNIQUE 제약 등)이 필요하다.

### 13-4. 엔터티 / 속성 분류

| 대상 | 기준 | 종류 |
| :--- | :--- | :--- |
| 엔터티 | 유무형 | 유형 / 개념 / 사건 |
| 엔터티 | 발생 시점 | 기본(키) / 중심 / 행위 |
| **속성** | 특성 | **기본 / 설계 / 파생** |
| 속성 | 구성 방식 | PK / FK / 일반 |

### 13-5. 관계 대수

| 순수 관계 연산자 | 기호 | SQL 대응 |
| :--- | :---: | :--- |
| SELECTION | σ | **WHERE** — 조건에 맞는 **행(튜플)** 추출 |
| PROJECTION | π | **SELECT** — 필요한 **열(속성)** 추출 |
| JOIN | ⋈ | JOIN |
| DIVIDE | ÷ | (직접 대응 구문 없음) |

| 일반 집합 연산자 | 기호 | SQL |
| :--- | :---: | :--- |
| UNION | ∪ | UNION |
| INTERSECTION | ∩ | INTERSECT |
| DIFFERENCE | − | MINUS / EXCEPT |
| PRODUCT | × | CROSS JOIN |

■ σ는 **행**, π는 **열**이다. 헷갈리기 쉬우니 "SELECT 문의 SELECT 절이 π"로 묶어 외우면 된다.

### 13-6. 표기법

| 표기법 | 식별 관계 | 비식별 관계 |
| :--- | :--- | :--- |
| **Barker** | 관계선에 **막대(`|`)** 표시 | 막대 없음 |
| IE(까마귀발) | **실선** | **점선** |

---

## 14. 자주 틀리는 함정 모음

| # | 함정 | 정답 |
| :---: | :--- | :--- |
| 1 | `NULL = NULL` | TRUE 아님. `IS NULL` 사용 |
| 2 | DECODE의 NULL 비교 | DECODE는 NULL을 **같다고** 판단 (CASE와 다름) |
| 3 | `COUNT(NULL)` | 항상 **0** |
| 4 | UNION ALL 정렬 | **정렬하지 않음** (나머지 셋은 정렬) |
| 5 | ROLLUP 컬럼 순서 | 순서 바뀌면 **결과가 바뀜** (일반 GROUP BY는 무관) |
| 6 | `WHERE ROWNUM = 2` | **결과 없음** |
| 7 | 정렬 후 상위 N | 인라인 뷰에서 정렬 후 ROWNUM 적용 |
| 8 | 윈도우 함수의 `OVER(ORDER BY …)` | 계산 순서일 뿐, 출력 정렬은 별도 `ORDER BY` |
| 9 | `CROSS JOIN` + `ON` | **오류** |
| 10 | Oracle `(+)` 일반 조건 | 부족한 쪽 조건에도 `(+)`를 붙여야 함 |
| 11 | `TRUNCATE` + WHERE | **불가**. 전체 삭제만 가능 |
| 12 | UNIQUE와 NULL | UNIQUE는 **NULL 허용**, PK는 불허 |
| 13 | `NULLS LAST` | **SQL Server 미지원** (Oracle 전용) |
| 14 | SQL Server `SUBSTRING` | 길이 인자 **생략 불가** |
| 15 | 문자열 + NULL | Oracle은 무시, SQL Server는 전체 NULL |
| 16 | 상호 배타 관계의 UNION | UNION과 UNION ALL 결과 **건수 동일** |
| 17 | CASE에서 비교 불가 조건 | 에러 아님. 다음 WHEN → 없으면 ELSE/NULL |
| 18 | 커밋 전 내 변경분 | **내 세션 SELECT에는 바로 보임** |

---

## 15. 마지막 점검 순서

시험 직전에는 이 순서로 훑는 것이 좋다.

1. 0번 실행 순서 그림 → 별칭 · ROWNUM · 윈도우 함수 문제가 한 번에 풀린다
2. 1-3 DECODE와 CASE의 NULL 차이
3. 2번 집합 연산자 표 (정렬 · 중복)
4. 3번 ROLLUP N+1 / CUBE 2ᴺ
5. 4-1 순위 함수 세 줄짜리 예시 표
6. 6-3 PRIOR 방향
7. 14번 함정 모음
