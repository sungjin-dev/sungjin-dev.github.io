---
title: "JavaScript 기초"
excerpt: "onlineDiary를 만들어보자"
categories: [JavaScript]
tags:
  - JavaScript
  - 필기노트
toc: true
toc_sticky: true
---

오늘은 JavaScript에 대해서 기초부터 차근차근 살펴보자.
<br>
우선 JavaScript란 **웹 페이지를 동적이고 상호작용할 수 있게 만들어주는 프로그래밍 언어**라고 보면 된다. 그 덕에 우리가 매일 마주하는 웹 브라우저에서 다양한 움직임을 볼 수 있는 것이다. 
<br><br>
원래는 웹 브라우저 안에서만 동작하는 언어였지만, **Node.js**라는 실행 환경이 등장하면서 서버(백엔드) 프로그램도 자바스크립트로 개발할 수 있게 되었다. 한마디로 프론트엔드와 백엔드를 모두 아우르는 **'풀스택(Full-stack)'** 개발이 가능해진 것! 
<br>
그래서 이 자바스크립트의 인기가 치솟게 된 것이다.
<br>
또한 모바일 앱이나 데스크톱 프로그램까지 만들 수 있으니 개발자로서는 반드시 배워야 할 언어이다. 
<br><br>
작업에 앞서 HTML 뼈대와 연동시켜야 하는데 2가지 방법이 있다. CSS와 방식은 똑같으나 연동시키는 태그만 다르니 잘 구별해서 살펴보자. 
<br><br>
첫 번째로 **내부(Internal)** 적으로 하나하나 기입하는 방식이 존재한다.

```html
<script language="javascript">
  // 자바스크립트 코드
</script>
```

하지만 위와 같은 방식은 추천하지 않는다. 본문이 굉장히 지저분해지고 판독하기도, 수정하기도 어렵다. CSS 때와 마찬가지로 우리는 외부(External)에서 파일을 만들어 연동시킨다.

```html
<script src="./index.js"></script>
```

`index.js` 파일을 이처럼 연동시키면 완전히 합체된다. 

기존의 파이썬(Python) 언어의 경우 외부 파일을 모듈로 빼서 작업한 다음 연결시키면 `from 폴더 import 파일명` 이런 식으로 해당 모듈이 필요한 곳마다 각주처럼 주렁주렁 써놔야 했다. 
<br><br>
하지만 JavaScript의 경우 저렇게 한 번 연동시키면 마치 한 문서인 양 통합된다. 굉장히 편할 수도 있지만 겹치는 변수명은 없는지 더 꼼꼼하게 살펴야 한다. 
<br>
저렇게 연동시키고 나면 그 `index.js` 파일에서 신나게 작업하면 된다. 

---

### 변수 선언: var, let, const

먼저 JavaScript에서 변수는 `var`, `let`, `const`를 사용해서 선언한다. 
<br>
`var`는 예전 방식이고, `let`이 최근에는 보편적으로 사용하는 방식이다. 
<br>
고로 **var대신 `let`으로 통일한다.** 그리고 `const`는 문자 그대로 **상수**를 선언할 때 사용하면 된다. (참고로 Python에서는 따로 상수로 선언하는 방법은 없다.)
<br>
현업에서는 안전성을 위해 기본적으로 const를 쓰고, 값이 바뀔 변수에만 let을 사용한다는 점도 알아두자. 

```javascript
let num = 10;
console.log('num: ', num);
```
`console.log()` 는 Python 언어의 `print()`와 거의 동일하다. 결과물을 콘솔창에 출력해 준다. 

---

### DOM (Document Object Model) 이란?

이제 본격적으로 어떤 방식과 흐름으로 HTML과 연동되고 동적인 결과물을 만들 수 있는지 살펴보자. 그전에 **DOM(Document Object Model)**에 대해 알아야 한다. 

DOM이란, **HTML 텍스트 문자를 자바스크립트가 이해할 수 있는 객체(Object) 형태로 만들어 낸 것**이라고 보면 된다. 보통 **DOM TREE 구조**라고 부르는데, 대충 아래와 같은 HTML 코드 문서가 있다고 치자.

