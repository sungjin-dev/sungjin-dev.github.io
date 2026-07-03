---
title: "비동기 방식 fetch에 관하여"
excerpt: "modal을 활용한 예시"
categories: [JavaScript]
tags:
  - Python
  - JavaScript
toc: true
toc_sticky: true
published: false
--- 

우리가 웹 페이지에서 버튼을 눌렀을 때, 화면 전체가 새로고침되는 경우가 허다했다. 기존에는 <form> 태그를 이용해 데이터를 보내고, 서버에서 완성된 HTML 템플릿을 통째로 다시 받아오는 방식을 썼기 때문이다. 하지만 이렇게 하면 매번 화면이 깜빡거리고 로딩이라도 길어진다면 사용자에게는 굉장히 불쾌한 기억으로 남을거다. 나또한 어린시절 그런 경험이 많았다. 
<br><br>
화면은 그대로 유지한 채, 딱 필요한 데이터만 몰래 가져와서 바로 창에 띄울 수 있게 해주는 함수가 바로 **fetch**(JavaScript)다.
<br><br>
요즘 fetch 방식을 애용하는 이유도 새로고침 없이 서버 정보를 실시간으로 바로 보여줄 수 있기 때문이다. 
<br><br>
오늘은 fetch의 특징에 대해 알아보고 이를 이용해 모달 창을 귀엽게(?) 띄우는 법도 한번 알아보자. 


## 1. fetch는 비동기(Asynchronous)방식

비유적으로 카페를 예로 들어보자. 
<br><br>
동기(Synchronous) 방식: 손님이 주문을 하고, 카페에서 커피가 나올 때까지 카운터에서 꼼짝 않고 기다려야 한다. 커피가 나오기 전까지 카운터는 다른 손님의 주문을 받을 수도 없다. (비효율적)
<br><br>
비동기(Asynchronous) 방식: 손님이 주문을 하고 '진동벨'을 받는다. 카운터는 바로 다음 손님의 주문을 받고, 커피가 완성 되면 진동벨이 울리고 해당 음료를 가져간다. (효율적)

## 2. 예전 방식(XMLHttpRequest) vs Fetch 

예전에는 데이터를 가져오려면 `XMLHttpRequest`(줄여서 XHR)라는 복잡한 도구를 썼는데, 이건 마치 주문서 양식이 너무 복잡해서 매번 작성법을 외워야 하는 상황이었다. 동사무소의 아주 복잡한 종이 신청서'라고 하면 비유적으로 맞을거다. 
<br><br>
1) 빈 서류를 한 장 꺼낸다. (new XMLHttpRequest())
<br><br>
2) 어디로 보낼지, 어떤 방식으로 보낼지 적는다. (xhr.open(...))
<br><br>
3) 서류가 처리되는 동안 상태가 변할 때마다 뭘 할지 빽빽하게 지시사항을 적는다. (xhr.onreadystatechange = function(...))
<br><br>
3) 제출한다 (xhr.send())
<br><br>
데이터하나 전송하는데 너무나도 절차가 복잡했다. 
<br><br>
XHR이 어떻게 보면 fetch의 조상격이라고 보면 된다. 

## 3. HTML Form + 템플릿 엔진 vs Fetch AP

비단 조상님보다 뛰어난게 아니다. 

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

**첫 번째**로 가독성(깔끔한 코드) fetch는 문장처럼 읽히는 코드를 제공한다. 

뒤에 예시로 살펴보겠지만 위에서부터 아래로 쭉 차례로 "이거 하고 **(fetch)**, 그다음 이거 하고 **(then)**"순차적으로 코딩하면 되기 때문에 초보자가 봐도 흐름을 파악하기가 아주 쉽다. 

**두 번째**로 "데이터를 가져오면(then) 이걸 해줘"라는 약속을 명확하게 표현할 수 있다.

`.then()` (그러고 나서) ->  " 비유적으로 택배(데이터)가 도착하면 .then(이걸 해줘)"라는 식이다. 
<br><br>
`.catch()` (혹시라도) ->  "혹시 배송 사고가 나면(에러가 나면) .catch(이렇게 수습해 줘)"
<br><br>
이렇게 굉장히 직관적인 코딩이 가능하다. 

**세 번째**로 내장 기능이라 별도의 라이브러리 설치 없이 브라우저에서 바로 사용할 수 있다는 점이다. 

