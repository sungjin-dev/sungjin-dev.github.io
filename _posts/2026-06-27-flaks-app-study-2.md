---
title: "플라스크(Flask)에서 endpoint활용법"
excerpt: "request.endpoint"
categories: [Flask]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 
## 1. endpoint란?

`endpoint`라는 영단어를 직역하면 '끝점'이다. 웹 개발에서는 쉽게 말해 "클라이언트(브라우저)와 서버가 데이터를 주고받기 위해 만나는 최종 목적지"를 말한다.

특히 Flask 안에서 `request.endpoint`는 조금 더 특별하다.

<예시>
```python
Python@app.route('/user/login-page')  # URL 
def login():                    #  Endpoint
    return "로그인 화면입니다."
```
<br><br>   

> request.path (URL)   ->   /user/login-page    
  request.endpoint(엔드포인트)  ->   login (파이썬 함수 이름)

쉽게 말하자면 플라스크(Flask)에서 엔드포인트(Endpoint)는 기본적으로 '라우팅된 함수를 가리키는 고유한 이름'을 의미한다. 

하지만 이렇게 endpoint 옵션을 통해 강제로 바꿀 수도 있다. 
```python
@app.route('/login', endpoint='login_page')
def login():
    return "로그인 페이지"
```
<br><br>   
엄밀히 보면 엔드포인트는 함수 이름으로부터 생성되지만 함수와는 별개인 `고유 식별자`다. 
 
                           
## 2.before_request에서 URL 대신 Endpoint를 쓰는 이유

만약 이전 예시에서 URL을 기준으로 로그인 상태를 검사했다고 가정해 보자.

```Python
#  URL(path)을 기준으로 검사할 때의 문제점

@app.before_request
def require_login():
    if request.path == '/user/login-page':
        pass 
```
<br><br> 
나중에 기획팀에서 "로그인 주소를 `/user/login-page` 말고 그냥 깔끔하게 `/signin`으로 바꿔주세요!"라고 요청하면 어떻게 될까.  
<br><br> 
`@app.route('/signin')`으로 주소를 바꾸는 순간, 위의 `before_request 코드`는 더 이상 작동하지 않고 뻗어버린다. 
<br><br> 
하지만 Endpoint(함수 이름)를 기준으로 코드를 짜면 이런 불상사를 미연이 방지할 수 있다. 
<br><br> 
```Python
# Endpoint를 기준으로 검사할 때

@app.before_request
def require_login():
    # URL이 '/signin'이든 '/login-page'든 상관없이, 
    # 함수 이름이 'login'인지만 확인.
    if request.endpoint == 'login':
        pass
```
<br><br> 
함수 이름만 유지되면 백엔드 내부 로직이 절대 깨지지 않게 된다. 

## 3. 블루프린트(Blueprint)를 사용 시 주의점

만약 `member_bp`라는 블루프린트 안에 login 함수가 있다면, 
<br><br> 
엔드포인트 이름은 자동으로 **member_bp.login**처럼 `[블루프린트이름].[함수이름]` 형태로 합쳐집니다. 
<br><br> 
블루프린트를 쓴다면 이 점을 꼭 기억하자. 
                 
기존 : `url_for('login')` ->  블루프린트 적용 시  -> `url_for('member_bp.login')`


## 4. endpoint와 url_for

아마 설명을 들으면서 처음부터 `url_for`를 떠올린 분들이 많을거다.
<br><br> 
이 둘은 Flask에서 영혼의 단짝이자 동전의 양면 같은 관계이다. 
<br><br> 

```
Python

@app.route('/user/login-page') #  (URL)
def login():                   #  (Endpoint)
    return "sign-In page"
```    
위처럼 코드를 짜두면 Flask는 내부적으로 "아, login이라는 엔드포인트의 주소는 /user/login-page구나!" 하고 기록해 둔다. 

<br>

>상황 A: 요청이 들어왔을 때 (request.endpoint)

" 클라이언트 요청이 어느 부서인지 알아내는 것

print(request.endpoint) 

결과: 'login'

<br>

>상황 B: 주소를 알아내야 할 때 (url_for())

"login이라는 (엔드포인트) 주소가 어디인지 알아내는 것

url_for('login') 

결과: '/user/login-page'

<br><br>
결론적으로, `url_for()` 함수의 괄호 안에 집어넣는 그 이름이 바로 'endpoint'인 셈이다. 그래서 URL이 나중에 /signin으로 바뀌더라도, 우리는 변함없이 url_for('login')만 쓰면 Flask가 알아서 바뀐 새 주소를 찾아준다. 