```javascript
<html>
  <head>
    <title>성진 블로그</title>
  </head>
  <body>
    <h1>안녕하세요!</h1>
    <p>환영합니다.</p>
  </body>
</html>
```

웹 브라우저가 이러한 HTML 텍스트 파일을 다운로드하여 위에서부터 아래로 렌더링 엔진을 통해 지이이잉 읽어 들이는 과정을 **파싱(Parsing)**이라고 한다. 

* `Document` (최상위 뿌리)
    * `<html>`
        * `<head>`
            * `<title>`
                * "내 블로그" (텍스트)
        * `<body>`
            * `<h1>`
                * "안녕하세요!" (텍스트)
            * `<p>`
                * "환영합니다." (텍스트)

파싱을 거쳐 자바스크립트가 이해하고 조작할 수 있는 위와 같은 **'데이터 구조(DOM 트리)'**로 컴퓨터 메모리상에 구축하게 된다. 

이 하나하나의 요소를 **노드(Node)**라고 부르며 이 노드들 사이에는 가족 같은 관계가 형성되어 있다. 트리의 가장 꼭대기에 있는 노드는 **루트 노드(Root Node)**로, DOM에서는 항상 `document` 객체가 루트가 된다.

결국 자바스크립트는 이 **DOM 트리에 접근해서 HTML 문서를 마음대로 조작할 수 있는 권한**을 가지게 되는 것이다. 

---

### 본격적인 실습: onlineDiary 만들기

```javascript
document.addEventListener('DOMContentLoaded', function() {
    init(); // -> 일종의 시작 버튼 역할 
});
```

`document`는 좀 전에 루트 노드라고 잠깐 소개한 바 있는데, 이 아이가 바로 자바스크립트의 핵심이다. 

여기서의 `document`란 웹 브라우저를 만든 구글, 애플 등에서 자바스크립트로 웹페이지를 조작하게끔 만든 **Web API**라는 도구 상자를 활용할 수 있게 해주는 **내장된 객체(Built-in Object)**를 말한다. 즉, `document`는 브라우저 환경에서 자바스크립트가 실행될 때 기본적으로 내장된 **최상위 리모컨(루트 노드)**인 것이다. 

* **`document`**: 브라우저가 제공한 루트 노드 (리모컨)
* **`addEventListener`**: EVENT가 발생하는지 귀 기울여 듣기
* **`DOMContentLoaded`**: HTML 텍스트를 다 읽어서 DOM 트리 구축(Parsing)이 완벽하게 끝난 시점

어려운 말 같지만 비교적 심플하다. 

웹 브라우저가 렌더링하면서 HTML 문서를 쭉 읽어나갈 것이다. 그렇게 쭉 모두 다 읽어서 자바스크립트가 해석할 수 있도록 DOM 트리 구조로 객체를 찍어낸다. **딱 그 완성 시점이 "DOMContentLoaded"이다.** 그 이후로 자바스크립트는 HTML 문서를 해석해서 자기 마음대로 조작할 수 있게 되는데, `addEventListener()`는 이 시점만 지나면 함수들을 이벤트나 조건에 따라 자동 실행하게 해준다.

DOM 구조로 객체가 튀어나오기도 전에, 예를 들어 *"`<input class="sign-up">` 너 사라졌다가 튀어나와!"* 하고 명령하면 당연히 그 태그가 어디 있는지도 모른 채 에러만 쏟아낼 것이다. 

다시 본론으로 넘어와서, 위의 `init();` 함수를 바깥에서 정리해 보자. 안에 전부 우겨넣어도 되지만 **가독성을 위해 밖으로 빼보았다.**

```javascript
function init() {
    initViews();
    addEvents();
}
```

큰 틀에서 **'view'**와 **'event'** 함수 두 부분으로 나눌 수 있다. 'event' 함수는 트리거가 될 것이고, 'view' 함수는 원하는 동적 결과물을 조건에 맞춰 제공할 것이다. 

아래는 view와 event 관련 함수를 위한 기본 세팅이다. 앞으로 이 세팅값을 기준으로 서로 연동되어 활약하게 된다. 

