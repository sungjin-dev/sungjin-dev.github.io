---
title: " [SQLD 단권화 #8] SQL 명령어 총정리"
excerpt: "DML·TCL·DDL·DCL"
categories: [SQL]
order: 8
tags:
  - SQP
toc: true
toc_sticky: true
---

# [SQLD 단권화 #8] DML·TCL·DDL·DCL — SQL 명령어 총정리 (완결)

> SQLD 2과목 3장 — INSERT/UPDATE/DELETE/MERGE, COMMIT/ROLLBACK/SAVEPOINT, CREATE/ALTER/DROP/TRUNCATE, GRANT/REVOKE/ROLE

마지막 편이다. SQL 명령어 4분류를 각각의 대표 명령어와 함께 정리한다. 특히 **DELETE vs TRUNCATE vs DROP** 비교표는 반드시 나온다.

먼저 지도부터:

| 분류 | 다루는 것 | 명령어 |
| --- | --- | --- |
| **DML** | 데이터(행) | INSERT, UPDATE, DELETE, MERGE |
| **TCL** | 트랜잭션 | COMMIT, ROLLBACK, SAVEPOINT |
| **DDL** | 객체 구조 | CREATE, ALTER, DROP, TRUNCATE |
| **DCL** | 권한 | GRANT, REVOKE |

---

## 1. DML — 데이터 조작어

### INSERT

```sql
-- 특정 칼럼만 지정
INSERT INTO EMP (EMPNO, ENAME, JOB, HIREDATE)
VALUES (101, 'YONGMOON', 'MANAGER', '2023-08-01');

-- 모든 칼럼 (칼럼명 생략 가능, 대신 순서·개수 정확히)
INSERT INTO EMP
VALUES (102, 'YONGMOON2', 'CLERK', '7902', '2023-08-03', 2000, NULL, 20);

-- 서브쿼리로 다중행 INSERT: 조건에 맞는 데이터를 한 번에 복사
INSERT INTO EMP_MNG (EMPNO, ENAME, JOB, HIREDATE, DEPTNO)
SELECT EMPNO, ENAME, JOB, HIREDATE, DEPTNO
FROM EMP
WHERE DEPTNO = 20;
```

### UPDATE

```sql
-- 여러 칼럼 동시 수정
UPDATE EMP
SET SAL = 2000, COMM = 300
WHERE ENAME = 'YONGMOON';

-- 서브쿼리로 계산된 값 반영
UPDATE EMP
SET SAL = (SELECT AVG(SAL) FROM EMP WHERE DEPTNO = 10)
WHERE ENAME = 'YONGMOON';
```

> WHERE를 빼먹으면 **전체 행이 수정**된다. DELETE도 마찬가지.

### DELETE

```sql
DELETE FROM EMP WHERE ENAME = 'YONGMOON2';
```

### DELETE vs TRUNCATE (최다 출제 비교표)

| 특성 | DELETE | TRUNCATE |
| --- | --- | --- |
| 작동 방식 | **행 단위** 삭제 | 테이블 구조 유지한 채 **전체를 한 번에** 비움 |
| 속도 | 상대적으로 느림 | 일반적으로 더 빠름 |
| 트랜잭션 로그 | 삭제마다 기록 | 최소한만 생성 |
| **롤백** | **가능** | **불가능** |
| WHERE 절 | 사용 가능 (조건 삭제) | 사용 불가 (항상 전체) |
| 인덱스 | 유지 | 재설정 |

### MERGE — 있으면 UPDATE, 없으면 INSERT

소스 테이블의 데이터를 타깃 테이블에 **동기화**할 때 쓴다.

```sql
MERGE INTO EMP_MNG M            -- 타깃
USING EMP E                     -- 소스
ON (M.EMPNO = E.EMPNO)          -- 매칭 조건
WHEN MATCHED THEN               -- 일치하면 → UPDATE
    UPDATE SET M.SAL = E.SAL, M.COMM = E.COMM
WHEN NOT MATCHED THEN           -- 없으면 → INSERT
    INSERT (EMPNO, ENAME, JOB, MGR, HIREDATE, SAL, COMM, DEPTNO)
    VALUES (E.EMPNO, E.ENAME, E.JOB, E.MGR, E.HIREDATE, E.SAL, E.COMM, E.DEPTNO);
```

