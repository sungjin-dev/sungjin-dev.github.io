---
title: "파이썬 __name__부터 Flask Blueprint까지 흐름으로 이해하기"
excerpt: "MVC, 객체화, 모듈화 개념을 통해"
categories: [JavaScript]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 

## 1. 모든 것은 "파일을 어떻게 실행할 것인가?"에서 시작

처음에는 파일 하나만 있다.

```
# app.py

print("프로그램 시작")
```
python app.py 실행하면 그냥 프로그램 시작. 별 문제 없다.
<br><br>
그런데 파일이 점점 커지기 시작한다면?

예를 들어, 회원가입, 로그인, 다이어리, 게시판, 뱅킹, 메모 등등 기능이 계속 늘어난나고 가정해보자. 

# sign_up.py
회원가입이면 회원가입

# diary.py
일기면 일기

# memo.py
메모면 메모

이렇게 나누고 싶어진다. 이게 바로 `모듈화(Module)`이다.

## 3. 모듈화로 인한 새로운 이슈(issue)

예를 들어 `sign_up.py`라는 모듈화된 파일이 존재하고 이 파일을 

`main.py`파일에 import sign_up 와 같은 방식으로 연동시켜서 실행하면 
 파이썬은 해당 import된 파일 sign_up를 처음부터 끝까지 전부 읽는다.


이 점이 Flask에서는 굉장히 치명적이다. 

```python
# app.py
from flask import Flask

app = Flask(__name__)

app.run()
```
우리에게 익숙한 app.py 파일이 있다고 가정해보자. 

그런데 다른 파일에서 import app를 하기라도 하면 app.py 전체가 실행된다.

즉 `app.run()`도 실행된다.

원치 않게 서버가 갑자기 켜져버리는 것이다. 
<br>
그래서 나온 것이
`
if __name__ == "__main__":
    app.run()
`
이다.

## 5. name 의 정체

파이썬은 파일을 실행할 때 자동으로 `__name__` 이라는 변수를 만들어준다.

즉 직접 실행하면 
python app.py 이면 `__name__ == "__main__"` 이다.

```
if __name__ == "__main__":   즉 이 값은 참이 되어 서버가 실행된다.  
app.run()
```

그럼 import형식으로 끌어오는 경우라면 상황이 다르다. 

```
import app 

__name__ == "app"
```

그러므로 `if __name__ == "__main__":` 조건이 거짓이므로 서버는 실행되지 않는다. 

즉 `if __name__ == "__main__"`:는 "이 파일이 진짜 시작점일 때만 실행해라" 라는 의미다.

일종의 안전장치인 셈

## 6. 여기까지가 실행 경계

정리하면 if __name__ == "__main__": 는 프로그램의 시작점을 구분하는 장치다.

즉 `직접 실행`과 `import`를 구분한다.

그래서 `실행 경계` 를 만든다.

## 7. Flask는 왜 모듈화를 하게 될까?

처음에는 app.py 하나로 충분하다.
```python
@app.route("/")
def home():
    pass
```

근데 서버가 커질 수록 기능이 점차로 늘어난다.

```
@app.route("/login")
@app.route("/logout")
@app.route("/signup")
@app.route("/board")
@app.route("/comment")
@app.route("/admin")
```
이렇듯 계속 추가된다.

나중에는 app.py가 수천 줄이 된다.

그래서 회원따로 메모기능 따로 부서별로 분리하고 싶어진다.

그런데 Flask는 라우트가 app에 묶여있다


```
app = Flask(__name__)

@app.route("/")
def home():
    pass
```
기존 방식의 문제점은 `@app.route()`가 모두 app 객체에 붙는다.

그러면

`sign_up.py  -> @app.route("/login")`

`memo.py -> @app.route("/memo")`

를 작성하려면 둘 다 app 객체가 필요하다. 그래서 결국 서로 꼬이기 시작한다.

## 8. Blueprint 등장

Flask가 말한다. app에 바로 붙이지 말고 임시 보관해라.

예시
```
from flask import Blueprint

member_bp = Blueprint("member", __name__)
```
이제
```
@member_bp.route("/login")
def login():
    pass
```
app이 없어도 가능하다. 즉 sign_up.py 혼자 존재 가능.

## 9. Blueprint는 작은 Flask 앱처럼 생각하면 된다

실제로는 app.route() 대신 member_bp.route()를 쓰는 것이다.

개념적으로는 작은 앱을 만드는 느낌.

회원용 Blueprint

게시판용 Blueprint

관리자용 Blueprint

를 각각 만든다.

그럼 언제 실제 서버에 연결될까?

마지막에 app.py

```
from member import memebr_bp

app.register_blueprint(member_bp)
``
한다.

이 순간

member_bp 안의 라우트들이 app으로 복사된다.


```
member.py
↓
Blueprint 생성
↓
라우트 저장
↓
app.py import
↓
register_blueprint()
↓
실제 Flask 앱에 연결
``

전체 흐름을 그림으로 보면
프로그램 시작
        │
        ▼
     app.py

        │
        ▼

__name__ == "__main__"
        │
        ▼

app.run()

--------------------------------

프로젝트 커짐
        │
        ▼

모듈화

user.py
board.py
admin.py

--------------------------------

라우트도 분리 필요
        │
        ▼

Blueprint 사용

user_bp
board_bp
admin_bp

--------------------------------

app.py

register_blueprint(user_bp)
register_blueprint(board_bp)
register_blueprint(admin_bp)

--------------------------------

결국 하나의 Flask 앱으로 합쳐짐


## 12. 결국 핵심은 "경계"다


__name__
↓
어디서 실행할지 경계를 만든다

모듈화
↓
파일의 경계를 만든다

Blueprint
↓
라우트의 경계를 만든다

즉 Flask를 배우면서 만나는 개념들은 전부 결국 같은 방향이다.

"코드가 커질수록 경계를 나누어 관리하기 쉽게 만든다."

그래서 Flask의 성장 과정은

실행 경계 (__name__)
        ↓
파일 경계 (모듈화)
        ↓
프로젝트 구조
        ↓
라우트 경계 (Blueprint)
