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

<div class="my-wrong-note" markdown="1">
  
오늘은 css를 배웠다. 

우선 아주 기본적인 골격은 다음과 같다 
<div class="blank-space"></div>
```css
선택자 {
  속성 : 값;
}
```
<div class="blank-space"></div>
프로그래밍 언어를 공부하다보면 굉장히 친숙한 '딕셔너리(json)' 형태의 구조이다. 
<br><br>
여기서, **선택자**란 디자인 속성을 적용할 대상이고   
<br>
**속성**은 크기, 색상, 여백 등 변경하고 싶은 특질이며   
*ex. width, border, position*
<br><br>
**값 (Value)**은 말 그대로 속성에 구체적으로 들어가는 수치나 비율 상태 등을 말한다.     
*ex. relative, 100px, solid*
<br><br>
보통 css작업을 할 때면 html 본문에 작업할 body태그 뼈대 위에
<br>

```html
<link href="css파일경로" rel="stylesheet">
```  
<br>
이런식으로 css파일을 하나 따로 만들어서 본 html문서에 link해서 연동시키는 방식을 주로 하게 된다. (external방식)

물론 HTML 문서 안에 바로 바로 적용시키는 인라인(inline) 방식을 고집할 수도 있다. 
<br>
```html
<p style="color: aquamarine;"> 블라블라 </p>
```
<br>
하지만 이러한 인라인 방식은 본문 코드가 복잡해져 구조를 파악하기 힘들 뿐 아니라 유지 보수도 굉장히 어렵다.
<br><br>
따로 CSS파일로 관리하는 것이 분업화하여 작업하기도 편하다. 
<br><br>
참고로 인라인(inline) 방식으로 직접 내부 코딩하는 경우 우선순위 1순위로 적용된다. 
<div class="blank-space"></div>
이렇게 외부로 뺀 css파일은 당연히 확장자도 `파일명.css` 이고 보통 `common.css`도 같이 만들어서 진행한다. 
<br><br>
common파일은 영문 그대로 공통적으로 적용할 속성들을 미리 세팅해놓는 용도다.

<div class="blank-space"></div>
주로 common파일에는 
```css
* { margin:0; padding:0;}

a { text-decoration: none; color:#242424}

a:hover {text-decoration: underline;}
```
<div class="blank-space"></div>
등등 다양한 속성들과 그 구체적인 수치를 특정 선택자 혹은 모든 코드에 적용시킬 속성값도 넣어 줄 수 있다
<br>
*`*` 일명 Asterisk 는 밑에서 다루겠지만 모든 항목에 적용시킬 수 있는 강력한 녀석이다*
<br><br><br>
이렇게 따로 뺀 css파일에 작업을 할 때는 
<br><br>
그냥 아무렇게나 쓰는게 아니라 마치 문법처럼 선택자마다 쓰는 방법이 다르다.
<div class="blank-space"></div>
<span class="highlight-dark">1. 태그 (Tag Selector)</span> 
<br><br>
작성법: 그냥 순수하게 본인만 입력하면 된다.    *ex. p, div, h1, span* 등 
<div class="blank-space"></div>
예시: 

```css
h1 { 
  color: red; 
} 
```
<br><br>
<strong>주의할 점</strong>은 `<br>` 같은 태그들은 태생적으로 css로 작업이 불가능하다.
<br><br>
아래 나열된 태그들은 불가능하거나 꼼수를 써서 우회적인 방식으로 효과를 줘야할 수도 있다.
<br><br>
```text
<select>, <option>, <input type="checkbox">, <input type
