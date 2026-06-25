---
title: "자식 및 자손/후손 선택자의 이해"
excerpt: "헷갈리는 CSS문법"
categories: [CSS]
tags:
  - CSS
  - 필기노트
toc: true
toc_sticky: true
---

`자식(Child)` vs `자손/후손(Descendant)` 선택자에 대해 알아보자. 
<br><br>
CSS를 처음 배울 때 우리를 가장 헷갈리게 만드는 부분 중 하나가 바로 자식 선택자와 자손(후손) 선택자다. 
<br><br>
사실 자식이 뭔지 자손/후손이 뭔지 단어 뜻도 헷갈린다. 
<br><br>
>자식 (Child)은 나를 낳아준 부모의 바로 밑 1대 직계 자녀를 말하며,
<br><br>
>자손 / 후손 (Descendant)은 그 자식은 물론이고 손자, 증손자, 고손자까지 내 핏줄(내부)에 있는 모든 사람을 칭한다.
<br><br>

CSS에서도 이 원리가 똑같이 적용된다고 보면 된다. 

## 1. 자식 선택자 (Child Selector)

자식 선택자는 부모 요소의 "바로 한 단계 아래"에 있는 요소만 선택한다. 
<br><br>
기호: 꺾쇠 기호 `>` 를 사용
<br><br>
문법: 부모요소 > 자식요소 { CSS 규칙 }
<br><br>
 예시 코드
```html
<div class="box">
  <p>나는 box의 1대 직계 자식입니다! (선택됨 O)</p>
  
  <article>
    <p>나는 article의 자식이자, box의 손자입니다! (선택 안 됨 X)</p>
  </article>
</div>
```
<br>
> 첫 번째 p 태그는 자식, 두 번째 p태그는 직계가 아니다. 
<br>
```css
/* .box의 '바로 아래'에 있는 p 태그만 글자를 빨간색으로 바꿔라! */
.box > p {
  color: red;
  font-weight: bold;
}
```
<br><br>
위 코드에서 box > p 라고 작성하면, <div class="box"> 바로 아래에 있는 첫 번째 <p> 태그만 빨간색으로 변한다(자식선택자). 
<article> 안에 숨어있는 두 번째 <p> 태그는 '손자' 뻘이기 때문에 선택되지 않는다.

## 2. 자손(후손) 선택자 (Descendant Selector)

자손 선택자(또는 후손 선택자)는 조상 요소 "내부에 있는 모든 요소"에 적용시킨다. 바로 밑에 있는 자식뿐만 아니라 손자, 증손자 등 깊이(depth)에 상관없이 싹 다 선택한다.
<br><br>
기호: 기호 없이 `띄어쓰기(Space)`를 사용.
<br><br>
문법: 조상요소 자손요소 { 띄어쓰기가 들어간거다! }
<br><br>
예시 코드
```html
<div class="box">
  <p>나는 box의 1대 직계 자식입니다! (선택됨 O)</p>
  
  <article>
    <p>나는 article의 자식이자, box의 손자입니다! (선택됨 O)</p>
    
    <div>
      <p>나는 box의 증손자입니다! (선택됨 O)</p>
    </div>
  </article>
</div>
```
<br>
해당 p태그들은 전부 box클래스 안에 있는 자손/후손이다. 
<br>
```css
/* .box '내부'에 있는 모~든 p 태그의 글자를 파란색으로 바꿔라! */
.box p {
  color: blue;
}
```
<br><br>
.box p 처럼 중간에 띄어쓰기만 하면, <div class="box"> 태그 안에 존재하는 모든 <p> 태그가 파란색으로 바뀐다. 


 ## 3. 한눈에 보는 핵심 요약 비교

<img width="1491" height="222" alt="image" src="https://github.com/user-attachments/assets/86036419-cac5-429f-bd6f-518bd7292546" />


## 4. 상황별 사용법 

자손/후손(띄어쓰기) 선택자는 특정 영역 안에 있는 일관된 태그들에 한 번에 스타일을 줄 때 매우 편하다. (예: 특정 게시글 본문 div.content 안의 모든 a 태그 색상 변경)
<br><br>
자식(>) 선택자는 구조가 매우 복잡해졌을 때 정확하게 타겟팅해서 특정태그만 적용하고 싶거나, 내가 원하지 않는 태그까지 스타일이 먹히는 것을 방지하고 싶을 때 사용한다. 

## 5. 자식 및 자손/후손 선택자 동시 사용하기 

이 두 가지를 섞어서 구조를 아주 정밀하게 저격할 수 있다. 
<br>
```
HTML
<div id="grandpa">
  <p class="text">1. 할아버지의 직계 자식 (div 바로 아래)</p>
  
  <div class="father">
    <p class="text">2. 아빠의 직계 자식 (할아버지의 손자)</p>
    <section>
      <p class="text">3. 섹션 안의 텍스트 (할아버지의 증손자)</p>
    </section>
  </div>
  
  <p class="text">4. 할아버지의 또 다른 직계 자식</p>
</div>
```
<br>
>예시 A
<br><br>
코드: `#grandpa > .father .text { font-weight: bold; }`
<br><br>
해석: 
<br>
1. 먼저 #grandpa의 직계 자식인 .father를 찾는다. (>)
<br>
2. 그리고 그 .father 안에 있는 모든 .text를 찾는다. (공백)
<br>
결과: `2, 3번`만 굵어짐
<br><br>
>예시 B
<br><br>
코드: `#grandpa > .father > .text { text-decoration: underline; }`
<br><br>
해석: 
1. #grandpa의 직계 자식인 .father를 찾고 (>)
2. 그 .father의 직계 자식인 .text만 적용. (>)
<br><br>
결과: 2번만 밑줄. (3번은 section이라는 벽이 하나 더 있어서 탈락한다.)
<br><br>
보통 CSS를 짤 때 무작정 공백(자손 선택자)만 쓰면 나중에 코드를 유지보수할 때 스타일이 충돌하기 쉽다. 내가 정확히 어느 위치의 태그를 바꿀 것인지 명확하다면, `> (자식 선택자)`를 적절히 활용하여 **"선택 범위를 제한"**하는 것이 바람직하다. 
