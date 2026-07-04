---
title: "비동기 방식 fetch에 관하여"
excerpt: "modal을 활용한 예시"
categories: [JavaScript]
tags:
  - Python
  - JavaScript
toc: true
toc_sticky: true
--- 

우리가 웹 페이지에서 버튼을 눌렀을 때, 화면 전체가 새로고침되는 경우가 허다했다. 기존에는 <form> 태그를 이용해 데이터를 보내고, 서버에서 완성된 HTML 템플릿을 통째로 다시 받아오는 방식을 썼기 때문이다. 하지만 이렇게 하면 매번 화면이 깜빡거리고 로딩이라도 길어진다면 사용자에게는 굉장히 불쾌한 기억으로 남을거다. 나또한 어린시절 그런 경험이 많았다. 
<br><br>
이런 고민을 해결해준 구원투수가 있다. 화면은 그대로 유지한 채, 딱 필요한 데이터만 몰래 가져와서 바로 창에 띄울 수 있게 해주는 함수가 바로 **fetch**(JavaScript)다.
<br><br>
요즘 fetch 방식을 애용하는 이유도 새로고침 없이 서버 정보를 실시간으로 바로 보여줄 수 있기 때문일 것이다. 
<br><br>
오늘은 fetch의 특징에 대해 알아보고 이를 이용해 모달 창을 귀엽게(?) 띄우는 법도 한번 알아보자. 


## 1. fetch는 비동기(Asynchronous)방식

비유적으로 카페를 예로 들어보자. 
<br><br>
동기(Synchronous) 방식: 손님이 주문을 하고, 카페에서 커피가 나올 때까지 꼼짝 않고 기다려야 한다. 커피가 나오기 전까지 카운터는 다른 손님의 주문을 받을 수도 없다. (비효율적)
<br><br>
비동기(Asynchronous) 방식: 손님이 주문을 하고 '진동벨'을 받는다. 카운터는 바로 다음 손님의 주문을 받고, 커피가 완성 되면 진동벨이 울리고 해당 음료를 가져간다. (효율적)

## 2. 예전 방식(XMLHttpRequest) vs Fetch 

예전에는 데이터를 가져오려면 `XMLHttpRequest`(fetch의 조상격)라는 복잡한 도구를 썼는데, 동사무소의 아주 복잡한 종이 신청서'라고 하면 비유적으로 맞을거다. 
<br><br>
1) 빈 서류를 한 장 꺼낸다. (new XMLHttpRequest())
<br><br>
2) 어디로 보낼지, 어떤 방식으로 보낼지 적는다. (xhr.open(...))
<br><br>
3) 서류가 처리되는 동안 상태가 변할 때마다 뭘 할지 빽빽하게 지시사항을 적는다. (xhr.onreadystatechange = function(...))
<br><br>
3) 제출한다 (xhr.send())
<br><br>
한마디로 데이터 하나 전송하는데도 절차가 너무 복잡했다. 

## 3. HTML Form + 템플릿 엔진 vs Fetch AP

비단 Fetch가 조상님보다 뛰어난게 아니다. 

**전통적인 방식 (HTML Form + 템플릿 엔진)**
<br><br>
작동 방식: form화면에서 input, select 태그 등을 통해 사용자가 데이터를 입력하고 버튼(submit)을 누르면, 브라우저가 화면을 하얗게 지우고 서버로 간다. 그러면 서버 내부 함수 로직을 통해 데이터가 재가공되거나 DB에 저장 혹은 계산되어 render_template 등을 통해 전해지고, 그 데이터가 결합된 새로운 HTML 페이지를 통째로 만들어서 보여준다. 화면 전체가 새로고침(깜빡임).
<br><br>
**최신 방식 (Fetch API)**
<br><br>
작동 방식: 사용자가 버튼을 누르면, 화면은 그대로 둔 채 자바스크립트(fetch)가 조용히 뒷문으로 빠져나가 서버에 다녀온다. 서버는 HTML이 아니라 딱 필요한 데이터(주로 JSON)만 건네준다. 그러면 자바스크립트가 그 데이터를 받아와서 화면의 일부분(예: 모달 창 안의 텍스트)만 싹 바꿔치기한다.
<br><br>
특징: 화면 깜빡임이 없고, 앱처럼 부드럽게 작동. (SPA, Single Page Application 방식의 기초)
<br><br>

