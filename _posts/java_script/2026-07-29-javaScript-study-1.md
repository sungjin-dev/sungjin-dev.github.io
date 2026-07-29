---
title: "[JavaScript] 기초 #1 "
excerpt: "자바스크립트로 고유 ID 만들기, 그리고 entries() 정리"
categories:
  - javascript
tags:
  - javascript
  - padStart
  - entries()
  - toString
toc: true
toc_sticky: true
---


## 1. 굳이 복잡한 코드로 ID를 만드는 이유는 뭘까?

아래 같은 코드를 종종 보게 된다.

```javascript
const id = `${date.getFullYear()}-${Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000)}-${Math.floor(Math.random() * (99 - 10 + 1) + 10)}`;
// 결과 예시: 2026-5839201-42
```

처음 마주치게 되면 "그냥 Math.random(1000000, 9999999)라고 써서 구하면 되는데, 왜 이렇게 귀찮게 꼬아놨을까?" 하는 의문이 드는 것이 당연하다. 이렇듯 복잡한 과정으로 도출하게된 근본적인 이유는 자바스크립트에서 기본적으로 제공하는 무작위 도구가 딱 하나(0 이상 1 미만 소수)뿐이기 때문이다. 

##2. 고무줄 늘리기 

<p align="center">
  <img src="<img width="620" height="894" alt="고양이" src="https://github.com/user-attachments/assets/1c878d47-56ea-4462-a662-30a8e51ab7c4" />
" width="400" alt="고무줄 늘이는 고양이">
  <br>
  <sub style="color: #666;">▲ 1단계: 0~1 사이 소수를 900만 배로 쫙 늘리는 현장</sub>
