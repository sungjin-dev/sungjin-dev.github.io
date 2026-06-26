---
title: "플라스크(Flask) app객체에 내장된 함수들"
excerpt: "매우 유용한 데코레이터들 모음"
categories: [Flask]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
published: false
--- 

Flask의 app 객체에는 요청 생명주기(Lifecycle)를 관리하거나 전역적인 처리를 도와주는 매우 유용한 데코레이터들이 많다.

## 1. 본격적인 라우트(뷰) 함수 실행 직전에 개입 : `@app.before_request`


 `@app.before_request`는 이미 플라스크 제작자들이 app이라는 객체 안에 만들어둔 '기능(메서드)'이다. 

 여기서 `@`기호는 '이름표(또는 포스트잇)' 같은 역할을 하며 전문 용어로는 `데코레이터(Decorator)`로 불린다. 

# 1. 전역(Global) 로그인 여부 체크
사용자가 어떤 페이지를 요청할 때 먼저 로그인 상태인지 확인한다. 로그인이 안 되어 있다면 아예 라우트 함수로 넘겨주지 않고 로그인 페이지로 쫓아내버린다(redirect).

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

# 2. 악성 IP 차단 (블랙리스트 필터링)
특정 IP에서 디도스(DDoS) 공격을 하거나 비정상적인 요청을 마구 보낼 때, 서버 자원을 낭비하기 전에 가장 앞단에서 차단해 버리는 용도입니다.

Python
from flask import request, abort

# 차단할 악성 IP 목록

```
BLACKLIST_IPS = ['192.168.1.100', '203.0.113.50']

@app.before_request
def block_malicious_ips():
    # 요청을 보낸 사용자의 IP 주소 확인
    client_ip = request.remote_addr
    
    if client_ip in BLACKLIST_IPS:
        # 403 Forbidden 에러를 던져서 즉시 접근을 막음
        abort(403)
```


최근 프로젝트에서는 `@app.before_request`를 사용하여 session에 로그인한 ID가 있다고 가정하고 모듈이 잘 작동하는지 테스트하고 있다. 

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
이처럼 라우트 함수 실행 전,  즉 함수 로직이 실현되지 전에 개발자 모드로 조건을 충족시켜서 모듈을 돌려볼 수 있다.


 ## 2. 응답을 클라이언트에게 보내기 직전에 개입: `@app.after_request`
뷰 함수(라우트)가 정상적으로 처리를 끝내고 응답(Response) 객체를 만들었을 때, 이를 클라이언트에게 전송하기 직전에 가로채서 수정할 수 있습니다.

주요 용도: 공통 HTTP 헤더 추가(CORS 설정 등), 응답 로그 기록

주의점: 반드시 response 객체를 인자로 받고, 수정된 response 객체를 반환해야 합니다. (처리 중 에러가 발생했다면 실행되지 않습니다.)

```
@app.after_request
def add_header(response):
    response.headers['X-Request-ID'] = 'MyValue'
    response.headers['Cache-Control'] = 'no-cache'  
    return response
```

`response.headers['X-Custom-Header']` : 특별히 'MyValue'라는 메모를 'X-Custom-Header'라는 이름으로 붙여서 보낼게! 프론트엔드 너가 알아서 읽어!"스티커의 이름표 (보통 개발자 마음대로 지을 때는 앞에 X-를 붙이는 관례가 있습니다.)(프론트-백엔드 개발자)끼리만 약속하고 쓰는 비밀 메모

`response.headers['Cache-Control'] = 'no-cache'` 애초에 데이터를 보낼 때 `@app.after_request`로 no-cache 스티커를 붙여서 브라우저가 알아서 낡은 데이터를 쓰지 않도록 통제하는 것이다. 


1. 백엔드 (Flask) : 요청마다 고유 ID(영수증 번호) 발급하기
요청이 들어오는 순간(@app.before_request) 고유 ID를 만들어 Flask의 임시 저장소(g)에 넣어두고, 응답이 나갈 때(@app.after_request) 헤더에 이 ID를 꺼내서 붙여주는 구조입니다.