## 4. Fetch방식의 또다른 강점 

**첫 번째**로 코드 가독성이 좋고 깔금하다. 문장처럼 읽히는 코드를 제공한다. 

뒤에 예시로 살펴보겠지만 위에서부터 아래로 쭉 차례로 "이거 하고 **(fetch)**, 그다음 이거 하고 **(then)**"순차적으로 코딩하면 되기 때문에 초보자가 봐도 흐름을 파악하기가 아주 쉽다. 

**두 번째**로 "데이터를 가져오면 (then) 특정 행위를 수행하라는 약속을 명확하게 표현할 수 있다.

`.then()` (그러고 나서) ->  " 데이터가 도착하면 .then(이걸 수행해)"라는 식이다. 
<br><br>
`.catch()` (혹시라도) ->  "혹시 사고가 나면(에러가 나면) .catch(위 방식으로 수습해)"
<br><br>
이렇듯 굉장히 직관적인 코딩이 가능하다. 

**세 번째**로 내장 기능이라 별도의 라이브러리 설치 없이 브라우저에서 바로 사용할 수 있다는 점을 들 수 있다 . 

평소에 여성분들이 사진 잘나오게 찍으려고 '스노우(SNOW)'나 '소다(SODA)' 같은 카메라 앱을 따로 설치하곤 하는데, 자바스크립트에도 데이터를 가져오기 위해 따로 설치해서 써야 하는 도구들(Axios, jQuery 등)이 있다. 반면 Fetch는 그냥 기본으로 깔려 있는 카메라 앱이라고 보면 된다. 
<br><br>
즉 최신 웹 브라우저(크롬, 사파리 등)가 자체적으로 내장하고 있는 **'순정 데이터 통신 앱'** 인 셈이다. 
<br><br>
그럼 백문여불여일견(百聞不如一見)이라고 간단하게 fetch함수를 사용해 모달(미니 텍스트창)을 만들어보자. 

## 5.  Fetch를 활용하여 모달(MODAL) 만들기

모달은 우리가 일상에서 자주 쓰는 단어인 'Mode'에서 파생된 형용사로 모달 창이 화면에 딱 뜨면, 뒤에 있던 원래 화면은 어두워지거나 흐려지면서 아무것도 클릭할 수 없게 된다. 
<br><br>
즉, 웹페이지가 평범하게 정보를 보는 '기본 모드'에서, 눈앞에 뜬 작은 창에만 집중해야 하는 모드로 상태가 강제로 전환(Modal)되었다는 뜻이다. 

### 1. HTML (뼈대)
모달(Modal)은 평소엔 숨겨져 있다가, 데이터가 오면 display 속성을 바꿔서 보여준다.

```html
  <button class="open_modal_btn" onclick="openModal();">
    Write a Memo!
  </button>
<div id="modal_test">
    <div class="memo_modal">
        <div class="modal_content">
            <h3>Memo</h3>
            <textarea id="textInput" rows="5" cols="50"></textarea>
            <div class="button_group">
              <button class="save_modal_btn" onclick="saveModalform();">
                  SAVE
              </button>
              <button class="cancel_modal_btn" onclick="closeModal();">
                  CLOSE
              </button>
            </div>
        </div> 
    </div>
</div>
```
<br><br>
참고 : textarea 태그는 말 그대로 메모장같은 창을 띄워준다. 적당히 5행 50열로 만들어 보았다. 

### 2. CSS (디자인)

핵심은 `position: fixed`로 **화면 중앙에 고정**하는 것이다.

```css
#modal_test {
  display:none; /* 기본값으로 숨긴다 */
}
.memo_modal {
  position: fixed;  /* 바로 이부분 */
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); /* 반투명 배경을 해야 주목받음 */
  display: flex; justify-content: center; align-items: center;
}
.modal_content {
  background: white; 
  padding: 20px; 
  border-radius: 8px;
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
}
```

