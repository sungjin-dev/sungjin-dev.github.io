---
title: " [SQLD 단권화 #4] 트랜잭션·NULL·식별자·계층형 모델"
excerpt: "트랜잭션 ACID 등"
categories: [SQL]
tags:
  - SQP
toc: true
toc_sticky: true
---

# [SQLD 단권화 #4] 트랜잭션·NULL·식별자·계층형 모델 — 1과목 마무리

> SQLD 1과목 2장 — 트랜잭션(ACID, 격리 수준), NULL의 모든 것, 본질 vs 인조 식별자, 계층형 데이터 모델

1과목의 나머지 조각들을 모았다. 특히 **NULL과 집계 함수**, **격리 수준별 이상 현상**은 계산·매칭 문제로 반드시 나온다.

---

## 1. 트랜잭션

**트랜잭션** = DB의 상태를 변화시키는 **논리적인 작업 단위**. 여러 SQL문을 하나로 묶어 **"전부 성공" 또는 "전부 실패"** 둘 중 하나로만 처리되게 보장한다.

대표 예시는 **계좌이체**다.

1. A계좌에서 10만원 출금 (UPDATE)
2. B계좌에 10만원 입금 (UPDATE)

출금만 되고 입금이 안 되면 돈이 증발한다. 그래서 둘을 하나의 트랜잭션으로 묶는다.

### ACID — 4대 특성 (매칭 문제 단골)

| 특성 | 의미 |
| --- | --- |
| **원자성(Atomicity)** | 전부 실행되거나 전부 취소 (All or Nothing) |
| **일관성(Consistency)** | 수행 전후로 DB 상태가 일관, 무결성 제약 항상 만족 |
| **고립성(Isolation)** | 실행 중인 트랜잭션에 다른 트랜잭션이 접근 불가 |
| **영속성(Durability)** | 완료된 결과는 장애가 나도 영구 보존 |

### TCL — 트랜잭션 제어 명령어

- **COMMIT**: 작업을 확정(저장)
- **ROLLBACK**: 작업을 취소하고 이전 상태로
- **SAVEPOINT**: 중간 저장 지점을 만들어 **부분 롤백** 가능

```sql
INSERT INTO 계좌 VALUES ('A', -100000);
SAVEPOINT sp1;
INSERT INTO 계좌 VALUES ('B', 100000);

ROLLBACK TO sp1;  -- sp1 지점까지만 롤백 (B 입금만 취소)
-- 또는
COMMIT;           -- 전체 확정
```

---

## 2. 트랜잭션 격리 수준 (Isolation Level)

동시성 문제를 어느 정도 허용할지 정하는 단계다. **낮을수록 빠르지만 정합성 문제가 생긴다.**

1. **READ UNCOMMITTED** — 커밋 안 된 데이터도 읽음
2. **READ COMMITTED** — 커밋된 데이터만 읽음 (대부분 DB의 기본값)
3. **REPEATABLE READ** — 트랜잭션 동안 같은 데이터를 반복 조회해도 같은 결과
4. **SERIALIZABLE** — 완전히 순차 실행처럼 격리 (가장 엄격, 성능 저하 큼)

### 이상 현상 3종

- **Dirty Read**: 커밋되지 않은 데이터를 읽음
- **Non-Repeatable Read**: 같은 행을 두 번 읽었는데 **값이 다름** (UPDATE 때문)
- **Phantom Read**: 같은 조건으로 조회했는데 **없던 행이 생김** (INSERT/DELETE 때문)

### 격리 수준 × 이상 현상 표 (통째로 암기)

| 격리 수준 | Dirty Read | Non-Repeatable Read | Phantom Read |
| --- | --- | --- | --- |
| READ UNCOMMITTED | 발생 | 발생 | 발생 |
| READ COMMITTED | 방지 | **발생** | 발생 |
| REPEATABLE READ | 방지 | 방지 | **발생** |
| SERIALIZABLE | 방지 | 방지 | 방지 |

> 핵심: **REPEATABLE READ는 "있던 행의 값 변경"은 막지만, "새로 생기는 행"까지는 못 막는다.**
> Non-Repeatable Read = 값 변화 문제, Phantom Read = 행 개수 변화 문제.

---

## 3. NULL — 없는 값의 규칙

### NULL의 정의

**NULL = 아직 정의되지 않은 값, 값이 존재하지 않는 상태.**

- NULL ≠ 공백(길이 0인 문자열)
- NULL ≠ 0 (0은 엄연한 값)

### NULL의 연산 규칙

**산술 연산**: NULL이 끼면 결과는 무조건 **NULL**

