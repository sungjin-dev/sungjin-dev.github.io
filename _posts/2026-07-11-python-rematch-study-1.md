---
title: "Re.match() 메서드 활용하기"
excerpt: "문자열 검사"
categories: [Python]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 

# 파이썬 re.match() — 문자열 검사

코딩을 하다 보면 "이 문자열이 내가 원하는 형식이 맞나?" 확인해야할 때가 있다. 일상생활에서 흔한 예로는 회원가입 비밀번호, 전화번호 형식 확인 같은 것들이다. 
파이썬에서 이를 도와주는 도구가 있는데 그게 바로 정규표현식(re 모듈)이고, 그중에서 `re.match()`메서드에 대해서 알아보겠다.

---

## 1. re.match()란?

> **`re.match(패턴, 문자열)` — 문자열의 "맨 앞"이 패턴과 일치하는지 검사하는 함수**

여기서 핵심은 **맨 앞**이다. `re.match()`는 문자열 전체를 조사하는게 아니라 오직 문자열의 시작 부분만 확인한다.

- 시작 부분이 패턴과 일치하면 → **Match 객체**를 돌려줌 (성공)
- 일치하지 않으면 → **None**을 돌려줌 (실패)

그래서 `re.match()`의 결과는 보통 if문과 함께 쓴다. "매치됐으면 통과, 아니면 거절" 인 셈이다.

```python
import re

result = re.match(r"hello", "hello world")
print(result)   # <re.Match object; span=(0, 5), match='hello'>  → 성공!

result = re.match(r"world", "hello world")
print(result)   # None  → 실패! ("world"는 맨 앞에 없으니까)
```

위 예시를 보자. `"hello world"` 안에 `"world"`가 분명히 있는데도 `None`이 나온다. 이는 **`re.match()`는 맨 앞만 보기 때문**이다.
앞만보고 달리는 이 함수를 잘못 오용하지 않는 것이 중요하다. 

---

## 2. 자주 헷갈리는 것: re.match() vs re.search()

혼동하는 부분이라 표로 정리해보자.

| 구분 | re.match() | re.search() |
|------|-----------|-------------|
| 검사 범위 | 문자열의 **맨 앞**만 | 문자열 **전체** |
| `re.match(r"world", "hello world")` | None | 매치 성공 |
| 주 용도 | "형식이 맞는지" 검증 | "포함되어 있는지" 탐색 |

한마디로 **"이 입력값이 올바른 형식인가?"를 검사할 때는 match, "이 문장 안에 특정 단어가 있는가?"를 찾을 때는 search**라고 기억하시면 된다.

---

## 3. 기본 사용법 3단계

### ① 패턴 앞에는 r을 붙임

```python
re.match(r"\d+", "12345")
```

문자열 앞의 `r`은 raw string이라는 뜻으로, `\d` 같은 특수 문자를 그대로 전달해 준다. 정규표현식을 쓸 때는 습관처럼 `r"..."`로 쓰는 게 안전하다.

### ② 결과는 if문으로 확인

```python

import re

USER_ID_PATTERN = r"^[a-z][a-z0-9_]{3,15}$" 

def validate_user_id(user_id):
    if USER_ID_PATTERN.match(user_id):
        print("사용 가능한 아이디입니다.")
    else:
        print("아이디 형식이 올바르지 않습니다.")

validate_user_id("sungjin-dev")
```

패턴을 분석해보면,

- `[a-z]` : 첫 글자는 영어 소문자
- `[a-z0-9_]{3,15}` : 이후에는 소문자·숫자·언더스코어가 3~15자
- `$` : 여기서 문자열이 끝나야 함 (뒤에 다른 글자가 붙는 것 방지)

### ③ 매치된 내용은 .group()으로 꺼내기

```python
import re

BLOG_PATTERN = r"(\d{4})-(\d{2})-(\d{2})"

m = re.match(BLOG_PATTERN, "2026-07-10 성진 블로그")
if m:
    print(m.group())    # 2026-07-10  (매치된 전체)
    print(m.group(1))   # 2026        (첫 번째 괄호)
    print(m.group(2))   # 07          (두 번째 괄호)
```

패턴에 괄호 `( )`를 치면 그 부분만 따로 뽑아낼 수 있는데 이를 그룹(group)이라고 부른다.

---

## 4. 실전 예시 — 백엔드에서 입력값 검증하기

`re.match()`가 실무에서 가장 빛나는 곳은 **서버에서 사용자 입력을 검증할 때**이다. 파이썬(Flask) 백엔드와 자바스크립트 프론트가 통신하는 예시를 살펴보자. 휴대폰 번호 형식을 검사하는 API이다.

### 파이썬 백엔드 (Flask)

```python
# app.py
import re
from flask import Flask, request, jsonify

app = Flask(__name__)

PHONE_PATTERN = r"01[016789]-\d{3,4}-\d{4}$"

@app.route("/check-phone", methods=["POST"])
def check_phone():
    phone = request.json.get("phone", "")

    if re.match(PHONE_PATTERN, phone):
        return jsonify({"valid": True, "message": "올바른 번호입니다."})
    else:
        return jsonify({"valid": False, "message": "번호 형식을 확인해 주세요.)

if __name__ == "__main__":
    app.run(debug=True)
```

패턴 해석: `01[016789]`(010, 011, 016 등으로 시작) + `-` + 숫자 3~4자리 + `-` + 숫자 4자리 + 끝(`$`).

