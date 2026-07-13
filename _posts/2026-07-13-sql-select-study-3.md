---
title: " [SQLD 단권화 #1] SELECT 기본기"
excerpt: " 실행 순서와 사용법"
categories: [SQL]
tags:
  - SQP
toc: true
toc_sticky: true
---

# [SQLD 단권화 #5] SELECT 기본기 — 실행 순서만 알면 절반은 끝

> SQLD 2과목 1장 — SELECT/DISTINCT, 함수, WHERE, GROUP BY/HAVING/ORDER BY

2과목의 시작. 이 편의 최종 보스는 딱 하나, **SQL 실행 순서**다. 먼저 외우고 시작하자.

> **F**ROM → **W**HERE → **G**ROUP BY → **H**AVING → **S**ELECT → **O**RDER BY
> 암기: **FWGHSO** ("프럼-웨어-그룹-해빙-셀렉-오더")

---

## 1. SELECT와 DISTINCT

예제로 쓸 EMP 테이블:

| EMPNO | ENAME | JOB | SAL | DEPTNO |
| --- | --- | --- | --- | --- |
| 7369 | SMITH | CLERK | 800 | 20 |
| 7499 | ALLEN | SALESMAN | 1600 | 30 |
| 7521 | WARD | SALESMAN | 1250 | 30 |
| 7566 | JONES | MANAGER | 2975 | 20 |

### ALL vs DISTINCT — 중복 처리의 문제

```sql
SELECT ALL JOB FROM EMP;       -- 중복 다 보여줌 (기본값, 생략 가능)
SELECT DISTINCT JOB FROM EMP;  -- 중복 제거하고 1건씩만
```

### 함정: DISTINCT를 여러 컬럼에 쓸 때

```sql
SELECT DISTINCT JOB, DEPTNO FROM EMP;
```

DISTINCT는 "각 컬럼 따로"가 아니라 **"컬럼 조합 전체"** 기준으로 중복을 제거한다. 그래서 `(MANAGER, 30)`과 `(MANAGER, 10)`은 JOB이 같아도 **둘 다 살아남는다**.

또 하나: **DISTINCT는 합성·연산이 다 끝난 후의 최종 결과값 기준으로 중복을 판단**한다.

### 별칭(ALIAS)

```sql
SELECT EMPNO 사원번호, ENAME AS 사원이름 FROM EMP;  -- AS는 생략 가능
```

공백 포함 별칭의 DBMS별 표기 (시험 포인트):

| DBMS | 표기 |
| --- | --- |
| Oracle | 큰따옴표 `"사원 번호"` |
| SQL Server | 대괄호 `[사원 번호]` |

---

## 2. 산술 연산자와 NULL, 문자 합성

### 산술 연산에서 NVL이 왜 필수인가

EMP 테이블의 COMM(커미션)은 영업직만 있고 관리자는 NULL이다.

```sql
SELECT ENAME, (SAL + NVL(COMM, 0)) AS TOTAL_COMP FROM EMP;
```

NVL 없이 `SAL + COMM`을 하면?

```
SAL(2975) + COMM(NULL) = NULL   ← 총액이 통째로 NULL!
```

**NULL이 포함된 산술 연산의 결과는 무조건 NULL**이기 때문에, `NVL(COMM, 0)`으로 먼저 0 처리를 해야 한다.

참고로 나머지 연산은 Oracle에서 `%`가 아니라 **MOD 함수**를 쓴다.

### 문자 합성 연산자 — DBMS별 차이 (단골)

| DBMS | 연산자 |
| --- | --- |
| Oracle | `\|\|` (파이프 두 개) |
| SQL Server | `+` |
| 공통(표준) | `CONCAT()` 함수 |

```sql
-- Oracle
SELECT ENAME || ' is a ' || JOB AS EMPLOYEE_INFO FROM EMP;
-- SQL Server
SELECT ENAME + ' is a ' + JOB AS EMPLOYEE_INFO FROM EMP;
```

---

## 3. 주요 함수 — 함정 위주로

