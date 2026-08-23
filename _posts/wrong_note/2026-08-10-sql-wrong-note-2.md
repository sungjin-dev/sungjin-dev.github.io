---
title: "[SQLD] 오답노트2"
permalink: /sql/wrong-note-part2/
categories: [SQL]
tags:
  - sql
toc: true
toc_sticky: true
mermaid: true
---

### 📝 Q08. 다음 SQL의 결과는 무엇인가? [NOT IN과 NULL]

[EMPLOYEE] 테이블
| EMP_NAME | BONUS |
| :--- | :--- |
| 김지훈 | NULL |
| 이수민 | 300 |
| 박준형 | 400 |
| 정유진 | 200 |

```sql
SELECT COUNT(BONUS) AS CNT
FROM EMPLOYEE
WHERE BONUS NOT IN (NULL, 300);
```

① 1  
② 2  
③ 3  
④ 0  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - `NOT IN` 조건절에 `NULL`이 포함되면, 비교 결과가 불확실(UNKNOWN)해져 어떤 값도 이 조건을 만족하지 못하게 된다.
  - 따라서 `WHERE BONUS NOT IN (NULL, 300)`은 모든 행을 제외 처리하게 되며, `COUNT(BONUS)`의 조건을 만족하는 행이 존재하지 않아 결과는 **0**이 반환된다.

</div>
</details>

---

### 📝 Q14. 다음 중 출력 결과가 다른 하나는? [날짜 조건 조회]

① `TO_CHAR(ISSUE_DT, 'YYYYMMDDHH24') = '2024012013'`  
② `TO_CHAR(ISSUE_DT, 'YYYYMMDD') = '20240120' AND TO_CHAR(ISSUE_DT, 'HH24') = '13'`  
③ `ISSUE_DT >= TO_DATE('20240120130000') AND ISSUE_DT <= TO_DATE('20240120135959')`  
④ `ISSUE_DT = TO_DATE('20240120130000') OR ISSUE_DT = TO_DATE('20240120135959')`  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - ①, ②, ③번 보기는 모두 2024년 1월 20일 13시 00분 00초부터 13시 59분 59초까지 **1시간 전체 구간 범위**의 데이터를 조회한다.
  - 반면 ④번 보기는 `OR` 조건과 `=` 연산자를 사용하였으므로, 13시 0분 0초 또는 13시 59분 59초라는 **정확한 두 시점(특정 시점)의 데이터만** 조회한다.

</div>
</details>

---

### 📝 Q10. 다음은 주문 테이블의 구조이다. 아래 SQL에 대한 설명으로 올바른 것은? [COUNT 함수와 NULL]

[주문]
- `# 주문ID` (PK)
- `* 고객ID` (NN)
- `* 상품ID` (NN)
- `o 주문일시`

```sql
SELECT 고객ID, COUNT(*), COUNT(상품ID)
FROM 주문
GROUP BY 고객ID;
```

① 두 COUNT 결과는 항상 같다.  
② 상품ID는 NULL 허용 컬럼이다.  
③ COUNT(*)는 NULL을 제외한다.  
④ 오류가 발생한다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - `상품ID` 컬럼 표기의 `*`는 NOT NULL 속성을 의미하므로 항상 값이 존재한다.
  - `COUNT(*)`는 테이블의 전체 행 수를 세고, `COUNT(상품ID)`는 `상품ID`가 NULL이 아닌 행 수를 센다.
  - `상품ID`에는 NULL이 존재하지 않으므로, 두 `COUNT` 결과는 **항상 같다**.

</div>
</details>

---

### 📝 Q11. 다음은 학생 테이블이다. SQL 실행 결과로 옳은 것은? [NULL과 산술 연산]

[학생] 테이블
| 학생ID | 국어 | 수학 | 영어 |
| :--- | :--- | :--- | :--- |
| S001 | 80 | 90 | 100 |
| S002 | 70 | NULL | 90 |
| S003 | NULL | NULL | NULL |

```sql
SELECT 학생ID, AVG(국어 + 수학 + 영어)
FROM 학생
GROUP BY 학생ID;
```

