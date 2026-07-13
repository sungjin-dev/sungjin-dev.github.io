---
title: " [SQLD 단권화 #6] JOIN 완전정복 "
excerpt: "문장 구조를 4조각으로"
categories: [SQL]
order: 6
tags:
  - SQP
toc: true
toc_sticky: true
---

# [SQLD 단권화 #6] JOIN 완전정복 — 문장 구조를 4조각으로 쪼개서 읽자

> SQLD 2과목 1장 — INNER/OUTER/CROSS JOIN, 등가·비등가, NATURAL/USING, 다중 조인

JOIN은 두 개 이상의 테이블에서 관련된 데이터를 결합해 새로운 결과 집합을 만드는 것이다. 문법이 길어 보이지만, **4개 조각으로 분해해서 읽는 법**만 익히면 어떤 JOIN 쿼리도 무섭지 않다.

---

## 1. JOIN 문장 해부학 — 4조각으로 읽기

```sql
SELECT E.ENAME, D.DNAME
FROM EMP E
INNER JOIN DEPT D
ON E.DEPTNO = D.DEPTNO;
```

| 조각 | 코드 | 의미 |
| --- | --- | --- |
| ① | `FROM EMP E` | EMP 테이블을 쓸 건데, 앞으로 **E**라고 부를게 |
| ② | `INNER JOIN DEPT D` | DEPT 테이블도 쓸 건데, **D**라고 부를게 |
| ③ | `ON E.DEPTNO = D.DEPTNO` | 두 테이블의 DEPTNO가 **같은 행끼리 짝지어라** |
| ④ | `SELECT E.ENAME, D.DNAME` | 짝지어진 결과에서 이 컬럼만 보여줘 |

이해하기 쉬운 순서로 다시 배열하면:

```
1단계: EMP(E)와 DEPT(D)를 준비해
2단계: E.DEPTNO와 D.DEPTNO가 같은 행끼리 짝지어
3단계: 그 결과에서 E.ENAME과 D.DNAME만 뽑아 보여줘
```

`E.`, `D.`를 붙이는 이유: 두 테이블이 합쳐졌으니 "이 컬럼이 어느 테이블 거야?"를 명확히 해야 하기 때문이다.

뼈대 암기:

```sql
SELECT [보여줄 컬럼]
FROM [테이블1] [별칭1]
JOIN [테이블2] [별칭2]
ON [별칭1.컬럼] = [별칭2.컬럼];
```

---

## 2. JOIN의 종류

### INNER JOIN — 교집합

두 테이블에서 **공통된 값을 가진 행만** 반환.

```sql
SELECT E.EMPNO, E.ENAME, D.DNAME
FROM EMP E INNER JOIN DEPT D
ON E.DEPTNO = D.DEPTNO;
```

### LEFT OUTER JOIN — 왼쪽은 다 살린다

**왼쪽 테이블의 모든 행** + 오른쪽의 일치하는 행. 짝이 없으면 **NULL**로 채운다.

```sql
SELECT E.EMPNO, E.ENAME, D.DNAME
FROM EMP E LEFT OUTER JOIN DEPT D
ON E.DEPTNO = D.DEPTNO;
```

여기서 "왼쪽"이란? **JOIN 키워드를 기준으로 물리적으로 왼쪽에 적힌 테이블**이다.

```
FROM [여기가 왼쪽] LEFT OUTER JOIN [여기가 오른쪽]
        EMP                            DEPT
```

SELECT에 뭘 적든 기준은 바뀌지 않는다. SELECT는 이미 합쳐진 결과에서 컬럼을 고르는 것뿐이다.

Oracle 전통 문법에서는 `(+)`를 **부족한 쪽(NULL로 채워질 쪽)**에 붙인다:

```sql
SELECT E.EMPNO, E.ENAME, D.DNAME
FROM EMP E, DEPT D
WHERE E.DEPTNO = D.DEPTNO(+);   -- DEPT 쪽에 (+) → EMP를 다 살리는 LEFT JOIN
```

### RIGHT OUTER JOIN / FULL OUTER JOIN

- **RIGHT**: 오른쪽 테이블의 모든 행 + 왼쪽의 일치하는 행
- **FULL**: 양쪽 모든 행, 짝 없는 곳은 NULL

### CROSS JOIN — 모든 조합 (카티시안 곱)

두 테이블 간의 **모든 행 조합**을 만든다. 결과 행 수 = **두 테이블 행 수의 곱**.

```sql
SELECT E.ENAME, D.DNAME
FROM EMP E CROSS JOIN DEPT D;
```

### 흔한 사고: ON을 빼먹으면 CROSS JOIN이 된다

```sql
SELECT E.ENAME, D.DNAME
FROM EMP E, DEPT D;   -- 조건 없음 → 전부 조합!
```