참고 : `flex-direction: column`개념은 알고 가는게 좋다. (flex-direction: row가 기본값)
<br>
적용 전: [Memo 제목] [텍스트 입력창] [저장/닫기 버튼] -> 가로로 길게 늘어섬
<br>
적용 후:
<br>
[Memo 제목]
<br>
[텍스트 입력창]
<br>
[저장/닫기 버튼] -> 세로로 위에서 아래로 차곡차곡 쌓임

그리고 모달창이 가려진다면 z-index: 999; 이렇게 속성값을 줘서 우선순위를 높게 해주면 해결된다. 

### 3. JavaScript (핵심 로직)

```javascript

let tempId = null;  // 전역변수로 빼서 담아두자

function openModal() {
    tempId = Date.now();   // 여기선 const 상수화 x
    document.getElementById('modal_test').style.display = 'flex'; 
}

function closeModal() { 
    document.getElementById('modal_test').style.display = 'none'; 
}

  function saveModalform() {
      let form = document.saveModalform;
      const newMemo = document.getElementById('textInput').value
  
      const dataToSend = {
          memo : newMemo,
          postId : tempId
      }
  
      fetch('/memo/user_memo_confirm', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)  
      })
      .then(response => response.json())
      .then(data => {
          alert("SAVE COMPLETE!");
          document.getElementById('textInput').value = '';
          closeModal();
      })
      .catch(error => console.error("ERROR:", error));
  }
```

## 6. Fetch방식 데이터 흐름 파악하기 
차근차근 설명해보자면 
<br>
1. 사용자가 'Write a Memo!' 버튼을 클릭하면, openModal()함수가 실행되고 uuid 혹은 현재시간값으로 번호를 매길 임의의 숫자를 생성한다.<br><br>
2. 그 숫자는 `let tempId = null;` 전역변수에 담긴다. 그리고 'dataToSend(함수명 자유!)'라는 함수에 메모 내용과 그 번호 정보를 담아서 fetch함수로 보낸다.<br><br>
3. fetch함수에서 보낼 url 주소를 적고, GET방식인지 POST방식인지 설정한 후 데이터(여기선 memo text)가 담긴 택배 상자 겉면(header)에 서버가 인지할 수 있도록 'application/json' 이렇게 json형태라고 명확하게 표기한다. `JSON.stringify(dataToSend)` 그 dataToSend 데이터를 여기에 매개변수로 집어 넣는데, 해당 데이터 객체를 인터넷선을 통과할 수 있도록 단순한 문자열(String) 형태의 JSON"으로 변환하는 과정이다. YOLO 학습을 시키다보면 시각적인 형태를 컴퓨터가 읽을 수 있도록 '납작한 텍스트'로 번역해 주는 과정이 반드시 필요한데 결국 "복잡하고 입체적인 데이터(객체, 사진, 좌표)를 컴퓨터끼리 주고받기 위해 아주 단순하고 납작한 글자(텍스트)로 번역한다"는 본질은 웹 프론트엔드나 인공지능 머신러닝이나 똑같다.<br><br>
4. `response.json()`는 서버가 보내준 납작한 택배 박스에서 포장지를 뜯고 다시 입체적인 data로 복원하는거다.<br><br>
5. data가 잘 전송이 되고 사용자가 close 버튼을 클릭하면 기존 메모장 내용은 초기화시킨다. -> `document.getElementById('textInput').value = '';` <br><br>
6. 모든게 차질없이 진행되면 fetch에서 지정한 주소로 data가 넘어가고, 해당 블루브린트 서버 내 함수 로직을 활용해서 DB로 저장하거나 재가공하면 된다. 즉 프론트엔드에서는 데이터를 배달만 해주고, 직접 가공하고 저장하는 건 백엔드에서 처리한다. 이런걸 좀 유식한 말로 `관심사의 분리(Separation of Concerns)`라고도 한다. <br><br>