</p>

 지금 가지고 있는건 고작 길이가 1cm짜리인 고무줄(0.000... ~ 0.999...) 하나다. 우리는 이 고무줄을 가지고 "1,000,000부터 9,999,999까지의 눈금"을 만들어야 한다. 

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 520" width="100%" height="100%" style="background-color: #ffffff; font-family: 'Pretendard', 'Malgun Gothic', sans-serif;">
  <!-- Outer Card Container -->
  <rect x="10" y="10" width="740" height="500" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" rx="16"/>

  <!-- Title -->
  <text x="380" y="45" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle">Math.random() 범위 변환 메커니즘 (고무줄 비유)</text>

  <!-- Step 0: Original -->
  <g id="step0" transform="translate(30, 70)">
    <rect x="0" y="0" width="700" height="90" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" rx="8"/>
    <text x="20" y="28" font-size="14" font-weight="bold" fill="#475569">[원래 재료] Math.random() — 기본 1cm 고무줄</text>
    
    <!-- Visual Line -->
    <line x1="120" y1="58" x2="260" y2="58" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
    <circle cx="120" cy="58" r="5" fill="#64748b"/>
    <circle cx="260" cy="58" r="5" fill="#64748b"/>
    <text x="120" y="78" font-size="12" fill="#64748b" text-anchor="middle">0.0</text>
    <text x="260" y="78" font-size="12" fill="#64748b" text-anchor="middle">0.9999...</text>
    <text x="300" y="62" font-size="13" font-weight="bold" fill="#64748b">(길이: 1)</text>
  </g>

  <!-- Step 1: Multiply -->
  <g id="step1" transform="translate(30, 175)">
    <rect x="0" y="0" width="700" height="90" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.5" rx="8"/>
    <text x="20" y="28" font-size="14" font-weight="bold" fill="#1d4ed8">1단계: * 9,000,000 — 고무줄 900만 배 쫙 늘리기</text>
    
    <!-- Visual Line -->
    <line x1="120" y1="58" x2="520" y2="58" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
    <circle cx="120" cy="58" r="5" fill="#3b82f6"/>
    <circle cx="520" cy="58" r="5" fill="#3b82f6"/>
    <text x="120" y="78" font-size="12" fill="#1d4ed8" text-anchor="middle">0.0</text>
    <text x="520" y="78" font-size="12" fill="#1d4ed8" text-anchor="middle">8999999.9999...</text>
    <text x="590" y="62" font-size="13" font-weight="bold" fill="#2563eb">(길이: 900만)</text>
  </g>

  <!-- Step 2: Math.floor -->
  <g id="step2" transform="translate(30, 280)">
    <rect x="0" y="0" width="700" height="95" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" rx="8"/>
    <text x="20" y="28" font-size="14" font-weight="bold" fill="#15803d">2단계: Math.floor() — 소수점 버려서 딱 떨어지는 정수 칸 만들기</text>
    
    <!-- Line & Ticks -->
    <line x1="120" y1="60" x2="580" y2="60" stroke="#16a34a" stroke-width="3" stroke-dasharray="3,6"/>
    <rect x="116" y="52" width="8" height="16" fill="#16a34a" rx="2"/>
    <rect x="576" y="52" width="8" height="16" fill="#16a34a" rx="2"/>
    <text x="120" y="82" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">0</text>
    <text x="580" y="82" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">8999999</text>

    <!-- Center Label Badge (선이 가려지도록 배경 배지 적용) -->
    <rect x="245" y="46" width="210" height="28" fill="#ffffff" stroke="#22c55e" stroke-width="1.5" rx="14"/>
    <text x="350" y="64" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">■ 정수 칸 9,000,000개 ■</text>
  </g>

  <!-- Step 3: Shift (+ min) -->
  <g id="step3" transform="translate(30, 390)">
    <rect x="0" y="0" width="700" height="95" fill="#fff7ed" stroke="#f97316" stroke-width="1.5" rx="8"/>
    <text x="20" y="28" font-size="14" font-weight="bold" fill="#c2410c">3단계: + 1,000,000 (+ min) — 시작 위치를 100만으로 밀어주기</text>
    
    <!-- Shift Arrow -->
    <path d="M 120 60 Q 165 30 210 54" stroke="#f97316" stroke-width="2" stroke-dasharray="3,3" fill="none"/>
    <polygon points="212,58 205,51 203,57" fill="#f97316"/>
    <text x="162" y="38" font-size="11" font-weight="bold" fill="#ea580c" text-anchor="middle">+100만 이동</text>

    <!-- Line & Ticks -->
    <line x1="220" y1="60" x2="680" y2="60" stroke="#ea580c" stroke-width="3" stroke-dasharray="3,6"/>
    <rect x="216" y="52" width="8" height="16" fill="#ea580c" rx="2"/>
    <rect x="676" y="52" width="8" height="16" fill="#ea580c" rx="2"/>
    <text x="220" y="82" font-size="12" font-weight="bold" fill="#c2410c" text-anchor="middle">1000000</text>
    <text x="680" y="82" font-size="12" font-weight="bold" fill="#c2410c" text-anchor="middle">9999999</text>

    <!-- Center Label Badge (선이 가려지도록 배경 배지 적용) -->
    <rect x="345" y="46" width="210" height="28" fill="#ffffff" stroke="#f97316" stroke-width="1.5" rx="14"/>
    <text x="450" y="64" font-size="12" font-weight="bold" fill="#c2410c" text-anchor="middle">■ 최종 원하는 범위 완성 ■</text>
  </g>
</svg>



**1단계: 고무줄을 900만 배로 쫙 늘리기** 

(* 9000000)우리가 필요한 숫자의 개수(범위)가 총 900만 개이므로, 1cm짜리 고무줄을 900만 배로 팽팽하게 늘려준다. 

결과 범위: 0.000... ~ 8999999.999...

>이제 고무줄의 전체 길이는 900만cm가 된다.

**2단계: 소수점 싹둑 잘라내기** 

(Math.floor)아직 고무줄 위에는 4710600.3812... 같은 지저분한 소수점들이 묻어 있다. 

우리는 깔끔한 정수(자연수)만 필요하므로 소수점 이하는 버린다(floor).

결과 범위: 0, 1, 2, 3 ... 8999999 (총 900만 개의 정수)

>의미: 0부터 8,999,999까지 딱 떨어지는 정수 칸 900만 개가 완성된다.

**3단계: 시작 위치 이동시키기** 

(+ 1000000)위의 결과는 범위 개수(900만 개)는 맞지만, 시작점이 0입니다. 하지만 우리가 원하는 숫자는 1,000,000부터 시작해야 한다. 그래서 전체 결과를 오른쪽으로 100만 칸 이동(평행이동)시킨다.