① S001 : 270, S002 : NULL, S003 : NULL  
② 오류 발생  
③ S001 : 75, S002 : 30, S003 : 95  
④ S001 : 90, S002 : NULL, S003 : NULL  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - `국어 + 수학 + 영어` 표현식은 산술 연산이므로, 더하는 값 중 **단 하나라도 NULL이 포함되면 결과는 NULL**이 된다.
  - S001: (80 + 90 + 100) / 3 = 90
  - S002: 수학이 NULL이므로 `국어 + 수학 + 영어` 결과가 NULL ➔ AVG(NULL) = NULL
  - S003: 전부 NULL이므로 결과는 NULL
  - 따라서 결과는 **S001 : 90, S002 : NULL, S003 : NULL** (보기의 ④번) 형태가 된다.

</div>
</details>

---

### 📝 Q04. 다음 SQL 실행 결과에서 NULL 값이 가장 마지막에 출력되도록 하는 쿼리는? (단, Oracle 기준이다.)

```sql
SELECT MOVIE_NAME, TICKET_PRICE
FROM MOVIE_INFO
( A );
```

① ORDER BY TICKET_PRICE DESC  
② ORDER BY TICKET_PRICE ASC LAST NULLS  
③ ORDER BY TICKET_PRICE ASC  
④ ORDER BY TICKET_PRICE DESC NULLS FIRST  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - Oracle에서는 정렬 시 `NULL`을 가장 큰 값(무한대)으로 인식한다.
  - 따라서 기본 오름차순 정렬(`ORDER BY TICKET_PRICE ASC`)을 적용하면 `NULL` 값이 **가장 마지막**에 출력된다.

</div>
</details>

---

### 📝 Q03. Oracle에서 OUTER JOIN을 사용할 때 (+) 기호의 의미로 옳은 것은?

① 기준 테이블의 모든 데이터를 제외한다.  
② (+)는 기준 테이블이 조인 조건에 일치하지 않으면 NULL을 반환한다.  
③ (+)는 기준 테이블이 조인 조건에 일치하지 않은 데이터도 출력한다.  
④ 모든 행이 반드시 양쪽에서 존재해야 한다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - Oracle 전용 OUTER JOIN 문법에서 `(+)` 기호는 **데이터가 부족한(NULL로 채워질) 상대 테이블 측 조건**에 붙인다.
  - `(+)`가 붙지 않은 쪽이 기준 테이블이 되며, 조인 조건에 일치하지 않는 데이터도 생략되지 않고 모두 출력된다.

</div>
</details>

---

### 📝 Q06. 다음 SQL의 결과로 옳은 것은? [Oracle OUTER JOIN의 일반 조건 위치]

[회원] 테이블
| 회원ID | 이름 |
| :--- | :--- |
| A0001 | 홍길동 |
| A0002 | 김영희 |
| A0003 | 이철수 |

[회원연락처] 테이블
| 회원ID | 구분코드 | 연락처 |
| :--- | :--- | :--- |
| A0001 | 휴대폰 | 010-1111-1111 |
| A0002 | 집전화 | 02-1234-5678 |
| A0004 | 휴대폰 | 010-4444-4444 |

```sql
SELECT A.회원ID, B.연락처
FROM 회원 A, 회원연락처 B
WHERE A.회원ID = B.회원ID(+)
  AND B.구분코드 = '휴대폰';
```

① 1건 - A0001만 출력됨  
② 2건 - A0001, A0002 출력됨  
③ 3건 - 모든 회원(A) 정보가 출력됨 (A0001, A0002, A0003)  
④ 0건 - 아무것도 출력되지 않음  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - 조인 조건(`A.회원ID = B.회원ID(+)`)에는 `(+)`를 붙였으나, 추가 검색 조건인 `AND B.구분코드 = '휴대폰'`에는 `(+)`를 붙이지 않았다.
  - Oracle에서 OUTER JOIN 시 일반 조건에 `(+)`를 붙이지 않으면, OUTER JOIN이 **INNER JOIN으로 변환**되어 동작한다.
  - 따라서 두 조건(`회원ID` 일치 AND `구분코드 = '휴대폰'`)을 모두 만족하는 **A0001 (1건)**만 출력된다.