```
100 + NULL = NULL
NULL * 3   = NULL
```

**비교 연산**: 결과는 항상 **Unknown**

```
NULL = NULL → Unknown
NULL > 0    → Unknown
```

**논리 연산 (3치 논리)** — 아래 두 개가 함정 포인트:

```
TRUE  AND Unknown = Unknown
FALSE AND Unknown = FALSE     ← FALSE가 이김
TRUE  OR  Unknown = TRUE      ← TRUE가 이김
FALSE OR  Unknown = Unknown
NOT Unknown       = Unknown
```

### NULL 처리 함수

| 함수 | 동작 |
| --- | --- |
| **NVL(a, b)** — Oracle | a가 NULL이면 b 반환 (SQL Server는 ISNULL) |
| **NULLIF(a, b)** | a = b면 NULL, 다르면 a 반환 |
| **COALESCE(a, b, c, ...)** | **NULL이 아닌 첫 번째 값** 반환 |

### COALESCE 자세히 보기

```sql
-- 여러 컬럼 중 우선순위대로 값 선택
SELECT COALESCE(휴대폰번호, 집전화번호, 회사전화번호, '연락처 없음') AS 대표연락처
FROM 회원;
```

- 순서대로 검사해서 NULL이 아닌 첫 값을 반환
- **모든 값이 NULL이면 결과도 NULL**
- 내부적으로 CASE문과 동일하게 동작한다:

```sql
COALESCE(A, B, C)
= CASE WHEN A IS NOT NULL THEN A
       WHEN B IS NOT NULL THEN B
       ELSE C END
```

### NVL vs COALESCE (비교 문제 단골)

| 구분 | NVL | COALESCE |
| --- | --- | --- |
| 표준 여부 | Oracle 전용 (비표준) | **ANSI SQL 표준** |
| 인자 개수 | 2개만 | **여러 개 가능** |

---

## 4. 집계 함수와 NULL — AVG의 함정

> **집계 함수는 기본적으로 NULL을 계산에서 제외한다. 단, COUNT(\*)만 예외.**

### COUNT(\*) vs COUNT(컬럼)

```sql
-- 학생 5명, 그중 2명은 점수가 NULL(미응시)
COUNT(*)     -- 5  (NULL 포함 전체 행)
COUNT(점수)  -- 3  (NULL 제외)
```

### AVG의 함정 — 분모가 다르다

점수: `90, 80, NULL, 70, NULL`

- ❌ 틀린 계산: (90+80+70) / **5** = 48
- ✅ AVG의 실제 계산: (90+80+70) / **3** = 80

**분모는 전체 행 수가 아니라 NULL이 아닌 값의 개수**다.

NULL을 0으로 치고 전체 평균을 내고 싶다면 명시적으로 처리한다:

```sql
AVG(COALESCE(점수, 0))  -- NULL을 0으로 바꾼 뒤 전체 5명 기준 평균
```

---

## 5. 본질식별자 vs 인조식별자

> **본질식별자 = 업무에서 원래 있던 값 / 인조식별자 = DB 관리 편의로 인위적으로 만든 값**

| 구분 | 본질식별자 | 인조식별자 |
| --- | --- | --- |
| 생성 방식 | 업무 규칙에서 자연 발생 | 시스템 자동 생성 (시퀀스, Auto Increment) |
| 의미 | 값 자체로 의미 있음 | 의미 없음, 유일성 보장용 |
| 예시 | 주민등록번호, (학번+과목번호) | 주문번호, 회원번호(시퀀스) |

### 핵심 함정: "인조식별자를 PK로 쓰면 끝나는 게 아니다"

수강신청 테이블의 PK를 `수강신청번호`(시퀀스)로만 잡으면:

```sql
수강신청번호 1, 학번 2020001, 과목 DB개론
수강신청번호 2, 학번 2020001, 과목 DB개론   ← 같은 학생이 같은 과목 중복 신청!
```

인조식별자는 그냥 자동 순번이라 **"학번+과목이 겹치면 안 된다"는 업무 규칙을 전혀 막지 못한다.**

해결책:

```sql
UNIQUE (학번, 과목번호)  -- 본질식별자에 UNIQUE 제약을 별도로 건다
```

> **인조식별자를 PK로 쓰더라도, 본질식별자는 UNIQUE 제약으로 반드시 별도 관리해야 한다.**

### 인조식별자가 적합한 3가지 상황

1. 본질식별자가 **컬럼이 너무 많은 복합키**일 때
2. 자식 엔터티로 식별자가 **계속 전이**되어 관리가 복잡할 때
3. 본질식별자 값이 **너무 길어** 인덱스 성능에 영향을 줄 때

