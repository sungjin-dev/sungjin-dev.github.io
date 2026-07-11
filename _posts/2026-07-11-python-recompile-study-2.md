---
title: "re.compile() 메서드 활용하기"
excerpt: "re.compile()과 플래그"
categories: [Python]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 


# 파이썬 re.compile()과 플래그 — 정규표현식을 더 빠르고 유연하게

지난 글에서 re 모듈 4대장(`match`, `search`, `findall`, `sub`)을 정리했다. 이번 글의 주제는 두 가지다. 하나는 같은 패턴을 여러 번 쓸 때 성능과 가독성을 챙겨주는 `re.compile()`, 다른 하나는 패턴을 훨씬 유연하게 만들어주는 **플래그**(`re.IGNORECASE` 등)다. 이 둘을 알고 나면 정규표현식 코드가 눈에 띄게 깔끔해진다.

---

## 1. re.compile() — 패턴을 미리 만들어두는 것

### 지금까지의 방식에는 숨은 비용이 있다

`re.match(r"\d+", text)`를 호출할 때, 파이썬은 내부적으로 문자열 `r"\d+"`를 **패턴 객체로 변환(컴파일)**하는 과정을 먼저 거친다. 문제는 이 변환이 공짜가 아니라는 점이다. 반복문 안에서 같은 패턴을 만 번 쓰면, 변환 작업도 그만큼 반복될 수 있다.

`re.compile()`은 이 변환을 **딱 한 번만 미리 해두는 함수**다.

```python
import re

# 패턴을 미리 컴파일해서 객체로 만들어 둔다
phone = re.compile(r"\d{2,3}-\d{3,4}-\d{4}")

# 이후에는 이 객체의 메서드로 4대장을 그대로 쓴다
print(phone.search("SungJin: 010-1234-5678"))
print(phone.findall("010-1234-5678, 042-987-6543"))
print(phone.sub("***", "연락처는 010-1234-5678"))
```

핵심은 이거다. **`re.함수(패턴, 문자열)`이 `패턴객체.함수(문자열)`으로 바뀐다.** 패턴이 앞으로 빠지면서 인자가 하나 줄어든 것뿐, 4대장의 동작 자체는 완전히 똑같다.

| 기존 방식 | compile 방식 |
|-----------|--------------|
| `re.match(p, s)` | `pat.match(s)` |
| `re.search(p, s)` | `pat.search(s)` |
| `re.findall(p, s)` | `pat.findall(s)` |
| `re.sub(p, r, s)` | `pat.sub(r, s)` |

### 언제 compile을 써야 하나

기준은 단순하다. **같은 패턴을 두 번 이상 쓴다면 compile이 이득**이라고 보면 된다.

```python
import re

EMAIL = re.compile(r"[\w.]+@[\w.]+\.\w+")

comments = [
    "질문은 sungjin@example.com 으로",
    "오늘 글 잘 봤습니다!",
    "저도 sungjin.dev@gmail.com 같은 형식으로 만들었어요",
]

for c in comments:
    found = EMAIL.findall(c)
    if found:
        print("이메일 발견:", found)
```

반복문 안에서 매번 문자열 패턴을 넘기는 대신, 미리 만들어 둔 `EMAIL` 객체를 재사용하는 구조다. 성능도 성능이지만 **패턴에 이름이 붙는다는 것** 자체가 큰 장점이다. `EMAIL.findall(c)`는 코드만 읽어도 "이메일을 전부 찾는구나"가 바로 보인다.

참고로 알아둘 사실 하나. 사실 파이썬은 최근에 쓴 패턴을 내부적으로 캐싱하기 때문에, 패턴 한두 개짜리 작은 스크립트에서는 compile을 안 써도 체감 차이가 거의 없다. 그래도 실무 코드에서 compile을 쓰는 이유는 성능 보험 + 가독성 + 패턴 재사용, 이 세 가지라고 정리하면 된다.

### 실전 스타일 — 패턴은 상수처럼 위에 모아둔다

지난 글의 Flask 예제를 compile 스타일로 고치면 이렇게 된다.

```python
# app.py
import re
from flask import Flask, request, jsonify

app = Flask(__name__)

# 패턴들은 파일 상단에 상수처럼 모아둔다
PHONE = re.compile(r"01[016789]-\d{3,4}-\d{4}$")
EMAIL = re.compile(r"[\w.]+@[\w.]+\.\w+")

@app.route("/check-phone", methods=["POST"])
def check_phone():
    phone = request.json.get("phone", "")
    if PHONE.match(phone):
        return jsonify({"valid": True})
    return jsonify({"valid": False})

@app.route("/clean-comment", methods=["POST"])
def clean_comment():
    comment = request.json.get("comment", "")
    return jsonify({"cleaned": EMAIL.sub("[이메일 비공개]", comment)})
```

