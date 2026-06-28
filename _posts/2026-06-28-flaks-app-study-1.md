---
title: "플라스크(Flask) app객체에 내장된 함수들"
excerpt: "매우 유용한 데코레이터들 모음(@app.after_request)"
categories: [Flask]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 

오늘은 `@app.after_request`에 대해서 알아보자. 

## 1. 응답을 클라이언트에게 보내기 직전에 개입: `@app.after_request`

**@app.after_request**는 `view 함수(라우트)`가 정상적으로 처리를 끝내고 `응답(Response) 객체`를 만들어 놓으면, 이를 **클라이언트에게 전송하기 직전**에 가로채서 수정할 수 있게 해준다.
<br><br>
비유적으로 표현해보자면, `@app.after_request`는 플라스크의 **'요청 처리 흐름(Request Lifecycle)'**에서 중간에 훅~!(Hook) 끼어드는 갈고리 같은 존재다.
<br><br> 
사실 이런 의문이 들거다. 평소에 함수 로직으로 계산된 값을 return으로 반환하면 그냥 거기서 끝이라고 생각했는데, `@app.after_request`이란 녀석은 응답 객체를 손에 쥐고 있다가 클라이언트로 응답 객체가 넘어가기 전에 내용을 수정하거나 헤더에 추가정보를 넣을 수 있다는게 굉장히 놀라울 수 있다. 
<br><br>
그만큼 알아볼 가치가 매우 높다는게 아닐까?


## 2 .주요 용도: 공통 HTTP 헤더 추가(`CORS` 설정 등), 응답 로그 기록 등이 있다. 
<br><br>
주의점: 반드시 `response 객체`를 **인자**로 받고, 수정된 `response 객체`를 **반환**해야 한다. (처리 중 에러가 발생했다면 실행 X.)
<br><br>
```python
@app.after_request
def add_header(response):
    response.headers['X-Custom-Header'] = 'MyValue'
    response.headers['Cache-Control'] = 'no-cache'  
    return response    # 꼭 response 객체를 반환하자
```

`response.headers['X-Custom-Header']` : 특별히 'MyValue'라는 메모를 'X-Custom-Header'라는 이름으로 붙여서 보낼테니 프론트엔드가 해석해"라는 이름표다. (보통 개발자 마음대로 지을 때는 앞에 X-를 붙이는 관례) 일종의 비밀 메모.

`response.headers['Cache-Control'] = 'no-cache'` 애초에 데이터를 보낼 때 `@app.after_request`로 no-cache 스티커를 붙여서 브라우저가 낡은 데이터를 쓰지 않도록 통제한다. 

## 3. 사용 목적

> 로그 기록: 요청이 끝날 때마다 응답 상태 코드(200, 404 등)를 기록하여 모니터링할 때 사용.

공통 응답 처리: 모든 API 응답에 공통으로 들어갈 JSON 포맷이나 헤더를 일괄적으로 입힐 때 유용함.

보안: 모든 페이지에 보안 관련 헤더(예: Content-Security-Policy)를 적용할 때 일일이 함수마다 넣지 않고 한곳에서 해결 가능하다. 

## 4. 중복제거의 미학

