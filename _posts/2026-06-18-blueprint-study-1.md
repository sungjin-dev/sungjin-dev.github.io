---
title:  "Blueprint란? 방대한 라우트 코드를 깔끔하게 분리하는 마법"
excerpt: "외부 css파일에 선택자 입력하는 방법"
categories: [flask]
tags:
  - Python
  - flask
toc: true
toc_sticky: true
---

<div class="my-wrong-note" markdown="1">

오늘은 플라스크(Flask)의 핵심 기능 중 하나인 **Blueprint(블루프린트)**에 대해 알아보자.

직역하면 '청사진'이라는 뜻이다. 단어 자체에서부터 뭔가 체계적이고 구조적인 느낌이 들지 않는가? 프로그래밍 세계, 특히 플라스크에서 블루프린트는 방대한 라우트(Route) 코드들을 기능별로 쪼개서 깔끔하게 정리해 주는 아주 고마운 도구다.



## 1. 기존 방식 (app.py 하나로 버티기)

우선 메인 역할을 할 `app.py` 파일 하나를 만들고, flask 모듈에서 Flask 클래스를 꺼내보자.

```python
# app.py
from flask import Flask
```

여기서 대문자로 시작하는 `Flask`는 클래스(Class)이다. 비유하자면, 현대자동차 공장(flask 모듈)에서 쏘나타 설계도(Flask 클래스)를 빼오는 것과 흡사하다. 

다음으로 이 Flask 클래스를 인스턴스화(Instantiation) 해보자.

```python
app = Flask(__name__)
```

여기서 `app`이란 실제로 살아 움직이는 웹 애플리케이션 객체다. 즉, **"Flask라는 웹 서버 설계도를 가지고, 실제로 동작하는 진짜 웹 서버 app 객체(쏘나타 자동차) 하나를 만들어낸다"**고 이해하면 편하다.

```python
@app.route('/')
def home():
    return 'Hello, SUNGJIN!'
```

서버가 만들어지면, 라우터(Router)가 요청된 주소(예: `/login`)와 방식(GET, POST 등)을 보고 해당 로직(함수)으로 연결해 준다.

> ** 라우팅(Routing)이란?**
> 클라이언트가 요청한 URL 주소와 실제로 처리를 담당하는 로직(함수)을 연결하는 '안내 데스크' 작업을 뜻한다. 
> 위 예시처럼 `('/')`로만 지정하면 최상위 홈 화면으로 보낸다는 뜻이다. `/write`, `/banking` 등 도메인 뒤에 붙는 주소를 보고 판단해서 알맞은 부서로 보내는 역할을 한다.

---

## 2. 왜 Blueprint가 필요할까? (문제점)

대기업에 가보면 기획팀, 인사팀, 개발팀 등 엄청나게 많은 부서들이 존재한다. 웹 서버 역시 마찬가지다. 셀 수 없이 많은 요청을 받아내야 하고 수많은 기능(부서)들이 존재한다.

**이 모든 코드를 `app.py` 한 문서에 코딩해버리면 어떻게 될까?**

수백, 수천 줄이 넘어가는 코드가 뒤섞여서, 나중에는 스크롤만 내리다가 유지보수를 포기하게 될지도 모른다. 이때 Blueprint를 사용하면, 방대한 라우트 함수들을 기능별로 여러 파일과 폴더에 묶어서 깔끔하게 모듈화하여 관리할 수 있다.

---

## 3. Blueprint 본격 사용법

### ① 부서 만들기 (routes.py)

먼저 `routes.py` 파일을 하나 만든다. (파일명은 직관적으로 사용 목적을 담아내기만 하면 무방하다.)

```python
# routes.py

from flask import Blueprint  # 블루프린트 클래스를 불러온다.

# 회원관리 부서(Blueprint) 생성
member_bp = Blueprint(
    'member',              # 1. 플라스크 내에서 사용할 블루프린트 이름
    __name__,              # 2. 현재 모듈의 위치
    url_prefix='/member'   # 3. URL 접두사 (공통 주소 앞머리) 
)

@member_bp.route('/')
def home():
    return 'Hello, SUNGJIN!'
```

위 코드를 보면 아까 `app`을 Flask 클래스로 찍어낸 것과 구조가 똑같다. `app` 자리에 `member_bp` 변수가 들어간 것을 확인할 수 있다.

여기서 가장 중요한 핵심은 세 번째 매개변수인 **`url_prefix`**다. Blueprint 클래스를 선언할 때 `url_prefix`를 미리 설정해두면, **이후 생성될 모든 URL 앞에는 해당 문자열이 자동으로 붙는다.** 예를 들어, `@member_bp.route('/login')`이라고만 적어도 플라스크가 알아서 앞머리를 붙여 최종 주소를 `http://.../member/login`으로 자동 완성해 준다.

### ② 메인 데스크에 부서 등록하기 (app.py)

자 이제, 기능별로 쪼개서 작성한 Blueprint 객체를 메인이 되는 `app.py`와 연결시켜 주도록 하자.

```python
# app.py

from flask import Flask

# blueprints 폴더 > member 폴더 > routes.py 파일에서 member_bp 객체를 불러온다.
from blueprints.member.routes import member_bp  

app = Flask(__name__)

# routes.py에서 만든 member_bp 부서를 메인 app에 정식으로 등록(연결)한다.
app.register_blueprint(member_bp) 
```

이렇게 세팅하고 나면 이젠 `app.py`의 코드가 무한정 길어질 일이 없다. 앞으로는 기능별로 블루프린트 폴더를 만들고, 그 안에 파일별로 구분해서 차곡차곡 정리해 등록하기만 하면 된다.

> **주의사항**
> 앞으로 분리된 `routes.py` 파일에서는 실수로 `@app.route()`를 사용하지 않도록 조심하자. 반드시 `@member_bp.route()`처럼 **해당 부서의 블루프린트 객체**를 사용해야 한다.

---

## 4. 실전 사용 예시

마지막으로, 실제로 로그인/회원가입 기능이 들어간 블루프린트 실전 코드 예시를 살펴보자.

```python
# routes.py (회원 전담 블루프린트)

from flask import Blueprint, render_template, request, redirect, session
from utils.json_manager import load_members, save_members

member_bp = Blueprint(
    'member',
    __name__,
    url_prefix='/member' # 이 아래 라우트들은 무조건 앞에 /member가 붙음
)

# 회원가입 화면 보여주기 (최종 URL: /member/signup_form)
@member_bp.route('/signup_form', methods=['GET']) 
def signup_form():