평소에 여성분들이 사진 잘나오게 찍으려고 '스노우(SNOW)'나 '소다(SODA)' 같은 카메라 앱을 따로 설치하곤 하는데, 자바스크립트에도 데이터를 가져오기 위해 따로 설치해서 써야 하는 도구들(Axios, jQuery 등)이 있다. 반면 Fetch는 그냥 기본으로 깔려 있는 카메라 앱이라고 보면 된다. 
<br><br>
즉 최신 웹 브라우저(크롬, 사파리, 엣지 등)가 자체적으로 내장하고 있는 **'순정 데이터 통신 앱'** 인 셈이다. 
<br><br>
그럼 백문여불여일견(百聞不如一見)이라고 간단하게 fetch함수를 사용해 모달(미니 텍스트창)을 만들어보자. 

## 5.  Fetch를 활용하여 모달(MODAL) 만들기

모달은 우리가 일상에서 자주 쓰는 단어인 'Mode'에서 파생된 형용사로 모달 창이 화면에 딱 뜨면, 뒤에 있던 원래 화면은 어두워지거나 흐려지면서 아무것도 클릭할 수 없게 된다. 
<br><br>
즉, 웹페이지가 평범하게 정보를 보는 '기본 모드'에서, 눈앞에 뜬 작은 창에만 집중해야 하는 모드로 상태가 강제로 전환(Modal)되었다는 뜻이다. 

### 1. HTML (뼈대)
모달(Modal)은 평소엔 숨겨져 있다가, 데이터가 오면 display 속성을 바꿔서 보여준다.

```html
<button id="loadBtn">사용자 정보 보기</button>

<div id="userInfoModal" class="modal">
  <div class="modal-content">
    <h2 id="modalTitle">불러오는 중...</h2>
    <p id="modalBody"></p>
    <button onclick="closeModal()">닫기</button>
  </div>
</div>
```
<br><br>
참고 : 이처럼 class="modal"로 클래스 명을 통일하여 css속성을 부여하기 쉽게 하고, 자바스크립트가 동작을 제어하기 위한 고유 아이디는 id="loginModal", id="alertModal" 처럼 각각의 역할에 맞게 명확히 다르게 지어주는 것이 좋다. 

### 2. CSS (디자인)

핵심은 `position: fixed`로 **화면 중앙에 고정**하는 것이다.

```css
#modal {
  display:none; /* 기본값으로 숨긴다 */
}
.modal {
  position: fixed;  /* 바로 이부분 */
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); /* 반투명 배경을 해야 주목받음 */
  display: flex; justify-content: center; align-items: center;
}
.modal-content {
  background: white; padding: 20px; border-radius: 8px;
}
```

### 3. JavaScript (핵심 로직)

```javascript
const btn = document.getElementById('loadBtn');
const modal = document.getElementById('userInfoModal');

btn.addEventListener('click', () => {
  // 버튼 클릭 이벤트가 발생하면 다음 함수를 실행 
  modal.style.display = 'flex';
  // 숨겨 놓았던 모달창 끄집어내기

  fetch('/member/user_info')
    .then(response => response.json())
    .then(data => {
      // 3. 모달 내용 채우기
      document.getElementById('modalTitle').innerText = data.name;
      document.getElementById('modalBody').innerText = `이메일: ${data.email}`;
    });
});

function closeModal() {
  modal.style.display = 'none'; //다시 숨긴다
}
```

참고 : `justify-content`와 `align-items`은 반드시 display: flex가 켜져 있어야만 작동한다.

justify-content : 가로 가운데 정렬,  align-items : 세로 가운데 정렬. 고로 이 둘을 사용하면 정중앙에 위치한다. 

예전에는 화면 정중앙에 창을 띄우려면 화면 전체 크기를 픽셀 단위로 계산하고, 마진(margin)을 마이너스로 깎아내는 등 아주 복잡한 수학 공식 같은 CSS를 써야 했다. (마치 과거의 복잡했던 XHR)

하지만 `Flexbox(display: flex;)` 기술이 등장하면서, 저 두 줄만 딱 적어주면 브라우저가 알아서 화면 한가운데에 모달 창을 띄울 수 있다.

심화학습) Justify와 Align 정리

**flex-direction: row** 즉 가로모드(기본값)일 때 

`justify-content` (글자 맞춤): 요소들이 줄지어 서 있는 같은 선상에서의 배치. (왼쪽/가운데/오른쪽)

`align-items` (수직 정렬): 그 선을 90도로 가로지르는 폭 안에서의 배치. (위/가운데/아래)

**flex-direction: column** 즉 세로모드일 때는 완전히 반대가 된다. 

그래서 이 두 가지를 모두 center로 주면, 선상에서도 한가운데, 폭 안에서도 한가운데에 위치하게 되어 완벽한 화면 정중앙에 온다. 


 "버튼 클릭(이벤트) -> fetch(요청) -> 데이터 수신 -> 모달 창에 데이터 렌더링" 순서로 진행된다. 

 try-catch를 추가하면 통신 에러 처리도 가능!
