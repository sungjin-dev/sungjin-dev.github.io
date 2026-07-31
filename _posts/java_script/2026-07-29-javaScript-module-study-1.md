---
title: "[JavaScript] 모듈 및 DTO/VO/Entity 정리"
excerpt: ""
categories:
  - [JavaScript]
tags:
  - Module
  - DTO
  - VO
  - Entity
toc: true
toc_sticky: true
---

오늘 정리할 내용은 크게 두 갈래다.

첫 번째로 자바스크립트 모듈(ES Module)을 쓸 때 왜 서버가 필요한지, 그리고 "모듈은 가져다 쓰는 것이지 바꾸는 게 아니다"라는 말이 정확히 무슨 뜻인지를 알아보고, 
계층(레이어) 간에 데이터를 주고받을 때 등장하는 DTO, VO, Entity 개념에 대해서도 정리를 해보자. 

겉보기엔 서로 다른 주제 같지만, 사실 둘 다 "코드와 데이터를 어떻게 구획을 나눠서 안전하게 주고받을 것인가"라는 같은 질문에서 출발한다. 순서대로 정리해보자.

---

## PART 1. 자바스크립트 모듈 시스템

### 1-1. 모듈이 뭔데? — 기본 개념부터

모듈은 한마디로 "코드를 파일 단위로 쪼개서, 필요한 것만 골라 쓸 수 있게 만든 것"이다. 
자바스크립트는 원래 파일을 나눠도 전역 스코프를 공유하는 구조였는데, 
ES2015(ES6)부터 `export`/`import` 문법으로 파일마다 독립된 스코프를 갖는 정식 모듈 시스템이 생겼다.

```javascript
// math.js
export function add(a, b) {
  return a + b;
}
export const PI = 3.14159;
```

```javascript
// main.js
import { add, PI } from './math.js';

console.log(add(2, 3)); // 5
console.log(PI);        // 3.14159
```

브라우저에서 이 모듈 문법을 쓰려면 `<script>` 태그에 `type="module"`을 명시해야 한다.

```html
<script type="module" src="./main.js"></script>
```

일반 `<script>`와 모듈 스크립트는 동작 방식이 다르다. 모듈은 기본적으로 ![star] `defer`처럼 동작해서 HTML 파싱을 막지 않고, 
DOM이 완성된 시점에 알아서 실행되기 때문에 document.querySelector 같은 DOM 탐색 에러 걱정을 할 필요가 없다. 

쉽게 정리해보자면, 모듈 스크립트는 어차피 복잡하게 연관된 파일이 많기에, 무조건 백그라운드에서 다 가져온 뒤에 
HTML 다 그려지면 안전하게 한 번에 실행하는 규칙을 만들어 개발자들을 배려한 것이라고 볼 수 있다.

또한 자바스크립트의 '자동 안전 검사기인 `strict mode`가 자동 적용되며, 최상위 스코프가 파일별로 독립된다.
 원래는 파일 맨 위에 'use strict';를 코딩해서 'use strict';를 켜면, 에러 발생 시 개발자 도구 콘솔(F12)이나 
터미널에 빨간색 에러(예외, Exception)를 띄우면서 코드 실행을 멈추게 되는데 모듈을 쓰면 자동으로 적용해준다는 말이다.   


### 1-2. 왜 file://로 그냥 열면 안 되고 서버가 필요한가

HTML 파일을 더블클릭해서 브라우저로 그냥 열면 주소창에 `file:///...` 형태로 뜬다. 
일반 `<script src="main.js">`는 이렇게 열어도 잘 동작하지만, `type="module"`은 다르다. 
콘솔에 대략 이런 에러가 뜬다.

```
Access to script at 'file:///.../math.js' from origin 'null'
has been blocked by CORS policy
```

이유는 이렇다.

- 모듈은 `import`한 다른 모듈 파일들을 브라우저가 내부적으로 **네트워크 요청(fetch)** 형태로 하나씩 가져온다. 
일반 스크립트처럼 파일을 통째로 읽어들이는 게 아니라, 모듈 그래프를 따라가며 필요한 파일을 계속 요청하는 구조다.

