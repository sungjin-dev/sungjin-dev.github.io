---
title:  "Include란? 중복 코드를 없애는 마법"
excerpt: "플라스크(Flask) 템플릿의 가장 핵심적이고 편리한 기능"
categories: [Flask]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
---

중복되는 코드를 빼내는 include의 원리와 사용 방법을 알아 보자. 

1. include의 핵심 원리 (레고 조립하기)
웹사이트를 만들다 보면 메인 화면, 로그인 화면, 마이페이지 등 공통으로 들어가는 부분이 생길 수밖에 없다.

가장 대표적으로 화면 맨 위 (Header), 메뉴바(Nav)와 맨 아래 위차한 정보란(Footer)이다. 

과거엔 예를 들어 1000개의 웹페이지가 있으면, 1000개의 HTML 파일에 똑같은 메뉴바 코드를 일일이 복사해서 지겨운 반복노동을 해야했다. 

하지만 위의 include 방식을 도입하면 공통으로 쓰이는 메뉴바 코드만 똑 떼어서 nav.html이라는 하나의 조각(레고 블록) 파일로 분리한다.

그리고 실제 화면을 보여줄 페이지들에는 "여기 `nav.html` 조각을 끼워 넣어!"라는 명령어 한 줄만 남겨두는 방식이라고 보면 된다. 

2. 실제 적용 방법 (Jinja2 문법)
nav.html이든 footer.html이든 넣어놓은 중복 코드가 바로 공통으로 쓸 `조각 파일`이다. 이 조각을 메인 본문 페이지에 끼워 넣을 때는 플라스크의 `템플릿 엔진(Jinja2) 문법`을 사용한다.


include 페이지 (예: header.html 또는 nav.html, footer.html)

```HTML
<link href="{{url_for('static', filename='css/include/nav.css')}}" rel="stylesheet"> 
-> 태그에 적용할 css도 여기에 링크를 달아 연동시켜야 한다.  

<nav>
    {% if not session.get('signinedMemberId') %}   -> 세션에서 로그인된 아이디를 못 받았다면
                                                    
 <div class="nav_wrap">                          
        <a href="/">HOME</a>
        |
        <a href="/member/signup_form">SIGN-UP</a>     SIGN-UP, SIGN-IN만 보여주고
        |
        <a href="/member/signin_form">SIGN-IN</a>
    </div>
    {% else %}                                     ->  세션에서 아이디를 받은 상태 즉 로그인 상태면
    <div class="nav_wrap">
        <a href="/">HOME</a>
        |
        <a href="/member/signout_confirm">SIGN-OUT</a>  
        |                                               
        <a href="/member/modify_form">MODIFY</a>        SIGN-OUT, MODIFY, DELETE
        |                                                이렇게 보여주는거다. 
        <a href="/member/delete_confirm">DELETE</a>
    </div>
    {% endif %}
</nav>
```
안의 주석 내용은 심화 내용인데 

플라스크(Flask)의 세션(Session) 기능을 활용하여, 사용자의 로그인 상태를 판별하고 그에 맞는 메뉴를 동적으로 렌더링(Dynamic Rendering)해본 것이다. 

다음 글에서는 세션 쿠키 등에 대해서도 깊이 고찰해보는 시간을 가져보자!

굳이 저런 복잡한 코딩을 넣어서 보여준 이유는 하나다. 

include로 중복된 navigator 코드들을 한데 모은 nav.html에 css며 세션 기능이든 뭐든 본문이 아니라 모두 이곳에 적용시키면 된다. 

업무량이 엄청나게 줄어든다는 점에서 굉장히 유용한 툴이다.


본문 페이지 (예: index.html 또는 board.html)
```
HTML 
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>홈 화면</title>
</head>
<body>

    {% include 'nav.html' %}  <- 바로 이부분이다. nav.html에 전부 우겨 넣어놓고 이렇게 적어놓으면 끝!

    <main>
        <h1>메인 화면입니다!</h1>
        <p>여기는 메인 본문 내용이 들어가는 자리입니다.</p>
    </main>

</body>
</html>
```
정리해보면, 
플라스크가 이 화면을 사용자에게 보여주기 직전

`{% include 'nav.html' %}`라는 태그를 발견하면 아까 만들어둔 조각 코드를 저 위치에 그대로 복사+붙여넣기 해서 완전한 하나의 페이지로 합쳐서 보여주는 원리다. 