</div>
</details>

---

### 📝 Q08. 다음 테이블이 있을 때 SQL 실행 시 결과 행 수로 옳은 것은? [FULL OUTER JOIN]

[A] 테이블
| ID | 값 |
| :--- | :--- |
| 1 | A |
| 2 | B |

[B] 테이블
| ID | 값 |
| :--- | :--- |
| 2 | X |
| 3 | Y |

```sql
SELECT A.ID, A.값, B.값
FROM A FULL OUTER JOIN B ON A.ID = B.ID;
```

① 1  
② 2  
③ 3  
④ 4  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - `FULL OUTER JOIN`은 양쪽 테이블의 모든 행을 합쳐서 보여주며, 연결되는 행은 짝을 맞추고 짝이 없는 행은 상대방을 NULL 처리한다.
  - ID = 1 ➔ A엔 있고 B엔 없음 (1건)
  - ID = 2 ➔ A, B 모두 존재하며 조인 성공 (1건)
  - ID = 3 ➔ B엔 있고 A엔 없음 (1건)
  - 결과 행 수는 총 **3행**이 된다.

</div>
</details>

### 📝 Q01. 다음 SQL 실행 결과로 가장 적절한 것은?

```sql
SELECT REGEXP_SUBSTR('123-234-4545-233', '((\d+)-(\d+))-((\d+)-(\d+))', 1, 1, NULL, 4)
FROM DUAL;
```

① 4545  
② 4545-233  
③ 234  
④ 233  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - `REGEXP_SUBSTR`의 6번째 파라미터(`subexpr`)는 서브그룹(괄호)의 인덱스 번호를 지정합니다.
  - 서브그룹 번호는 패턴 내에서 **'여는 괄호`(`가 나오는 순서'**대로 부여됩니다.
    - `((\d+)-(\d+))-((\d+)-(\d+))`
    - 그룹①: `((\d+)-(\d+))` → `123-234`
    - 그룹②: `(\d+)` → `123`
    - 그룹③: `(\d+)` → `234`
    - **그룹④: `((\d+)-(\d+))` → `4545-233`**
    - 그룹⑤: `(\d+)` → `4545`
    - 그룹⑥: `(\d+)` → `233`
  - 따라서 4번째 서브그룹인 `4545-233`이 반환됩니다.

</div>
</details>

---

### 📝 Q02. 다음 중 ORDER BY 절에 대한 설명으로 가장 부적절한 것은?

① GROUP BY 절을 사용하는 경우 ORDER BY 절에 집계 함수를 사용할 수도 있다.  
② ORDER BY 절에서 컬럼명 대신 Alias 명이나 컬럼 순서를 나타내는 정수도 사용이 가능하나, 이들을 혼용하여 사용할 수 없다.  
③ DBMS마다 NULL 값에 대한 정렬 순서가 다를 수 있으므로 주의하여야 한다.  
④ SQL 문장으로 조회된 데이터들을 다양한 목적에 맞게 특정 컬럼을 기준으로 정렬하는데 사용한다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - `ORDER BY` 절에서는 컬럼명, 표현식, Alias명, SELECT 절의 컬럼 순서를 나타내는 정수를 **자유롭게 혼용하여 사용**할 수 있습니다. (예: `ORDER BY name, 3 DESC`)
  - Oracle은 `ASC` 정렬 시 `NULL`을 맨 뒤(NULLS LAST)에 정렬하고, SQL Server는 맨 앞(NULLS FIRST)에 정렬합니다.

</div>
</details>

---

### 📝 Q03. 다음 EMP 테이블에 대하여 아래 SQL 문을 실행했을 때의 결과로 올바른 것은?