```
Python
import uuid
from flask import Flask, jsonify, g

app = Flask(__name__)
```

# 1. 요청이 서버에 도착하자마자 실행
```
@app.before_request
def assign_request_id():
    # uuid4를 사용해 절대 겹치지 않는 무작위 난수 생성 (예: a8f9-11c2...)
    g.request_id = str(uuid.uuid4())
    
    # 실무에서는 이때부터 남기는 모든 서버 로그에 g.request_id를 같이 찍습니다.
    # print(f"[REQ: {g.request_id}] 결제 요청 들어옴")
```

# 2. 클라이언트에게 응답을 보내기 직전에 실행

```
@app.after_request
def append_request_id_to_header(response):
    # g 객체에 저장해뒀던 고유 ID를 꺼내서 'X-Request-ID' 헤더에 찰싹 붙임
    response.headers['X-Request-ID'] = getattr(g, 'request_id', 'unknown')
    return response
```

# 3. 에러가 발생하는 가상의 결제 API

```
@app.route('/api/payment', methods=['POST'])
def process_payment():
    # DB 연결 타임아웃 등 치명적인 에러가 발생했다고 가정
    # (서버 내부에는 에러 로그가 남음)
    # print(f"[REQ: {g.request_id}] 💥 FATAL ERROR: DB Connection Timeout")
    
    return jsonify({"error": "결제 처리 중 서버 에러가 발생했습니다."}), 500

if __name__ == '__main__':
    app.run(debug=True)
```
# 2. 프론트엔드 (HTML/JS) : 헤더 읽어서 에러 화면에 띄우기
버튼을 누르면 에러가 나는 백엔드 API를 호출합니다. 이때 프론트엔드는 본문(Body)의 에러 메시지뿐만 아니라, 헤더(Header)에 담긴 X-Request-ID를 꺼내서 고객센터 안내용 코드로 사용합니다.


```
HTML
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>결제 페이지</title>
</head>
<body>
    <h2>프리미엄 멤버십 결제</h2>
    <button id="payBtn">19,900원 결제하기</button>
    
    <div id="errorBox" style="margin-top: 20px; color: red; font-weight: bold;"></div>

    <script>
        document.getElementById('payBtn').addEventListener('click', () => {
            fetch('/api/payment', { method: 'POST' })
                .then(response => {
                    // 응답이 정상(200)이 아닌 경우 (에러 발생 시)
                    if (!response.ok) {
                        // ⭐️ 핵심: 서버가 숨겨둔 'X-Request-ID' 헤더를 꺼냅니다!
                        const reqId = response.headers.get('X-Request-ID');
                        
                        // 화면에 에러 문구와 함께 문의 코드를 출력합니다.
                        const errorBox = document.getElementById('errorBox');
                        errorBox.innerHTML = `
                            [결제 실패] 알 수 없는 오류가 발생했습니다.<br>
                            <span style="color: gray; font-size: 0.8em; font-weight: normal;">
                                (고객센터 문의 코드: ${reqId})
                            </span>
                        `;
                    }
                })
                .catch(error => {
                    console.error("네트워크 에러:", error);
                });
        });
    </script>
</body>
</html>
```

"왜 하필 `g 객체`를 쓰나요?"
Flask의 g (global) 객체는 한 번의 HTTP 요청(Request) 안에서만 유지되는 임시 보관함입니다. A유저와 B유저가 동시에 결제를 요청해도 g 객체는 서로 철저히 분리되므로, ID가 꼬이거나 뒤섞일 위험 없이 안전하게 헤더까지 데이터를 전달할 수 있습니다.

실무적 가치 강조
사용자가 보는 화면에는 "알 수 없는 오류"라고 뭉뚱그려 보여주어 내부 시스템 구조(DB 에러 등)를 해커에게 숨길 수 있으면서도, 개발자는 고유 코드를 통해 완벽하게 디버깅할 수 있는 일석이조의 보안/운영 테크닉이라는 점을 강조하시면 좋습니다.
