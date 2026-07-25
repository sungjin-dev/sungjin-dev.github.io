---
title: " [SQLD 단권화 #7] SQL 활용"
excerpt: "서브쿼리, 집합 연산자, 그룹·윈도우 함수, Top N, PIVOT"
categories: [sql]
order: 7
tags:
  - SQP
toc: true
toc_sticky: true
---

# [SQLD 단권화 #7] SQL 활용 — 서브쿼리, 집합 연산자, 그룹·윈도우 함수, Top N, PIVOT

> SQLD 2과목 2장 — 서브쿼리와 뷰, UNION 계열, ROLLUP/CUBE, 윈도우 함수, Top N, PIVOT/UNPIVOT, 정규표현식

2과목에서 문제 수가 가장 많은 장이다. 양은 많지만 각 개념이 독립적이라 하나씩 격파하면 된다.

---

## 1. 서브쿼리

**쿼리 안의 쿼리.** 바깥이 메인쿼리, 괄호 안이 서브쿼리(부질의)다.

### 동작 방식에 따른 분류

**연관 서브쿼리** — 메인쿼리의 행을 읽을 때마다 서브쿼리가 실행됨 (서브쿼리 안에서 메인쿼리의 별칭을 참조하는 게 특징):

```sql
-- 자기 부서 평균보다 급여가 높은 사원
SELECT ENAME, DEPTNO, SAL
FROM EMP E1
WHERE SAL > (SELECT AVG(SAL) FROM EMP E2
             WHERE E1.DEPTNO = E2.DEPTNO);  -- ← E1 참조 = 연관
```

**비연관 서브쿼리** — 독립적으로 딱 한 번 실행:

```sql
SELECT ENAME, SAL FROM EMP
WHERE SAL > (SELECT AVG(SAL) FROM EMP);
```

### 반환 형태에 따른 분류

| 종류 | 반환 | 사용 연산자 |
| --- | --- | --- |
| 단일행 | 1행 | =, >, <, >=, <=, <> |
| 다중행 | 여러 행 | **IN, ANY, ALL, EXISTS** |
| 다중칼럼 | 여러 컬럼 | (컬럼1, 컬럼2) IN (...) |

```sql
-- 다중행: NEW YORK에 있는 부서의 사원들
WHERE DEPTNO IN (SELECT DEPTNO FROM DEPT WHERE LOC = 'NEW YORK');

-- 다중칼럼: SMITH와 같은 직무+부서인 사원들
WHERE (JOB, DEPTNO) IN (SELECT JOB, DEPTNO FROM EMP WHERE ENAME = 'SMITH');
```

### 위치에 따른 이름 (위치별 명칭 매칭 문제 출제)

| 위치 | 이름 |
| --- | --- |
| SELECT 절 | **스칼라 서브쿼리** |
| FROM 절 | **인라인 뷰** |
| WHERE / HAVING 절 | 일반 서브쿼리 |

```sql
-- 인라인 뷰: FROM 절에서 임시 테이블처럼 사용
SELECT E.ENAME, E.SAL, A.AVG_SAL
FROM EMP E,
     (SELECT AVG(SAL) AS AVG_SAL FROM EMP) A
WHERE E.SAL > A.AVG_SAL;
```

INSERT/UPDATE/DELETE 안에서도 서브쿼리를 쓸 수 있다:

```sql
UPDATE EMP
SET SAL = SAL * 1.1
WHERE DEPTNO = (SELECT DEPTNO FROM DEPT WHERE DNAME = 'SALES');
```

### 뷰(VIEW)

실제 데이터는 없고 **SQL문만 저장**하는 가상 테이블.

```sql
CREATE VIEW EMP_DEPT_V AS
SELECT E.EMPNO, E.ENAME, D.DNAME, E.SAL
FROM EMP E, DEPT D
WHERE E.DEPTNO = D.DEPTNO;

SELECT * FROM EMP_DEPT_V WHERE SAL > 2000;  -- 테이블처럼 사용
```

장점: 복잡한 쿼리 단순화, **보안 강화**(필요한 컬럼만 노출), 데이터 독립성, 다양한 관점 제공.

---

## 2. 집합 연산자

두 SELECT 결과를 세로로 합치거나 비교한다.

| 연산자 | 의미 | 중복 |
| --- | --- | --- |
| **UNION** | 합집합 | **제거** |
| **UNION ALL** | 합집합 | **포함** (그래서 더 빠름) |
| **INTERSECT** | 교집합 | — |
| **MINUS**(Oracle) / **EXCEPT**(SQL Server) | 차집합 | — |

### 사용 조건 4가지 (출제 포인트)

1. 각 SELECT의 **칼럼 수가 동일**해야 한다
2. 대응 칼럼의 **데이터 타입이 호환**되어야 한다
3. 결과 칼럼명은 **첫 번째 SELECT**를 따른다
4. **ORDER BY는 전체 결과에 대해 마지막에 한 번만**