> **[EMP 테이블]**
> 
> | EMPNO | ENAME | MGR |
> | :---: | :---: | :---: |
> | 7369 | SMITH | 7902 |
> | 7499 | ALLEN | 7698 |
> | 7839 | KING | NULL |
> | 7902 | FORD | 7566 |
> | 7566 | JONES | NULL |

```sql
SELECT *
FROM EMP
WHERE EMPNO NOT IN (SELECT MGR FROM EMP);
```

① EMP 테이블의 모든 행  
② 매니저로 지정되지 않은 직원의 행  
③ 공집합  
④ 오류 발생  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - 서브쿼리 `(SELECT MGR FROM EMP)`의 결과 집합에 `NULL`이 포함되어 있습니다. (`7902, 7698, NULL, 7566`)
  - `NOT IN` 연산은 `EMPNO <> 7902 AND EMPNO <> ... AND EMPNO <> NULL` 형태로 전개됩니다.
  - `NULL`과의 모든 비교 연산은 `UNKNOWN`을 반환하며, `TRUE AND UNKNOWN`의 최종 평가 결과는 항상 `UNKNOWN`(거짓 취급)이 되므로 모든 행이 필터링되어 탈락합니다.
  - 따라서 결과는 아무 행도 반환되지 않는 **공집합**이 됩니다.

</div>
</details>

---

### 📝 Q04. 아래 ERD에 포함된 각 엔터티의 성격 분류에 대한 설명 중 옳지 않은 것은?

> `[서비스]` ───-0< `[서비스이용]` ───-0< `[청구]` ───-0< `[납부]`

① 서비스는 기본 엔터티에 해당한다.  
② 서비스이용은 개념 엔터티에 해당한다.  
③ 청구는 행위 엔터티에 해당한다.  
④ 납부는 행위 엔터티에 해당한다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **기본 엔터티:** 업무에 원래 존재하는 독립적인 엔터티 (`서비스`)
  - **행위 엔터티:** 둘 이상의 엔터티로부터 지속적으로 생성·누적되는 엔터티 (`서비스이용`, `청구`, `납부`)
  - `서비스이용`은 사용자의 사용 행위에 의해 계속해서 발생하는 **행위 엔터티(Action Entity)** 또는 사건 엔터티에 해당하므로 개념 엔터티로 분류한 ②번은 옳지 않습니다.

</div>
</details>

---

### 📝 Q05. 피터 첸(Peter Chen)의 ERD 표기법에서 '관계(Relationship)'를 나타내는 도형은?

① □ (사각형)  
② ◇ (마름모)  
③ ○ (원/타원)  
④ △ (삼각형)  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **직사각형(Rectangle):** 엔터티 (Entity)
  - **마름모(Diamond):** 관계 (Relationship)
  - **원/타원(Ellipse):** 속성 (Attribute)

</div>
</details>

---

### 📝 Q06. 다음 중 주식별자 선정과 가장 관련이 적은 정규화는?

① 1정규화  
② 2정규화  
③ 3정규화  
④ BCNF  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **2정규화**: 복합 주식별자의 일부에 종속되는 **부분 함수 종속성 제거** (주식별자와 직접 연관)
  - **BCNF**: 모든 결정자가 후보키(식별자)가 되도록 분해 (식별자 관련)
  - **3정규화**: 기본키가 아닌 **일반 속성 간의 이행적 함수 종속성(A → B → C)을 제거**하는 과정이므로 주식별자 선정 자체와의 관련성이 가장 적습니다.

</div>
</details>

---

### 📝 Q07. 인조 식별자와 본질 식별자에 대한 설명 중 옳지 않은 것은?

① 본질 식별자는 업무 수행 과정에서 쉽게 파악된다.  
② 본질 식별자는 어떠한 업무 행위 없이도 부여될 수 있다.  
③ 인조 식별자는 본질 식별자가 존재함에도 관리 편의를 위해 별도로 부여될 수 있다.  
④ 본질 식별자는 업무 규칙 변화에 따라 값이 변경될 수 있다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - 업무 행위와 무관하게 시스템 편의를 위해 인위적으로 채번(시퀀스, Auto-increment 등)하여 부여할 수 있는 것은 **인조 식별자(Surrogate Identifier)**의 특징입니다.
  - 본질 식별자(Natural Identifier)는 반드시 실제 업무 프로세스 및 규칙 안에서 도출됩니다.