### 자바스크립트 프론트엔드

```html
<input id="phone" placeholder="010-1234-5678" />
<button onclick="checkPhone()">확인</button>
<p id="result"></p>

<script>
async function checkPhone() {
  const phone = document.getElementById("phone").value;

  const res = await fetch("/check-phone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: phone })
  });

  const data = await res.json();
  document.getElementById("result").textContent = data.message;
}
</script>
```

버튼을 누르면 자바스크립트가 입력값을 서버로 보내고, 서버의 `re.match()`가 형식을 검사해서 결과 메시지(`res.json()`)를 준다. . 프론트에서도 검사할 수 있지만, **최종 검증은 반드시 서버에서** 해야 한다는 것이 백엔드의 기본 원칙이다. (관심사의 분리)

---

## 5. 자주 실수하는 2가지 유형

**① None에 .group()을 바로 호출하기**

```python
m = re.match(r"\d+", "abc")
print(m.group())   # 에러! AttributeError: 'NoneType' object has no attribute 'group'
```

매치에 실패하면 `None`이 반환되므로, 반드시 `if m:`으로 확인한 뒤 `.group()`을 호출해야한다. 

**② "포함 여부"를 검사하는데 match 쓰기**

문장 어딘가에 단어가 들어있는지 찾고 싶다면 `re.search()`를 쓰자. `re.match()`는 맨 앞만 본다.

---

## 6. re.compile()로 성능 최적화하기

```
import re

USER_ID_PATTERN = re.compile(r"^[a-z][a-z0-9_]{3,15}$") 

def validate_user_id(user_id):
    if USER_ID_PATTERN.match(user_id):
        print("사용 가능한 아이디입니다.")
    else:
        print("아이디 형식이 올바르지 않습니다.")

validate_user_id("python_lover99")
```

### ① re.compile()의 역할 "번역 미리 해두기"
정규 표현식(예: r"^[a-z][a-z0-9_]{3,15}$")은 사람 입장에서 보기 좋은 '문자열'일 뿐이다. 컴퓨터가 이 문자열을 보고 실제로 텍스트를 검사하려면, 이 문자열을 자신이 이해할 수 있는 내부적인 규칙으로 번역하는 과정이 필요한데, 이를 컴파일(Compile)이라고 한다.

`re.match(패턴, 텍스트)` 구조를 쓸 때는 파이썬은 함수가 호출될 때마다 패턴도 보고 번역(컴파일)도 하고, 텍스트도 검사한다. 

반면 `re.compile(패턴)`을 쓴다면 미리 번역(컴파일)을 끝내놓고 '정규식 객체(Pattern Object)'로 세팅해 놓는다. 나중에 검사할 때 번거러운 번역 과정 없이 바로 텍스트만 대입해서 초고속으로 검사하면 끝이다.

### ② 코드로 보는 성능 차이

특히 for문 같은 반복문 안에서 수만 건의 데이터를 검사한다고 상상해보자. 컴퓨터가 속으로 비명을 지를지도 모른다. 

- 비효율적인 방식 
```
Python
import re

emails = ["sungjin@gmail.com", "sungjin@naver.com", "invalid-email", ...] # 수만 개 데이터

for email in emails:
    # 루프를 돌 때마다 정규식을 해석하는 비용이 발생할 수 있음
    if re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        print("유효한 이메일")
(참고: 파이썬 내부적으로 최근 사용한 패턴을 임시 저장(캐싱)하긴 하지만, 캐시 용량 한계나 다른 패턴이 섞여 들어오면 캐시가 지워져 성능이 저하될 수 있음.)
```

- 효율적인 방식 (미리 컴파일해 두고 검사만 수행)
- 
```
Python
import re

emails = ["sungjin@gmail.com", "sungjin@naver.com", "invalid-email", ...]
# 여기서 미리 컴파일 해둠
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

for email in emails:
    if EMAIL_REGEX.match(email):
        print("유효한 이메일")
```        
### ③. 부가적인 장점: 플래그(옵션) 설정이 깔끔해짐

정규식을 쓸 때 "대소문자 구분 없이 검사(re.IGNORECASE)" 같은 옵션을 주고 싶을 때가 있는데, 
re.compile()을 쓰면 이 옵션을 패턴과 함께 아예 한 덩어리로 묶어서 객체로 만들어버릴 수 있다.

```
Python
import re

# 대소문자 무시(re.IGNORECASE) 옵션을 넣어서 컴파일
# 이제 APPLE, apple, ApPlE 모두 통과
VALID_WORD = re.compile(r"^[a-z]+$", re.IGNORECASE)

print(VALID_WORD.match("APPLE")) # 매치 성공!
```

여러 번 반복해서 같은 패턴을 검사할 때나 모듈이나 클래스의 전역 상수로 정규식 패턴을 깔끔하게 정의해 두고 싶을 때 `re.compile()`를 사용하면 된다. 

## 마무리

정리하면 `re.match()`는 **"문자열의 시작이 이 형식과 일치하는가?"**를 검사하는 함수이고, 아이디·전화번호·날짜처럼 정해진 형식의 입력값을 검증할 때 주로 쓰인다. 
결과가 `Match 객체` 또는 `None`이라는 점, 그래서 if문과 세트로 다닌다는 점만 기억해도 된다.

다음 글에서는 `re.search()`, `re.findall()`, `re.sub()`까지 묶어서 re 모듈 4대장을 비교해 보겠다. 