```javascript
const SIGN_UP_VIEW = 1;  // const를 통해 상수로 선언
const SIGN_IN_VIEW = 2;    
const SIGN_OUT_VIEW = 3;     
const DIARY_WRITE_VIEW = 4;
const DIARY_LIST_VIEW = 5;
 
let signUpWrap = '';   // DOM 객체인 HTML 요소를 ''로 초기 형태로 
let signInWrap = '';   // 전역변수로 선언하면 된다. (혹은 null)
let writeWrap = '';    
let listWrap = '';

function initViews() {
    signUpWrap = document.querySelector('div.sign_up_wrap');
    signInWrap = document.querySelector('div.sign_in_wrap');
    writeWrap = document.querySelector('div.write_wrap');
    listWrap = document.querySelector('div.list_wrap');
}
```

여기서 가장 핵심은 바로 **`document.querySelector()`**이다. 

`querySelector()`란 CSS에서 디자인을 입힐 때 쓰던 **'선택자' 문법을 그대로 사용**하여 특정 태그를 콕 집어 작업할 수 있게 해주는 일종의 스나이퍼 역할을 담당한다. 사용법은 CSS 선택자 문법과 동일하다. 

단, CSS와의 차이점은 반드시 짚고 넘어가야 한다.

```javascript
const myButton = document.querySelector('.btn');
```

만약 `<button class="btn">`이 10개가 있다 해도 그 버튼들을 모두 가져오지 않는다. DOM 트리를 위에서부터 쭉 훑어 내려오다가 **가장 먼저 발견한 첫 번째 `.btn` 요소 딱 하나만 가져오고 탐색을 종료**해 버린다. 여러 개를 다 가져오고 싶다면, 뒤에 'All'이 붙은 **`document.querySelectorAll()`**을 사용하면 된다.

```javascript
signUpWrap = document.querySelector('div.sign_up_wrap');
```
이 코드는 `div` 태그 중 클래스명이 `sign_up_wrap`인 아이만 딱 고른 거다. 
<br><br>
정리하면, 효과를 줄 각각 블록을 짚어내 객체로 만들고, view 함수에서 이를 매개변수로 사용하기 위해 전역변수화 한 것이다. 

---

### 화면 전환 로직 (Switch)

```javascript
function showSelectedView(viewNo) {
    console.log('showSelectedView() CALLED!!');

    switch(viewNo) {
        case SIGN_UP_VIEW:
            // 회원 가입 화면 보이게 하자!
            signUpWrap.style.display = 'block';  
            signInWrap.style.display = 'none';
            writeWrap.style.display = 'none';
            listWrap.style.display = 'none';
            break;

        case SIGN_IN_VIEW:
            // 로그인 화면 보이게 하자!
            signUpWrap.style.display = 'none';  
            signInWrap.style.display = 'block';
            writeWrap.style.display = 'none';
            listWrap.style.display = 'none';
            break;

        case SIGN_OUT_VIEW:
            // 로그아웃!
            break;

        case DIARY_WRITE_VIEW:
            // 일기작성 화면 보이게!
            signUpWrap.style.display = 'none';  
            signInWrap.style.display = 'none';
            writeWrap.style.display = 'block';
            listWrap.style.display = 'none';
            break;

        case DIARY_LIST_VIEW:
            // 일기리스트 화면 보이게!
            signUpWrap.style.display = 'none';  
            signInWrap.style.display = 'none';
            writeWrap.style.display = 'none';
            listWrap.style.display = 'block';
            break;
    }
}
```

코드는 길어 보이지만 구조는 굉장히 단순하다. `showSelectedView(viewNo)`에서 `viewNo`는 아까 상수화했던 숫자들이다. 이 숫자를 입력해 SIGN_UP 상황인지 SIGN_IN 상황인지 구별하는 거다.

`switch()`라는 함수를 통해 특정 상황에서 어떤 효과를 줄 것인지 정할 수 있다. `case`는 '어떠한 경우에'라는 영단어 느낌 그대로 이해하면 된다. 

```javascript
signUpWrap.style.display = 'block';  
```

이 코드는 짚어낸 `signUpWrap`의 스타일과 디스플레이 방식을 `'block'`(즉 한 블록으로 쫙 구현해라)으로 바꾸라는 말이다. 반대로 나머지 블록들은 그냥 `'none'` 처리해서 사라지게 만들며 말 그대로 화면을 스위치(Switch) 시키는 원리다.

