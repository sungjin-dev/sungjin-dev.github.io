title: "[Flask] Blueprint란? 방대한 라우트 코드를 깔끔하게 분리하는 마법"
category: "Flask"
toc: true
toc_sticky: true

오늘은 플라스크(Flask)의 핵심 기능 중 하나인 Blueprint(블루프린트)에 대해 알아보자.
<br><br>
직역하면 '청사진'이라는 뜻이다. 단어 자체에서부터 뭔가 체계적이고 긍정적인 기운(?)이 느껴지지 않는가?
<br><br>
프로그래밍 세계, 특히 플라스크에서 블루프린트는 방대한 라우트(Route) 코드들을 기능별로 쪼개서 깔끔하게 정리해 주는 아주 고마운 도구라고 보면 된다.
<br><br><br>
1. 기존 방식 (app.py 하나로 버티기)
<br><br>
우선 메인 역할을 할 app.py 파일 하나를 만들고, flask 모듈에서 Flask 클래스를 꺼내보자.
<br><br>
```python
# app.py

from flask import Flask
```
<br><br>
여기서 대문자로 시작하는 Flask는 클래스(Class)이다.
<br><br>
비유적으로 표현하자면, 현대자동차 공장(flask 모듈)에서 쏘나타 설계도(Flask 클래스)를 빼오는 것과 흡사하다.
<br><br>
다음으로 이 Flask 클래스를 인스턴스화(Instantiation) 해보자.
```python
app = Flask(__name__)
```
<br><br>
여기서 app이란 실제로 살아 움직이는 웹 애플리케이션 객체다.
<br><br>
즉, "Flask라는 웹 서버 설계도를 가지고, 실제로 동작하는 진짜 웹 서버 app 객체(쏘나타 자동차) 하나를 만들어낸다"고 이해하면 편하다.
<br><br>
```python
@app.route('/')
def home():
    return 'Hello, SUNGJIN!'
```
<br><br>
서버가 만들어지면, 라우터(Router)가 요청된 주소(예: /login)와 방식(GET, POST 등)을 보고 해당 로직(함수)으로 연결해 준다.
<br><br><br>
**라우팅(Routing)**이란?
<br><br>
요청한 클라이언트의 URL 주소와 실제로 처리를 담당하는 로직(함수)을 연결하는 안내 데스크 작업을 지칭한다.
<br><br>
위 예시처럼 ('/') 이렇게만 쓰면 최상위 홈 화면으로 보낸다는 뜻이다. /write, /banking 등 도메인 뒤에 붙는 주소를 보고 판단해서 알맞은 부서로 보내는 것이다.
<br><br><br>
2. 왜 Blueprint가 필요할까? (문제점)
<br><br>
대기업에 가보면 기획팀, 인사팀, 개발팀 등 엄청나게 많은 부서들이 존재한다. 서버 역시 마찬가지다. 셀 수 없이 많은 요청을 받아내야 하고 수많은 기능(부서)들이 존재한다.
<br><br>
이 모든 코드를 app.py 한 문서에 코딩해버리면 어떻게 될까?
<br><br>
수백, 수천 줄이 넘어가는 코드가 뒤섞여서, 나중에는 꼴도 보기 싫을 정도로 스크롤만 내리다가 창을 꺼버릴지도 모른다. 유지보수가 불가능해지는 것이다.
<br><br>
이때 Blueprint를 사용하면, 방대한 라우트 함수들을 기능별로 여러 파일과 폴더에 묶어서 깔끔하게 정리할 수 있다!
<br><br><br>
3. Blueprint 본격 사용법
<br><br>
① 부서 만들기 (routes.py)
<br><br>
먼저 routes.py 파일을 하나 만든다. (파일명은 직관적으로 사용 목적을 담아내기만 하면 뭐든 상관없다.)
<br><br>

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
<br><br>
위 코드를 보면 아까 app을 Flask 클래스로 찍어낸 것과 구조가 똑같다. app 자리에 member_bp 변수가 들어간 것을 확인할 수 있다.
<br><br>
여기서 꼭 알고 넘어갈 핵심은 세 번째 매개변수인 `url_prefix`다.
<br><br>
Blueprint 클래스를 선언할 때 url_prefix를 미리 설정해두면, 이후 생성될 모든 URL 앞에는 해당 문자열이 자동으로 붙는다.
<br><br>
예를 들어, @member_bp.route('/login')이라고만 적어도 플라스크가 알아서 앞머리를 붙여 최종 주소를 http://.../member/login으로 자동 완성해 준다!
<br><br>
② 메인 데스크에 부서 등록하기 (app.py)
<br><br>
자 이제, 기능별로 쪼개서 작성한 Blueprint 객체를 메인이 되는 app.py와 연결시켜 주도록 하자.
<br><br>
```python
# app.py

from flask import Flask

# blueprints 폴더 > member 폴더 > routes.py 파일에서 member_bp 객체를 불러온다.
from blueprints.member.routes import member_bp  

app = Flask(__name__)

# routes.py에서 만든 member_bp 부서를 메인 app에 정식으로 등록(연결)한다.
app.register_blueprint(member_bp) 
```
<br><br>
이렇게 세팅하고 나면, 이젠 app.py는 당분간 볼 일이 없다. 앞으로는 기능별로 블루프린트 폴더를 만들고, 그 안에 파일별로 구분해서 차곡차곡 정리해 집어넣기만 하면 된다.
<br><br>
(주의: 앞으로 분리된 routes.py 파일에서는 실수로 @app.route()를 사용하지 않도록 조심하자! 반드시 @member_bp.route()처럼 해당 부서의 블루프린트 객체를 써야 한다.)
<br><br><br>
4. 실전 사용 예시
<br><br>
마지막으로, 실제로 로그인/회원가입 기능이 들어간 블루프린트 실전 코드 예시를 살펴보자.
<br><br>
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
    result = request.args.get('result')
    return render_template('signup_form.html', result=result)

# 회원가입 데이터 처리하기 (최종 URL: /member/signup_confirm)
@member_bp.route('/signup_confirm', methods=['POST'])
def signup_confirm():
    mId = request.form['mId']
    mPw = request.form['mPw']
    
    # ... (중략: 데이터베이스 저장 로직) ...
```
<br><br>
이렇게 Blueprint를 활용하면 코드가 훨씬 전문적이고 깔끔해지며, 협업할 때도 각자 맡은 파일만 수정하면 되므로 충돌을 방지할 수 있다!
<br><br>