* **최솟값:** `0` + 1,000,000 → **1,000,000**
* **최댓값:** `8,999,999` + 1,000,000 → **9,999,999** 

(최댓값)최종 결과: 1000000 ~ 9999999 사이의 정수!

이 공식이 너무 길고 번거롭다고 생각이 드는건 당연하다. 그래서 실무나 개인 프로젝트를 할 때는 아래처럼 나만의 함수(도구)를 하나 만들어 놓고 모듈처럼 재사용하면 그만이다. 

```javascript

//1. 공식을 가둔 나만의 만능 랜덤 함수를 만든다.

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 2. 이제부터는 귀찮은 공식 쓸 필요 없다.

let myNumber = getRandomInt(1000000, 9999999); // 100만~999만9999 사이 정수
let dice = getRandomInt(1, 6);                  // 1~6 사이 주사위 눈
```

요약하자면 자바스크립트가 0~1 사이의 기본 소수만 제공하다 보니, 우리가 [원하는 범위만큼 곱해서 늘리고] ➡ [소수점 자르고] ➡ [시작점으로 이동시키는] 수학적 가공을 직접 해주는 것이다. 


목적은 두 가지다.

- **연도 접두사**: 앞에 `2026`을 붙여서 언제 생성된 ID인지 한눈에 구분한다.
- **자릿수 고정 난수**: 뒤에 7자리, 2자리 난수를 붙여서 중복 가능성을 낮춘다.


이건 "min 이상 max 이하의 정수"를 뽑는 자바스크립트의 정석 공식이다.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 100" width="100%" height="100%">
  <!-- 배경을 투명하게 처리하여 블로그 테마와 자연스럽게 어울리도록 설정 -->
  <rect x="0" y="0" width="600" height="100" fill="transparent" />
  
  <!-- currentColor를 사용해 라이트모드(검은 글씨)/다크모드(흰 글씨) 자동 대응 -->
  <text x="50%" y="50%" font-family="'Times New Roman', Times, serif" font-size="26" fill="currentColor" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">
    Math.floor(Math.random() * (max - min + 1)) + min
  </text>
</svg>


- `Math.random() * (9999999 - 1000000 + 1) + 1000000` → 항상 1,000,000~9,999,999 사이 값, 즉 무조건 7자리
- 
- `Math.random() * (99 - 10 + 1) + 10` → 항상 10~99 사이 값, 즉 무조건 2자리

굳이 이렇게 복잡하게 계산하는 이유는 `000123`처럼 앞자리가 0으로 시작해서 자릿수가 줄어드는 문제를 막기 위해서다. 단순히 `Math.random() * 10000000` 을 쓰면 6자리, 5자리짜리 값이 나올 수 있기 때문이다.


## 2. 더 간단하게 만드는 3가지 대안

### 대안 ① Date.now() 활용 — 가장 실용적

밀리초 단위 타임스탬프(13자리 숫자)를 그대로 쓰는 방법이다. 코드가 짧고, 시간 순 정렬도 자연스럽게 된다.

```javascript
const id = `${date.getFullYear()}-${Date.now()}`;
// 결과 예시: 2026-1748293847291
```

### 대안 ② 문자열 자르기(slice) 활용

`Math.random()`이 만드는 소수점 이하 난수 문자열을 잘라서 원하는 자릿수만 뽑는 방식이다.

```javascript
const year = date.getFullYear();
const num1 = Math.random().toString().slice(2, 9); // 7자리
const num2 = Math.random().toString().slice(2, 4); // 2자리

const id = `${year}-${num1}-${num2}`;
// 결과 예시: 2026-8392014-57
```

주의할 점: `toString()` 결과가 지수 표기(`1e-7` 같은 형태)로 나오는 극히 드문 경우가 있어서, 완벽한 자릿수 보장이 필요하면 `padStart()`를 같이 쓰는 게 안전하다.

```javascript
const num1 = Math.random().toString().slice(2, 9).padEnd(7, '0');
```

### 대안 ③ crypto.randomUUID() — 진짜 유니크가 필요할 때

중복이 절대 발생하면 안 되는 식별자라면 표준 UUID를 쓰는 게 정답이다.

```javascript
const uniqueId = crypto.randomUUID();
// 결과 예시: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
```

