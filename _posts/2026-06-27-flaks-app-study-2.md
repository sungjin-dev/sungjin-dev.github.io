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
