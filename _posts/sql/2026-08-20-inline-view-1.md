---
title: "[SQL] 인라인 뷰(FROM절 서브쿼리)는 왜 메인쿼리 칼럼을 못 볼까"
categories: [sql]
tags:
  - sqld
  - 시험
toc: true
toc_sticky: true
mermaid: true
order: 19
---

# static과 instance로 읽는 SQL 스코프

SQL을 쓰다 보면 납득이 잘 안 가는 에러를 만난다. 같은 조건인데 어떤 자리에 쓰면 되고 어떤 자리에 쓰면 안 된다. 이걸 "SQL 문법이 원래 그래"로 넘기면 다음에 또 막힌다. 그런데 이 규칙은 사실 자바의 static 제약과 거의 같은 이야기다.

<br>

### 먼저 문제부터

부서별 평균 급여를 붙이고 싶다고 하자. 아래는 실패한다.

```sql
SELECT e.emp_id, d.avg_sal
FROM employees e
JOIN (
    SELECT AVG(s.salary) AS avg_sal
    FROM salaries s
    WHERE s.dept_id = e.dept_id   -- ERROR: unknown column 'e.dept_id'
) d ON 1 = 1;
```

그런데 아래는 잘 된다.

```sql
SELECT e.emp_id,
       (SELECT AVG(s.salary)
        FROM salaries s
        WHERE s.dept_id = e.dept_id) AS avg_sal   -- OK
FROM employees e;
```

`s.dept_id = e.dept_id`라는 조건은 글자 하나 다르지 않다. 위치만 바뀌었을 뿐이다. 왜 하나는 되고 하나는 안 될까?

<br>

### 첫 번째 설명 — 논리적 처리 순서

SQL은 적힌 순서대로 처리되지 않는다. 의미상으로는 `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY` 순으로 처리된다고 정의되어 있다. 이걸 조금 유식한 말로 **논리적 질의 처리 순서**(logical query processing)라고 한다.

여기서 중요한 건 FROM이 맨 앞이라는 점이다. FROM절은 "메인쿼리가 앞으로 훑을 테이블"을 만들어내는 자리다. 즉 FROM절이 평가되는 시점에는 **"메인쿼리의 현재 행"이라는 것이 아직 세상에 없다**. 훑을 대상 자체를 지금 만드는 중이기 때문이다.

반대로 WHERE절은 그 결과셋이 완성된 다음에 한 행씩 검사한다. SELECT절도 마찬가지다. 이 단계에는 "지금 처리 중인 행"이라는 맥락이 있다. 그래서 그 행의 칼럼을 참조할 수 있다.

