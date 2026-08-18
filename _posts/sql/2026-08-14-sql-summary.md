---
title: "[SQLD] SQL 핵심 정리 — 실행 순서부터 제약조건까지"
excerpt: "행이 늘어나는 구간, 접히는 구간, 바뀌는 구간으로 나눠 다시 정리"
categories: [sql]
order: 12
tags:
  - 조인
  - 윈도우함수
  - 트랜잭션
  - 제약조건
toc: true
toc_sticky: true
---

# SQLD 핵심 정리


## 0. 먼저 잡고 갈 것 — SQL 논리적 실행 순서

이 순서 하나로 아래 내용의 절반이 설명된다. 별칭 문제, ROWNUM 함정, 윈도우 함수의 ORDER BY 문제가 전부 여기서 나온다.


<svg viewBox="0 0 680 220" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SQL 논리적 실행 순서와 자주 틀리는 지점">
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
  <text x="2" y="208" class="t">서브쿼리(인라인 뷰)를 활용하여 별칭을 먼저 생성 → FROM절이 가장 먼저 실행되므로 WHERE에서 사용가능</text>
</svg>


---

## 1. NULL과 조건 함수

### 1-1. NULL의 기본 성질

| 상황 | 결과 |
| :--- | :--- |
| `NULL = NULL` | TRUE가 아니라 **UNKNOWN** (조건 불만족 처리) |
| `NULL + 100` | NULL (연산에 NULL이 끼면 전부 NULL) |
| 비교 방법 | `IS NULL` / `IS NOT NULL` 만 사용 |
| 집계 함수 | NULL은 **무시**하고 계산 |

```sql
-- 급여 3명: 100, 200, NULL
SUM(sal)   → 300
AVG(sal)   → 150   (300/2, NULL은 분모에서도 빠진다)
COUNT(sal) → 2     (NULL 제외)
COUNT(*)   → 3     (행 개수 그대로)
```

■ `AVG`는 NULL을 0으로 치지 않는다. 0으로 보고 싶으면 `AVG(NVL(sal,0))`.<br>
■ `COUNT(NULL)`은 NULL만 세라는 뜻인데 NULL은 집계 대상이 아니므로 **항상 0**이다.

<br>

### 1-2. NULL 관련 함수

| 함수 | DB | 의미 | 예시 |
| :--- | :---: | :--- | :--- |
| `NVL(A, B)` | Oracle | A가 NULL이면 B | `NVL(comm, 0)` → NULL이면 0 |
| `ISNULL(A, B)` | SQL Server | 위와 동일 | `ISNULL(comm, 0)` |
| `NVL2(A, B, C)` | Oracle | A가 NULL이 **아니면** B, NULL이면 C | `NVL2(comm, '있음', '없음')` |
| `COALESCE(A, B, C…)` | 공통 | 앞에서부터 첫 번째 NULL 아닌 값 | `COALESCE(tel1, tel2, '미등록')` |
| `NULLIF(A, B)` | 공통 | 두 값이 **같으면 NULL**, 다르면 A | `NULLIF(sal, 0)` → 0이면 NULL |

○ `NULLIF`는 "0으로 나누기" 방지에 자주 쓴다. `a / NULLIF(b, 0)` → b가 0이면 에러 대신 NULL.

<br>

### 1-3. DECODE vs CASE

```sql
DECODE(기준값, 조건1, 결과1, 조건2, 결과2, ... , 기본값)
```

```sql
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

```sql
DECODE(comm, NULL, '없음', '있음')                    → NULL이면 '없음'  (같다고 판단)
CASE WHEN comm = NULL THEN '없음' ELSE '있음' END      → 항상 '있음'      (UNKNOWN)
CASE WHEN comm IS NULL THEN '없음' ELSE '있음' END     → '없음'          (올바른 작성법)
```

■ CASE에서 비교가 UNKNOWN이 되면 **에러가 아니라 다음 WHEN으로 넘어간다.** 다 못 맞추면 ELSE(없으면 NULL).

---

## 2. 조인

여러 테이블을 다루는 이야기는 조인부터 시작하는 것이 맞다. 조인은 **행을 늘리는** 구문이고, 뒤에 나오는 그룹 함수와 윈도우 함수는 그 늘어난 행을 접거나 계산하는 구문이기 때문이다.

<br>

### 2-1. 종류 요약

| 조인 | 결과 |
| :--- | :--- |
| `INNER JOIN` | 양쪽 조건이 맞는 행만 |
| `LEFT / RIGHT OUTER JOIN` | 기준 테이블은 전부 + 없는 쪽은 NULL |
| `FULL OUTER JOIN` | 양쪽 다 전부 |
| `CROSS JOIN` | 곱집합(M × N) |
| `NATURAL JOIN` | 같은 이름 컬럼으로 자동 조인 |

<br>

### 2-2. 조인 조건이 결과 행 수를 결정한다

SQL은 FROM 절에 테이블이 둘 이상 들어오면 일단 **만들 수 있는 모든 조합**을 구성한다. 참석자 명단 두 장을 겹쳐 놓고 왼쪽 사람마다 오른쪽 사람 전원을 한 번씩 짝지어 주는 것과 같다. 이걸 **카티션 곱(Cartesian Product)** 이라고 한다.

```sql
-- WHERE 조건이 없다 → 조합 가능한 모든 경우의 수
SELECT *
FROM   회원, 회원연락처;
```

■ 조건을 아예 안 쓴 경우만 문제가 아니다. 테이블 N개를 조인하려면 조인 조건이 **최소 N-1개** 필요한데, 이 개수를 못 채우면 조건을 썼는데도 일부 구간에서 카티션 곱이 발생한다.


<svg viewBox="0 0 680 176" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="조인 조건 충족 여부에 따른 결과 행 수 비교">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .box{fill:#f4f4f5;stroke:#c4c4c8}
    .ok{fill:#e4f0e9;stroke:#5f9b78}
    .warn{fill:#fdeeeb;stroke:#d3705c}
    .ln{stroke:#9b9b9f;fill:none}
    .ah{fill:#9b9b9f}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .box{fill:#26262a;stroke:#55555c}
      .ok{fill:#1d3628;stroke:#5f9b78}
      .warn{fill:#3a2420;stroke:#c9705e}
      .ln{stroke:#7c7c84} .ah{fill:#7c7c84}
    }
  </style>
  <defs>
    <marker id="ahj1" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 z" class="ah"/>
    </marker>
  </defs>
  <text x="2" y="16" class="h">조인 조건이 결과 행 수를 결정한다</text>
  <rect x="4" y="70" width="140" height="50" rx="6" class="box"/>
  <text x="20" y="90" class="t">FROM 절에</text>
  <text x="20" y="107" class="t">테이블 2개 이상</text>
  <path d="M144,95 H161 V58 H174" class="ln" marker-end="url(#ahj1)"/>
  <path d="M144,95 H161 V132 H174" class="ln" marker-end="url(#ahj1)"/>
  <rect x="178" y="30" width="228" height="56" rx="6" class="ok"/>
  <text x="194" y="52" class="t">조인 조건 충족 (N-1개 이상)</text>
  <text x="194" y="71" class="t">의도한 짝만 남는다</text>
  <path d="M406,58 H432" class="ln" marker-end="url(#ahj1)"/>
  <rect x="436" y="30" width="240" height="56" rx="6" class="ok"/>
  <text x="452" y="52" class="t">결과 = 매칭된 행 수</text>
  <text x="452" y="71" class="t">정상 조인</text>
  <rect x="178" y="104" width="228" height="56" rx="6" class="warn"/>
  <text x="194" y="126" class="t">조건 누락 · 최소 개수 미달</text>
  <text x="194" y="145" class="t">모든 조합을 만든다</text>
  <path d="M406,132 H432" class="ln" marker-end="url(#ahj1)"/>
  <rect x="436" y="104" width="240" height="56" rx="6" class="warn"/>
  <text x="452" y="126" class="t">결과 = A행수 × B행수</text>
  <text x="452" y="145" class="t">카티션 곱 · 고비용</text>
</svg>


의도적으로 모든 조합이 필요할 때는 ANSI 표준 문법인 `CROSS JOIN`을 쓴다. 의도가 문법에 드러나므로 실수와 구분된다.

```sql
SELECT *
FROM   테이블A CROSS JOIN 테이블B;   -- ON 절을 붙이면 오류
```

<br>

### 2-3. Oracle 전용 아우터 조인 `(+)`

`(+)`는 **데이터가 부족해서 NULL을 채워 넣어야 하는 쪽**에 붙인다. 즉 기호가 붙은 쪽이 기준이 아니라, **붙지 않은 쪽이 기준 테이블**이다.

```sql
-- 표준 문법
FROM  부서 d LEFT JOIN 사원 e
      ON d.부서번호 = e.부서번호 AND e.직무 = '영업'