패턴이 함수 안에 흩어져 있지 않고 상단에 모여 있으니, 나중에 형식 규칙을 바꿀 때 한 곳만 고치면 된다. 실무 코드에서 흔히 보이는 스타일이다.

---

## 2. 플래그 — 패턴의 동작 방식을 바꾸는 옵션

플래그는 **패턴 자체는 그대로 두고, 매칭 규칙만 바꿔주는 스위치**라고 보면 된다. 함수의 마지막 인자로 넣거나, compile할 때 함께 넣는다.

```python
re.search(패턴, 문자열, re.IGNORECASE)      # 함수에 직접
pat = re.compile(패턴, re.IGNORECASE)       # compile에 함께
```

자주 쓰는 플래그 세 개를 순서대로 보자.

### ① re.IGNORECASE — 대소문자를 무시한다

이름 그대로 대문자와 소문자를 구분하지 않고 매칭한다. 줄여서 `re.I`라고 써도 된다.

```python
import re

text = "작성자: sungjin / 관리자: SUNGJIN / 손님: SungJin"

print(re.findall(r"sungjin", text))
# ['sungjin'] → 소문자만 잡힌다

print(re.findall(r"sungjin", text, re.IGNORECASE))
# ['sungjin', 'SUNGJIN', 'SungJin'] → 전부 잡힌다
```

사용자 입력은 대소문자가 제멋대로 들어오기 마련이다. 아이디 검색, 키워드 필터링처럼 "표기는 달라도 같은 단어"를 잡아야 하는 상황에서 사실상 필수 플래그다.

### ② re.MULTILINE — ^와 $를 줄 단위로 적용한다

원래 `^`는 문자열 전체의 시작, `$`는 문자열 전체의 끝을 뜻한다. 그런데 여러 줄짜리 텍스트에서 **각 줄의 시작/끝**을 기준으로 매칭하고 싶을 때가 있다. 그때 쓰는 게 `re.MULTILINE`(줄여서 `re.M`)이다.

```python
import re

todo = """- 블로그 3탄 쓰기
- 운동하기
- SungJin 프로젝트 리팩토링"""

# 플래그 없음: ^는 문자열 전체의 맨 앞 한 곳뿐
print(re.findall(r"^- (.+)", todo))
# ['블로그 3탄 쓰기'] → 첫 줄만

# MULTILINE: ^가 매 줄의 시작에 걸린다
print(re.findall(r"^- (.+)", todo, re.MULTILINE))
# ['블로그 3탄 쓰기', '운동하기', 'SungJin 프로젝트 리팩토링'] → 전부
```

로그 파일, 마크다운, 설정 파일처럼 줄 단위 구조를 가진 텍스트를 다룰 때 진가가 나온다.

### ③ re.DOTALL — 점(.)이 줄바꿈까지 삼키게 한다

패턴에서 `.`은 "아무 문자 하나"를 뜻하는데, 딱 하나 예외가 줄바꿈(`\n`)이다. 기본적으로 `.`은 줄바꿈에서 멈춘다. `re.DOTALL`(줄여서 `re.S`)을 켜면 `.`이 줄바꿈까지 포함해 매칭한다.

```python
import re

html = """<div>
  SungJin의 블로그에
  오신 것을 환영합니다
</div>"""

print(re.search(r"<div>(.+)</div>", html))
# None → .이 줄바꿈에서 멈춰서 실패

m = re.search(r"<div>(.+)</div>", html, re.DOTALL)
print(m.group(1).strip())
# SungJin의 블로그에
#   오신 것을 환영합니다
```

여러 줄에 걸친 블록(HTML 태그 안쪽, 주석 블록 등)을 통째로 잡을 때 쓰는 플래그다.

### 플래그는 |로 겹쳐 쓸 수 있다

두 개 이상 쓰고 싶으면 `|`(비트 OR)로 연결하면 된다.

```python
pat = re.compile(r"^author: sungjin$", re.IGNORECASE | re.MULTILINE)
```

이 패턴은 "대소문자 무시 + 줄 단위 매칭"이 동시에 적용된다.

