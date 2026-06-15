---
title: "JavaScript 기초"
excerpt: "onlineDiary를 만들어보자"
categories:
  - JavaScript
tags:
  - JavaScript
  - 필기노트
toc: true
toc_sticky: true
---

<div class="my-wrong-note" markdown="1">


오늘은 JavaScript에 대해서 기초부터 차근차근 살펴보자

우선 JavaScript란 <strong>웹 페이지를 동적이고 상호작용할 수 있게 만들어주는 프로그래밍 언어</strong>라고 보면 된다. 

그 덕에 우리가 매일 마주하는 웹브라우저에서 다양한 움직임을 볼 수 있는 것이다.  
<br>
원래는 웹 브라우저 안에서만 동작하는 언어였지만, *Node.js*라는 실행 환경이 등장하면서 
서버(백엔드) 프로그램도 자바스크립트로 개발할 수 있게 되었다. 한마디로 프론트엔드와 백엔드를 모두 아우르는 '풀스택(Full-stack)' 개발이 가능해진 것. 그래서 이 자바스크립트의 인기가 치솟게 된 것이다. 또한 모바일 앱이나 데스크톱 프로그램까지 만들 수 있으니 개발자로서는 반드시 배워야할 언어이다. 

작업에 앞서 HTML 뼈대와 연동시켜야 하는데 2가지 방법이 있다. 

CSS와 방식은 똑같으나 연동시키는 태그만 다르니 잘 구별해서 살펴보자. 

첫 번째로 내부(Internel)적으로 하나하나 기입하는 방식이 존재한다.
```
<script language="javascript">
```
하지만 위와 같은 방식은 추천하지 않는다. 본문이 굉장히 지저분해지고 판독하기도 수정하기도 어렵다. 

CSS 때와 마찬가지로 우리는 외부(External)에서 파일을 만들어 연동시킨다.
```
<script src="./index(파일명).js"></script>
```
`index.js`파일을 이처럼 연동시키면 완전히 합체된다. 

기존의 파이썬 언어의 경우 외부 파일을 모듈로 빼서 작업한 다음 연결시키면 from 폴더 import 파일명 이런식으로
해당 모듈이 필요한 곳마다 각주처럼 주렁주렁 써놔야했다. (말이 각주지 가장 상단에 위치한다.)

하지만 JavaScript의 경우 저렇게 한번 연동시키면 마치 한 문서인양 통합된다. 굉장히 편할 수도 있지만 겹치는 변수명은 없는지 더 꼼꼼하게 살펴야한다. 

저렇게 연동시키고 나면 그 index(파일명).js 에서 신나게 작업하면 된다. 

먼저 javascript에서 변수는 `var`, `let`, `const`를 사용해서 선언한다. 

var는 예전 방식이고 let이 최근에는 보편적으로 사용하는 방식이다. 
고로 앞으로는 let으로 통일한다. 그리고 const는 문자 그대로 상수를 선언할 때 사용하면 된다.
참고로 Python에서는 따로 상수로 선언하는 방법은 없다. 

```
let num = 10;
console.log('num: ', num)   
```
console.log() 는 Python언어의 print()와 거의 동일하다. 결과물을 출력해준다. 

이제 본격적으로 어떤 방식과 흐름으로 HTML과 연동되고 동적인 결과물을 만들 수 있는지 살펴보자. 

먼저 DOM(Document Object Model)에 대해 알아야 한다. 

DOM이란? 

HTML 텍스트 문자를 자바스크립트가 이해할 수 있는 객체(Object), 뭐 썸띵을 만들어 낸다고 보면 된다. 

보통 DOM TREE 구조라고 하는데 