- 그런데 `file://` 프로토콜로 연 페이지는 브라우저가 origin을 `null`로 취급한다. (참고로, 웹 기술에서 Origin은 쉽게 말해 "웹사이트(or 파일)의 정체를 구분하기 위한 웹상의 신분증이라고 보면 되는데 
 Scheme (프로토콜) + Host (도메인) + Port (포트 번호) 이 3가지 요소로 구성된다)

file://이 null인 이유: 도메인/포트가 없어서 공식상 null이기도 하지만, 
다운로드된 악성 파일이 내 컴퓨터의 다른 파일들을 fetch로 몰래 읽어가지 못하게 격리(보안)하기 위함이다. 
예를 들어 인터넷 서핑 중 악성 코드가 담긴 coupon.html 파일을 실수로 다운로드 받았는데, 
아무 생각 없이 이 coupon.html을 더블 클릭해서 브라우저로 열었다고 가정해보자. 
만약 모든 파일의 Origin이 같다면, coupon.html 내부의 자바스크립트(fetch)가 내 컴퓨터 깊숙한 곳에 있는 개인정보 파일을 마음대로 읽어올 수 있게 된다. 

- 그리고 모듈 요청은 CORS(Cross-Origin Resource Sharing) 정책의 적용을 받는데, 

`null` origin에서의 요청은 CORS가 허용하는 프로토콜(`http`, `https` 등)이 아니라서 그냥 차단당한다.

즉 "모듈끼리 서로를 불러오는 방식 자체가 네트워크 요청을 전제로 설계되어 있어서" 
로컬 파일 시스템에서 직접 여는 방식과는 궁합이 안 맞는 것이다. 
그래서 `http://localhost:...` 처럼 실제 서버를 통해 페이지를 서빙해야 모듈이 정상 동작한다.

실무에서 흔히 쓰는 해결책은 다음과 같다.

| 방법 | 명령어 / 도구 |
|---|---|
| VS Code 확장 | Live Server 확장 설치 후 "Open with Live Server" |
| Node.js | `npx serve` |
| Python | `python3 -m http.server 8000` |
| 번들러/개발 서버 | Vite, Webpack Dev Server 등 (`npm run dev`) |

특히 요즘은 Vite 같은 개발 서버를 기본으로 쓰기 때문에 이 문제를 직접 마주칠 일이 줄었지만, 순수 HTML+JS로 프로젝트를 만들 때는 여전히 자주 부딪히는 이슈다.

### 1-3. "모듈은 가져다 쓰는 것이지 바꾸는 게 아니다"의 정확한 의미

이 말은 `import`로 가져온 값을 재할당(reassign)할 수 없다는 뜻이다. ES 모듈의 import 바인딩은 **읽기 전용 라이브 바인딩(live read-only binding)** 이라는 특성을 갖는다. 두 가지를 나눠서 봐야 한다.

**① 바인딩 자체는 재할당 불가**

```javascript
// counter.js
export let count = 0;
export function increment() {
  count++;
}
```

```javascript
// main.js
import { count, increment } from './counter.js';

console.log(count); // 0
increment();
console.log(count); // 1  ← 원본이 바뀌면 가져온 쪽도 자동으로 갱신된다 (live binding)

count = 10; // ✖️ TypeError: Assignment to constant variable.
```

`count`를 직접 재할당하려고 하면 에러가 난다. 신기한 건 `increment()`를 통해 원본 값이 바뀌면, import한 쪽에서도 값이 실시간으로 반영된다는 점이다(그래서 "live" 바인딩이다). 
즉 값을 읽는 것도, 원본이 바뀌는 걸 관찰하는 것도 가능하지만, **내가 직접 그 바인딩에 새 값을 대입하는 것만 금지**된다.

**② 객체의 내부 프로퍼티는 변경 가능**

```javascript
// user.js
export const user = { name: 'Kim' };
```

```javascript
// main.js
import { user } from './user.js';

user.name = 'Lee'; // ✔️ 가능하다 — 바인딩 자체를 바꾸는 게 아니라 객체 내부 값만 바꾸는 것
console.log(user.name); // Lee

user = {}; // ✖️ TypeError — 바인딩 자체를 다른 객체로 재할당하려는 시도라서 금지
```

