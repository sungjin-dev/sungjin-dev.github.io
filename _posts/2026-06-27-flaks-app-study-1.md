---
title: "플라스크(Flask) app객체에 내장된 함수들"
excerpt: "매우 유용한 데코레이터들 모음(@app.before_request)"
categories: [Flask]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 

Flask의 app 객체에는 요청 생명주기(Lifecycle)를 관리하거나 전역적인 처리를 도와주는 매우 유용한 데코레이터들이 많다. 하나씩 자세하게 살펴보자. 

## 1. 본격적인 라우트(뷰) 함수 실행 직전에 개입 : `@app.before_request`

 `@app.before_request`는 이미 플라스크 제작자들이 app이라는 객체 안에 만들어둔 '기능(메서드)'이다. 
<br>
 여기서 `@`기호는 '이름표(또는 포스트잇)' 같은 역할을 하며 전문 용어로는 `데코레이터(Decorator)`로 불린다. 

# 1. 전역(Global) 로그인 여부 체크
사용자가 어떤 페이지를 요청할 때 먼저 로그인 상태인지 확인한다. 로그인이 안 되어 있다면 아예 라우트 함수로 넘겨주지 않고 로그인 페이지로 쫓아내버린다(redirect).
<br><br>
```
from flask import request, session, redirect, url_for

@app.before_request
def require_login():
    # 1. 방금 들어온 방문객의 목적지를 적어둔다. (예: 'sign-out')
    endpoint = request.endpoint

    # 로그인 안 한 사용자가 접근하면 안 되는 중요한 페이지 목록
    protected_endpoints = ['sign-out','modify', 'delete']

    # 가려는 곳이 보호된 페이지인데, 세션에 'user_id'가 없다면?
    if endpoint in protected_endpoints and 'user_id' not in session:
        # 가차 없이 로그인 페이지로 쫓아냄
        return redirect(url_for('login'))
 ```
<br><br>

그런데 `protected_endpoints = ['sign-out','modify', 'delete'...]`식으로 일일이 나열하면 나중에 유지 보수하기 힘들어 진다.
<br><br>
이를 플라스크에서 제공하는 데코레이터(Decorator) 기능을 활용하여 보안이 필요한 함수 위에 `@login_required`만 붙여주면 된다. 
<br><br>
먼저 아래와 같이 조건을 달아준다. 

```python
from functools import wraps   #-> functools 모듈 사용
from flask import session, redirect, url_for

def login_required(f):
    @wraps(f)           # functools에서 소환
    def decorated_function(*args, **kwargs):   
        # 세션에 user_id가 없으면 로그인 페이지로 튕겨냄
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function
```
<br><br>
그리고 해당 조건을 부여할 함수에 `@login_required`만 붙여넣는다. 

```python
@app.route('/modify')
@login_required  # 이렇게 붙여주기만 하면 끝
def modify():
    return "로그인한 사람만 볼 수 있 수정 페이지"

@app.route('/delete')
@login_required  # 여기도 붙여주면 적용
def delete():
    return "로그인한 사람만 볼 수 있는 삭제 기능"
```
<br><br>
이렇게 정리하면 훨씬 직관적이므로 유지 보수하기도 쉬워진다.
<br><br>
># 참고 :
`*args`는 함수로 전달되는 여러 개의 인자를 **'튜플(tuple)'** 형태로 받음.
<br><br>
`**kwargs`는 "이름=값" 형태의 인자를 **'딕셔너리(dictionary)'** 형태로 받음
<br><br>
`@wraps(f)`는 함수를 보호하고 통제하는 **'데코레이터'** 를 만들 때 꼭 써야 하는 필수 장치.
기존 함수를 저 decorated_function으로 '감싸버리는(wrapping)' 일이 발생할 수 있는데 이를 방지.
(본래 이름(__name__)이 바뀌고, 본래 문서(__doc__)가 사라져 버리는 위험)
<br><br>
`def decorated_function(*args, **kwargs)`는 어떤 이름의 인자가 들어오든, 몇 개가 들어오든 상관없이 전부 다 커버하겠다는 의미로 받아들이면 된다.
<br><br>
이렇게 `*(Asterisk)`가 붙으면 `가변 인자(Variable Arguments)`라고 부른다. common.css에서 `*{ 속성:값 }` 이런식으로 전체 속성을 부여할 때도 이 `*`가 쓰였다. 

# 2. 악성 IP 차단 (블랙리스트 필터링)
특정 IP에서 디도스(DDoS) 공격을 하거나 비정상적인 요청을 마구 보내 서버 리소스를 낭비하기 전에 차단해 버리는 방법이다. 
<br><br>
<사용 예시>
```
Python
from flask import request, abort
                      # 차단할 악성 IP 목록
BLACKLIST_IPS = ['192.168.1.100', '203.0.113.50']

@app.before_request
def block_malicious_ips():
    # 요청을 보낸 사용자의 IP 주소 확인
    client_ip = request.remote_addr  
    
    if client_ip in BLACKLIST_IPS:
        # 403 Forbidden 에러를 던져서 즉시 접근을 막음
        abort(403) 
```
<br><br>
 `abort(403)`을 실행하면 파이썬 코드는 즉시 실행을 멈춰버리며, 해당 오류 페이지로 바로 간다. **남은 코드는 절대 실행되지 않는다.**
 
<심화 학습>
`request.remote_addr`가 진짜 사용자의 IP가 아닐 수 있다. 만약 웹 서비스 앞에 `Nginx`나 `Apache` 같은 **웹 서버(Reverse Proxy)**를 두거나, `AWS의 로드 밸런서(ALB)` 같은 것을 사용 중이라면 remote_addr에는 실제 사용자의 IP가 아니라 **'앞단에 있는 서버의 IP'**가 찍히게 된다. 

해결 방법: 이런 환경에서는 프록시 서버가 실제 사용자의 IP를 `X-Forwarded-For`라는 header에 담아서 넘겨주면 된다. 이 경우, request.remote_addr 대신 `request.headers.get('X-Forwarded-For')`를 사용하거나, 플라스크의 `ProxyFix 미들웨어`를 설정해야 정확한 IP를 얻을 수 있다. 참고하자!
 
# 3. 개인 프로젝트 모듈을 점검할 때 

최근 프로젝트에서는 `@app.before_request`를 사용하여 session에 로그인한 ID가 있다고 가정하고 모듈이 잘 작동하는지 테스트하고 있다. 
<br><br>
<예시>

```python

from flask import Flask, render_template, session

app = Flask(__name__)
app.secret_key = 'sungjin'

IS_DEV_MODE = True  # -> 스위치를 ON/OFF하는 느낌으로 보면 된다. 

@app.before_request   
def devmode_login():
              
    if IS_DEV_MODE:  #개발자모드 시 세션에 `sungjin7`이라는 ID를 넣어준다.   
        session['user_id'] = 'sungjin7'  

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
```
<br><br>
이처럼 라우트 함수 실행 전,  즉 함수 로직이 실현되기 전에 개발자 모드로 조건을 충족시켜서 모듈을 돌려볼 수 있다.
<br><br>