라우트 함수 수백개가 있어도, **after_request 함수는 딱 하나면 된다.** 모든 응답이 이곳을 거치기 때문에, 여기서 `X-Request-ID`를 붙여주면 수많은 함수 모두에 헤더가 자동으로 달린다.
<br><br>
이를 이해하기 위해 어떤 과정을 통해 이루어지는지 알아봐야한다. 
<br><br>
Flask는 내부적으로 `WSGI(Web Server Gateway Interface)`라는 표준을 따른다. 서버가 요청을 받으면 Flask는 거대한 Dispatching(배분) 과정을 거치는데, 이를 간략하게 정리하면 다음과 같다. 
<br><br>
1. 요청 도착: 서버가 요청을 받음
<br><br>
2. before_request 루프: **모든 함수가 실행되기 전**, 공통적으로 해야 할 일(인증 체크 등)
<br><br>
3. 메인 라우트 함수: 우리가 정의한 @app.route('/...') 함수가 실행되어 결과를 만듦
<br><br>
4. after_request 루프: [검수 단계] 라우트 함수가 만든 Response 객체를 낚아채서 처리. 마치 컨테이너 벨트에 있는 응답객체를 들어올려서 헤더에 추가 정보도 넣고 내용도 수정해서 다시 내려놓는다고 이해하면 좋다. 
<br><br>
5. 응답 전송: 클라이언트에게 최종 결과 반환
<br><br>
우리가 `@app.after_request 데코레이터`를 입력하면, 플라스크는 내부의 `after_request_funcs`라는 리스트에 당신이 만든 그 함수를 '이 리스트에 담긴 함수들은 응답이 나가기 전에 무조건 실행하라고 등록해두는거다. 
<br><br>
<예시>
리스트형식으로 값들을 담아내겠지만 전체적인 구조는 딕셔너리 형태이다. 우린 블루프린트를 써야하기 때문에 각 블루프린트 이름이 키(Key)가 되어 그 안에 함수 리스트가 들어있는 구조다.
<br><br>
```
self.before_request_funcs = { None: [], 'blueprint_name': [] }
self.after_request_funcs  = { None: [my_after_func], 'blueprint_name': [] }
```
<br><br>
우리는 단순히 `@app.after_request`라고 적지만, 실제로는 "플라스크라는 거대한 시스템의 특정 레지스트리에 내 코드를 동적으로 등록하는 작업이 이루어지는거다. 
<br><br>
이런 과정을 거쳐 우리는 굉장히 쉽고 간편하게 공통된 작업을 수행할 수 있게 된다. 

## 5  심화 예시 - 백엔드 (Flask) : 요청(request)마다 고유 ID(영수증 번호) 발급

요청이 들어오는 순간 `@app.before_request` 데코레이터에서 `고유 ID`(uuid 등)를 만들어 Flask의 임시 저장소(`g`)에 넣어두고, 응답이 나갈 때 `@app.after_request` header에 이 ID를 꺼내서 붙여주는 구조다. 
<br><br>
코드와 설명이 살짝 길긴 하지만 아주 흥미로운 주제라서 들고 와봤다. 

<br><br>

```Python

import uuid
from flask import Flask, jsonify, g

app = Flask(__name__)
```
플라스크 클래스에서 app이라는 객체로 인스턴스화 해준다. 
<br><br>

참고로 import된 `jsonify`는 플라스크(Flask)에서 데이터(파이썬의 딕셔너리, 리스트 등)를 `JSON 형식`의 응답 객체로 쉽고 깔끔하게 변환해 주는 함수다.
즉 파이썬 데이터를 웹 API가 이해할 수 있는 JSON 문자열로 바꿔서 돌려보내 준다.  

# 1. 요청이 서버에 도착하자마자 실행
```
@app.before_request   
def assign_request_id():
    # uuid4를 사용해 절대 겹치지 않는 무작위 난수 생성 (예: a8f9-11c2...)
    g.request_id = str(uuid.uuid4())  # g.request_id에다가 난수를 새겨 저장한다. 
    
    #  모든 서버 로그에 g.request_id를 남김. 
    # print(f"[REQ: {g.request_id}] 결제 요청 들어옴")
```
<br><br>
>참고 : 로그는 '과정'을 저장하는 것을 말한다. 로그는 추가만 가능(Append-only)하며 이미 기록된 내용을 수정하거나 삭제하지 않는다. 시간 순으로 그냥 밑으로 쭉 이어 붙인다. 

# 2. 클라이언트에게 응답을 보내기 직전에 실행

