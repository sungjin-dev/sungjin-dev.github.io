---
title: "Include란? 중복 코드를 없애는 마법"
excerpt: "플라스크(Flask) 템플릿의 가장 핵심적이고 편리한 기능"
categories: [Flask]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
---

중복되는 코드를 빼내는 include의 원리와 사용 방법을 알아 보자. 
<br><br><br>
1. include의 핵심 원리 (레고 조립하기)
웹사이트를 만들다 보면 메인 화면, 로그인 화면, 마이페이지 등 공통으로 들어가는 레이아웃이 생길 수밖에 없다. 가장 대표적으로 Header(상단), Nav(메뉴바), Footer(하단)가 있다.
<br><br>
과거에는 1,000개의 웹페이지가 있다면, 1,000개의 HTML 파일에 똑같은 메뉴바 코드를 일일이 복사해서 붙여넣는 반복 노동을 해야 했다. 메뉴바의 글자 하나만 수정하려 해도 1,000개의 파일을 다 열어야 했다.
<br><br>
하지만 include를 도입하면 이야기가 달라진다.
공통으로 쓰이는 코드만 똑 떼어 nav.html이라는 하나의 조각(레고 블록) 파일로 만든다. 그리고 실제 화면에는 "여기 nav.html 조각을 끼워 넣어!"라는 명령어 한 줄만 남겨두면 된다.
<br><br>
2. 실제 적용 방법 (Jinja2 문법)
nav.html 파일에 중복 코드를 모아두고, 본문 페이지에서는 {% include %} 태그를 사용해 조립한다.
<br><br><br>
A. 네비게이션 조각 파일 (nav.html)
이 파일은 단순한 구조뿐만 아니라, 세션(Session) 정보를 활용하여 사용자별 맞춤 메뉴를 보여준다.
<br><br>
```HTML
<nav>
    <div class="nav_wrap">
        <a href="/">HOME</a>
        
        {% if not session.get('signinedMemberId') %}
            | <a href="/member/signup_form">SIGN-UP</a>
            | <a href="/member/signin_form">SIGN-IN</a>
        {% else %}
            | <a href="/member/signout_confirm">SIGN-OUT</a>
            | <a href="/member/modify_form">MODIFY</a>
            | <a href="/member/delete_confirm">DELETE</a>
        {% endif %}
    </div>
</nav>
```
<br><br><br>
B. 본문 페이지 적용 (index.html)
본문은 복잡한 로직 없이 조각을 불러오기만 하면 된다.
<br><br>
 성능 최적화 팁: CSS 링크(link 태그)는 매번 조각 파일마다 넣으면 브라우저가 파일을 중복해서 읽어 성능이 저하될 수 있다. 본문 페이지의 <head>에서 한 번만 호출하는 것이 훨씬 효율적이다!
<br><br>
```
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>홈 화면</title>
    <link href="{{url_for('static', filename='css/include/nav.css')}}" rel="stylesheet">
</head>
<body>

    {% include 'nav.html' %}

    <main>
        <h1>메인 화면입니다!</h1>
        <p>로그인 상태에 따라 메뉴가 자동으로 변하는 시스템입니다.</p>
    </main>

</body>
</html>
```
<br><br><br>
3. 왜 이렇게 복잡하게 쪼갤까요?
- 유지보수의 혁신: 메뉴를 수정할 때, 이제는 nav.html 파일 하나만 고치면 된다. 엄청난 반복 노동에서 해방된 것이다.
- 조건부 렌더링(Conditional Rendering): 로그인 상태라는 '인증 티켓'에 따라 화면을 분리해 보여줌으로써, 사용자에게 꼭 필요한 정보만 동적 렌더링(Dynamic Rendering)한다.
<br><br>
플라스크는 사용자가 화면을 요청하는 바로 그 순간, {% include %} 태그를 발견하면 조각 코드를 즉시 복사해서 완전한 하나의 페이지로 합쳐서 전달한다. 이 마법 같은 Include 방식을 활용해 여러분의 프로젝트도 훨씬 스마트하게 관리해 보자!
<br><br>
다음 글에서는 세션과 쿠키가 서버와 브라우저 사이에서 어떻게 암호화되어 움직이는지 더 깊이 고찰해보는 시간을 가져보겠다.
<br><br>