-- Oracle 전용
FROM  부서 d, 사원 e
WHERE d.부서번호 = e.부서번호(+)
  AND e.직무(+) = '영업';        -- 일반 조건에도 (+)를 붙여야 조인 조건으로 처리된다
```

**1. (+) 없이 쓰면 어떻게 되나?**

```sql
WHERE d.부서번호 = e.부서번호(+)
  AND e.직무 = '영업'          -- (+) 없음
```

이 경우 Oracle 입장에서 `e.직무 = '영업'`은 조인과 무관하게 되고, **조인이 다 끝난 뒤 결과 집합에 걸리는 순수 WHERE 필터로 취급**해버린다. 

즉, 먼저 `d.부서번호 = e.부서번호(+)`로 아우터 조인 수행 → 사원 없는 부서는 e.* 컬럼이 전부 NULL로 채워짐  

그 다음 `e.직무 = '영업'` 필터 적용  

NULL = '영업'은 참이 될 수 없으니 → **사원이 없어서 NULL로 채워진 부서 행이 통째로 날아감**  

결과적으로 아우터 조인을 걸어놓고도, 사원 없는 부서는 다 사라져서 사실상 `INNER JOIN`처럼 동작한다. 

<br>

**2. (+)를 붙이면 어떻게 되나?**

```sql
WHERE d.부서번호 = e.부서번호(+)
  AND e.직무(+) = '영업'       -- (+) 붙임
```

이러면 `e.직무(+) = '영업'`도 조인이 성립하는 조건 자체의 일부로 편입된다. 

<br>
표준 문법으로 치면,

```sql
FROM 부서 d LEFT JOIN 사원 e
     ON d.부서번호 = e.부서번호 AND e.직무 = '영업'
```

와 동일해진다. 


<br>

■ `(+)`는 **한쪽에만** 붙일 수 있다. 그래서 양쪽을 모두 살리는 FULL OUTER JOIN은 `(+)`로 표현할 수 없고, ANSI `FULL OUTER JOIN`이나 `UNION`으로 우회해야 한다.

<br>

### 2-4. 조건을 ON에 둘지 WHERE에 둘지

아우터 조인이 가장 자주 깨지는 지점이다. "부서번호가 같고, 동시에 직무가 영업인 것만 붙여라"라는 조건을 어디에 두느냐로 결과의 성격이 달라진다.

물론 WHERE 절에 써도 문법 오류는 나지 않는다. 하지만 조인이 실패해 `e.직무`가 NULL인 행이 WHERE 단계에서 걸러지므로, 아우터 조인을 써 놓고 결과는 이너 조인이 된다.


<svg viewBox="0 0 680 176" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="아우터 조인의 추가 조건을 ON 절과 WHERE 절에 둔 결과 차이">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .box{fill:#f4f4f5;stroke:#c4c4c8}
    .ok{fill:#e4f0e9;stroke:#5f9b78}
    .warn{fill:#fdeeeb;stroke:#d3705c}
    .ln{stroke:#9b9b9f;fill:none}
    .ah{fill:#9b9b9f}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .box{fill:#26262a;stroke:#55555c}
      .ok{fill:#1d3628;stroke:#5f9b78}
      .warn{fill:#3a2420;stroke:#c9705e}
      .ln{stroke:#7c7c84} .ah{fill:#7c7c84}
    }
  </style>
  <defs>
    <marker id="ahj2" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 z" class="ah"/>
    </marker>
  </defs>
  <text x="2" y="16" class="h">추가 필터 조건의 위치 · 코랄은 의도가 깨지는 쪽</text>
  <rect x="4" y="70" width="140" height="50" rx="6" class="box"/>
  <text x="20" y="90" class="t">아우터 조인 +</text>
  <text x="20" y="107" class="t">상대 테이블 조건</text>
  <path d="M144,95 H161 V58 H174" class="ln" marker-end="url(#ahj2)"/>
  <path d="M144,95 H161 V132 H174" class="ln" marker-end="url(#ahj2)"/>
  <rect x="178" y="30" width="228" height="56" rx="6" class="ok"/>
  <text x="194" y="52" class="t">ON 절 안에 둔다 · (+) 표기</text>
  <text x="194" y="71" class="t">조인 실패 행도 기준 쪽은 유지</text>
  <path d="M406,58 H432" class="ln" marker-end="url(#ahj2)"/>
  <rect x="436" y="30" width="240" height="56" rx="6" class="ok"/>
  <text x="452" y="52" class="t">아우터 조인 유지</text>
  <text x="452" y="71" class="t">상대 컬럼만 NULL</text>
  <rect x="178" y="104" width="228" height="56" rx="6" class="warn"/>
  <text x="194" y="126" class="t">WHERE 절에 둔다 · (+) 누락</text>
  <text x="194" y="145" class="t">NULL 행이 필터에서 탈락</text>
  <path d="M406,132 H432" class="ln" marker-end="url(#ahj2)"/>
  <rect x="436" y="104" width="240" height="56" rx="6" class="warn"/>
  <text x="452" y="126" class="t">사실상 이너 조인</text>
  <text x="452" y="145" class="t">기준 행이 사라진다</text>
</svg>


정리하면 **`(+)`가 붙던 조건은 예외 없이 ON 절로 옮기는 것이 좋다.** WHERE 절에는 기준 테이블 자신에 대한 조건만 남긴다.

<br>

### 2-5. 조건을 줄여주는 USING과 NATURAL JOIN

공통 컬럼명이 같다면 조인 조건을 다 쓰지 않아도 된다. 다만 편해지는 만큼 제약이 붙는다.

```sql
-- USING : 공통 컬럼명만 나열하면 자동 동등조인
SELECT 회원ID, B.연락처                        -- USING 컬럼에는 접두사·별칭 금지
FROM   회원 A INNER JOIN 회원연락처 B USING (회원ID);