대충 이런 HTML코드문서가 있다고 치면 
```
HTML
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
웹 브라우저가 이러한 HTML 텍스트 파일을 다운로드하여 위에서부터 아래로 렌더링 엔진을 통해 
지이이잉 읽어 들이는 과정을 파싱(Parsing)이라고 한다. 

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
                * 

파싱(Parsing)을 거쳐 자바스크립트가 이해하고 조작할 수 있는 위와 같은 '데이터 구조(DOM 트리)'로 컴퓨터 메모리상에 구축하게 된다. 

이 하나하나의 요소를 노드(Node)라고 부르며 이 노드들 사이에는 가족 같은 관계가 형성되어있다. 

트리의 가장 꼭대기에 있는 노드는 루트 노드로  DOM에서는 항상 `document` 객체가 루트가 된다.

자바스크립트는 결국 이 DOM 트리에 접근해서 HTML문서를 마음대로 조작할 수 있는 권한을 가지게 된다. 


이제는 본격적으로 실습에 들어가보자.


```
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOCUMENT READY')

    init();   -> 일종의 시작 버튼 역할 

});
```

document는 좀전에 루트 노드라고 잠깐 소개한 바 있는데 이 아이가 바로 자바스크립트의 핵심이다.   

여기 코드로서의 document란 웹 브라우저를 만든 구글, 애플 등에서 자바스크립트로 웹페이지를 조작하게금 만든 Web API라는 도구 상자를 활용할 수 있게 해주는 내장된 객체(Built-in Object)를 말한다.

즉, document는 브라우저 환경에서 자바스크립트가 실행될 때 기본적으로 내장된 최상위 리모컨(루트 노드)인 것이다. 

document: 브라우저가 제공한 루트 노드 (리모컨)

addEventListener: EVENT가 발생하는지 귀 기울여 듣기

DOMContentLoaded: HTML 텍스트를 다 읽어서 DOM 트리 구축(Parsing)이 완벽하게 끝난 시점

어려운 말 같지만 비교적 심플하다. 

웹 브라우저가 렌더링하면서 HTML문서를 쭉 읽어나갈 것이다. 
그렇게 쭉 모두 다 읽어서 자바스크립트가 해석할 수 있도록 DOM트리 구조로 객체를 찍어낸다.  
딱 그 시점이 "DOMContentLoaded"이다. 

그 이후로 자바스크립트는 HTML문서를 해석해서 자기 마음대로 조작할 수 있게 되는데
addEventListener()는 DOMContentLoaded 딱 이 시점만 지나면 function(), 즉 함수들을 이벤트나 조건 따라 자동 실행하게 해준다.

DOM구조로 객체가 튀어나오기도 전에, 예를 들어 `<input class="sign-up">` 너 사라졌다가 튀어나와!" 하고 명령하면 
당연히 그 태그가 어디있는지도 모른체 에러만 쏟아낼 것이다. 

다시 본론으로 넘어와서

위의 init(); 함수를 바깥에서 정리해보자. 안에 전부 우겨넣어도 되지만 가독성을 위해 밖으로 빼보았다. 
```
function init() {
    console.log('init() CALLED!!')
    initViews();
    addEvents();
}
```
큰 틀에서 'view', 그리고 'event' 함수 두 부분으로 나눠질 수 있다.
'event' 함수는 트리거가 될 것이고, 'view'함수는 원하는 동적 결과물을 조건에 맞춰 제공할 것이다. 

아래는 view 와 event 관련 함수를 위한 기본 세팅이다. 
앞으로 이 세팅값을 기준으로 서로 연동되어 활약하게 된다. 

```
const SIGN_UP_VIEW = 1;  -> const를 통해 상수로 선언했음을 알 수 있다. 
const SIGN_IN_VIEW = 2;    
const SIGN_OUT_VIEW = 3;     
const DIARY_WRITE_VIEW = 4;
const DIARY_LIST_VIEW = 5;
 
signUpWrap = '';   -> 정수(int)나 실수(float)형태의 숫자라면 0이겠지만
signInWrap = '';      문자열 형태는 ''로 초기 형태를 전역변수로
writeWrap = '';       선언하면 된다. 
listWrap = '';

function initViews() {
    console.log('initViews() CALLED!!')

    signUpWrap = document.querySelector('div.sign_up_wrap');
    signInWrap = document.querySelector('div.sign_in_wrap');
    writeWrap = document.querySelector('div.write_wrap');
    listWrap = document.querySelector('div.list_wrap');
   
}
```
여기서 가장 핵심은 바로 `document.querySelector()` 이 부분이다. 

querySelector()란 

CSS에서 디자인을 입힐 때 쓰던 '선택자' 문법을 그대로 사용하여 특정 태그를 콕 찍어 작업할 수 있게 해주는

일종의 스나이퍼 역할을 담당한다. 
```
사용법은 CSS 선택자 문법과 동일하니 혹시 모르면 이전 블로그 내용을 참조하면 된다. //여기 블로그 링크달면 좋겠음

단 CSS와의 차이점은 반드시 짚고 넘어가야하는데