---

## 3. 그룹 함수 — ROLLUP, CUBE, GROUPING SETS

GROUP BY에 붙여서 소계·총계를 자동으로 만든다.

```sql
SELECT DEPTNO, JOB, SUM(SAL)
FROM EMP
GROUP BY ROLLUP(DEPTNO, JOB);
```

| 함수 | 만들어지는 집계 |
| --- | --- |
| **ROLLUP(A, B)** | (A,B) 조합 + A별 소계 + 총계 — **계층적** |
| **CUBE(A, B)** | (A,B) + A별 + **B별** + 총계 — **모든 조합** |
| **GROUPING SETS** | **원하는 집계만** 골라서 지정 |

> 암기: ROLLUP은 계단식(계층), CUBE는 전부 다, GROUPING SETS는 골라 담기.

### GROUPING 함수

해당 칼럼이 집계에 사용됐으면 **0**, 소계/총계 행이면 **1**을 반환한다. 총계 행에 이름을 붙일 때 쓴다:

```sql
SELECT
    CASE GROUPING(DEPTNO) WHEN 1 THEN '전체 부서' ELSE TO_CHAR(DEPTNO) END AS DEPTNO,
    CASE GROUPING(JOB)    WHEN 1 THEN '전체 직무' ELSE JOB END AS JOB,
    SUM(SAL) AS TOTAL_SALARY
FROM EMP
GROUP BY ROLLUP(DEPTNO, JOB);
```

Oracle에서는 DECODE로도 같은 걸 할 수 있다: `DECODE(GROUPING(DEPTNO), 1, '전체 부서', TO_CHAR(DEPTNO))`

---

## 4. 윈도우 함수

집계 함수는 행을 뭉개서 하나로 만들지만, **윈도우 함수는 행을 그대로 유지하면서 계산 결과를 열로 추가**한다. 이게 결정적 차이다.

### 기본 구문

```sql
윈도우함수(인자) OVER (
    [PARTITION BY 칼럼]   -- 계산을 적용할 그룹
    [ORDER BY 칼럼]       -- 그룹 내 순서
    [ROWS | RANGE ...]    -- 프레임(계산 범위)
)
```

> PARTITION BY가 없고 ORDER BY만 있으면 **전체 행을 하나의 그룹**으로 본다.

### 순위 함수 3형제 — 차이가 시험 포인트

급여가 `3000, 3000, 2500`일 때:

| 함수 | 결과 | 특징 |
| --- | --- | --- |
| **ROW_NUMBER()** | 1, 2, 3 | 동점이어도 순차 번호 |
| **RANK()** | 1, 1, **3** | 동순위 후 건너뜀 |
| **DENSE_RANK()** | 1, 1, **2** | 동순위 후 안 건너뜀 |

```sql
SELECT ENAME, SAL, RANK() OVER (ORDER BY SAL DESC) AS RANK_SAL FROM EMP;
```

### 집계형 윈도우 함수

```sql
-- 행을 유지하면서 부서별 합계를 옆에 붙임
SELECT ENAME, DEPTNO, SAL,
       SUM(SAL) OVER (PARTITION BY DEPTNO) AS DEPT_SUM
FROM EMP;
```

AVG, MAX, MIN도 같은 패턴이다.

### 행 이동 함수 — LAG / LEAD

- **LAG()**: **이전** 행의 값
- **LEAD()**: **다음** 행의 값

| 월 | 매출액 | LAG(매출액) |
| --- | --- | --- |
| 1월 | 100 | **NULL** (이전 달 없음) |
| 2월 | 150 | 100 |
| 3월 | 120 | 150 |

```sql
-- 전월 대비 증감
SELECT 월, 매출액,
       매출액 - LAG(매출액) OVER (ORDER BY 월) AS 증감
FROM 매출;
```

엑셀에서 "한 칸 위 셀 값 가져오기"와 같은 느낌이다. 여기에 SIGN을 씌우면 증가(+1)/감소(-1)만 뽑을 수 있다.

### 누적 함수

- **CUME_DIST()**: 누적 분포 (현재 행 이하 누적 개수 / 전체 행 수)
- **PERCENT_RANK()**: 백분위 순위 ((순위-1) / (전체-1))

---

## 5. Top N 쿼리

### ROWNUM의 함정 (Oracle)

ROWNUM은 쿼리 결과에 1부터 번호를 붙이는 가상 칼럼인데, **정렬 전에 매겨진다**는 게 함정이다.