<svg viewBox="0 0 680 216" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="쿼리 단계별 현재 행 컨텍스트">
  <style>
    svg text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .ttl{font-size:13.5px;font-weight:700;fill:#14181d}
    .lb{font-size:12px;fill:#14181d}
    .sm{font-size:12px;fill:#5b636e}
    .bx{fill:#f4f5f7;stroke:#c4cad2;stroke-width:1}
    .gy{fill:#eceef1;stroke:#b9c0c9;stroke-width:1}
    .gr{fill:#e4f2e9;stroke:#5f9c78;stroke-width:1}
    .ar{fill:#9aa2ad}
    @media (prefers-color-scheme: dark){
      .ttl,.lb{fill:#e8ebef}
      .sm{fill:#9aa4b0}
      .bx{fill:#1c2127;stroke:#3a424c}
      .gy{fill:#22282f;stroke:#414a55}
      .gr{fill:#1b2f26;stroke:#4f8e6c}
      .ar{fill:#6b7581}
    }
  </style>
  <text class="ttl" x="5" y="20">단계별로 "현재 행"이라는 맥락이 있는가</text>

  <rect class="bx" x="5"   y="40" width="100" height="34" rx="5"/>
  <rect class="bx" x="119" y="40" width="100" height="34" rx="5"/>
  <rect class="bx" x="233" y="40" width="100" height="34" rx="5"/>
  <rect class="bx" x="347" y="40" width="100" height="34" rx="5"/>
  <rect class="bx" x="461" y="40" width="100" height="34" rx="5"/>
  <rect class="bx" x="575" y="40" width="100" height="34" rx="5"/>
  <text class="lb" x="55"  y="61" text-anchor="middle">FROM</text>
  <text class="lb" x="169" y="61" text-anchor="middle">WHERE</text>
  <text class="lb" x="283" y="61" text-anchor="middle">GROUP BY</text>
  <text class="lb" x="397" y="61" text-anchor="middle">HAVING</text>
  <text class="lb" x="511" y="61" text-anchor="middle">SELECT</text>
  <text class="lb" x="625" y="61" text-anchor="middle">ORDER BY</text>

  <polygon class="ar" points="108,52 116,57 108,62"/>
  <polygon class="ar" points="222,52 230,57 222,62"/>
  <polygon class="ar" points="336,52 344,57 336,62"/>
  <polygon class="ar" points="450,52 458,57 450,62"/>
  <polygon class="ar" points="564,52 572,57 564,62"/>

  <rect class="gy" x="5"   y="86" width="100" height="26" rx="5"/>
  <rect class="gr" x="119" y="86" width="556" height="26" rx="5"/>
  <text class="sm" x="55"  y="103" text-anchor="middle">행 없음</text>
  <text class="lb" x="397" y="103" text-anchor="middle">행 단위로 평가 — 현재 행의 칼럼을 참조할 수 있다</text>

  <rect class="gy" x="5"   y="126" width="328" height="76" rx="6"/>
  <rect class="gr" x="347" y="126" width="328" height="76" rx="6"/>
  <text class="lb" x="21" y="149">FROM절 인라인 뷰</text>
  <text class="sm" x="21" y="169">메인쿼리 별칭이 이름 스코프에 없다</text>
  <text class="sm" x="21" y="189">≈ static — this 라는 이름이 없다</text>
  <text class="lb" x="363" y="149">WHERE · SELECT 상관 서브쿼리</text>
  <text class="sm" x="363" y="169">현재 행이 이름 스코프 안에 들어온다</text>
  <text class="sm" x="363" y="189">≈ instance — this 로 접근한다</text>
</svg>

<br>

### static과 instance로 옮겨보기

여기까지 오면 익숙한 그림이 하나 떠오른다. 자바의 static 제약이다.

static 메서드 안에서는 인스턴스 변수를 쓸 수 없다. 이유는 간단하다. static 메서드는 인스턴스가 하나도 없는 상태에서도 호출될 수 있고, 그래서 `this`라는 게 없다. 어떤 인스턴스의 필드를 말하는 건지 정할 방법이 없는 것이다.

FROM절 인라인 뷰가 딱 이 상황이다. "메인쿼리의 특정 행"이라는 인스턴스가 만들어지기 전에 평가되는 코드라서, 그 행의 칼럼이라는 인스턴스 변수를 가리킬 수가 없다.

반면 instance 메서드는 `this`를 통해 자기가 속한 객체의 필드에 접근한다. 상관 서브쿼리(correlated subquery)도 메인쿼리가 이미 만들어둔 "현재 행"이라는 맥락 안에서 실행되기 때문에 그 행의 칼럼값을 자유롭게 읽는다.

<svg viewBox="0 0 680 250" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SQL 서브쿼리와 자바 스코프 대응 관계">
  <style>
    svg text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .ttl2{font-size:13.5px;font-weight:700;fill:#14181d}
    .lb2{font-size:12px;fill:#14181d}
    .sm2{font-size:12px;fill:#5b636e}
    .arw{font-size:13.5px;fill:#9aa2ad}
    .gy2{fill:#eceef1;stroke:#b9c0c9;stroke-width:1}
    .gr2{fill:#e4f2e9;stroke:#5f9c78;stroke-width:1}
    .co2{fill:#fbeae6;stroke:#cf7a63;stroke-width:1}
    @media (prefers-color-scheme: dark){
      .ttl2,.lb2{fill:#e8ebef}
      .sm2{fill:#9aa4b0}
      .arw{fill:#6b7581}
      .gy2{fill:#22282f;stroke:#414a55}
      .gr2{fill:#1b2f26;stroke:#4f8e6c}
      .co2{fill:#2e211d;stroke:#a8624e}
    }
  </style>
  <text class="ttl2" x="5" y="20">SQL 쪽 ↔ 자바 쪽 대응</text>

  <rect class="gy2" x="5" y="38" width="300" height="60" rx="6"/>
  <rect class="gy2" x="375" y="38" width="300" height="60" rx="6"/>
  <text class="arw" x="340" y="73" text-anchor="middle">↔</text>
  <text class="lb2" x="21" y="62">FROM절 인라인 뷰</text>
  <text class="sm2" x="21" y="82">메인쿼리 행을 참조할 수 없다</text>
  <text class="lb2" x="391" y="62">static nested class · static 메서드</text>
  <text class="sm2" x="391" y="82">바깥 인스턴스가 애초에 없다</text>

  <rect class="gr2" x="5" y="108" width="300" height="60" rx="6"/>
  <rect class="gr2" x="375" y="108" width="300" height="60" rx="6"/>
  <text class="arw" x="340" y="143" text-anchor="middle">↔</text>
  <text class="lb2" x="21" y="132">상관 서브쿼리 (WHERE · SELECT)</text>
  <text class="sm2" x="21" y="152">현재 행의 칼럼을 자유롭게 읽는다</text>
  <text class="lb2" x="391" y="132">inner class · instance 메서드</text>
  <text class="sm2" x="391" y="152">Outer.this 로 바깥 필드를 읽는다</text>

  <rect class="co2" x="5" y="178" width="300" height="60" rx="6"/>
  <rect class="co2" x="375" y="178" width="300" height="60" rx="6"/>
  <text class="arw" x="340" y="213" text-anchor="middle">↔</text>
  <text class="lb2" x="21" y="202">LATERAL · CROSS APPLY</text>
  <text class="sm2" x="21" y="222">앞에 나온 테이블만 참조한다</text>
  <text class="lb2" x="391" y="202">static 메서드에 인스턴스를 인자로</text>
  <text class="sm2" x="391" y="222">넘겨받은 것만 쓸 수 있다</text>
</svg>

<br>

### 물론 이 비유는 잘 맞는다. 하지만 두 군데가 어긋난다

여기서 멈추면 아까운 이유가 있다. 비유가 어긋나는 지점이 오히려 더 정확한 이해로 데려다준다.

**첫째, 진짜 원인은 "시점"이 아니라 "스코프"다.**

앞의 인라인 뷰 에러는 실행 도중에 나는 게 아니다. 쿼리가 시작조차 하기 전, 파싱과 바인딩 단계에서 나는 에러다. 옵티마이저는 실행 계획을 세워보지도 못한다. 즉 DBMS가 `e.dept_id`를 못 읽는 이유는 "아직 실행이 안 됐기 때문"이 아니라, **그 이름이 인라인 뷰의 이름 스코프에 애초에 등록되어 있지 않기 때문**이다.

자바도 똑같다. `non-static variable this cannot be referenced from a static context`는 런타임 에러가 아니라 컴파일 에러다. 컴파일러는 static 컨텍스트에서 `this`라는 식별자를 아예 해석하지 않는다.

정리하면 이렇다. **평가 시점은 이유고, 이름 스코프는 메커니즘이다.** 언어 설계자들이 "인스턴스가 없을 수 있으니까"라는 이유로 스코프 규칙을 그렇게 정해둔 것이고, 실제로 우리를 막아 세우는 건 그 스코프 규칙이다. 이 구분을 해두면 "그럼 실행 계획에서 순서를 바꾸면 되는 거 아냐?" 같은 오해를 안 하게 된다.

**둘째, static도 넘겨받으면 인스턴스에 접근한다.**

static 메서드의 제약은 "인스턴스 데이터에 절대 접근 불가"가 아니다. 정확히는 "암묵적인 `this`가 없다"일 뿐이다. 인스턴스를 인자로 명시해서 넘기면 얼마든지 필드를 읽는다.

```java
static int taxOf(Employee e) {
    return e.salary / 10;   // 넘겨받았으니 접근 가능
}
```

그렇다면 SQL에도 이에 대응하는 게 있어야 한다. 있다. `LATERAL`이다.

<br>

### LATERAL은 인자를 명시적으로 넘기는 문법이다

PostgreSQL과 Oracle의 `LATERAL`, SQL Server와 Oracle의 `CROSS APPLY`, MySQL 8.0.14 이상의 `LATERAL`이 그 역할을 한다.

```sql
SELECT e.emp_id, d.avg_sal
FROM employees e
CROSS JOIN LATERAL (
    SELECT AVG(s.salary) AS avg_sal
    FROM salaries s
    WHERE s.dept_id = e.dept_id   -- OK
) d;
```

같은 FROM절 안인데 이번엔 `e.dept_id`가 통한다. `LATERAL` 키워드가 "이 인라인 뷰는 왼쪽 행을 인자로 받는다"고 명시적으로 선언했기 때문이다. static 메서드에 인스턴스를 인자로 넘겨주는 것과 정확히 같은 구조다.

여기서 제약 하나가 붙는다. **자기보다 앞에 나온 테이블만** 참조할 수 있다. 뒤에 나올 테이블은 못 본다. 이것도 낯선 규칙이 아니다. 자바스크립트의 기본 매개변수가 똑같이 동작한다.

```javascript
function f(a, b = a + 1) { }   // OK — 앞선 매개변수 참조
function g(a = b, b = 1) { }   // ReferenceError — 뒤를 참조
```

자바에서 필드 초기화식이 아직 선언되지 않은 필드를 단순 이름으로 참조하면 `illegal forward reference`가 나는 것도 같은 원리다. **컨텍스트는 왼쪽에서 오른쪽으로 쌓이고, 이미 쌓인 것까지만 열려 있다.**

<br>

### 더 정확한 대응 — static nested class와 inner class

한 걸음 더 가보자. static 메서드보다 **중첩 클래스** 쪽이 SQL 서브쿼리에 훨씬 잘 맞는다.

```java
class Outer {
    int x;

    static class Nested {          // 바깥 인스턴스 없이 생성된다
        void f() { /* x 접근 불가 */ }
    }

    class Inner {                  // 바깥 인스턴스가 있어야 생성된다
        void f() { int y = Outer.this.x; }   // OK
    }
}
```

왜 이쪽이 더 정확한가. **중첩 레벨을 건너뛰는 참조까지 대응되기 때문**이다.

상관 서브쿼리는 바로 위 쿼리뿐 아니라 두 단계, 세 단계 위 쿼리의 칼럼도 참조할 수 있다. inner class가 `Outer.this.x`로 바깥을 명시해 접근하는 것과 같은 모양이다. 반대로 인라인 뷰는 메인쿼리는 물론이고 **같은 FROM절의 형제 테이블조차** 못 본다. 바깥 컨텍스트에서 완전히 잘려 있다는 뜻이고, 이건 static nested class가 `Outer`의 인스턴스와 전혀 무관하게 존재하는 것과 정확히 겹친다.

정리하면 인라인 뷰는 "바깥과 연결선이 없는 독립된 정의"고, 상관 서브쿼리는 "바깥을 암묵적으로 하나 물고 있는 정의"다.

<br>

### 상관 서브쿼리는 사실 함수다 — 그리고 옵티마이저는 그걸 안다

상관 서브쿼리를 조금 다르게 보면, 이건 그냥 **현재 행을 인자로 받는 함수**다.

```
f(현재행) → 스칼라값
```

람다가 바깥 변수를 캡처하는 것과 같다. 그래서 "행마다 재평가된다"는 설명이 나온 것이다.

여기서 오해가 하나 생기기 쉽다. 행이 100만 개면 서브쿼리가 100만 번 도는 거냐는 것이다. 논리적으로는 그렇지만, **실제 실행 계획은 대개 그렇지 않다.** 옵티마이저는 상관 서브쿼리를 세미 조인이나 해시 조인으로 바꿔버린다. 이걸 유식한 말로 **비상관화**(decorrelation)라고 한다. 반대로 인라인 뷰는 뷰 병합(view merging)으로 아예 사라지기도 하고, 바깥 조건이 안으로 밀려 들어가기도 한다(predicate pushdown).

즉 앞에서 본 `FROM → WHERE → ...` 순서는 **실행 순서가 아니라 결과의 의미를 정의하는 모델**이다. 옵티마이저는 결과만 같다면 순서를 얼마든지 갈아엎는다.

이것도 자바에 대응이 있다. JIT가 짧은 메서드를 인라이닝하고 이스케이프 분석으로 객체 할당을 지워버려도, 우리가 쓴 코드의 의미는 바뀌지 않는다. **의미론과 실행은 다른 층위**라는 것. 두 세계가 같은 방식으로 굴러가고 있는 셈이다.

<br>

### 같은 프레임으로 풀리는 질문들

"어느 단계에서 어떤 이름이 스코프에 들어와 있는가"를 잡아두면, 따로 외우던 규칙 여러 개가 한 번에 정리된다.

| 자주 막히는 지점 | 왜 그런가 |
|---|---|
| `WHERE`에서 SELECT 별칭 사용 불가 | 별칭은 SELECT 단계에서 생기는데 WHERE가 먼저다 |
| `ORDER BY`에서는 SELECT 별칭 사용 가능 | ORDER BY는 SELECT 뒤라 별칭이 이미 스코프에 있다 |
| `WHERE`에서 집계 함수 사용 불가 | 그룹이 아직 안 만들어졌다. 그래서 `HAVING`이 따로 있다 |
| `WHERE`에서 윈도우 함수 사용 불가 | 윈도우 함수는 SELECT 단계에서 계산된다. 걸러내려면 서브쿼리로 한 번 감싸야 한다 |
| 인라인 뷰에서 형제 테이블 참조 불가 | 형제도 바깥 스코프다. `LATERAL`로 명시해야 열린다 |

다만 이 표를 그대로 믿고 쓰면 안 되는 구석이 있다. **DBMS마다 편의를 위해 표준을 완화해둔 부분이 있다.** MySQL은 `HAVING`과 `GROUP BY`에서 SELECT 별칭을 허용하고, PostgreSQL은 `GROUP BY`에서 허용한다. 표준상으로는 둘 다 안 되는 것들이다. 이식성이 필요한 쿼리라면 표준 쪽 규칙을 기준으로 잡아두는 것이 안전하다.

<br>

### 정리

- FROM절 인라인 뷰가 메인쿼리 칼럼을 못 보는 건 실행 순서 문제라기보다 **이름 스코프** 문제다. 에러가 나는 시점도 실행 전이다.
- static / instance 비유는 잘 맞는다. 특히 **static nested class ↔ 인라인 뷰**, **inner class ↔ 상관 서브쿼리**로 놓으면 중첩 참조까지 대응된다.
- `LATERAL`은 예외가 아니라 **인자를 명시적으로 넘기는 문법**이다. 앞선 것만 참조 가능한 제약까지 언어 쪽 규칙과 똑같다.
- "행마다 재평가"는 의미론이지 실행 계획이 아니다. 실제 비용이 궁금하면 비유 말고 실행 계획을 보는 것이 좋다.

낯선 문법을 만나면 "이 자리에서 어떤 이름이 보이는가"부터 확인해보는 것이 좋다. 대부분의 "왜 여기선 안 되지?"는 그 질문 하나로 정리된다.
