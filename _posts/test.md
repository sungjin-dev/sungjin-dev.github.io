MVC 패턴(Model-View-Controller)은 소프트웨어 공학에서 가장 유명하고 널리 쓰이는 건축 설계도(디자인 패턴) 중 하나입니다. 

한마디로 정의하자면 "코드를 역할에 따라 세 가지 구역으로 완벽하게 나누어 작업하자"는 십계명과도 같습니다.

이해를 돕기 위해 아주 고전적이면서도 완벽한 '식당 비유'를 들어 설명해 주지.

<img width="3999" height="1999" alt="image" src="https://github.com/user-attachments/assets/a474dbb4-8ebb-498d-8c1e-680fd253bb45" />
Source: Shutterstock

1. 식당으로 이해하는 MVC

M (Model) : 주방장과 식재료 창고
역할: 애플리케이션의 '데이터'와 '비즈니스 로직(규칙)'을 담당합니다.
비유: 식당의 주방장입니다. 창고에서 고기(데이터)를 꺼내오고, 레시피(규칙)에 따라 요리를 만듭니다. 
손님이 누구인지, 홀의 인테리어가 어떤지는 전혀 관심이 없습니다. 
오직 '정확하고 맛있는 요리를 만드는 것(데이터 처리)'에만 집중합니다.

V (View) : 플레이팅과 손님 테이블역할: 사용자에게 보여지는 '화면(UI)'을 담당합니다.
비유: 완성된 요리가 담기는 예쁜 접시이자, 손님이 보는 메뉴판입니다. 
주방장이 고기를 어떻게 구웠는지(내부 로직)는 알 필요가 없습니다. 
그저 웨이터가 가져다준 요리를 '손님에게 가장 예쁘게 보여주는 것'이 유일한 임무입니다. 
(우리가 앞서 배운 render_template과 HTML이 바로 이곳에 속합니다.) 

C (Controller) : 웨이터 (지배인)역할: 사용자의 입력을 받고, 
Model과 View 사이를 연결하는 '중간 관리자'입니다.
비유: 홀을 돌아다니는 웨이터입니다. 손님(사용자)에게 주문을 받고(Request), 
주방장(Model)에게 "스테이크 미디엄 레어로 하나요!"라고 지시합니다. 

요리가 완성되면 주방장에게서 요리를 받아, 예쁜 접시(View)에 담아 손님에게 전달(Response)합니다.

2. 우리가 짠 Flask 코드에 대입해 볼까요?

지금까지 작성하신 플라스크 코드도 알게 모르게 이 패턴을 따르고 있습니다.

Python# Controller (웨이터)
@app.route('/profile/<username>')
def show_profile(username):
    
    # Model (주방장에게 데이터 요청)
    # user_data = db.get_user(username) <- 실제로는 이런 DB 조회 코드가 들어갑니다.
    user_data = {"name": username, "age": 25} 
    
    # View (접시에 담아 손님에게 전달)
    return render_template('profile.html', data=user_data) 
    
@app.route가 달린 함수는 주문을 받는 Controller입니다.
데이터를 조회하고 가공하는 로직은 Model의 역할입니다.
render_template('profile.html')은 완성된 요리를 내보내는 View입니다.

3. 왜 굳이 이렇게 나눌까?

(Decoupling의 귀환)앞서 우리가 깊게 논의했던 '결합도(Coupling)를 낮추는 것' 기억하시나요? 

MVC 패턴의 존재 이유가 바로 그것입니다.만약 이 셋을 나누지 않고 한 파이썬 파일 안에 HTML 코드와 데이터베이스 접속 코드, 라우팅 코드를 다 섞어 놓으면 어떻게 될까요?

디자인을 파란색에서 빨간색으로 바꾸고 싶은데(View 수정), 실수로 데이터베이스를 날려먹는(Model 붕괴) 대참사가 발생할 수 있습니다.

MVC 패턴으로 코드를 분업화(디커플링)해두면:디자이너(퍼블리셔)는 View(HTML) 파일만 안심하고 수정하면 됩니다.