---

## 2. TCL — 트랜잭션 제어어

개념(ACID)은 4편에서 정리했으니, 여기서는 **동작 결과를 코드로 묻는 문제** 대비.

### COMMIT — 확정

```sql
DELETE FROM EMP WHERE ENAME = 'YONGMOON';
INSERT INTO EMP (EMPNO, ENAME, JOB, SAL) VALUES (7935, 'JAMESBOND', 'ANALYST', 3500);
UPDATE EMP SET SAL = SAL * 1.1 WHERE EMPNO = 7935;
COMMIT;   -- 여기까지 전부 영구 저장. 이후 ROLLBACK 불가!
```

### ROLLBACK — 전부 취소

```sql
UPDATE EMP SET SAL = SAL * 1.4 WHERE EMPNO = 7935;
UPDATE EMP SET DEPTNO = 30 WHERE EMPNO = 7935;
ROLLBACK;  -- 두 UPDATE 모두 취소, 트랜잭션 시작 전 상태로
```

### SAVEPOINT — 부분 롤백 (계산 문제 단골)

```sql
INSERT INTO EMP VALUES (...);  -- ① AAAAA
SAVEPOINT sp1;
INSERT INTO EMP VALUES (...);  -- ② BBBBB
SAVEPOINT sp2;
INSERT INTO EMP VALUES (...);  -- ③ CCCCC

ROLLBACK TO sp2;  -- ③만 취소됨
COMMIT;           -- ①, ②는 확정
```

결과: **③ CCCCC만 취소, ①②는 커밋**. COMMIT 이후에는 SAVEPOINT가 모두 무효화된다.

---

## 3. DDL — 데이터 정의어

### CREATE TABLE

```sql
CREATE TABLE STUDENT (
    STUDENT_ID  NUMBER(5) PRIMARY KEY,
    NAME        VARCHAR2(50) NOT NULL,
    AGE         NUMBER(3),
    ENROLL_DATE DATE DEFAULT SYSDATE,
    DEPT_ID     NUMBER(3) REFERENCES DEPARTMENT(DEPT_ID)
);
```

### 참조 무결성 옵션 — 부모 행이 삭제되면 자식은?

| 옵션 | 부모 행 삭제 시 자식 테이블은 |
| --- | --- |
| **ON DELETE CASCADE** | 참조하는 행도 **함께 삭제** |
| **ON DELETE SET NULL** | 참조 컬럼을 **NULL로** |
| ON DELETE SET DEFAULT | 참조 컬럼을 기본값으로 |
| **ON DELETE NO ACTION** | 자식이 참조 중이면 **삭제 불가** |
| ON DELETE RESTRICT | NO ACTION과 유사 |

```sql
CONSTRAINT FK_PARENT_CASCADE FOREIGN KEY (PARENT_ID)
    REFERENCES PARENT_TABLE (PARENT_ID) ON DELETE CASCADE
```

### ALTER TABLE — 구조 수정 모음

```sql
ALTER TABLE EMPLOYEE ADD PHONE_NUMBER VARCHAR2(15) NOT NULL;   -- 칼럼 추가
ALTER TABLE EMPLOYEE DROP COLUMN PHONE_NUMBER;                 -- 칼럼 삭제
ALTER TABLE EMPLOYEE RENAME COLUMN NAME TO FULL_NAME;          -- 칼럼명 변경
ALTER TABLE EMPLOYEE MODIFY SALARY NUMBER(10, 2);              -- 타입 변경
ALTER TABLE EMPLOYEE ADD CONSTRAINT CHK_SALARY CHECK (SALARY > 0);  -- 제약 추가
ALTER TABLE EMPLOYEE DROP CONSTRAINT CHK_SALARY;               -- 제약 삭제
ALTER TABLE EMPLOYEE MODIFY JOIN_DATE DATE DEFAULT SYSDATE;    -- 기본값 설정
```