const myButton = document.querySelector('.btn');
<button class="btn">이 10개가 있다해도 그 버튼들을 모두 가져오지 않습니다. DOM 트리를 위에서부터 쭉 훑어 내려오다가 가장 먼저 발견한 첫 번째 .btn 요소 딱 하나만 가져오고 탐색을 종료해 버립니다. CSS의 경우는 전부 적용시키는 점과 구별된다. 

여러 개를 다 가져오고 싶다면, 뒤에 'All'이 붙은 **document.querySelectorAll()**을 사용하면 된다.

```
    ...
    signUpWrap = document.querySelector('div.sign_up_wrap');
    ...
```
('div.sign_up_wrap') 이면 div태그에서 class명이 sign_up_wrap인 아이만 딱 고른거다.

정리하면  sign_up, sign_in, write, list 각각의 블록을 찦어내고, view함수에서 이를 매개변수로 사용하기

위해 전역변수화 한 것이다. 

```
function showSelectedView(viewNo) {
    console.log('showSelectedView() CALLED!!');

    switch(viewNo) {
        case SIGN_UP_VIEW:
        //회원 가입 화면 보이게 하자!
        signUpWrap.style.display = 'block';  
        signInWrap.style.display = 'none';
        writeWrap.style.display = 'none';
        listWrap.style.display = 'none';
        break;

        case SIGN_IN_VIEW:
        //로그인 화면 보이게 하자!
        signUpWrap.style.display = 'none';  
        signInWrap.style.display = 'block';
        writeWrap.style.display = 'none';
        listWrap.style.display = 'none';
        break;

        case SIGN_OUT_VIEW:
        //로그아웃!
        break;

        case DIARY_WRITE_VIEW:
        //일기작성 화면 보이게!
        signUpWrap.style.display = 'none';  
        signInWrap.style.display = 'none';
        writeWrap.style.display = 'block';
        listWrap.style.display = 'none';
        break;

        case DIARY_LIST_VIEW:
        //일기리스트 화면 보이게!
        signUpWrap.style.display = 'none';  
        signInWrap.style.display = 'none';
        writeWrap.style.display = 'none';
        listWrap.style.display = 'block';
        break;
    }
}
```

코드는 길어보이지만 비교적 굉장히 단순한 구조이다.
showSelectedView(viewNo) -> viewNo는 아까 상수화했던 숫자들이다.
<br>
```
const SIGN_UP_VIEW = 1;  
const SIGN_IN_VIEW = 2;
.
.
.
```
이 숫자를 입력해 SIGN_UP 상황인지 SIGN_IN인지 등 구별하는거다.
```
switch(viewNo) {
        case SIGN_UP_VIEW:  -> 
        signUpWrap.style.display = 'block';  <--- 이부분에 효과를 줌
        signInWrap.style.display = 'none';
        writeWrap.style.display = 'none';
        listWrap.style.display = 'none';
        break;
        .
        .
        .
```
switch()라는 함수를 통해 SIGN_UP의 상황에서 어떤 효과를 줄 것이지 정할 수 있다.
case는 의 경우에 라는 영단어 느낌 그대로 이해하면 된다.

```
signUpWrap.style.display = 'block';  
```
CSS선택자처럼 찦어낸 `signUpWrap`의 스타일과 디스플레이 방식을 'block' 즉 한 블럭 쫙 구현하라는 말이다.


위 내용을 쭉 정리하면  SIGN UP 상황에선 `const SIGN_UP_VIEW = 1;` 일거고

좀 전에 전역변수로 지정해둔
`signUpWrap = document.querySelector('div.sign_up_wrap')`이란 div태그 블록이

case SIGN_UP_VIEW: 인 상황에서

signUpWrap.style.display = 'block' 해당 블록은 보이고
signInWrap, writeWrap, listWrap 다른 블록은 그냥 'none' 즉 사라져있게 
말 그대로 switch 시키는거다.

그러면 우리가 회원가입을 하거나 로그인을 하게되면 클릭하는 버튼이 있다
이 버튼을 눌렀을 때 바로 바로 해당 화면이 출력될 수 있게 연동시켜보자.

```
function addEvents() {
    console.log('addEvents() CALLED!!')

    let signUpMenuBtn = document.querySelector('div.menu_wrap a.sign-up');
    signUpMenuBtn.addEventListener('click', function() {
        console.log('signUpMenuBtn CLICKED!!');

        showSelectedView(SIGN_UP_VIEW)
      });
      .
      .
      .
```
 어차피 다른 항목들도 똑같은 코딩 방식으로 변수명만 달라지기 때문에 하나만 살펴보자.

   여기서는  addEvents()라는 함수를 사용했다. 말 그대로 클릭과 같은 이벤트들이 생겨났을 때