```sql
-- ❌ 잘못된 방법: ROWNUM을 먼저 자르고 나서 정렬함 → 급여 Top 5가 아님!
SELECT ROWNUM, ENAME, SAL
FROM EMP
WHERE ROWNUM <= 5
ORDER BY SAL DESC;

-- ✅ 올바른 방법: 인라인 뷰로 먼저 정렬한 뒤 ROWNUM 적용
SELECT ROWNUM, E.*
FROM (SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC) E
WHERE ROWNUM <= 5;
```

### DBMS별 Top N

```sql
-- SQL Server
SELECT TOP 5 ENAME, SAL FROM EMP ORDER BY SAL DESC;

-- 표준 SQL (Oracle 12c+, SQL Server 2012+)
SELECT ENAME, SAL FROM EMP ORDER BY SAL DESC
FETCH FIRST 5 ROWS ONLY;
```

### 페이징 (11~20번째 행)

```sql
SELECT *
FROM (
    SELECT ROWNUM AS RN, E.*
    FROM (SELECT * FROM EMP ORDER BY SAL DESC) E
    WHERE ROWNUM <= 20
)
WHERE RN >= 11;
```

---

## 6. 셀프 조인과 계층형 질의

4편에서 다뤘던 내용의 2과목 버전이다. 여기서는 의사 컬럼만 추가로 챙기자.

```sql
SELECT ENAME, EMPNO, MGR, LEVEL,
       LPAD(' ', (LEVEL-1)*2) || ENAME AS ORG_CHART   -- 들여쓰기로 조직도 표현
FROM EMP
START WITH MGR IS NULL
CONNECT BY PRIOR EMPNO = MGR
ORDER SIBLINGS BY ENAME;
```

| 의사 컬럼/키워드 | 의미 |
| --- | --- |
| LEVEL | 계층 깊이 |
| CONNECT_BY_ROOT | 현재 행의 최상위 조상 |
| SYS_CONNECT_BY_PATH | 루트부터 현재까지 경로 문자열 |
| CONNECT_BY_ISLEAF | 리프 노드 여부 (1/0) |

---

## 7. PIVOT / UNPIVOT

- **PIVOT**: 행 → 열 (교차 테이블 만들기)
- **UNPIVOT**: 열 → 행 (원상 복구)

```sql
-- 부서별 × 직무별 사원 수를 가로로 펼치기
SELECT *
FROM (SELECT DEPTNO, JOB FROM EMP)
PIVOT (
    COUNT(*)
    FOR JOB IN ('CLERK' AS CLERK, 'MANAGER' AS MANAGER,
                'ANALYST' AS ANALYST, 'SALESMAN' AS SALESMAN)
)
ORDER BY DEPTNO;
```

포인트: **PIVOT에는 집계 함수가 필수**이고, 펼칠 값들은 IN 절에 미리 명시한다.

---

## 8. 정규표현식

문자열 패턴 검색·추출·변환 도구. 연산자만 정리한다.

| 연산자 | 의미 | 예시 |
| --- | --- | --- |
| `.` | 임의의 한 글자 | 'a.c' → 'abc', 'adc' |
| `\|` | OR | 'a\|b' → 'a' 또는 'b' |
| `*` | 앞 요소 **0회 이상** | 'ab*' → 'a', 'ab', 'abb' |
| `+` | 앞 요소 **1회 이상** | 'ab+' → 'ab', 'abb' ('a'는 ✗) |
| `?` | 앞 요소 0회 또는 1회 | 'ab?' → 'a', 'ab' |
| `{n}` | 정확히 n회 | 'ab{3}' → 'abbb' |
| `{n,}` | n회 이상 | — |

> `*`와 `+`의 차이(0회 이상 vs 1회 이상)가 단골 함정이다.

Oracle에서는 REGEXP_LIKE, REGEXP_REPLACE, REGEXP_SUBSTR 등과 함께 쓴다.

---

## 정리 한 장

1. 서브쿼리 위치별 이름: SELECT=**스칼라**, FROM=**인라인 뷰**. 연관 서브쿼리는 메인쿼리 행마다 실행
2. **UNION ALL이 UNION보다 빠르다**(중복 제거 안 하니까). 집합 연산자는 칼럼 수·타입 일치 필수, ORDER BY는 맨 끝에 한 번
3. **ROLLUP=계층 소계, CUBE=모든 조합, GROUPING SETS=선택**. GROUPING 함수는 소계 행에서 1
4. 윈도우 함수는 **행을 유지**하면서 열을 추가. RANK(건너뜀) vs DENSE_RANK(안 건너뜀)
5. **ROWNUM은 정렬 후에 매겨야 정확** → 인라인 뷰 필수. 표준은 FETCH FIRST n ROWS ONLY
6. PIVOT은 집계 함수 필수, IN 절에 값 명시
7. 정규표현식 `*`=0회 이상, `+`=1회 이상

다음 편이 마지막, **DML·TCL·DDL·DCL**이다.