Node.js 14.17+, 최신 브라우저 대부분에서 기본 지원한다. 다만 HTTPS 환경(또는 localhost)에서만 동작하는 제약이 있으니, 배포 환경이 http라면 막힐 수 있다.

### 추가 아이디어: nanoid 라이브러리

실무에서는 `crypto.randomUUID()`보다 짧고 URL-safe한 ID가 필요한 경우가 많다. 이럴 때 `nanoid` 패키지를 많이 쓴다.

```javascript
import { nanoid } from 'nanoid';
const id = nanoid(); // 예: V1StGXR8_Z5jdHi6B-myT
const shortId = nanoid(10); // 길이 지정 가능: LxV6Q3n8Rk
```

- UUID보다 짧으면서도 충돌 확률은 통계적으로 충분히 낮다.
- URL, 파일명 등에 쓰기 좋게 `-`, `_`만 포함하고 특수문자가 없다.

### 정리: 상황별 선택 기준

| 목적 | 추천 방법 |
|---|---|
| 그냥 임시 키, 테스트용 | `Date.now()` |
| 사람이 읽기 좋은 형태 유지하면서 랜덤값도 섞고 싶을 때 | slice 방식 |
| 절대 중복되면 안 되는 DB PK, 세션 ID | `crypto.randomUUID()` |
| 짧고 URL-safe한 공개 ID (짧은 링크, 초대 코드 등) | `nanoid` |

## 3. entries() 메서드 정리

### ① Object.entries()

객체의 모든 `[키, 값]` 쌍을 2차원 배열로 반환한다. `for...of`와 함께 쓰면 편하다.

```javascript
const user = { name: 'Kim', age: 25 };

console.log(Object.entries(user));
// [ ['name', 'Kim'], ['age', 25] ]

for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
// name: Kim
// age: 25
```

### ② Array.prototype.entries()

배열에서는 `[인덱스, 값]` 쌍을 반환한다.

```javascript
const colors = ['red', 'green', 'blue'];

for (const [index, color] of colors.entries()) {
  console.log(index, color);
}
// 0 'red'
// 1 'green'
// 2 'blue'
```

### 추가 예시: Map과 Set의 entries()

`Map`은 원래 `[key, value]` 구조라 entries()가 자연스럽게 어울린다.

```javascript
const map = new Map([['a', 1], ['b', 2]]);
for (const [key, value] of map.entries()) {
  console.log(key, value);
}
// a 1
// b 2
```

`Set`은 값만 있는 구조지만 entries()를 쓰면 `[값, 값]` 형태로 반환된다. 배열과 인터페이스를 맞추기 위한 설계다.

```javascript
const set = new Set(['x', 'y']);
for (const [a, b] of set.entries()) {
  console.log(a, b); // x x / y y
}
```

### 실무 활용: Object.entries() + map/filter 조합

객체를 배열처럼 다루고 싶을 때 자주 쓰는 패턴이다.

```javascript
const prices = { apple: 1000, banana: 500, cherry: 3000 };

// 가격이 1000원 이상인 것만 다시 객체로
const expensive = Object.fromEntries(
  Object.entries(prices).filter(([_, price]) => price >= 1000)
);
// { apple: 1000, cherry: 3000 }
```

`Object.entries()`로 배열화 → 배열 메서드로 가공 → `Object.fromEntries()`로 다시 객체화하는 흐름은 객체 데이터를 다룰 때 실무에서 아주 많이 쓰는 패턴이다.

## 4. DB / 로그 관점에서의 "엔트리"

- **DB 엔트리**: 테이블에 저장된 한 행(Row)을 가리킨다. "유저 테이블에 100개의 엔트리가 있다" = 100개의 레코드가 있다는 뜻.
- **로그 엔트리**: 로그 파일에 남는 한 줄 한 줄의 기록.
- **사전적 의미**: 항목, 등록, 참가자(entries list) 등 문맥에 따라 다양하게 쓰인다.

정리하면 `entries()`라는 메서드 이름 자체가 "키-값 쌍이 있는 항목들의 목록"이라는 일반적인 의미에서 따온 것이고, 이게 DB/로그의 "엔트리" 개념과도 자연스럽게 연결된다.