-- ON : 가장 명시적이고 제약이 없다
SELECT A.회원ID, B.연락처
FROM   회원 A INNER JOIN 회원연락처 B ON (A.회원ID = B.회원ID);

-- NATURAL JOIN : 이름과 타입이 같은 모든 컬럼이 자동 조인 대상
SELECT *
FROM   회원 NATURAL JOIN 회원연락처;
```

| 문법 | 조인 대상 | 공통 컬럼에 접두사·별칭 | ON·USING 병용 | SQL Server |
| :--- | :--- | :---: | :---: | :---: |
| `ON` | 내가 지정한 조건 | 가능 | — | 지원 |
| `USING` | 나열한 공통 컬럼 | **불가** | 불가 | **미지원** |
| `NATURAL JOIN` | 공통 컬럼 **전부** | **불가** | 불가 | **미지원** |

물론 NATURAL JOIN이 가장 짧다. 하지만 나중에 누군가 양쪽 테이블에 `등록일자` 같은 컬럼을 추가하면 조인 조건이 조용히 하나 더 늘어난다. 즉, 스키마 변경에 결과가 따라 흔들린다. 반대로 컬럼명이 서로 다르면 아예 조인되지 않는다.

<br>

### 2-6. 셀프 조인 (SELF JOIN)

하나의 테이블이 서로 다른 역할을 동시에 맡을 때 쓴다. 사원과 관리자가 같은 테이블에 있는 경우가 대표적이다. 이때 **별칭은 선택이 아니라 필수**다. 별칭이 없으면 어느 쪽 행을 가리키는지 구분할 방법이 없다.

```sql
SELECT A.사원명 AS 사원, B.사원명 AS 관리자
FROM   사원 A, 사원 B
WHERE  A.관리자ID = B.사원ID;
```

---

## 3. 서브쿼리

### 3-1. 위치별 분류

| 이름 | 위치 | 특징 |
| :--- | :--- | :--- |
| **스칼라 서브쿼리** | SELECT 절 | 반드시 **1행 1컬럼**만 반환 |
| **인라인 뷰** | FROM 절 | 결과를 테이블처럼 사용 |
| **중첩 서브쿼리** | WHERE / HAVING 절 | 조건 비교용 |

<br>

### 3-2. 반환 행 수별 분류

| 종류 | 반환 | 사용 연산자 |
| :--- | :--- | :--- |
| 단일 행 | 1행 | `=`, `>`, `<`, `>=`, `<=`, `<>` |
| 다중 행 | 여러 행 | `IN`, `ANY`, `ALL`, `EXISTS` |
| 다중 컬럼 | 여러 컬럼 | `(a, b) IN (SELECT …)` |

■ 단일 행 연산자(`=`)에 여러 행이 오면 에러가 난다.

<br>

### 3-3. ORDER BY 사용 여부

| 위치 | ORDER BY |
| :--- | :--- |
| 인라인 뷰(FROM 절) | **가능** |
| 스칼라 서브쿼리 | 의미 없음 — 1행만 나오므로 정렬할 대상이 없다 |
| WHERE 절 중첩 서브쿼리 | 시험 기준 **사용하지 않는다** (조건 비교용이라 정렬이 무의미) |

<br>

### 3-4. 그 밖에

- 서브쿼리는 메인 쿼리를 **필터링하거나 값을 계산**하는 용도라, 스칼라 서브쿼리·중첩 서브쿼리는 결과 행 수를 늘리지 않는다.
- 연관 서브쿼리는 메인 쿼리의 컬럼을 참조한다. `EXISTS`가 대표적이다.
- Oracle 12c부터는 `LATERAL` 키워드로 **인라인 뷰 안에서 메인 쿼리 컬럼 참조**가 가능하다. (`CROSS APPLY`, `OUTER APPLY`도 같은 목적)

---

## 4. 집합 연산자


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


| 특징 | UNION | UNION ALL | INTERSECT | MINUS(EXCEPT) |
| :--- | :---: | :---: | :---: | :---: |
| 중복 제거 | O | **X** | O | O |
| 정렬 발생 | O | **X** | O | O |
| 성능 | 느림 | **빠름** | 느림 | 느림 |

○ 중복을 제거하려면 값을 비교해야 하므로 정렬이 따라온다. 즉 **UNION ALL만 정렬이 없어서 빠르다.** <br>
○ MINUS는 Oracle, EXCEPT는 SQL Server 용어다.

<br>

### 공통 규칙

- 각 SELECT의 **컬럼 개수와 자료형이 순서대로 일치**해야 한다. 컬럼 이름은 달라도 된다.
- 결과 컬럼명은 **첫 번째 SELECT문 기준**으로 정해진다.
- `ORDER BY`는 맨 마지막에 딱 한 번만 쓸 수 있다.

<br>

### 우선순위

- SQL 표준: `INTERSECT`가 가장 높고, `UNION`과 `EXCEPT(MINUS)`는 동급으로 위에서 아래로 처리된다.
- 다만 예전 Oracle 버전은 모두 동급으로 순차 처리했다. 실무·시험 모두 **괄호로 명시하는 것이 안전**하다.

■ **상호 배타적(mutually exclusive) 관계**인 두 엔터티는 겹치는 인스턴스가 없도록 설계됐으므로 `UNION`과 `UNION ALL`의 **결과 건수가 같다**. 이때는 성능상 UNION ALL을 쓰는 것이 좋다.

---

## 5. 그룹 함수 (ROLLUP · CUBE · GROUPING SETS)

<br>

### 5-1. 만들어지는 그룹 개수

| 함수 | 그룹 개수 | `(지역, 상품)` 기준으로 생성되는 조합 |
| :--- | :---: | :--- |
| `ROLLUP(A, B)` | **N + 1 = 3** | (A,B) → (A) → () |
| `CUBE(A, B)` | **2ᴺ = 4** | (A,B), (A), (B), () |
| `GROUPING SETS` | 지정한 만큼 | 내가 적은 조합만 |

```sql
ROLLUP(지역, 상품)   :  (지역,상품) → (지역) → ()          오른쪽부터 하나씩 떼어낸다
CUBE(지역, 상품)     :  (지역,상품)   (지역)   (상품)   ()   가능한 모든 조합
```

동일한 표현으로 바꾸면 이렇게 된다.

```sql
GROUP BY ROLLUP(A, B)  =  GROUP BY GROUPING SETS((A,B), (A), ())
GROUP BY CUBE(A, B)    =  GROUP BY GROUPING SETS((A,B), (A), (B), ())
```

`ROLLUP`은 결국 GROUP BY 컬럼을 오른쪽부터 하나씩 지워 가며 집계한 결과를 `UNION ALL`로 붙인 것과 같다. 실제로 풀어 쓰면 이렇게 된다.

```sql
SELECT 지역, 상품, SUM(금액) FROM 판매 GROUP BY ROLLUP(지역, 상품);

