---
title: "[SQLD] 오답노트2"
permalink: /sql/wrong-note-part2/
categories: [SQL]
tags:
  - where절
  - join절
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