### 복합키(Composite Key) 감 잡기

학번만으로도, 과목만으로도 행이 유일하지 않다. **(학번, 과목번호) 조합**이어야 유일하다.

```sql
CREATE TABLE 수강신청 (
    학번     INT,
    과목번호  INT,
    신청일자  DATE,
    PRIMARY KEY (학번, 과목번호)  -- 두 컬럼을 묶어서 PK
);
```

---

## 6. 계층형 데이터 모델

> **한 테이블 안에서 자기 자신을 참조하는 FK를 가지는 구조** = Self-Relationship(재귀관계)

조직도가 대표 예시다:

| 사원번호(PK) | 이름 | 관리자번호(FK) |
| --- | --- | --- |
| 1 | 김대표 | NULL |
| 2 | 이부장 | 1 |
| 3 | 박과장 | 2 |
| 4 | 최사원 | 2 |

관리자번호는 **같은 사원 테이블의 사원번호**를 가리킨다.

### 셀프 조인 — 한 단계(부모-자식)만 조회

같은 테이블을 별칭 두 개로 불러와서, 하나는 "사원 역할", 하나는 "관리자 역할"로 조인한다.

```sql
SELECT E.이름 AS 사원이름, M.이름 AS 관리자이름
FROM 사원 E                              -- E = 사원 역할
JOIN 사원 M ON E.관리자번호 = M.사원번호   -- M = 관리자 역할
```

### 계층형 SQL — 전체 트리를 한 번에 조회

**Oracle 방식:**

```sql
SELECT LEVEL, 사원번호, 이름, 관리자번호
FROM 사원
START WITH 관리자번호 IS NULL          -- 루트(최상위)부터 시작
CONNECT BY PRIOR 사원번호 = 관리자번호  -- 부모→자식 방향으로 타고 내려감
ORDER SIBLINGS BY 이름;               -- 같은 레벨끼리만 정렬
```

| 키워드 | 의미 |
| --- | --- |
| START WITH | 어디서 출발할지 (보통 부모가 NULL인 루트) |
| CONNECT BY PRIOR | 부모→자식 방향으로 계속 연결 |
| LEVEL | 계층 깊이 (루트=1) |
| ORDER SIBLINGS BY | 형제 노드끼리만 정렬 |

**SQL Server 방식 (재귀 CTE):**

```sql
WITH RECURSIVE 조직도 AS (
    -- 앵커: 시작점(루트)
    SELECT 사원번호, 이름, 관리자번호, 1 AS 레벨
    FROM 사원 WHERE 관리자번호 IS NULL
    UNION ALL
    -- 재귀: 자기 자신을 참조하며 한 단계씩 내려감
    SELECT E.사원번호, E.이름, E.관리자번호, O.레벨 + 1
    FROM 사원 E JOIN 조직도 O ON E.관리자번호 = O.사원번호
)
SELECT * FROM 조직도;
```

### 설계 시 고려사항

1. **순환 참조(Cycle) 금지** — A의 관리자가 B, B의 관리자가 A면 무한 루프
2. **루트 노드의 부모키는 NULL**
3. 깊이가 깊어지면 **성능 저하**
4. 해결책: **PATH 컬럼 추가** — `/1/2/4`처럼 경로를 미리 저장해두면 `LIKE '/1/2/%'`로 재귀 없이 하위 조직 전체 조회 가능 (반정규화의 파생 컬럼 사례)

> 한 줄 정리: **셀프 조인 = 한 단계만 / START WITH·CONNECT BY·재귀 CTE = 전체 계층 한 번에**

---

## 정리 한 장

1. 트랜잭션 = "전부 성공 or 전부 실패"의 논리적 작업 단위. **ACID** 4특성 암기
2. 격리 수준 표: **READ COMMITTED은 Non-Repeatable Read부터, REPEATABLE READ는 Phantom Read만 발생**
3. NULL: 산술 연산 결과는 NULL, 비교 결과는 Unknown, `FALSE AND Unknown = FALSE`, `TRUE OR Unknown = TRUE`
4. 집계 함수는 NULL 제외, **COUNT(\*)만 NULL 포함** — AVG의 분모는 NULL 제외 개수
5. 인조식별자를 PK로 써도 **본질식별자에 UNIQUE 제약 필수**
6. 계층형 모델: 자기참조 FK, 셀프 조인, START WITH / CONNECT BY PRIOR / LEVEL

다음 편부터 2과목, **SELECT 문의 기본기**로 들어간다.
