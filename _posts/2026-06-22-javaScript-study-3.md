---
title: "JavaScript '. (점)' 사용법 "
excerpt: "Python과의 차이점"
categories: [JavaScript]
tags:
  - Python
  - JavaScript
toc: true
toc_sticky: true
--- 

Python과 JavaScript의 가장 큰 차이점 중 하나가 바로 `. (점)` 사용법이다. 
<br><br>
파이썬은 주로 `함수(객체)` 형태를 선호하는 반면, 자바스크립트는 `객체.메서드()` 형태를 훨씬 더 많이 사용한다. 
<br><br>
이게 뭔 봉창 두드리는 소리인지 쉽게 풀어서 설명해 보자면
<br><br>
**파이썬**: "내가 데이터를 들고 가서 특정 기능을 실행시킨다." `(함수(데이터))`
<br><br>
**자바스크립트**: "데이터가 자기 능력(기능)을 가지고 있다." `(데이터.능력())`
<br><br>
여기서 정리하는 건 쉽지만 막상 실제로 코딩하다보면 사고회로를 틀어줘야 한다. 
<br>
이게 헷갈리는 이유는 '도트 표기법(Dot Notation)'이 자바스크립트에서 `객체의 계층 구조`를 나타내기 때문이다. 

## 1. 자바스크립트 점(.)의 비밀: "의존성(Hierarchy)"

자바스크립트에서 점은 "왼쪽 애가/가지고 있는/오른쪽 애를/ 부르겠다"라는 말이다. 
<br><br>
예시를 통해 알아 보는게 가장 빠르다. 
```javascript
//JavaScript

let aPw = form.aPw.value.trim();
```
`let`은 변수를 선언할 때 쓰인다. 말 그대로 **값이 바뀔 수 있는 변수**다. 
<br><br>
`form`은 참고로 html문서의  form 태그를 말한다. 데이터를 어떤 방식(GET, POST 등)으로 받을지 어디로 보낼지를 정한다. 
<br>
```html
 # HTML 참고 예시
<form name="newAccountForm" action="/create" method="POST">
    <input type="text" name="aPw">
    <button type="button" onclick="submitAccountForm()">제출</button>
</form>
```
이제 기본 배경은 알아봤으니 하나씩 뜯어 보자.
<br><br>
먼저 **form.aPw** -> form이라는 커다란 객체에 있는 aPw 입력창을 지칭한다. (참고로 'input'태그를 사용하면 해당 입력창이 뜬다) 
<br><br>
**form.aPw.value**: value는 그 aPw 입력창 속에 담겨있는 실제 텍스트(데이터)이다.
<br>
**form.aPw.value.trim()**: 그 데이터가 가지고 있는 기능(함수/메서드)인 `trim()`을 실행한다. 
<br>
여기서 `trim()`이란 유저가 "1 234 " 이렇게 공백을 실수로 치더라도 공백을 전부 없애주는 유용한 함수다. 쉽게 말해 사용자 실수를 방지한다.  
<br><br>
최종적으로 정리하면 'form 객체에 있는 aPw라는 입력창에서 입력받은 데이터 즉 value값을 가지고 trim()을 실행해 공백을 제거해라'이다. 
<br>
파이썬이라면 {%raw%}def trim(value) :  aPw = 블라블라 이런 방식으로 진행된다는 점과 확연히 다르다. {%endraw%}
<br><br>
**<심화내용>**
자바스크립트에서 점(.)은 마치 가족 관계도를 따라가는 것과 같은데 
<br>
`form.aPw.value`라고 적는 이유는, 내가 찾는 **value**라는 데이터가 **aPw**라는 부모에게 의존해 있고,
<br>
**aPw**는 다시 **form**이라는 조상에게 의존해 있기 때문에, 그 연결 고리를 따라가야만 비로소 실제 값을 찾을 수 있기 때문이다.
<br>
이를 `의존성(Hierarchy)`이라고 표현한다. 

## 2. 함수 vs 변수 vs 매개변수 vs 인자 (구분하는 법)

`변수 (Variable)`: 데이터를 담아두는 '상자'이다.
<br>
예: let form, let aPw

 `let`, `const`, `var`가 앞에 붙어있으면 변수다. 
<br>
`객체 (Object)`: 데이터와 함수를 한데 묶어놓은 덩어리. (Python instance와 유사)
<br><br>
참고로 클래스(class)는 '설계도(추상적인 개념)'이고, 인스턴스는 그 설계도로 만들어진 '현실의 물건(구체적인 실체)'다.

예: form, document

<br>
메서드 (Method / 함수): 객체가 할 수 있는 '행동' 즉 기능이다. 
예: trim(), focus(), submit()
<br>
**매개변수 (Parameter) vs 인자 (Argument)**:

`매개변수`: 함수를 정의할 때 괄호 안에 써놓은 '이름' (함수 입장에서 받는 대리인? 가명 임시명 등등)
<br>
`인자`: 함수를 호출할 때 괄호 안에 넣는 '실제 데이터'
<br>
예시 :

```
function introduce(name, age) {
    console.log(`이름은 ${name}이고, 나이는 ${age}살입니다.`);}

introduce("성진", 35);
```
<br>
호출할 때 전달하는 '성진'과 '35'가 바로 `인자(Argument)`고 
<br>
선언부에 'name', 'age'가 `매개변수` 즉 임시 이름표다. 
<br>
출력하면 '이름은 성진이고 나이는 35입니다.'가 나온다. 
<br><br>
반면

`console.log('aPw:', aPw)` 에서 'aPw:'와 aPw는 console.log라는 함수로 전달되는 인자고 그 값 그대로 출력한다. 

## 3. 파이썬 vs 자바스크립트 사고 전환 팁
파이썬이 "함수에게 데이터를 던져주는 방식"이라면, 자바스크립트는 "객체(물건)가 자기 기능을 스스로 수행하는 방식"이다
<br>

<table>
  <thead>
    <tr>
      <th>구분</th>
      <th>파이썬 (함수 중심)</th>
      <th>자바스크립트 (객체 중심)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>공백 제거</strong></td>
      <td><code>strip(data)</code></td>
      <td><code>data.trim()</code></td>
    </tr>
    <tr>
      <td><strong>길이 측정</strong></td>
      <td><code>len(data)</code></td>
      <td><code>data.length</code></td>
    </tr>
    <tr>
      <td><strong>화면 출력</strong></td>
      <td><code>print(data)</code></td>
      <td><code>console.log(data)</code></td>
    </tr>
  </tbody>
</table>

<br>
이젠 자바스크립트 코드를 볼 때, `점(.)`이 보이면 '왼쪽 덩어리(객체) 안에 오른쪽 기능(메서드나 속성)이 들어있구나!' 라고 생각하면 편하다. 
<br><br>
지금까지 파이썬의 함수(데이터) 형태를 데이터.함수()로 바꾸는 과정이 바로 자바스크립트식 사고로 전환하는 방법에 대해 고찰해보았다. 