백엔드 개발자는 Model(DB)과 Controller(서버 로직)만 집중해서 고치면 됩니다.서로의 영역을 침범하지 않으니, 

프로그램이 훨씬 거대해져도 유지보수하기가 편해지고 앞서 말한 데이터 무결성도 굳건하게 지켜지는 것이지.

```
my_flask_app/               # 프로젝트 최상위 폴더 (우리 식당 건물)
│
├── app.py                  # 식당 지배인 (앱 실행 및 환경 설정)
│
├── models/                 # [M] Model (주방장과 식재료)
│   ├── __init__.py
│   ├── database.py         # DB 연결 설정
│   └── user_model.py       # 회원(User) 데이터 처리 로직 및 규칙
│
├── templates/              # [V] View (예쁜 접시와 메뉴판)
│   ├── index.html          # 메인 화면
│   ├── login.html          # 로그인 화면
│   └── profile.html        # 회원 정보 화면 (render_template이 찾는 곳!)
│
├── controllers/            # [C] Controller (웨이터)
│   ├── __init__.py
│   ├── main_controller.py  # 메인 페이지 관련 라우팅 (@app.route)
│   └── user_controller.py  # 회원가입/로그인 관련 라우팅 (@app.route)
│
└── static/                 # 인테리어 소품 (디자인 및 꾸밈 요소)
    ├── css/
    │   └── style.css       # 화면을 예쁘게 꾸미는 CSS
    ├── js/
    │   └── script.js       # 브라우저에서 동작하는 자바스크립트
    └── images/
        └── logo.png        # 웹사이트 로고 이미지

```

1. models/ 폴더 (데이터와 로직)
데이터베이스와 직접 소통하는 파이썬 코드들이 모여 있는 곳입니다. user_model.py 안에는 "데이터베이스에서 회원 정보를 가져와라", "비밀번호가 일치하는지 검사해라" 같은 핵심 비즈니스 로직(주방장의 레시피)이 들어갑니다.

2. templates/ 폴더 (화면 껍데기)
우리가 앞서 배운 render_template() 함수가 묻지도 따지지도 않고 가장 먼저 달려가서 찾는 폴더입니다. 사용자에게 보여질 HTML 파일들이 들어있으며, 이 안에는 로직 대신 {% raw %}{{ name }}{% endraw %} 같은 템플릿 문법과 디자인 태그들만 존재합니다. (이름이 views가 아니라 templates인 이유는 Flask의 기본 설정 때문입니다.)

3. controllers/ 폴더 (주문 접수 및 연결)
@app.route() 데코레이터가 달린 함수들이 모여 있는 곳입니다. 만약 사용자가 /login 주소로 들어오면, user_controller.py 안에 있는 코드가 작동하여 아래와 같은 순서로 지시를 내립니다.

사용자가 입력한 아이디/비번을 받는다. (주문 접수)

models/user_model.py에게 비밀번호가 맞는지 물어본다. (주방장에게 확인)

확인이 끝나면 templates/profile.html을 render_template으로 구워내서 브라우저에 던져준다. (요리 서빙)

4. app.py (핵심 실행 파일)
식당의 문을 열고 닫는 역할을 합니다. 서버를 처음 가동할 때 필요한 각종 설정(데이터베이스 주소 세팅 등)을 하고, controllers/에 있는 웨이터들을 출근시켜 대기시키는 역할을 합니다.

5. static/ 폴더 (정적 파일)
여기에는 파이썬 서버가 해석하거나 변환할 필요 없이, 있는 그대로 브라우저에 전달해주기만 하면 되는 파일들(CSS, JS, 이미지)이 들어갑니다.

이렇게 폴더를 쪼개놓으면, 디자인을 고칠 때는 templates/와 static/ 폴더만 열어보면 되고, 데이터베이스 구조가 바뀌면 models/ 폴더만 수정하면 됩니다. 코드가 수만 줄로 늘어나도 내가 어디를 고쳐야 할지 단번에 알 수 있게 되는 것이죠.