-- 위 한 줄은 아래 세 쿼리를 UNION ALL 한 것과 동일하다
SELECT 지역, 상품, SUM(금액) FROM 판매 GROUP BY 지역, 상품;   -- 상세
SELECT 지역, NULL,  SUM(금액) FROM 판매 GROUP BY 지역;        -- 지역 소계
SELECT NULL, NULL,  SUM(금액) FROM 판매;                      -- 전체 합계
```

○ 마지막 줄처럼 GROUP BY를 아예 쓰지 않고 집계 함수만 쓰면 `GROUP BY ()`가 자동 적용되어 전체 한 행이 나온다. 즉 ROLLUP의 맨 마지막 단계와 같은 상태다.

<br>

### 5-2. 컬럼 순서

| 구문 | 컬럼 순서가 결과에 영향? |
| :--- | :--- |
| 일반 `GROUP BY A, B` | **없음** (그룹 결과 집합 동일) |
| `ROLLUP(A, B)` | **있음** — 오른쪽부터 떼므로 A, B를 바꾸면 소계 종류가 달라진다 |
| `CUBE(A, B)` | 없음 (모든 조합을 만들므로 결과 집합 동일) |

<br>

### 5-3. GROUPING 함수

집계 행(소계·총계)에서는 해당 컬럼이 NULL로 표시된다. 그런데 이 NULL이 **원래 데이터의 NULL인지 소계 때문인지 구분이 안 된다.** 이걸 구분해주는 게 `GROUPING`이다.

| 반환값 | 의미 |
| :---: | :--- |
| **1** | 그 컬럼이 그룹화에 사용되지 않은 행 = **소계/총계 행** |
| **0** | 그 컬럼이 실제로 그룹화에 사용된 일반 행 |

```sql
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

## 6. 윈도우 함수

```sql
WINDOW_FUNCTION([인자]) OVER ( [PARTITION BY 컬럼] [ORDER BY 절] [WINDOWING 절] )
```

- **반드시 `OVER()` 와 함께** 쓴다.
- `PARTITION BY` = 그룹을 나눈다(그룹 함수의 GROUP BY와 비슷하지만 **행이 줄어들지 않는다**).
- ■ `OVER` 안의 `ORDER BY`는 **계산 순서**를 정할 뿐 출력 순서를 보장하지 않는다. 화면 정렬은 쿼리 맨 끝의 `ORDER BY`로 따로 해야 한다.

<br>

### 6-1. PARTITION BY와 GROUP BY의 차이

이름은 둘 다 "나눈다"인데 결과 모양이 다르다. GROUP BY는 행을 접어서 대표 한 줄만 남기고, PARTITION BY는 접지 않고 각 행 옆에 계산 결과를 적어 준다. 영수증에서 항목을 지우고 합계만 남기는 것과, 항목은 그대로 두고 오른쪽에 합계 칸을 하나 더 만드는 것의 차이다.

| 비교 항목 | `PARTITION BY` | `GROUP BY` |
| :--- | :--- | :--- |
| 위치 | 윈도우 함수 내부(`OVER` 절) | SELECT문의 `GROUP BY` 절 |
| 분할 방식 | 논리적 그룹핑 (행 유지) | 물리적 그룹핑 (행 축약) |
| 결과 행 수 | **변하지 않음** | **줄어듦** |
| 상세와 집계 | 함께 볼 수 있다 | 상세는 사라진다 |