앞서 설명했듯이 응답이 가기 전 훅~ 헤더(header)를 추가한다. 
<br><br>
```python
@app.after_request
def append_request_id_to_header(response):
    # g 객체에 저장해뒀던 고유 ID를 꺼내서 'X-Request-ID' 헤더에 찰싹 붙임
    response.headers['X-Request-ID'] = getattr(g, 'request_id', 'unknown')
    return response
```
<br><br>
참고로 여기서 `getattr()`은 python의 내장함수다. 

여기서 눈치 빠른 사람은 `get()`함수에서 따왔다는걸 이미 캐치했을 것이다. 에러를 뿜어내고 프로그램이 셧다운될 바에 반환값을 내고 서비스를 유지시키는 거다. 

세부적으로 살펴보면, 
<br><br>
`getattr(객체, '속성이름', '기본값')` 순서로 매개변수가 구성되는데
<br><br>
>`g`는 우리가 찾을 객체플라스크의 전역 저장소인 g 객체다.
주의할 점은 현재 처리 중인 `요청(Request) 안`에서만 유지되는 전역 저장소다.

>'request_id'는 찾고 싶은 속성 이름을 말하는데, `g` 안에 저장되어 있을 것으로 예상되는 이름이다.
주의할 점은 `request_id`는 '유저 ID(User ID)'와는 완전히 다른 개념이다. 어떤 요청인지 식별하는 것으로 해당 요청이 끝날 때까지만 유효하다. 

'unknown'는 기본값. 즉 Default 값이다. 만약 g 안에 request_id가 없다면 대신 반환할 값을 말한다. `get()`사용하듯이 넣는거다.  

**3. 에러가 발생한 가상결제 시뮬레이션 API**

<백엔드 에러 발생 상황 예시>

```python 
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
버튼을 누르면 에러가 나는 백엔드 API를 호출. 이때 프론트엔드는 본문(Body)의 에러 메시지뿐만 아니라, 헤더(Header)에 담긴 X-Request-ID를 꺼내서 고객센터로 보내면 된다. 

<br><br>
<예시>
```
HTML
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>결제 페이지</title>
</head>
<body>
    <h2>땡튜브 프리미엄 멤버십 결제</h2>
    <button id="payBtn">17,950원 결제하기</button>
    
    <div id="errorBox"></div>

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
                            <span>
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
1. Request 도착 → before_request가 UUID 생성 후 `g.request_id`에 그 난수번호로 찍고나서 g라는 임시저장소에 저장. (요청별 독립적으로 운영)
 <br><br>
2. View 실행 → 서버 내부 로직에서 에러 발생 시 log.error(f"{g.request_id} 에러 발생!") 기록. 로그에 `g.request_id`가 전부 찍혀있다.
<br><br>
4. 서버가 Response 객체 생성 → after_request가 임시저장소 g 객체에서 ID를 꺼내 헤더에 삽입. 서버 내부 휘발성 데이터(g)에서 브라우저라는 외부 공간으로 영구적으로 전달
<br><br>
5. 결과: 사용자 화면엔 "고객센터 문의 코드: a8f9..." 출력. 
<br><br>

이렇게 헤더에 `X-Request-ID`가 붙어 있다면, 사용자가 에러 화면을 캡처해서 보내거나 "번호가 req_`난수(uuid)`이었어요"라고 알려줄 수 있게 된다. 그러면 개발자는 로그에서 req_난수(uuid)만 검색하면 1초 만에 그 사용자가 겪은 모든 과정을 복구할 수 있다. 

<br><br>
총평을 해보자면, 사용자가 보는 화면에는 "알 수 없는 오류"라고 뭉뚱그려 보여주어 내부 시스템 구조(DB 에러 등)를 해커에게 숨길 수 있으면서도, 개발자는 고유 코드를 통해 완벽하게 디버깅할 수 있는 일석이조의 보안/운영 테크닉인 셈이다. 다음 시간에는 `g`객체에 대해서 더 심도 있게 알아 보자!