그에 대응하는 효과를 주기 위한 기능을 수행한다.

차례 차례 분석해보면,
``
 let signUpMenuBtn = document.querySelector('div.menu_wrap a.sign-up');
```
```HTML
 <div class="menu_wrap">
            <a class="sign-up" href="#none">Sign-up</a>
```
우선 querySelector를 통해 'div태그 중 menu_wrap라는 클래스명을 가지고 있고 후손들인 a태그 중에 
sign-up이라는 클래스명을 가진 태그를 정확하게 찦어내서 `signUpMenuBtn`라는 변수명으로 변수화 한 것이다. 

여기서 함수 외부에서도 변수를 활용하려면 let을 사용하지 말고 아까처럼 바깥으로 전역변수화 해야하지만 지금의 경우는 지역변수로써 안에서 활용되어 매개변수로 넘어가기 때문에 이렇게 진행한다.
```
signUpMenuBtn.addEventListener('click', function() {}
```
아까 찦어낸 태그인 signUpMenuBtn에게 addEventListener()라는 이벤트 리스너를 달아놓고 'click'이라는 이벤트가 발생할 시에 function()을 자동실행해라. 그런데 
```
  showSelectedView(SIGN_UP_VIEW) 좀 전에 만든 view함수부분에 있는 바로 그 함수다. 
```

 즉 signUpMenuBtn(a태그)을 클릭하면 signUpWrap(div태그)이 나타난다. 


이제 마지막으로 회원가입을 할 때 그 정보들을 db에 저장하는 방법을 살펴보자. 

```
function addEvents() {

이하 중략

let signUpBtn = document.querySelector('div.sign_up_wrap > input[type="button"]');
    signUpBtn.addEventListener('click',function() {   
        console.log('signUpBtn CALLED');

        let u_id = document.querySelector('div.sign_up_wrap > input[name="u_id"]').value;
        let u_pw = document.querySelector('div.sign_up_wrap > input[name="u_pw"]').value;
        let u_mail = document.querySelector('div.sign_up_wrap > input[name="u_mail"]').value;

        addMember(u_id,u_pw,u_mail);

        alert('SIGN UP SUCCESS!');

        document.querySelector('div.sign_up_wrap > input[name="u_id"]').value = '';
        document.querySelector('div.sign_up_wrap > input[name="u_pw"]').value = '';
        document.querySelector('div.sign_up_wrap > input[name="u_mail"]').value = '';
        // 화면 입력칸에는 방금 내가 적었던 비밀번호와 개인정보 비우기
       
    });
```
```
let signUpBtn = document.querySelector('div.sign_up_wrap > input[type="button"]');
    signUpBtn.addEventListener('click',function() { 
```
이제 이 부분은 너무나도 쉽다. div태그 중 클래스명이 sign_up_wrap인 태그에서 직계자손인 input태그에서 type="button"인 경우를 찦어낸 것이다. 거기에 addEventListener()를 달고 클릭을 하게 되면 함수를 자동실행하게 될 것이다. 

```
        let u_id = document.querySelector('div.sign_up_wrap > input[name="u_id"]').value;
        let u_pw = document.querySelector('div.sign_up_wrap > input[name="u_pw"]').value;
        let u_mail = document.querySelector('div.sign_up_wrap > input[name="u_mail"]').value;

         addMember(u_id,u_pw,u_mail);   -> db에 자료를 넣어주는 함수다 
```
``
let u_id = document.querySelector('div.sign_up_wrap > input[name="u_id"]').value;
```
하나만 살펴보면  u_id로 변수를 만들껀데,
```
'div.sign_up_wrap > input[name="u_id"]'  <--사용자가 입력창에 입력한 값을 말함
```
클래스명이 sign_up_wrap인 div태그 안에 있는 name="u_id"인 input 태그에

사용자가 아이디를 입력하면 그 정보의 (.value;) 값을 변수화해서

addMember(u_id,u_pw,u_mail); 저장한다는 것이다.


```
document.querySelector('div.sign_up_wrap > input[name="u_id"]').value = '';
```
그리고 입력한 내 아이디 정보는 계속 입력창에 띄어놓는건 개인정보 유출이기 때문에 이를
다시 '' 초기화하는 작업을 해주는 것이다. 


</div>
