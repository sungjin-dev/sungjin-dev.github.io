---
title: "CSS 기초. 선택자와 그 사용법"
excerpt: "외부 css파일에 선택자 입력하는 방법"
categories:
  - Python
tags:
  - Python
  - 필기노트
toc: true
toc_sticky: true
---

오늘은 css를 배웠다. 

우선 아주 기본적인 골격은 다음과 같다 
<div class="blank-space"></div>
```
선택자 {

  속성 : 값;
  
}
```
<div class="blank-space"></div>
프로그래밍 언어를 공부하다보면 굉장히 친숙한 딕셔너리(json) 형태의 구조이다. 

여기서, 선택자 (Selector)란 디자인 속성을 적용할 대상이고   

속성 (Property)은 크기, 색상, 여백 등 변경하고 싶은 특질이며   

ex. width, border, position

값 (Value)은 말 그대로 속성에 구체적으로 들어가는 수치나 비율 상태 등을 말한다.     

ex. relative, 100px, solid

<br>
보통 css작업을 할 때면 html 본문에 작업할 body태그 뼈대 위에
<br>

```
<link href="css파일경로" rel="stylesheet">
```  
<br>
이런식으로 외부 파일에서 깔끔하게 정리해서 적용시키는 방식을 주로 하게 된다. (external방식)

이렇게 외부로 뺀 css파일은 당연히 확장자도 파일명.css 이고 보통 common.css도 만들어서 진행한다. 

common파일은 영문 그대로 공통적으로 적용할 속성들을 미리 세팅해놓는 용도다.

<div class="blank-space"></div>
주로 
```
* { margin:0; padding:0;}
* 
a { text-decoration: none; color:#242424}

a:hover {text-decoration: underline;}
```
<div class="blank-space"></div>
등등 다양한 속성들과 그 구체적인 수치를 특정 선택자 혹은 모든 코드에 적용시킬 속성값도 넣어 줄 수 있다
<br>
( '*' 일명 Asterisk 는 모든 항목에 적용시킬 수 있는 강력한 녀셕이다) 
<br>
주의할 점은 선택자마다 쓰는 방법이 다르다는 거다. 
<br>
<div class="blank-space"></div>
<span class="highlight-dark">1. 태그 (Tag Selector)</span> 
<div class="blank-space"></div>
<br>
작성법: 그냥 순수하게 본인만 입력하면 된다.    ex. p, div, h1, span 등 
<div class="blank-space"></div>
예시: 

```
h1 { 

color: red; 

} 
```
<div class="blank-space"></div>
<span class="highlight-dark">2. 클래스 선택자 (Class Selector) ⭐</span> 
<div class="blank-space"></div>

작성법: class를 부여한 태그 다음에 .을 치고 그 클래스명을 입력해서 작업한다. 

보통 html 본문에 있는 태그 안에 class="명칭" 을 부과해서 쉽게 지정할 수 있게 작업한다
<div class="blank-space"></div>

```
<div class="head">  
``` 
-> 이러면 아하 머리부분 블록을 작업하는구나 판단할 수 있다.
  
```
<div class="body">
```
-> 여기는 몸통 부분이네하고 직관적으로 구분하기 쉽게 명칭을 넣어주는게 좋다. 
  <div class="blank-space"></div>
  그래야 나중에 css작업하기 편하기도 하고 본문 구조를 파악하기 편하다. 물론 구조를 미리 잡고 작업하는게 베스트.
 <div class="blank-space"></div>
```
.div_class_name01 {

    color: blue;
    
}
```
<div class="blank-space"></div>
<span class="highlight-dark">3. 아이디 선택자 (ID Selector)</span> 
<div class="blank-space"></div>

작성법: 특정 태그 안에 id="명칭" 을 부여해서 이름표를 붙이는 느낌으로 이해하면 편하다.
<br>
주로 최상위 태그에 달아서 활용하는데 공부할 때는 주로 id="wrap" 이런식으로 자주 사용했다. 
<br>
최상위 부모느낌이라 모두를 감싸는, wrapping하는 거라고 보면 된다. 
<div class="blank-space"></div>
예시: 
```
#wrap div.head {

    text-align: center;
    
    border-bottom: double #ccc;
    
    padding: 10px;
    
    margin-top: 50px;
}
```
<div class="blank-space"></div>
뭔가 복잡해보이지만 여기서 중점적으로 봐야할건 #wrap 이 부분과 div.head 이거다. 
<br>
#wrap은 당연히 <div id="wrap"></div> 방식으로 지정했을거고 주로 최상위에 부과해서 사용하며
<br>
#만 붙여서 맨 앞자리에 쓰면 끝이다.
<br>
위에서 배운 클래스 선택자를 떠올려보면
<br>
div.head의 경우 <div class="head"></div>  이 부분을 선택해서 작업하고 싶을 때 지정한다는걸 알 수 있다. 

 그럼 결과적으로 #wrap div.head {}는 <div id="wrap"></div> 이 구역 안 <div class="head"></div> 를 저격하는 방식인거다.  
 
<div class="blank-space"></div>
본문 html 구조를 보면 좀 더 직관적으로 이해하기 쉽다. 
```
<div id = "wrap">            -> div 태그는 작업할 불록을 나눌 때 사용한다. 여기서는 id를 어떻게 넣는지만 보면 된다.
        <br>
        <div class = "to">   -> 하위 태그에 클래스를 달아놓은걸 알 수 있디. 이건 법칙도 아니고 정해진 룰도 아니다. 
                                쉽게 저격해서 속성값을 주고 쉽게 꾸미기 위한 하나의 방법일 뿐이다. 
            <br>
            <h1>
            
               <a href="#none">To. Hong Glidong.</a>
               
            </h1>
            
        </div>
        <br>
        <div class = "head">   역시 클래스에 head라고 달아놨다. 이런식으로 어떤 역할을 담당하는 녀석인지 직관적으로 이해하기 쉽게 달면 좋다. 
        <br>
            <h3>How are you doing?</h3>
            
        </div>
  
  </div> 
```                  
<div class="blank-space"></div>            
<br>
<span class="highlight-dark">4. 전체 선택자 (Universal Selector)</span> 
<div class="blank-space"></div>

 마지막으로  * 라는 무시무시한 녀석이다. 
<br>
 보통 common.css에 일괄적으로 적용하고 싶은 속성값, 즉 초기데이터를 세팅해놓는게 정석인데 

 그 중에서도 '*' 일명 Asterisk 는 진짜 모든 영역에 적용시킬 속성이 필요한 경우 사용한다. 
<div class="blank-space"></div>
 

 