참고(CSS부분 참조) : `justify-content`와 `align-items`은 반드시 display: **flex**가 켜져 있어야만 작동한다.
<br>
justify-content : 가로 가운데 정렬,  align-items : 세로 가운데 정렬. 고로 이 둘을 사용하면 정중앙에 위치한다. 
<br>
예전에는 화면 정중앙에 창을 띄우려면 화면 전체 크기를 픽셀 단위로 계산하고, 마진(margin)을 마이너스로 깎아내는 등 아주 복잡한 수학 공식 같은 CSS를 써야 했다. (마치 과거의 복잡했던 XHR)
<br>
하지만 `Flexbox(display: flex;)` 기술이 등장하면서, 저 두 줄만 딱 적어주면 브라우저가 알아서 화면 한가운데에 모달 창을 띄울 수 있다.

### 간략하게 보는 Justify와 Align 정리 

**flex-direction: row** 즉 가로모드(기본값)일 때 

`justify-content` (글자 맞춤): 요소들이 줄지어 서 있는 같은 선상에서의 배치. (왼쪽/가운데/오른쪽)

`align-items` (수직 정렬): 그 선을 90도로 가로지르는 폭 안에서의 배치. (위/가운데/아래)

**flex-direction: column** 즉 세로모드일 때는 완전히 반대가 된다. 

## 7.  try-catch를 통한 통신 에러 처리하기

에러를 잡는 방식에는 두 가지 스타일이 있다. 

### 1. 꼬리 물기 방식 (.then + .catch)

위의 예시가 바로 꼬리 물기 방식이다. 

```javascript
fetch('주소')
    .then(정상일_때_할_일)
    .then(데이터_꺼내서_할_일)
    .catch(에러가_나면_할_일); 
```

### 2. 블록 감싸기 방식 (async/await + try-catch)

```javascript
async function 함수이름() {
    try {
        // 성공하길 바라며 실행하는 코드들 (await fetch...)
    } catch (error) {
        // 에러가 나면 일로 튕겨옴 (비상 대책)
    }
}
```

try...except랑 방식이 똑같기 때문에 구조를 이해하는건 어렵지 않다. 


*실제 구현 예시
```javascript
// async는 비동기 통신(fetch) 선언.
async function saveModalform() {
    try {
        // 일단 안전하게 시도.
        const response = await fetch('/memo/user_memo_confirm', {
            method: 'POST',
            body: JSON.stringify(dataToSend)
        });
        const data = await response.json();
        
        alert("SAVE COMPLETE!");
        closeModal();

    } catch (error) {
        // 만약 위에서 인터넷이 끊기거나 서버가 터지면 여기로!
        console.error("실제 에러 내용:", error); 
        alert("서버와 통신 중 오류가 발생했습니다");
    }
}
```
즉 프론트엔드에서는 HTTP 통신 규격(Headers, Body)에 맞춰서 요청을 보내기만 하면 되고, 실질적인 접근 권한을 허용하고 제어하는 CORS 정책은 백엔드(서버)에서 세팅해 둔 규칙이 그대로 적용되는 것이다. 


데이터 전송의 3단계 흐름을 택배에 비춰 비유적으로 알아보자. 

**1. 프론트엔드 (포장 및 발송):**
자바스크립트의 fetch와 JSON.stringify를 이용해 데이터를 규격에 맞게 포장. 이때 우리가 적어준 method: 'POST'나 headers 설정들이 바로 HTTP 프로토콜이라는 '국제 우편 규정'(비유적으로)을 철저히 지키기 위해 작성한 송장인 샘.

**2. HTTP 프로토콜 (운송 규칙):**
포장된 데이터는 HTTP 프로토콜이라는 정해진 도로망과 신호등 규칙을 따라 안전하게 백엔드로 이동.

**3. 백엔드와 CORS (수령 및 보안 검사):**
택배가 서버라는 건물에 도착하면, 건물 경비원(CORS 정책)이 튀어나와 송장을 검사한다. 허락이 떨어지면 비로소 문이 열리고 데이터가 무사히 DB까지 전달된다. 