함수는 **단일행 함수**(행마다 결과 1개)와 **다중행 함수**(여러 행을 집계)로 나뉜다.

### 문자형 함수

| 함수 | 예시 | 결과 |
| --- | --- | --- |
| LOWER / UPPER | UPPER('hello') | 'HELLO' |
| **SUBSTR** | SUBSTR('Hello World', 1, 5) | 'Hello' |
| LENGTH | LENGTH('Hello World') | 11 |
| TRIM / LTRIM / RTRIM | TRIM(' Hi ') | 'Hi' |
| CONCAT | CONCAT('Hello', ' World') | 'Hello World' |

> 💡 SUBSTR에 음수 위치를 주면 뒤에서부터 센다: `SUBSTR('Hello World', -5)` → 'World'

### 숫자형 함수 — 함정 3대장

**① ROUND vs TRUNC**

```sql
ROUND(3.148, 2)  → 3.15   -- 반올림 판단 있음 (5 이상 올림)
TRUNC(3.148, 2)  → 3.14   -- 판단 없이 무조건 자름
```

**② CEIL vs FLOOR — 음수 함정 주의**

```sql
CEIL(4.3)    → 5
FLOOR(4.7)   → 4
CEIL(-4.3)   → -4   -- 주의! -5 아님 (-4.3보다 크거나 같은 최소 정수)
FLOOR(-4.3)  → -5   -- 주의! -4 아님 (-4.3보다 작거나 같은 최대 정수)
```

**③ SIGN — 부호만 반환**

```sql
SIGN(-10), SIGN(0), SIGN(10)  →  -1, 0, 1
```

손익 분류나 증감 방향 판단에 쓴다:

```sql
SELECT 월, 매출액,
       SIGN(매출액 - LAG(매출액) OVER (ORDER BY 월)) AS 증감방향  -- +1/-1/0
FROM 매출;
```

> 💡 LAG = "정렬했을 때 바로 이전 행의 값"을 가져오는 윈도우 함수. 첫 행은 이전 행이 없어서 NULL이 된다. 자세한 건 7편에서.

### 날짜형/변환형 함수

| 함수 | 용도 |
| --- | --- |
| SYSDATE | 현재 날짜·시각 |
| ADD_MONTHS / MONTHS_BETWEEN | 개월 더하기 / 두 날짜 간 개월 수 |
| LAST_DAY / NEXT_DAY | 그 달 마지막 날 / 다음 특정 요일 |
| TO_CHAR / TO_DATE / TO_NUMBER | 형 변환 3형제 |
| CAST | 표준 타입 변환 |

### CASE 문 — SQL의 switch문

```sql
-- 간단 CASE (값 매칭)
CASE JOB
    WHEN 'CLERK'    THEN 'Clerk Job'
    WHEN 'MANAGER'  THEN 'Manager Job'
    ELSE 'Other Job'
END

-- 검색 CASE (조건식)
CASE
    WHEN SAL < 1000 THEN 'Low'
    WHEN SAL BETWEEN 1000 AND 3000 THEN 'Medium'
    ELSE 'High'
END
```

프로그래밍의 `switch-case-default`와 구조가 1:1로 같다. `ELSE`가 `default`, `END`가 닫는 괄호다.

---

## 4. WHERE 절

FROM 다음에 위치하며, 조건을 만족하는 행만 걸러낸다.

### 비교 연산자

`=`, `>`, `<`, `>=`, `<=` 그리고 **"같지 않다" 3형제: `<>`, `!=`, `^=`**

### SQL 연산자

```sql
-- 범위
WHERE SAL BETWEEN 1500 AND 3000
-- 목록
WHERE DEPTNO IN (10, 20, 30)
-- 패턴: % = 0글자 이상, _ = 정확히 1글자
WHERE ENAME LIKE 'S%'      -- S로 시작
WHERE ENAME LIKE '%R%'     -- R 포함
WHERE ENAME LIKE '_A%'     -- 두 번째 글자가 A
-- NULL 판별
WHERE COMM IS NULL         -- = NULL 은 절대 안 됨!
```