정리하면, 모듈 시스템이 막는 건 "이 이름표(바인딩)가 가리키는 대상을 통째로 바꿔치기하는 것"이지, "그 대상 내부의 값을 만지는 것"까지 막지는 않는다. 이 구분이 헷갈리기 쉬운 부분이라 예제로 짚어둘 만하다.

참고로 CommonJS(`require`)는 이런 live binding이 없다. `require()`는 호출 시점의 값을 복사해서 가져오기 때문에, 원본 모듈 내부 값이 나중에 바뀌어도 이미 가져온 쪽에는 반영되지 않는다. 이 차이가 ESM과 CommonJS를 가르는 실질적인 특징 중 하나다.

---

지금까지는 "코드 조각(모듈)을 여러 파일로 나눠서 어떻게 재사용하는가"에 대한 이야기였다. 이제 관점을 바꿔서, 서로 다른 계층(레이어) 사이에서 **데이터**를 어떻게 주고받을지에 대한 이야기로 넘어가 본다.

## PART 2. 계층 간 데이터 전달 — DTO, VO, Entity

### 2-1. 왜 계층을 나누고, 왜 데이터 형태를 구분하는가

백엔드 애플리케이션은 보통 역할별로 계층을 나눠서 설계한다.

```
Client  ⇄  Controller  ⇄  Service  ⇄  Repository  ⇄  DB
```

- **Controller**: 요청을 받고 응답을 내려주는 창구
- **Service**: 실제 비즈니스 로직 처리
- **Repository**: DB 접근 담당

이렇게 계층을 나누는 이유는 각 계층의 관심사를 분리해서, 한 곳이 바뀌어도 다른 곳에 영향이 최소화되게 하기 위해서다. 

그런데 문제는 **DB에서 조회한 객체를 그대로 API 응답으로 내보내면 안 된다**는 점이다.

예를 들어 회원 정보를 담은 객체를 그대로 클라이언트에 응답으로 보내버리면,

- 비밀번호 해시값 같은 민감한 필드까지 그대로 노출될 위험이 있고
- DB 테이블 구조가 바뀔 때마다 프론트엔드가 받는 응답 형태까지 덩달아 바뀌어서, 계층 간 결합도가 지나치게 높아진다

그래서 "DB와 매핑되는 객체"와 "계층 간에 주고받는 객체"를 의도적으로 분리하는데, 여기서 등장하는 게 Entity, DTO, VO다.

### 2-2. Entity — DB와 매핑되는 실제 도메인 객체

Entity는 DB 테이블의 한 행(Row)과 대응되는 객체다. 고유한 식별자(주로 PK)를 가지고, 생성-수정-삭제라는 생명주기를 갖는다.

```typescript
// User Entity - DB users 테이블과 매핑
class UserEntity {
  id: number;
  email: string;
  password: string; // 절대 그대로 밖으로 노출하면 안 되는 필드
  createdAt: Date;
}
```

Entity의 특징을 정리하면 이렇다.

- **식별자가 있다**: `id` 값이 같으면 다른 필드가 달라도 "같은 대상"으로 취급한다.
- **가변(mutable)이다**: 상태가 시간에 따라 바뀐다 (예: 회원 정보 수정).
- **비즈니스 로직을 가질 수 있다**: 단순 데이터 덩어리가 아니라, 도메인 규칙을 메서드로 갖기도 한다.

### 2-3. DTO(Data Transfer Object) — 계층 간 데이터 전달용 순수 객체

DTO는 이름 그대로 "데이터를 옮기기 위한 객체"다. Controller ↔ Service, 
혹은 Server ↔ Client처럼 서로 다른 경계를 넘어 데이터를 주고받을 때 사용하는 **순수 데이터 객체**를 말한다.

```typescript
// 회원가입 요청 DTO
class SignUpRequestDto {
  email: string;
  password: string;
}

// 회원 정보 응답 DTO - password 필드가 아예 없다
class UserResponseDto {
  id: number;
  email: string;
  createdAt: Date;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.email = entity.email;
    this.createdAt = entity.createdAt;
  }
}
```

DTO의 핵심 특징은 다음과 같다.

- **비즈니스 로직이 없다**: 필드와 getter/setter, 혹은 단순 변환 로직 정도만 갖는다.
- **목적이 "전달"에 있다**: 그 자체로 의미를 갖기보다, 계층 경계를 넘나드는 운반 수단이다.
- **필요한 필드만 노출한다**: Entity의 모든 필드를 다 담을 필요 없이, 그 상황에 필요한 것만 골라 담는다.