---

### 이벤트 연동하기 (Event Listener)

그러면 우리가 회원가입을 하거나 로그인을 할 때 클릭하는 버튼과 화면을 연동시켜보자.

```javascript
function addEvents() {
    let signUpMenuBtn = document.querySelector('div.menu_wrap a.sign-up');
    
    signUpMenuBtn.addEventListener('click', function() {
        showSelectedView(SIGN_UP_VIEW);
    });
    // ...
}
```

여기서는 `addEvents()`라는 함수를 사용했다. 클릭과 같은 이벤트들이 생겨났을 때 그에 대응하는 효과를 주기 위한 기능을 수행한다.

1. 우선 `querySelector`를 통해 해당 태그(메뉴 랩 안에 있는 a 태그)를 정확하게 짚어내서 `signUpMenuBtn`이라는 지역변수로 담았다.
2. 짚어낸 태그에 `addEventListener('click')`을 달아놓고 클릭 이벤트가 발생할 시 함수를 자동 실행하게 한다.
3. 그 함수 안에 방금 만든 `showSelectedView(SIGN_UP_VIEW)`를 넣어주면, 메뉴 버튼을 클릭했을 때 회원가입 화면(signUpWrap)이 짠 하고 나타나게 된다!

---

### 입력된 데이터 DB에 저장하기

이제 마지막으로 회원가입을 할 때 그 정보들을 DB에 저장하는 방법을 살펴보자. 

```javascript
function addEvents() {
    // ... 중략 ...
    let signUpBtn = document.querySelector('div.sign_up_wrap > input[type="button"]');
    
    signUpBtn.addEventListener('click', function() {   
        // 1. 사용자가 입력한 값(value) 가져오기
        let u_id = document.querySelector('div.sign_up_wrap > input[name="u_id"]').value;
        let u_pw = document.querySelector('div.sign_up_wrap > input[name="u_pw"]').value;
        let u_mail = document.querySelector('div.sign_up_wrap > input[name="u_mail"]').value;

        // 2. DB에 자료를 넣어주는 함수 호출
        addMember(u_id, u_pw, u_mail);

        // 3. 화면 입력칸 비우기 (초기화)
        document.querySelector('div.sign_up_wrap > input[name="u_id"]').value = '';
        document.querySelector('div.sign_up_wrap > input[name="u_pw"]').value = '';
        document.querySelector('div.sign_up_wrap > input[name="u_mail"]').value = '';
    });
}
```

사용자가 아이디를 입력하면 그 태그의 **값(`.value;`)**을 가져와서 변수화한 뒤, `addMember()` 함수를 통해 넘겨준다. 그리고 개인정보 보호를 위해 방금 적었던 입력창의 값을 `''`(빈 문자열)로 초기화해 주는 작업도 잊지 않는다.

그러면 도대체 어떻게 저장하는 걸까? 개인적으로 데이터베이스 관련 코드는 `db.js` 이런 식으로 외부 파일로 분리해서 관리하는 걸 추천한다. `<script src="./js/db.js"></script>` 이렇게 한 줄만 추가해 주면 훨씬 깔끔하다.

```javascript
const memberDB = new Map();

const addMember = (id, pw, mail) => {
    memberDB.set(id, {
        u_id: id,
        u_pw: pw,
        u_mail: mail
    });
}
```

최신 자바스크립트(ES6)에서는 '키(Key)와 값(Value)'을 짝지어 저장하는 데 특화된 **Map**이라는 기능이 있다. 일반 객체(`{}`) 대신 `Map`을 사용하는 이유는 데이터 관리가 훨씬 편리하기 때문이다. 

* `memberDB.set()`으로 쉽게 데이터를 넣고,
* `memberDB.get()`으로 쏙 빼올 수 있으며,
* `memberDB.size`를 쓰면 현재 가입한 회원이 총 몇 명인지 단번에 알 수 있다.

`addMember` 함수를 통해 건네받은 매개변수(id, pw, mail)들을 차곡차곡 사물함(DB)에 저장하면서 오늘 배운 자바스크립트 기초 흐름이 완성된다.