짝짓기 규칙이 없으니 SQL은 "그냥 다 조합할게"라고 판단한다.

**예상 문제 스타일:** EMP 4행, DEPT 3행일 때 위 쿼리의 결과 행 수는? → **4 × 3 = 12행** ("더한 값"이 아니라 **곱한 값**이다!)

---

## 3. 등가 JOIN vs 비등가 JOIN

- **등가 JOIN (EQUI JOIN)**: `=`로 조인
- **비등가 JOIN (NON-EQUI JOIN)**: `=` 외의 연산자(BETWEEN, >, <)로 조인

```sql
-- 급여 등급 매기기: SAL이 등급의 '범위 안'에 속하는지로 매칭
SELECT E.ENAME, E.SAL, S.GRADE
FROM EMP E JOIN SALGRADE S
ON E.SAL BETWEEN S.LOSAL AND S.HISAL;
```

왜 `=`를 못 쓸까? SALGRADE에는 700~1200 같은 **범위**만 있다. SMITH의 SAL이 800이면 "800"이라는 값 자체는 어디에도 없고, **범위에 속해서** GRADE 1에 매칭되는 것이다. `=`로 짜면 경계값이 아닌 이상 아무것도 매칭되지 않아 결과가 텅 빈다.

---

## 4. NATURAL JOIN과 USING

### NATURAL JOIN — 편하지만 위험한 자동 조인

```sql
SELECT ENAME, DNAME FROM EMP NATURAL JOIN DEPT;
```

**이름이 같은 컬럼 전부**를 자동으로 조인 조건에 넣는다.

**함정**: 만약 두 테이블에 DEPTNO 말고도 우연히 `CREATED_DATE` 같은 동명 컬럼이 하나 더 있다면? 그것까지 같아야 매칭되므로 **결과가 예상보다 훨씬 적게 나오는 사고**가 난다.

### USING — 조인 컬럼을 명시적으로 못박기

```sql
SELECT ENAME, DNAME, DEPTNO
FROM EMP JOIN DEPT USING (DEPTNO);   -- DEPTNO만 조인 조건으로 쓴다
```

NATURAL JOIN의 위험을 해결하는 문법이다.

---

## 5. 3개 이상 테이블 JOIN — 두 개씩 순서대로

```sql
SELECT E.ENAME, D.DNAME, L.CITY
FROM EMP E
JOIN DEPT D      ON E.DEPTNO = D.DEPTNO
JOIN LOCATIONS L ON D.LOC_ID = L.LOC_ID;
```

한 번에 3개가 동시에 합쳐지는 게 아니다. **두 개씩 단계적으로** 진행된다.

```
[1단계] EMP ──(DEPTNO)── DEPT
              ↓
        [EMP+DEPT 임시결과]  ← 이 안에 LOC_ID도 이미 들어있음

[2단계] [EMP+DEPT 임시결과] ──(LOC_ID)── LOCATIONS
              ↓
        [최종 결과]
```

두 번째 ON절에서 `D.LOC_ID`를 쓸 수 있는 이유: DEPT가 1단계 결과에 이미 녹아들어 있어서, 그 안의 컬럼을 계속 참조할 수 있기 때문이다. 별칭들은 조인이 진행될수록 "누적된 하나의 큰 표" 안에 함께 들어있다고 생각하면 된다.

---

## 6. 실무 주의사항

- 카디널리티(유일성)가 **낮은** 컬럼으로 조인하면 결과 행 수가 폭증할 수 있다
- **인덱스가 있는 컬럼**으로 조인해야 성능이 좋다
- 대용량 테이블 조인 시 실행 계획을 확인하고 최적화한다

---

## 정리 한 장

1. JOIN 문장은 4조각으로 읽는다: **테이블① / 테이블② / 짝짓기 규칙(ON) / 보여줄 컬럼(SELECT)**
2. INNER = 교집합, LEFT/RIGHT/FULL OUTER = 한쪽(또는 양쪽) 전부 살리고 빈 곳은 NULL
3. "LEFT"의 기준은 **JOIN 키워드 왼쪽에 적힌 테이블**. Oracle `(+)`는 부족한 쪽에 붙인다
4. **ON 없이 테이블만 나열하면 CROSS JOIN** — 결과는 행 수의 **곱**
5. 비등가 JOIN은 범위 매칭(BETWEEN)에 사용 — 급여 등급이 대표 예시
6. NATURAL JOIN은 동명 컬럼 전부 자동 조인이라 위험 → **USING**으로 명시
7. 다중 조인은 **두 개씩 순서대로** 합쳐진다

다음 편은 2과목의 심화, **서브쿼리·집합 연산자·윈도우 함수**다.
