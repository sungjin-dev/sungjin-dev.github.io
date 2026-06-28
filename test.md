



## 2. 응답을 클라이언트에게 보내기 직전에 개입: `@app.after_request`

 다음으로 `@app.after_request`을 활용하는 방법에 대해 알아보자. 
 
**@app.after_request**는 `뷰 함수(라우트)`가 정상적으로 처리를 끝내고 `응답(Response) 객체`를 만들었을 때, 이를 **클라이언트에게 전송하기 직전**에 가로채서 수정할 수 있게 해준다.
<br><br>
비유적으로 표현해보자면, `@app.after_request`는 플라스크의 **'요청 처리 흐름(Request Lifecycle)'**에서 중간에 끼어드는 갈고리(Hook) 같은 존재다.

# 1 .주요 용도: 공통 HTTP 헤더 추가(`CORS` 설정 등), 응답 로그 기록 등이 있다. 
<br><br>
주의점: 반드시 `response 객체`를 **인자**로 받고, 수정된 `response 객체`를 **반환**해야 한다. (처리 중 에러가 발생했다면 실행되지 않음.)
<br><br>
```python
@app.after_request
def add_header(response):
    response.headers['X-Custom-Header'] = 'MyValue'
    response.headers['Cache-Control'] = 'no-cache'  
    return response    # 꼭 response 객체를 반환하자
```

`response.headers['X-Custom-Header']` : 특별히 'MyValue'라는 메모를 'X-Custom-Header'라는 이름으로 붙여서 보낼테니 프론트엔드 찰떡같이 해석해"라는 이름표다. (보통 개발자 마음대로 지을 때는 앞에 X-를 붙이는 관례) 일종의 비밀 메모

`response.headers['Cache-Control'] = 'no-cache'` 애초에 데이터를 보낼 때 `@app.after_request`로 no-cache 스티커를 붙여서 브라우저가 알아서 낡은 데이터를 쓰지 않도록 통제하는 것이다. 

# 2. 사용하는 목적

> 로그 기록: 요청이 끝날 때마다 응답 상태 코드(200, 404 등)를 기록하여 모니터링할 때 사용.

공통 응답 처리: 모든 API 응답에 공통으로 들어갈 JSON 포맷이나 헤더를 일괄적으로 입힐 때 유용함.

보안: 모든 페이지에 보안 관련 헤더(예: Content-Security-Policy)를 적용할 때 일일이 함수마다 넣지 않고 한곳에서 해결 가능.


# 3  심화 예시 - 백엔드 (Flask) : 요청마다 고유 ID(영수증 번호) 발급

요청이 들어오는 순간(@app.before_request) `고유 ID`를 만들어 Flask의 임시 저장소(`g`)에 넣어두고, 응답이 나갈 때(@app.after_request) `헤더`에 이 ID를 꺼내서 붙여주는 구조.

```
Python
import uuid
from flask import Flask, jsonify, g

app = Flask(__name__)
```

1. 요청이 서버에 도착하자마자 실행
```
@app.before_request
def assign_request_id():
    # uuid4를 사용해 절대 겹치지 않는 무작위 난수 생성 (예: a8f9-11c2...)
    g.request_id = str(uuid.uuid4())  # g는 "이 요청(Request)이 살아있는 동안만 유효한 저장소"
    
    # 실무에서는 이때부터 남기는 모든 서버 로그에 g.request_id를 남김.
    # print(f"[REQ: {g.request_id}] 결제 요청 들어옴")
```

2. 클라이언트에게 응답을 보내기 직전에 실행

```
@app.after_request
def append_request_id_to_header(response):
    # g 객체에 저장해뒀던 고유 ID를 꺼내서 'X-Request-ID' 헤더에 찰싹 붙임
    response.headers['X-Request-ID'] = getattr(g, 'request_id', 'unknown')
    return response
```

3. 에러가 발생하는 가상의 결제 API

```
@app.route('/api/payment', methods=['POST'])
def process_payment():
    # DB 연결 타임아웃 등 치명적인 에러가 발생했다고 가정
    # (서버 내부에는 에러 로그가 남음)
    # print(f"[REQ: {g.request_id}]  FATAL ERROR: DB Connection Timeout")
    
    return jsonify({"error": "결제 처리 중 서버 에러가 발생했습니다."}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

# 3. 프론트엔드 (HTML/JS) : 헤더 읽어서 에러 화면에 띄우기
버튼을 누르면 에러가 나는 백엔드 API를 호출한다. 이때 프론트엔드는 본문(Body)의 에러 메시지뿐만 아니라, 헤더(Header)에 담긴 X-Request-ID를 꺼내서 고객센터 안내용 코드로 사용하는 것.

<br><br>
```
HTML
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>결제 페이지</title>
</head>
<body>
    <h2>o튜브 프리미엄 멤버십 결제</h2>
    <button id="payBtn">29,900원 결제하기</button>
    
    <div id="errorBox" style="margin-top: 20px; color: red; font-weight: bold;"></div>

    <script>
        document.getElementById('payBtn').addEventListener('click', () => {
            fetch('/api/payment', { method: 'POST' })
                .then(response => {
                    // 응답이 정상(200)이 아닌 경우 (에러 발생 시)
                    if (!response.ok) {
                        // 핵심: 서버가 숨겨둔 'X-Request-ID' 헤더를 꺼낸다
                        const reqId = response.headers.get('X-Request-ID');
                        
                        // 화면에 에러 문구와 함께 문의 코드를 출력.
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
<br><br>
><로직 흐름>
1. Request 도착 → before_request가 UUID 생성 후 g에 저장.

2. View 실행 → 에러 발생 시 log.error(f"{g.request_id} 에러 발생!") 기록.

3. Response 생성 → after_request가 g에서 ID를 꺼내 헤더에 삽입.

4. 결과: 사용자 화면엔 "고객센터 문의 코드: a8f9..." 출력.

<br><br>
"왜 하필 `g 객체`를 쓸까?"
<br><br>
Flask의 g (global) 객체는 한 번의 HTTP 요청(Request) 안에서만 유지되는 임시 보관함이다. A유저와 B유저가 동시에 결제를 요청해도 g 객체는 서로 철저히 분리되므로, ID가 꼬이거나 뒤섞일 위험 없이 안전하게 헤더까지 데이터를 전달할 수 있다.
<br><br>
사용자가 보는 화면에는 "알 수 없는 오류"라고 뭉뚱그려 보여주어 내부 시스템 구조(DB 에러 등)를 해커에게 숨길 수 있으면서도, 개발자는 고유 코드를 통해 완벽하게 디버깅할 수 있는 일석이조의 보안/운영 테크닉인 셈이다. 