### IS NULL vs ISNULL — 이름만 비슷한 남남

| 구분 | 정체 |
| --- | --- |
| `IS NULL` | **조건문**. NULL인지 판별 |
| `ISNULL(A, B)` | **함수**(SQL Server). A가 NULL이면 B — Oracle의 NVL과 동일 |

NULL은 "값"이 아니라 "값이 없다는 상태"라서 `=`로 비교할 수 없고, `IS`라는 전용 문법으로만 확인한다.

### 논리 연산자와 우선순위

우선순위: **괄호 → 산술 → 문자열 → 비교/SQL → NOT → AND → OR**

AND가 OR보다 먼저 계산되므로, 의도가 섞이면 반드시 괄호를 쓴다.

```sql
WHERE (SAL > 2000 AND DEPTNO = 10) OR (SAL BETWEEN 1500 AND 3000)
```

### 기타 팁

```sql
-- 이스케이프: %나 _ 자체를 검색할 때
WHERE FILE_NAME LIKE 'report\%2024%' ESCAPE '\';

-- WHERE 1=1: 동적 쿼리에서 모든 조건 앞에 AND를 붙일 수 있게 하는 트릭
SELECT * FROM EMP
WHERE 1=1
  AND SAL > 2000
  AND DEPTNO = 10;
```

---

## 5. GROUP BY / HAVING / ORDER BY

### 집계 함수 5형제

SUM, AVG, COUNT, MAX, MIN — **NULL 처리 규칙은 4편 참고** (COUNT(\*)만 NULL 포함!)

### GROUP BY

```sql
SELECT DEPTNO, SUM(SAL) AS TOTAL_SAL, AVG(SAL) AS AVG_SAL
FROM EMP
GROUP BY DEPTNO;
```

주의사항 두 가지 (출제 포인트):
- **GROUP BY 절에서는 ALIAS를 쓸 수 없다** (SELECT보다 먼저 실행되니까!)
- SELECT에는 **GROUP BY에 있는 컬럼 + 집계 함수만** 올 수 있다

### HAVING — 그룹에 대한 조건

```sql
SELECT DEPTNO, AVG(SAL)
FROM EMP
WHERE SAL >= 1000           -- ① 그룹화 전: 개별 행 필터 (집계 함수 사용 불가)
GROUP BY DEPTNO
HAVING AVG(SAL) > 2000;     -- ② 그룹화 후: 그룹 필터 (집계 함수 사용 가능)
```

| 구분 | WHERE | HAVING |
| --- | --- | --- |
| 시점 | 그룹화 **전** | 그룹화 **후** |
| 대상 | 개별 행 | 그룹 |
| 집계 함수 | 사용 불가 | 사용 가능 |

### ORDER BY

```sql
SELECT ENAME, JOB, SAL, DEPTNO
FROM EMP
ORDER BY DEPTNO ASC, SAL DESC;  -- 부서 오름차순, 같은 부서 안에선 급여 내림차순
```

ASC는 기본값이라 생략 가능. ORDER BY는 **실행 순서상 가장 마지막**이라서 SELECT의 별칭을 쓸 수 있다.

---

## 정리 한 장

1. 실행 순서 **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY** — GROUP BY에 별칭 못 쓰는 이유, ORDER BY에 별칭 쓸 수 있는 이유가 전부 여기서 나온다
2. DISTINCT는 **컬럼 조합 전체** 기준, **최종 결과값** 기준으로 중복 제거
3. NULL이 낀 산술 연산은 NULL → `NVL(COMM, 0)` 패턴 필수
4. 문자 합성: Oracle `||`, SQL Server `+`, 표준 `CONCAT()`
5. ROUND는 반올림, TRUNC는 무조건 자르기 / CEIL·FLOOR는 **음수에서 함정**
6. NULL 판별은 `IS NULL`만 가능. `= NULL`은 Unknown
7. WHERE는 그룹화 전 행 필터, HAVING은 그룹화 후 그룹 필터

다음 편은 테이블 두 개 이상을 붙이는 기술, **JOIN**이다.