</div>
</details>

---

### 📝 Q08. 아래 데이터와 SQL의 결과로 올바른 것은?

> **[TAB 테이블]**
> 
> | SAL |
> | :---: |
> | 1000 |
> | 2000 |
> | 3000 |

```sql
SELECT SAL,
       FIRST_VALUE(SAL) OVER (ORDER BY SAL
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS MIN_SAL
FROM TAB;
```

① 1000 / 1000 / 1000  
② 1000 / 2000 / 3000  
③ 3000 / 2000 / 1000  
④ 3000 / 3000 / 3000  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`는 맨 첫 행부터 현재 행까지의 범위를 의미합니다.
  - `FIRST_VALUE(SAL)`는 지정된 프레임 범위 내에서 가장 첫 번째 위치의 값을 반환합니다.
    - 1행(`SAL=1000`): 범위 `1000` 중 첫 번째 값 → `1000`
    - 2행(`SAL=2000`): 범위 `1000 ~ 2000` 중 첫 번째 값 → `1000`
    - 3행(`SAL=3000`): 범위 `1000 ~ 3000` 중 첫 번째 값 → `1000`
  - 따라서 모든 행에 대해 `1000`이 출력됩니다.

</div>
</details>

---

### 📝 Q09. 다음 [A 테이블], [B 테이블]에 대하여 실행 결과가 다른 SQL 문장은?

> **[A 테이블]**
> 
> | ID | NAME |
> | :---: | :---: |
> | 1 | 가 |
> | 2 | 나 |
> | 3 | 다 |
> 
> **[B 테이블]**
> 
> | ID | VAL | FLG |
> | :---: | :---: | :---: |
> | 2 | x | Y |
> | 3 | y | N |

① 
```sql
SELECT * FROM A, B
WHERE A.ID = B.ID(+) AND B.FLG(+) = 'Y';
```
② 
```sql
SELECT * FROM A
LEFT OUTER JOIN B ON (A.ID = B.ID)
WHERE B.FLG = 'Y';
```
③ 
```sql
SELECT * FROM A
LEFT OUTER JOIN B ON (A.ID = B.ID AND B.FLG = 'Y');
```
④ 
```sql
SELECT * FROM A
LEFT OUTER JOIN (SELECT * FROM B WHERE FLG = 'Y') B ON A.ID = B.ID;
```

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - ①, ③, ④번은 `LEFT OUTER JOIN`이 유지되어 A 테이블의 3건(ID: 1, 2, 3)이 모두 출력됩니다.
  - ②번은 조인 후 `WHERE B.FLG = 'Y'` 조건을 평가하므로, B와 조인되지 않아 NULL이 된 행(`NULL = 'Y' → UNKNOWN`)들이 전부 탈락하여 **INNER JOIN처럼 1건(ID: 2)만 출력**됩니다.

</div>
</details>

---

### 📝 Q10. 아래 SQL에서 서브쿼리가 항상 1건 이하만 반환하도록 보장하기 위해 T2.A 컬럼이 가져야 할 제약 조건은?

```sql
SELECT COL2
FROM T1
WHERE COL2 = (SELECT COL2
              FROM T2
              WHERE A = 'A');
```

① UNIQUE  
② NOT NULL  
③ FOREIGN KEY  
④ CHECK  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - 단일행 비교 연산자(`=`)를 사용했으므로 서브쿼리는 반드시 1건 이하(0건 또는 1건)의 결과를 반환해야 합니다. (2건 이상 반환 시 ORA-01427 에러 발생)
  - `WHERE A = 'A'` 조건으로 조회할 때 결과가 최대 1건만 반환되도록 보장하려면 `A` 컬럼에 **UNIQUE(또는 PRIMARY KEY)** 제약 조건이 설정되어 중복 값이 없어야 합니다.

</div>
</details>