### 플래그 요약표

| 플래그 | 축약 | 효과 |
|--------|------|------|
| `re.IGNORECASE` | `re.I` | 대소문자 구분 없이 매칭 |
| `re.MULTILINE` | `re.M` | `^` `$`가 각 줄의 시작/끝에 적용 |
| `re.DOTALL` | `re.S` | `.`이 줄바꿈까지 매칭 |

---

## 3. 종합 실전 예시 — 블로그 초안에서 메타데이터 뽑기

compile과 플래그를 한 번에 쓰는 예제로 마무리하자. 마크다운으로 쓴 블로그 초안에서 제목, 작성자, 태그를 뽑아내는 파서다.

```python
import re

draft = """title: re.compile 완벽 정리
Author: SUNGJIN
tags: python, regex, backend

본문은 여기서부터 시작한다...
"""

# 패턴은 미리 compile + 필요한 플래그를 함께
TITLE  = re.compile(r"^title:\s*(.+)$",  re.IGNORECASE | re.MULTILINE)
AUTHOR = re.compile(r"^author:\s*(.+)$", re.IGNORECASE | re.MULTILINE)
TAGS   = re.compile(r"^tags:\s*(.+)$",   re.IGNORECASE | re.MULTILINE)

title  = TITLE.search(draft)
author = AUTHOR.search(draft)
tags   = TAGS.search(draft)

print("제목:", title.group(1))                      # re.compile 완벽 정리
print("작성자:", author.group(1))                   # SUNGJIN
print("태그:", tags.group(1).split(", "))           # ['python', 'regex', 'backend']
```

포인트를 짚어보면 이렇다.

- `IGNORECASE` 덕분에 초안에 `Author:`라고 썼든 `author:`라고 썼든 상관없이 잡힌다.
- `MULTILINE` 덕분에 `^author:`가 문자열 맨 앞이 아니라 **둘째 줄의 시작**에서도 매칭된다. 이 플래그가 없으면 author와 tags는 전부 실패한다.
- 패턴 세 개를 상단에 compile해 두었으니, 초안이 100개든 1000개든 반복문에 넣어 재사용하면 된다.

참고로 `\s*`는 처음 나온 표현인데, `\s`는 공백 문자(스페이스, 탭 등) 하나를 뜻하고 `*`는 "0개 이상 반복"이다. 즉 `title:` 뒤에 공백이 있든 없든 몇 개든 유연하게 넘어가겠다는 뜻이다. `+`가 "1개 이상"이었다면 `*`는 "없어도 됨"이라는 차이만 기억하면 된다.

---

## 4. 입문자가 자주 하는 실수 2가지

**① compile한 객체에 패턴을 또 넘기기**

```python
pat = re.compile(r"\d+")
pat.search(r"\d+", "abc 123")   # 에러! 패턴은 이미 compile에 들어갔다
pat.search("abc 123")           # 올바른 사용
```

compile 방식에서는 패턴이 이미 객체 안에 들어 있다. 메서드에는 **검사할 문자열만** 넘기면 된다.

**② 플래그를 패턴 문자열 안에 넣으려 하기**

```python
re.search(r"sungjin re.IGNORECASE", text)   # 이러면 그냥 글자로 취급된다
re.search(r"sungjin", text, re.IGNORECASE)  # 플래그는 별도 인자로
```

플래그는 패턴의 일부가 아니라 **별도의 인자**다. 함수의 세 번째 자리, 또는 compile의 두 번째 자리에 넣는다.

---

## 마무리

오늘 내용을 두 줄로 압축하면 이렇다.

- `re.compile()` — 패턴을 미리 객체로 만들어 두는 것. 같은 패턴을 두 번 이상 쓰면 무조건 이득이고, 패턴에 이름이 붙어 코드도 읽기 좋아진다.
- 플래그 — 매칭 규칙을 바꾸는 스위치. `re.I`(대소문자 무시), `re.M`(줄 단위 `^$`), `re.S`(`.`이 줄바꿈 포함) 세 개만 알아도 대부분의 상황이 커버된다.

지난 글의 4대장에 오늘의 compile과 플래그까지 더하면, 이제 남은 건 패턴 문법 그 자체다. 다음 글에서는 지금까지 눈치껏 써온 `\d`, `\w`, `+`, `{3,4}` 같은 **패턴 문법을 처음부터 체계적으로** 정리해 보겠다. 궁금한 점은 댓글로 남겨주길 바란다.
