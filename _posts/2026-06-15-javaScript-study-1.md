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
웹 브라우저가 이러한 HTML 텍스트 파일을 다운로드하여 위에서부터 아래로 렌더링 엔진이 
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

    init();   -> 일종의 시작 버튼

});
```

document는 좀전에 루트 노드라고 잠깐 소개한 바 있는데 이 아이가 바로 자바스크립트의 핵심이다.   

여기서 document란 웹 브라우저를 만든 구글, 애플 등에서 자바스크립트로 웹페이지를 조작하게금 Web API라는 도구 상자를 만들어 놨는데, 이를 활용할 수 있게 해주는 내장된 객체(Built-in Object)이다.

즉, document는 브라우저 환경에서 자바스크립트가 실행될 때 기본적으로 내장된 최상위 리모컨(루트 노드)인 것이다. 

document: 브라우저가 제공한 루트 노드 (리모컨)

addEventListener: EVENT가 발생하는지 귀 기울여 듣기

DOMContentLoaded: HTML 텍스트를 다 읽어서 DOM 트리 구축(Parsing)이 완벽하게 끝난 시점

어려운 말 같지만 비교적 심플하다. 

웹 브라우저가 렌더링하면서 HTML문서를 쭉 읽어나갈 것이다. 
그렇게 쭉 다 읽어서 자바스크립트가 해석할 수 있도록 DOM트리 구조로 객체를 찍어낸다.  
딱 그 시점이 "DOMContentLoaded"이다. 

그 이후로 자바스크립트는 HTML문서를 해석해서 자기 마음대로 조작할 수 있게 되는데
addEventListener()는 DOMContentLoaded 딱 이 시점만 지나면 function(), 즉 함수들을 이벤트나 조건 따라 자동 실행하게 해준다.

DOM구조로 객체가 튀어나오기도 전에, 예를 들어 `<input class="sign-up">` 너 사라졌다가 튀어나와!" 하고 명령하면 
당연히 그 태그가 어디있는지도 모른체 에러가 쏟아질 것이다. 


위의 init(); 함수를 바깥에서 정리한다. 안에 다가 우겨넣어도 되지만 가독성을 위해 밖으로 빼보았다. 
```
function init() {
    console.log('init() CALLED!!')
    initViews();
    addEvents();
}
```
큰 틀에서 'view', 그리고 'event' 함수 즉 기능들을 분리하여 연동시켜주면 된다.

click이라든지 로그인에 성공했다든지 이런 각종 event(?)들이 발생하면 그 상황에 맞춰 어떤 결과를 출력하고 보여줄지 
view 함수 쪽에서 담당하는거다. 

```
const SIGN_UP_VIEW = 1;  -> const를 통해 상수로 선언했음을 알 수 있다. 
const SIGN_IN_VIEW = 2;    
const SIGN_OUT_VIEW = 3;     
const DIARY_WRITE_VIEW = 4;
const DIARY_LIST_VIEW = 5;
 

signUpWrap = '';
signInWrap = '';
writeWrap = '';
listWrap = '';

function initViews() {
    console.log('initViews() CALLED!!')

    signUpWrap = document.querySelector('div.sign_up_wrap');
    signInWrap = document.querySelector('div.sign_in_wrap');
    writeWrap = document.querySelector('div.write_wrap');
    listWrap = document.querySelector('div.list_wrap');
   
}
```



    
   

</div>