실무(특히 NestJS 같은 프레임워크)에서는 DTO에 유효성 검증 데코레이터를 붙이는 경우도 흔하다.

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

class SignUpRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

### 2-4. VO(Value Object) — 값 자체로 의미를 갖는 불변 객체

VO는 DTO와 자주 헷갈리는 개념인데, 목적이 다르다. VO는 "값 그 자체가 의미를 갖는 불변 객체"다. 식별자가 없고, 내부 값이 같으면 완전히 같은 것으로 취급한다(참조가 달라도 상관없다).

```typescript
class Money {
  private readonly amount: number;
  private readonly currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

const price1 = new Money(1000, 'KRW');
const price2 = new Money(1000, 'KRW');

console.log(price1 === price2);     // false - 서로 다른 객체 참조
console.log(price1.equals(price2)); // true  - 값이 같으니 같은 VO로 취급
```

`Money`, `Address`처럼 "값의 조합 자체가 의미를 갖고, 한번 만들어지면 내부 값이 바뀌지 않아야 하는" 개념에 VO를 쓴다. DTO는 "전달"이 목적이고 VO는 "값의 의미와 불변성 보장"이 목적이라는 점에서 지향점이 다르다. 다만 실무에서는 VO가 DTO로 함께 쓰이는 경우도 있어서 완전히 배타적인 개념은 아니다.

### 2-5. 세 개념 한눈에 비교

| 구분 | 목적 | 식별자 | 가변성 | 동등성 비교 기준 |
|---|---|---|---|---|
| **Entity** | DB와 매핑되는 실제 도메인 객체 | 있음 (PK) | 가변 | 식별자(ID) |
| **VO** | 값 자체의 의미 표현 | 없음 | 불변 | 내부 값 전체 |
| **DTO** | 계층 간 데이터 전달 | 무관 | 상황에 따라 다름 | 보통 신경 쓰지 않음 |

### 2-6. 실무에서의 전체 흐름 예시

세 개념이 실제로 요청 하나를 처리할 때 어떻게 맞물리는지 예시로 정리해본다.

```typescript
// Controller
async function getUser(req, res) {
  // 1. Service에게 위임 → Repository가 DB에서 Entity를 조회해온다
  const entity: UserEntity = await userService.findById(req.params.id);

  // 2. Entity를 그대로 내보내지 않고 DTO로 변환한다 (password 필드는 제외됨)
  const responseDto = new UserResponseDto(entity);

  // 3. 변환된 DTO만 클라이언트에 응답한다
  res.json(responseDto);
}
```

정리하면 흐름은 이렇다.

```
Client → (요청 DTO) → Controller → Service → Repository → Entity(DB)
                                                              │
Client ← (응답 DTO) ← Controller ← Service ← Entity를 DTO로 변환
```

DB에는 Entity로 저장/조회하고, 계층을 넘나들 때는 DTO로 감싸서 필요한 정보만 노출하며, 그 중 값 자체가 의미를 갖는 부분(금액, 주소 등)은 VO로 다뤄서 불변성과 값 비교의 편의성을 얻는다. 이렇게 역할을 나눠두면 DB 구조가 바뀌어도 API 스펙(DTO)은 그대로 유지할 수 있고, 민감한 필드가 실수로 노출되는 사고도 막을 수 있다.

---

## 정리

- ES 모듈은 다른 모듈을 네트워크 요청처럼 불러오는 구조라서, `file://`로 직접 열면 CORS 정책에 막힌다.그래서 로컬 서버(Live Server, `http.server`, Vite 등)를 통해 실행해야 한다.
- `import`로 가져온 값은 재할당은 금지되지만(라이브 read-only 바인딩), 객체라면 내부 프로퍼티 변경은 가능하다.
- Entity는 DB와 매핑되는 식별자 있는 가변 객체, DTO는 계층 간 데이터 전달용 순수 객체, VO는 값 자체가 의미를 갖는 불변 객체다. 세 개념은 목적이 다르기 때문에 상황에 맞게 구분해서 쓰는 게 좋다.


[star]: /assets/images/star.png#blog-star-emoji "star"