<svg viewBox="0 0 680 176" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="PARTITION BY와 GROUP BY의 결과 행 수 차이">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .box{fill:#f4f4f5;stroke:#c4c4c8}
    .ok{fill:#e4f0e9;stroke:#5f9b78}
    .warn{fill:#fdeeeb;stroke:#d3705c}
    .ln{stroke:#9b9b9f;fill:none}
    .ah{fill:#9b9b9f}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .box{fill:#26262a;stroke:#55555c}
      .ok{fill:#1d3628;stroke:#5f9b78}
      .warn{fill:#3a2420;stroke:#c9705e}
      .ln{stroke:#7c7c84} .ah{fill:#7c7c84}
    }
  </style>
  <defs>
    <marker id="ahw1" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 z" class="ah"/>
    </marker>
  </defs>
  <text x="2" y="16" class="h">같은 "나누기", 다른 결과 행 수 · 초록은 행 유지</text>
  <rect x="4" y="70" width="140" height="50" rx="6" class="box"/>
  <text x="20" y="90" class="t">원본 6행</text>
  <text x="20" y="107" class="t">지점 2종</text>
  <path d="M144,95 H161 V58 H174" class="ln" marker-end="url(#ahw1)"/>
  <path d="M144,95 H161 V132 H174" class="ln" marker-end="url(#ahw1)"/>
  <rect x="178" y="30" width="228" height="56" rx="6" class="ok"/>
  <text x="194" y="52" class="t">PARTITION BY · OVER 절 내부</text>
  <text x="194" y="71" class="t">논리적 그룹핑</text>
  <path d="M406,58 H432" class="ln" marker-end="url(#ahw1)"/>
  <rect x="436" y="30" width="240" height="56" rx="6" class="ok"/>
  <text x="452" y="52" class="t">결과 6행 + 계산 컬럼</text>
  <text x="452" y="71" class="t">상세와 집계를 함께 본다</text>
  <rect x="178" y="104" width="228" height="56" rx="6" class="warn"/>
  <text x="194" y="126" class="t">GROUP BY · SELECT문 절</text>
  <text x="194" y="145" class="t">물리적 그룹핑</text>
  <path d="M406,132 H432" class="ln" marker-end="url(#ahw1)"/>
  <rect x="436" y="104" width="240" height="56" rx="6" class="warn"/>
  <text x="452" y="126" class="t">결과 2행</text>
  <text x="452" y="145" class="t">상세는 사라진다</text>
</svg>

<br>

### 6-2. 순위 함수 세 가지

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

<br>

### 6-3. 그룹별 1등 뽑기 (실전 패턴)

```sql
SELECT *
FROM ( SELECT 지점, 매출,
              ROW_NUMBER() OVER (PARTITION BY 지점 ORDER BY 매출 DESC) AS rn
       FROM   sales )
WHERE rn = 1;
```

○ 공동 1등까지 모두 필요하면 `ROW_NUMBER` 대신 `RANK`를 쓴다.

<br>

### 6-4. 그 밖의 윈도우 함수

| 분류 | 함수 | 의미 |
| :--- | :--- | :--- |
| 순위 | `RANK`, `DENSE_RANK`, `ROW_NUMBER` | 위 참고 |
| 순위(비율) | `CUME_DIST`, `PERCENT_RANK`, `NTILE(n)`, `RATIO_TO_REPORT` | 누적비율 / n등분 / 비중 |
| 행 순서 | `FIRST_VALUE`, `LAST_VALUE` | 윈도우 내 첫 행·마지막 행 값 |
| 행 순서 | `LAG(컬럼, n)`, `LEAD(컬럼, n)` | n행 앞/뒤 값 (증감 계산에 사용) |
| 집계 | `SUM`, `AVG`, `MAX`, `MIN`, `COUNT` + OVER | 누적합 등 |

○ `LAG`와 `LEAD`는 세 번째 인자로 **없을 때 쓸 값**을 지정할 수 있다. `LAG(컬럼, 오프셋, 디폴트)` 형태이고, 생략하면 NULL이 들어온다. 첫 행의 증감을 0으로 보이게 하려면 이 인자를 쓰는 것이 좋다.<br>
○ `CUME_DIST`는 **현재 값보다 작거나 같은 행의 수 ÷ 전체 행 수**다. 정렬 기준의 마지막 행은 항상 1이 된다.

<br>

### 6-5. WINDOWING 절

```sql
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW   -- 처음부터 현재 행까지 (누적)
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING           -- 앞 1행 ~ 뒤 1행
RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING  -- 전체
```

| 키워드 | 기준 |
| :--- | :--- |
| `ROWS` | **물리적인 행 개수** |
| `RANGE` | **논리적인 값의 범위** (같은 값이면 한 덩어리로 취급) |

■ `ORDER BY`만 쓰고 WINDOWING을 생략하면 기본값은 `RANGE UNBOUNDED PRECEDING ~ CURRENT ROW`(누적)다. `ORDER BY`도 없으면 파티션 전체가 대상이다.

○ `RANGE`의 기준은 행 번호가 아니라 **`ORDER BY`에 사용된 컬럼의 값**이다. 기준이 값이므로 `ORDER BY` 없이는 의미가 없다.

---

## 7. TOP-N 쿼리

### 7-1. ROWNUM (Oracle 가상 컬럼)

- 조회 **결과에 임시로 붙는 순번**이다. 테이블에 저장된 값이 아니다.
- **1부터** 시작하고, WHERE 조건을 통과한 행에 순서대로 붙는다.
- 대표적인 가상 컬럼: `ROWNUM`(조회 순번), `ROWID`(행의 물리적 주소), `LEVEL`(계층 깊이).

■ **ROWNUM은 WHERE 단계에서 붙고, ORDER BY는 그 뒤에 실행된다.**

```sql
SELECT * FROM emp WHERE ROWNUM = 1;    -- 정상 (1건)
SELECT * FROM emp WHERE ROWNUM = 2;    -- 결과 없음 (!)
SELECT * FROM emp WHERE ROWNUM <= 3;   -- 정상 (3건)
```

○ `ROWNUM = 2`가 안 되는 이유: 첫 행이 조건에 안 맞아 버려지면, 다음 행이 **다시 1번**을 받는다. 그래서 영원히 2가 되지 못한다. `>` 나 `= 2` 같은 조건은 쓸 수 없다고 외워두면 된다.

```sql
-- 급여 상위 3명 (정렬 먼저, ROWNUM은 나중에)
SELECT *
FROM ( SELECT * FROM emp ORDER BY sal DESC )
WHERE ROWNUM <= 3;
```

<br>

### 7-2. Oracle 12c 이상 — FETCH

```sql
SELECT 컬럼
FROM   테이블
ORDER BY 정렬기준
[ OFFSET n ROWS ]
[ FETCH { FIRST | NEXT } m { ROW | ROWS } | p PERCENT ROWS { ONLY | WITH TIES } ];
```

```sql
SELECT ename, sal FROM emp
ORDER BY sal DESC
OFFSET 0 ROWS FETCH FIRST 3 ROWS ONLY;   -- 인라인 뷰 없이 상위 3명
```

<br>

### 7-3. SQL Server — TOP

```sql
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

## 8. 계층형 질의 (Oracle)

### 8-1. 데이터와 트리 모양

```sql
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

<br>

### 8-2. 기본 구문

```sql
SELECT LEVEL, 사원번호, 이름
FROM   사원
START WITH 상위사원번호 IS NULL          -- 어디서 시작할지 (루트 조건)
CONNECT BY PRIOR 사원번호 = 상위사원번호  -- 어떻게 이어갈지 (전개 조건)
ORDER SIBLINGS BY 이름;                  -- 같은 부모를 둔 형제끼리만 정렬
```

○ 실행 순서: `START WITH` → `CONNECT BY`(전개) → `WHERE`(전개가 끝난 결과를 필터). 즉 WHERE로 중간 노드를 빼도 그 아래 자식은 이미 전개된 뒤라 남는다.

<br>

### 8-3. 전개 방향

`PRIOR`가 붙은 쪽이 **이전 행(방금 읽은 행)** 이다.

| 작성 형태 | 방향 | 예시 |
| :--- | :--- | :--- |
| `PRIOR 자식키 = 부모참조컬럼` | **순방향** (부모 → 자식) | `PRIOR 메뉴ID = 상위메뉴ID` |
| `자식키 = PRIOR 부모참조컬럼` | **역방향** (자식 → 부모) | `메뉴ID = PRIOR 상위메뉴ID` |

■ 헷갈리면 이렇게 본다. PRIOR가 **PK 쪽**에 붙으면 아래로(순방향), **FK 쪽**에 붙으면 위로(역방향) 간다.

<br>

### 8-4. 계층 관련 키워드

| 키워드 | 의미 |
| :--- | :--- |
| `LEVEL` | 깊이. 루트가 1 |
| `CONNECT_BY_ISLEAF` | 말단이면 1, 아니면 0 |
| `CONNECT_BY_ISCYCLE` | 순환 감지 시 1 (`NOCYCLE`과 함께 써야 사용 가능) |
| `SYS_CONNECT_BY_PATH(컬럼, '구분자')` | 루트부터 현재까지의 경로를 문자열로 |
| `CONNECT_BY_ROOT 컬럼` | 그 행이 **어느 루트에서 뻗어 나왔는지** 루트의 값 |
| `NOCYCLE` | 순환이 생겨도 에러 없이 멈춤 — 안전하게 쓰려면 붙이는 것이 좋다 |

```sql
SYS_CONNECT_BY_PATH(이름, '/')  →  /대표이사/영업팀장/사원A
```

<br>

### 8-5. START WITH vs CONNECT_BY_ROOT

- `START WITH` : **어떤 행이 루트가 될 자격이 있는지** 판단하는 조건. 결과 루트는 1개일 수도 여러 개일 수도 있다.
- `CONNECT_BY_ROOT` : 결과로 나온 **각 행마다** 그 행이 속한 루트의 값을 붙여주는 연산자.

```sql
SELECT 사원번호, 이름, LEVEL,
       CONNECT_BY_ROOT 이름 AS 최상위자
FROM   사원
START WITH 상위사원번호 IS NULL
CONNECT BY PRIOR 사원번호 = 상위사원번호;
```

○ `PRIOR`는 **바로 위 부모**만 알려줄 뿐 꼭대기 값을 자동으로 가져오지 않는다. 그래서 루트가 하나뿐이어도 매 행에 루트 값을 붙이려면 `CONNECT_BY_ROOT`가 필요하다. 안 쓰면 셀프 조인이나 서브쿼리로 우회해야 한다.

■ `LEVEL`은 절대적인 깊이가 아니라 **탐색을 시작한 지점 기준의 상대적 깊이**다. `START WITH`로 지정한 행이 무조건 LEVEL 1이 되므로, 중간 노드에서 시작하면 그 노드가 1이 된다.
■ `START WITH`를 생략하면 테이블의 **모든 행이 각각 시작점**이 되어 전부 LEVEL 1에서 출발한다. 즉 계층 전체가 행마다 한 번씩 전개된다.

<br>

### 8-6. Oracle vs SQL Server

| 항목 | Oracle | SQL Server |
| :--- | :--- | :--- |
| 구문 | `START WITH ~ CONNECT BY` | `WITH` 재귀 CTE + `UNION ALL` |
| 전개 방식 | 내장 계층 확장 | 재귀 호출로 단계별 전개 |
| 시작점 | `START WITH` | CTE의 **앵커 멤버** |
| 반복 조건 | `CONNECT BY` | CTE 내부 JOIN 조건(**재귀 멤버**) |

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

```sql
Oracle      : '홍' || NULL || '길동'  →  '홍길동'
SQL Server  : '홍' +  NULL +  '길동'  →  NULL
```

<br>

### 9-2. LIKE

- 와일드카드: `%`(0자 이상), `_`(정확히 1자)
- ■ Oracle의 `LIKE`는 **대소문자를 구분한다.** 구분 없이 찾으려면 `WHERE LOWER(컬럼) LIKE 'e%'`.
- ○ SQL Server는 기본 콜레이션이 대소문자 구분 없음(CI)인 경우가 많아 결과가 다를 수 있다.
- 와일드카드 자체를 찾으려면 `LIKE '100\%' ESCAPE '\'`.

<br>

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

```sql
SELECT REGEXP_INSTR('apple banana cherry', '[a-z]+', 1, 2, 1) FROM dual;
                                            ↑  ↑  ↑
                        시작위치 1 ──────────┘  │  │
                        2번째 일치 = 'banana' ──┘  │
                        리턴옵션 1 ────────────────┘
-- 0 = 일치가 시작되는 위치 / 1 = 일치가 끝난 다음 위치
-- 'banana'는 7~12번째 → 결과 13
```

<br>

### 9-4. 문자 클래스와 수량사

대괄호 표기와 POSIX 표기는 서로 대응된다. 시험에서는 같은 조건을 두 표기로 바꿔 놓고 묻는 경우가 많다.

| 대괄호 표기 | POSIX 표기 |
| :--- | :--- |
| `[a-z]` | `[[:lower:]]` |
| `[A-Z]` | `[[:upper:]]` |
| `[0-9]` | `[[:digit:]]` |
| `[a-zA-Z]` | `[[:alpha:]]` |
| `[0-9a-zA-Z]` | `[[:alnum:]]` |

```sql
^[a-z0-9]  =  ^[[:lower:][:digit:]]      같은 의미다
```

| 수량사 | 의미 |
| :---: | :--- |
| `*` | 0회 이상 |
| `+` | 1회 이상 |
| `?` | 0회 또는 1회 |
| `{n}` / `{n,}` / `{n,m}` | 정확히 n회 / n회 이상 / n회 이상 m회 이하 |

■ 수량사는 항상 **바로 앞의 한 문자(또는 그룹)** 에만 적용된다.
○ 패턴이 `'.'` 하나면 아무 문자 한 개만 있어도 매칭되므로 `REGEXP_LIKE(이름, '.')`은 사실상 NULL이 아닌 모든 행을 출력한다.

<br>

### 9-5. 탐욕적 vs 비탐욕적

| 구분 | 표기 | 동작 |
| :--- | :--- | :--- |
| 탐욕적(greedy) | `*`, `+`, `{n,}` | **가능한 한 길게** 매칭 |
| 비탐욕적(lazy) | `*?`, `+?`, `{n,}?` | **가능한 한 짧게** 매칭 |

```sql
문자열 : <a><b>
'<.*>'   →  <a><b>    (끝까지 먹는다)
'<.*?>'  →  <a>       (최소한만 먹는다)
```
<br>

### 9-6. 위치를 반환하는 함수 — INSTR

`INSTR`은 정규식 없이 문자열 위치를 찾는 단일행 함수다. 반환 방식을 고르는 `리턴옵션`은 `INSTR`에는 없고 정규식 버전인 `REGEXP_INSTR`에만 있다는 점만 구분해 두면 된다.

```sql
INSTR(원본, 찾는문자 [, 시작위치 [, 발생횟수]])
REGEXP_INSTR(원본, 패턴, 시작위치, 발생순서, 리턴옵션, 옵션)
                                        ↑ 0 = 시작 위치 / 1 = 끝난 다음 위치
```

---

## 10. PIVOT / UNPIVOT

### 10-1. PIVOT — 행을 열로

```sql
SELECT * FROM 판매
PIVOT ( SUM(금액) FOR 분기 IN ('1Q' AS Q1, '2Q' AS Q2) );
```

<br>

### 10-2. UNPIVOT — 열을 행으로

```sql
SELECT * FROM 판매요약
UNPIVOT ( 금액 FOR 분기 IN (Q1 AS '1분기', Q2 AS '2분기') );
```

■ UNPIVOT의 `AS` 뒤 값은 **결과 행의 데이터 값**으로 들어간다. SELECT 절에서 쓰는 별칭(컬럼 이름 바꾸기)과는 성격이 다르다. 위 예시에서 `Q1` 열의 데이터는 `분기` 컬럼에 `'1분기'`라는 **값**으로 표시된다.

○ 집계 함수에 별칭을 주면 결과 컬럼명은 **`값_별칭`** 형태로 붙는다. `SUM(매출액) AS 매출합계`에 분기 값이 `2022`라면 컬럼명은 `2022_매출합계`가 된다.
○ UNPIVOT은 가로로 퍼진 컬럼을 세로로 내리는 정규화 작업이라 **집계 함수가 필요 없다.**

<br>

### 10-3. PIVOT 절이 없는 환경에서는 CASE로

SQL Server 구버전이나 PIVOT을 못 쓰는 상황에서는 `CASE WHEN`과 집계 함수로 같은 결과를 만든다. 조건에 맞는 값만 남기고 나머지는 NULL로 만들어 집계에서 빠지게 하는 방식이다.

```sql
SELECT 지역,
       SUM(CASE WHEN 분기 = '1Q' THEN 금액 END) AS Q1,
       SUM(CASE WHEN 분기 = '2Q' THEN 금액 END) AS Q2
FROM   판매
GROUP BY 지역;
```

---

## 11. DML

### 11-1. DELETE vs TRUNCATE vs DROP

| 항목 | DELETE | TRUNCATE | DROP |
| :--- | :--- | :--- | :--- |
| 분류 | DML | **DDL** | DDL |
| WHERE 사용 | **가능** | **불가 (전체 삭제)** | 불가 |
| 롤백 | 가능 | 불가 (Auto Commit) | 불가 |
| 저장 공간 | 유지 | **반환** (최초 상태로) | 테이블 자체 삭제 |
| 테이블 구조 | 남음 | 남음 | **사라짐** |
| 속도 | 느림 | 빠름 | 빠름 |

<br>

### 11-2. 여러 건 넣기와 식별자

```sql
-- 조회 결과를 그대로 밀어 넣는다. 컬럼 개수·자료형이 맞아야 한다
INSERT INTO 사원백업 (사원번호, 이름)
SELECT 사원번호, 이름 FROM 사원 WHERE 부서번호 = 10;
```

■ 식별자 역할을 하는 컬럼에는 값이 **반드시** 있어야 한다. 즉 기본키에는 NULL을 넣을 수 없다.

<br>

### 11-3. MERGE — 있으면 UPDATE, 없으면 INSERT

```sql
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

## 12. 트랜잭션

### 12-1. 트랜잭션 특성 (ACID)

| 특성 | 의미 |
| :--- | :--- |
| 원자성(Atomicity) | 전부 반영되거나 전부 취소되거나 |
| 일관성(Consistency) | 실행 전후로 DB가 모순 없는 상태 유지 |
| 고립성(Isolation) | 수행 중인 트랜잭션에 다른 트랜잭션이 끼어들지 못함 |
| 지속성(Durability) | 완료된 결과는 영구 보존 |

■ 같은 세션(트랜잭션) 안에서는 `COMMIT`을 하지 않아도 **내가 방금 한 DML 결과가 내 SELECT에는 바로 보인다.** 다른 세션에서 안 보일 뿐이다.
■ DDL을 실행하면 앞선 DML이 **자동 커밋**된다.

<br>

### 12-2. Oracle과 SQL Server의 기본값이 다르다

| 구분 | Oracle | SQL Server |
| :--- | :--- | :--- |
| 기본 설정 | 묵시적 트랜잭션 | **자동 커밋 모드** |
| 트랜잭션 시작 | DML(INSERT·UPDATE·DELETE) 실행 시 자동 | `BEGIN TRANSACTION` 또는 `SET IMPLICIT_TRANSACTIONS ON` |
| 종료 | 명시적 `COMMIT` / `ROLLBACK` | 명시적 `COMMIT` / `ROLLBACK` |
| DDL | 자동 커밋 → **롤백 불가** | 트랜잭션 안에서 **롤백 가능** |

| 구분 | AUTO COMMIT = FALSE | AUTO COMMIT = TRUE |
| :--- | :--- | :--- |
| DML | 수동 COMMIT | 자동 COMMIT |
| DDL | 자동 COMMIT | 자동 COMMIT |

■ SQL Server에서 `BEGIN TRANSACTION`을 실행하면 그 구간은 AUTO COMMIT이 FALSE가 되고, 이 안에서는 **DDL까지 롤백**할 수 있다. Oracle에서는 DDL이 곧 커밋이므로 되돌릴 수 없다. 두 DBMS의 가장 큰 차이가 여기다.

<br>

### 12-3. 고립성 수준

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

## 13. DDL — 제약조건과 ALTER

### 13-1. 제약조건 비교

| 제약 | 중복 허용 | NULL 허용 | 비고 |
| :--- | :---: | :---: | :--- |
| `PRIMARY KEY` | 불가 | **불가** | 개체 무결성 |
| `UNIQUE` | 불가 | **가능** | PK와의 실질적 차이가 여기다 |
| `NOT NULL` | 가능 | 불가 | 값의 존재만 강제 |
| `CHECK` | 가능 | 가능 | 조건식으로 도메인 제한 |
| `FOREIGN KEY` | 가능 | 가능 | 참조 무결성 |

```sql
CONSTRAINT 제약조건명 CHECK (조건)
```

<br>

### 13-2. 외래키와 부모 삭제 옵션

외래키는 참조 무결성을 담당한다. 중복도 NULL도 허용하며, 부모가 삭제될 때의 동작을 옵션으로 지정한다.

| 옵션 | 부모 데이터 삭제 시 자식 데이터 |
| :--- | :--- |
| `ON DELETE CASCADE` | 함께 삭제 |
| `ON DELETE SET NULL` | 참조 컬럼을 NULL로 |
| **옵션 생략** | 삭제 자체를 거부 (RESTRICT / NO ACTION) |

■ 아무 옵션도 주지 않으면 부모 행이 지워지지 않는다. 즉 기본값은 "그냥 막는다"다.

<br>

### 13-3. ALTER — DBMS별 차이

| 항목 | Oracle | SQL Server |
| :--- | :--- | :--- |
| 컬럼 변경 구문 | `ALTER TABLE … MODIFY (컬럼 …)` | `ALTER TABLE … ALTER COLUMN 컬럼 …` |
| 한 번에 여러 컬럼 | 괄호로 묶어 **가능** | **불가** (하나씩) |
| DEFAULT 설정 | `MODIFY`로 가능 | `ALTER COLUMN`으로 **불가** — DEFAULT 제약을 따로 추가 |

```sql
-- Oracle
ALTER TABLE 사원 MODIFY (이름 VARCHAR2(50) NOT NULL);

-- SQL Server : 자료형과 기본값을 한 문장에 담을 수 없다
ALTER TABLE 사원 ALTER COLUMN 이름 VARCHAR(50) NOT NULL;
ALTER TABLE 사원 ADD CONSTRAINT DF_사원_이름 DEFAULT '미정' FOR 이름;
```

---

## 14. VIEW

VIEW는 데이터를 복사해 두지 않는다. 조회 SQL 문장만 데이터 딕셔너리에 저장해 두고, 호출될 때 그 쿼리를 대신 실행한다. 자주 쓰는 검색 조건을 즐겨찾기로 저장해 둔 것과 같다. 링크만 있고 내용은 원본에 있는 셈이다. 이걸 조금 유식한 말로 **가상 테이블**이라고 한다.

```sql
CREATE VIEW V_영업사원 AS
SELECT 사원번호, 이름 FROM 사원 WHERE 부서번호 = 10;
```

| 항목 | VIEW | 구체화된 뷰(Materialized View) |
| :--- | :--- | :--- |
| 실제 데이터 | 저장하지 않음 | **저장함** |
| 인덱스 | 뷰 자체에는 생성 불가 | 생성 가능 |
| 최신성 | 항상 원본 그대로 | 갱신 주기에 따라 다름 |

■ DML은 **단일 테이블 기반의 단순 뷰**에서만 가능하다. 조인·집계·`GROUP BY`·`DISTINCT`가 들어간 복합 뷰는 어느 원본 행을 바꿀지 정할 수 없어서 제한된다.
○ 뷰의 장점은 독립성(원본 구조 변경을 흡수), 편리성(복잡한 쿼리 재사용), 보안성(필요한 컬럼만 노출)으로 정리해 두면 된다.

---

## 15. DCL — 권한

```sql
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

<br>

### 롤(ROLE)

권한을 묶어놓은 꾸러미다. 사용자마다 권한을 일일이 주는 수고를 덜어준다.

| 롤 | 내용 |
| :--- | :--- |
| `CONNECT` | DB 접속 관련 권한 |
| `RESOURCE` | 테이블 등 자원 **생성** 권한 |
| `DBA` | 전체 관리 권한 |

```sql
GRANT CONNECT, RESOURCE TO 유저;
REVOKE CONNECT FROM 유저;
```

---

## 16. 모델링 · 관계 대수 (1과목)

### 16-1. 무결성 4가지

| 종류 | 내용 |
| :--- | :--- |
| **개체 무결성** | 기본키는 **NULL 불가 + 중복 불가** |
| 참조 무결성 | 외래키는 부모의 기본키 값이거나 NULL |
| 도메인 무결성 | 컬럼 값이 정의된 자료형·범위 안에 있어야 함 |
| 사용자 정의 무결성 | 업무 규칙에 따른 제약 |

■ 시험에서 "개체 무결성"이 나오면 곧바로 **Primary Key**를 떠올리면 된다.

○ 제약조건 다섯 가지의 중복·NULL 허용 여부는 13-1 표로 옮겼다. 무결성은 "무엇을 지키려는가", 제약조건은 "어떻게 지키는가"로 짝지어 보면 된다.

<br>

### 16-2. 식별자

| 분류 기준 | 종류 |
| :--- | :--- |
| 대표성 | 주식별자 / 보조식별자 |
| 생성 여부 | **본질식별자**(업무에서 나옴) / **인조식별자**(시스템이 부여) |
| 속성 수 | 단일식별자 / 복합식별자 |
| 범위 | 내부식별자 / 외부식별자(FK) |

■ 본질식별자든 인조식별자든 식별자인 이상 **중복·NULL은 허용되지 않는다.**
■ 다만 인조식별자(시퀀스 등)는 시스템이 값을 자동 부여하므로, **내용이 똑같은 중복 레코드가 들어갈 수 있다.** 그래서 별도의 중복 방지 로직(UNIQUE 제약 등)이 필요하다.

<br>

### 16-3. 엔터티 / 속성 분류

| 대상 | 기준 | 종류 |
| :--- | :--- | :--- |
| 엔터티 | 유무형 | 유형 / 개념 / 사건 |
| 엔터티 | 발생 시점 | 기본(키) / 중심 / 행위 |
| **속성** | 특성 | **기본 / 설계 / 파생** |
| 속성 | 구성 방식 | PK / FK / 일반 |

<br>

### 16-4. 관계 대수

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

<br>

### 16-5. 표기법

| 표기법 | 식별 관계 | 비식별 관계 |
| :--- | :--- | :--- |
| **Barker** | 관계선에 **막대(`|`)** 표시 | 막대 없음 |
| IE(까마귀발) | **실선** | **점선** |

---

## 17. 자주 틀리는 함정 모음

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
| 19 | 테이블 N개 조인 | 조인 조건 **최소 N-1개**, 부족하면 카티션 곱 |
| 20 | `(+)` 방향 | 기호가 **붙지 않은** 쪽이 기준 테이블 |
| 21 | `(+)`로 FULL OUTER JOIN | **불가**. ANSI `FULL OUTER JOIN`이나 UNION |
| 22 | `USING` 컬럼에 접두사 | **불가**. `NATURAL JOIN`도 동일 |
| 23 | `LEVEL` | 절대 깊이 아님. `START WITH` 기준 **상대 깊이** |
| 24 | `PARTITION BY` | 행이 **줄지 않음**. 줄어드는 건 `GROUP BY` |
| 25 | DDL 롤백 | Oracle 불가 / SQL Server는 `BEGIN TRANSACTION` 안에서 가능 |
| 26 | SQL Server `ALTER COLUMN` | 한 번에 하나, **DEFAULT 설정 불가** |
| 27 | VIEW | 데이터·인덱스 없음. 복합 뷰는 DML 제한 |

---

## 18. 마지막 점검 순서

시험 직전에는 이 순서로 훑는 것이 좋다.

1. 0번 실행 순서 그림 → 별칭 · ROWNUM · 윈도우 함수 문제가 한 번에 풀린다
2. 2-2 조인 조건 개수와 2-3 `(+)` 방향
3. 2-4 조건을 ON에 두는지 WHERE에 두는지
4. 1-3 DECODE와 CASE의 NULL 차이
5. 4번 집합 연산자 표 (정렬 · 중복)
6. 5-1 ROLLUP N+1 / CUBE 2ᴺ
7. 6-1 PARTITION BY와 GROUP BY의 행 수 차이
8. 6-2 순위 함수 세 줄짜리 예시 표
9. 8-3 PRIOR 방향
10. 12-2 두 DBMS의 커밋 기본값
11. 17번 함정 모음
