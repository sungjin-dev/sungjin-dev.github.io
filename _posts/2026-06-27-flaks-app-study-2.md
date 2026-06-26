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

직역하면 '끝점'인데, 웹 개발에서는 쉽게 말해 "클라이언트(브라우저)와 서버가 데이터를 주고받기 위해 만나는 최종 목적지"를 뜻합니다.
하지만 Flask 코드 안에서 request.endpoint는 조금 더 특별하고 구체적인 의미를 가집니다. 
일반적인 URL 주소와 어떻게 다른지 이전의 '회사 건물' 비유로 아주 쉽게 비교해 드릴게요. 

URL vs Endpoint (방 번호 vs 담당자 이름)Flask에서 라우트(뷰)를 만들 때 우리는 두 가지를 정의합니다. 

주소(URL)와 그걸 처리할 파이썬 함수죠.
```
Python@app.route('/user/login-page')  # 👈 이게 URL (방 번호)
def login():                    # 👈 이게 Endpoint (담당자 이름)
    return "로그인 화면입니다."
```

구분            request.path (URL)                            request.endpoint(엔드포인트)
비유          회사 건물의 방 번호 (예: 301호)                그 방에서 일하는 담당자 이름 (예: 김철수)
실제 값         /user/login-page                                login (파이썬 함수 이름) 

특징기획이나 마케팅에 의해 겉보기 주소가 자주 바뀔 수 있음    개발자가 코드로 짠 내부 이름이라 거의 안 바뀜 



왜 before_request에서 굳이 URL 대신 Endpoint를 쓸까요?


만약 이전 예시에서 URL을 기준으로 로그인 상태를 검사했다고 가정해 보겠습니다.
```
Python# ❌ URL(path)을 기준으로 검사할 때의 문제점
@app.before_request
def require_login():
    if request.path == '/user/login-page':
        pass 
```
나중에 기획팀에서 "로그인 주소를 /user/login-page 말고 그냥 깔끔하게 /signin으로 바꿔주세요!"라고 요청하면 어떻게 될까요? 

`@app.route('/signin')`으로 주소를 바꾸는 순간, 위의 before_request 코드는 더 이상 작동하지 않고 고장 나버립니다. 주소가 달라졌으니까요.

하지만 Endpoint(함수 이름)를 기준으로 코드를 짜면 이런 문제에서 완전히 자유로워집니다.

```
Python# ⭕️ Endpoint를 기준으로 검사할 때 (정석)
@app.before_request
def require_login():
    # URL이 '/signin'이든 '/login-page'든 상관없이, 
    # 그걸 처리하는 담당자(함수) 이름이 'login'인지만 확인합니다.
    if request.endpoint == 'login':
        pass
```

주소(방 번호)를 301호에서 402호로 이사 가더라도, 일하는 사람(함수 이름)은 여전히 똑같기 때문에 백엔드 내부 로직이 절대 깨지지 않는 것입니다.

블루프린트(Blueprint)를 사용할 때의 주의점만약 auth_bp라는 블루프린트 안에 login 함수가 있다면, 

엔드포인트 이름은 자동으로 **auth_bp.login**처럼 [블루프린트이름].[함수이름] 형태로 합쳐집니다. 

실무에서 블루프린트를 쓴다면 이 점을 꼭 기억하셔야 합니다!


endpoint와 url_for는 Flask에서 영혼의 단짝이자 동전의 양면 같은 관계입니다. 두 가지가 어떻게 연결되는지 '스마트폰 연락처'에 비유해서 딱 정리해 드릴게요.

📱 스마트폰 연락처 비유
endpoint (엔드포인트): 연락처에 저장된 '이름' (예: "엄마", "김철수", login)

URL (주소): 실제 '전화번호' (예: 010-1234-5678, /user/login-page)

url_for() 함수: 이름을 검색해서 전화번호를 찾아주는 '연락처 검색 기능'

우리가 전화를 걸 때 복잡한 전화번호(URL)를 다 외우지 않고, "엄마"라는 이름(Endpoint)으로 검색해서 전화를 걸죠? Flask도 똑같습니다.

💡 코드로 보는 완벽한 콤보
Python
# 1. 라우트 정의 (연락처 저장)
@app.route('/user/login-page') # 👈 전화번호 (URL)
def login():                   # 👈 이름 (Endpoint)
    return "로그인 화면"
위처럼 코드를 짜두면 Flask는 내부적으로 "아, login이라는 엔드포인트의 주소는 /user/login-page구나!" 하고 장부에 기록해 둡니다.

상황 A: 요청이 들어왔을 때 (request.endpoint)

"지금 들어온 요청이 누구(어떤 이름)를 찾아온 거야?" 하고 읽어볼 때 씁니다.

print(request.endpoint) ➡️ 결과: 'login'

상황 B: 주소를 알아내야 할 때 (url_for())

"저기, login이라는 애(엔드포인트) 주소가 뭐였지?" 하고 검색할 때 씁니다.

url_for('login') ➡️ 결과: '/user/login-page'

결론적으로, url_for() 함수의 괄호 안에 집어넣는 그 이름이 바로 '엔드포인트'입니다! 그래서 URL이 나중에 /signin으로 바뀌더라도, 우리는 변함없이 url_for('login')만 쓰면 Flask가 알아서 바뀐 새 주소를 찾아주는 것이죠.