> 추가/삭제는 ADD/DROP, 이름은 RENAME, 타입·기본값은 MODIFY.

### RENAME / DROP / TRUNCATE

```sql
RENAME EMP TO EMP_BACKUP;        -- Oracle (SQL Server: sp_rename)
DROP TABLE EMP_BACKUP;           -- 구조+데이터 전부 삭제
TRUNCATE TABLE EMP_BACKUP;       -- 데이터만 삭제, 구조 유지
```

### DROP vs TRUNCATE

| 특성 | DROP TABLE | TRUNCATE TABLE |
| --- | --- | --- |
| 삭제 범위 | **구조 + 데이터 모두** | 데이터만 (구조 유지) |
| 복구 | 일반적으로 불가 | 일반적으로 불가 |
| 인덱스·트리거·제약 | **모두 삭제** | **유지** |
| 공간 | 반환 | 초기화 |

> 3단 비교 한 줄 정리: **DELETE = 행 단위·롤백 가능 / TRUNCATE = 전체 비움·구조 유지·롤백 불가 / DROP = 구조까지 삭제**

---

## 4. DCL — 데이터 제어어

### 권한의 종류

- **시스템 권한**: DB 전체에 대한 권한 (CREATE TABLE, CREATE VIEW 등)
- **객체 권한**: 특정 객체에 대한 권한 (SELECT, INSERT, UPDATE, DELETE)

### GRANT — 권한 부여

```sql
GRANT SELECT, INSERT ON EMP TO bbigter;

-- 부여받은 권한을 남에게 또 줄 수 있는 권한까지
GRANT SELECT ON EMP TO bbigter WITH GRANT OPTION;
```

### REVOKE — 권한 회수

```sql
REVOKE SELECT, INSERT ON EMP FROM bbigter;
```

> GRANT는 **TO**, REVOKE는 **FROM**. 전치사 바꿔치기 함정 주의.

### ROLE — 권한 묶음

여러 권한을 하나로 묶어 다수 사용자에게 일괄 적용한다.

```sql
CREATE ROLE hr_role;                              -- ROLE 생성
GRANT SELECT, INSERT, UPDATE ON EMP TO hr_role;   -- ROLE에 권한 부여
GRANT SELECT ON DEPT TO hr_role;
GRANT hr_role TO user1, user2;                    -- 사용자에게 ROLE 부여
DROP ROLE hr_role;                                -- ROLE 삭제
```

실무에서는 **권한 최소화 원칙(Principle of Least Privilege)** — 꼭 필요한 권한만 부여 — 을 적용해 보안 사고를 예방한다.

---

## 정리 한 장

1. **DML**은 행 단위 조작. MERGE는 "있으면 UPDATE, 없으면 INSERT"를 한 방에
2. **TCL**: COMMIT은 영구 확정, ROLLBACK은 시작점(또는 SAVEPOINT)까지 복원. `ROLLBACK TO sp` 이후 COMMIT하면 sp 이전 작업만 확정
3. **DELETE(행·롤백 가능) vs TRUNCATE(전체·구조 유지·롤백 불가) vs DROP(구조까지 삭제)** — 3단 비교 암기
4. 참조 무결성: CASCADE(같이 삭제), SET NULL, NO ACTION(삭제 불가)
5. **DCL**: GRANT ~ TO, REVOKE ~ FROM, WITH GRANT OPTION은 재부여 권한, ROLE은 권한 묶음

---

## 시리즈를 마치며

여기까지 SQLD 단권화 8편이 끝났다. 마지막으로 전체 시리즈에서 반복해서 강조한 최중요 포인트만 다시 꼽으면:

- SQL 실행 순서 **FWGHSO** (5편)
- 정규화 단계와 **반정규화는 최후의 수단** (3편)
- **격리 수준 × 이상 현상 표**와 **COUNT(\*)만 NULL 포함** (4편)
- **ROWNUM은 정렬 후에**, RANK vs DENSE_RANK (7편)
- **DELETE/TRUNCATE/DROP 비교표** (8편)

시험 직전에는 각 편 맨 아래 "정리 한 장"만 쭉 훑어도 복습이 된다. 합격을 빈다. 🎉
