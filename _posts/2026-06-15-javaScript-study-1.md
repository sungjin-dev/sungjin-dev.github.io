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
작업에 앞서 HTML 뼈대를 기반으로 연동시켜야 하는데 2가지 방법이 있다. 

CSS와 방식은 똑같으나 연동시키는 수단만 다르다. 

당연히 내부(Internel)적으로 하나하나 기입하는 방식이 존재한다.
```
<script language="javascript">
```
당연히 위와 같은 방식은 추천하지 않는다. 본문이 굉장히 지저분해지고 판독하기도 수정하기도 어렵다. 

CSS 때와 마찬가지로 우리는 외부(External)에서 파일을 만들어 연동시킨다. 
  
.

        <script src="./index.js"></script>

     
   
        // console.log("Hello");   
        // console.log("Hello");  
