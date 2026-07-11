---
title: "Re.search(), findall() 메서드 활용하기"
excerpt: "문자열 검사"
categories: [Python]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 

# 파이썬 re 모듈 4대장 비교 — match, search, findall, sub 한 번에 정리

지난 글에서 `re.match()`를 다루면서 문자열의 **맨 앞**이 패턴과 일치하는지 검사하는 방법에 대해서 알아본 바 있다. 
<br>
이번 글에서는 `re.search()`, `re.findall()`, `re.sub()`까지 묶어서 **re 모듈 4대장**을 한 번에 비교해 보자.
<br>
미리 간단히 요악해보자면 다음과 같다. 

| 함수 | 하는 일 | 반환값 |
|------|---------|--------|
| `re.match()` | 문자열 **맨 앞**이 패턴과 일치하는지 검사 | Match 객체 / None |
| `re.search()` | 문자열 **전체에서 첫 번째** 일치를 탐색 | Match 객체 / None |
| `re.findall()` | 문자열 전체에서 **일치하는 모든 것**을 수집 | 리스트(List) |
| `re.sub()` | 일치하는 부분을 **다른 문자열로 치환** | 새 문자열 |

이제 본격적으로 하나씩 살펴보자. 

---

## 1. re.search() — 어디에 있는지 찾는 탐색기

`re.match()`가 문지기라면, `re.search()`는 수색대다. 문자열의 처음부터 끝까지 훑으면서 **패턴과 일치하는 첫 번째 지점**을 찾아준다.

```python
import re

text = "제 블로그 주인장은 SungJin입니다."

print(re.match(r"SungJin", text))    # None → 맨 앞이 "제"라서 실패
print(re.search(r"SungJin", text))   # <re.Match object; span=(10, 17), match='SungJin'> → 성공!
```

같은 패턴, 같은 문자열인데 결과가 다르다. `match()`는 맨 앞만 보기 때문에 실패하지만, `search()`는 문장 중간에 있는 `"SungJin"`을 찾아낸다.

### 실전 예시 — 로그에서 특정 사용자 활동 찾기

서버 로그 한 줄에서 사용자 이름과 행동을 뽑아내는 상황이다.

```python
import re

log = "[2026-07-11 09:32:15] INFO user=SungJin action=login ip=192.168.0.7"

m = re.search(r"user=(\w+) action=(\w+)", log)
if m:
    print(f"{m.group(1)} 님이 {m.group(2)} 했습니다.")
    # 출력: SungJin 님이 login 했습니다.
```

지난 글에서 배운 그룹 `( )` 문법이 그대로 쓰였다. `search()`도 Match 객체를 돌려주기 때문에 `.group()`, `.group(1)` 같은 메서드를 똑같이 사용할 수 있으며, **실패하면 None을 반환하므로 `if m:` 확인도 똑같이 필요** 하다. match와 같은 구조로 사용됨을 알 수 있다. 

### match vs search, 언제 뭘 쓸까?

- **형식 검증** (아이디, 전화번호, 날짜가 규칙에 맞는가?) → `match()`
- **포함 탐색** (이 텍스트 어딘가에 원하는 게 있는가?) → `search()`

단, `search()`도 **첫 번째 하나만** 찾고 멈춘다는 점을 기억하자. "전부 다" 찾고 싶다면 다음 주자가 나설 차례디.

---

## 2. re.findall() — "전부 다 찾아오는 수집가

`re.findall()`은 이름 그대로 **일치하는 모든 부분을 찾아서 리스트로** 돌려준다. 다만 Match 객체가 아니라 **문자열 리스트**를 반환한다는 점에서 앞의 두 함수와 확연한 차이점이 있다.

```python
import re

text = "문의는 sungjin@example.com 또는 sungjin.dev@gmail.com 으로 주세요."

emails = re.findall(r"[\w.]+@[\w.]+", text)
print(emails)   # ['sungjin@example.com', 'sungjin.dev@gmail.com']
```

일치하는 게 하나도 없으면 에러가 아니라 **빈 리스트 `[]`**가 나온다. 그래서 findall의 결과는 보통 for문이나 `len()`을 사용하는 것이 일반적이다.

```python
if len(emails) == 0:
    print("이메일이 없습니다.")
for email in emails:
    print("발견:", email)
```

### 주의 — 그룹 괄호가 있으면 결과가 달라진다

findall을 사용할 때 가장 유의해야할 부분이다. 패턴에 그룹 `( )`이 있으면, findall은 **전체 매치가 아니라 그룹 안의 내용만** 모아 온다.

```python
import re

text = "SungJin의 블로그 방문자: 3월 1,204명 / 4월 1,567명 / 5월 2,031명"

# 그룹 없음 → 매치된 전체를 수집
print(re.findall(r"\d월", text))          # ['3월', '4월', '5월']

# 그룹 있음 → 괄호 안만 수집
print(re.findall(r"(\d)월 ([\d,]+)명", text))
# [('3', '1,204'), ('4', '1,567'), ('5', '2,031')]  ← 튜플의 리스트!
```

그룹이 2개 이상이면 튜플의 리스트가 된다. "왜 내 결과가 이상하게 나오지?" 싶을 때는 패턴 속 괄호부터 의심해 보자.

---

## 3. re.sub() — 찾아서 바꾸는 치환기

`re.sub(패턴, 바꿀_내용, 문자열)`은 패턴과 일치하는 부분을 **다른 문자열로 바꾼 새 문자열**을 돌려준다. vscode에서 `ctrl+h`를 눌러 "찾아 바꾸기"하는 것의 정규표현식 버전이라고 생각하면 된다. 

```python
import re

text = "SungJin의 연락처는 010-1234-5678 입니다."

masked = re.sub(r"\d{3,4}-\d{4}", "****-****", text)
print(masked)   # SungJin의 연락처는 010-****-**** 입니다.
```

개인정보 마스킹, 공백 정리, 금지어 필터링처럼 실무에서 정말 자주 쓰인다.

### 그룹 재활용 — \1, \2로 잡은 내용 다시 쓰기

sub의 진짜 매력은 **매치된 내용을 치환문에서 재사용**할 수 있다는 점이다. 바꿀 내용 안에서 `\1`, `\2`는 각각 첫 번째, 두 번째 그룹을 가리킨다.

```python
import re

# 2026-07-11 형식을 → 2026년 07월 11일 형식으로
post_title = "2026-07-11 SungJin의 개발 일지"

pretty = re.sub(r"(\d{4})-(\d{2})-(\d{2})", r"\1년 \2월 \3일", post_title)
print(pretty)   # 2026년 07월 11일 SungJin의 개발 일지
```

치환문에도 `\1`처럼 백슬래시가 들어가므로, 패턴뿐 아니라 **치환 문자열에도 `r"..."`을 붙이는 것이 좋다.**

### 실전 예시 — 블로그 댓글에서 이메일 가리기

지난 글의 Flask 예제를 이어서, 이번엔 댓글에 노출된 이메일을 자동으로 가려주는 API를 만들어 볼게요.

```python
# app.py
import re
from flask import Flask, request, jsonify

app = Flask(__name__)

EMAIL_PATTERN = r"[\w.]+@[\w.]+\.\w+"

@app.route("/clean-comment", methods=["POST"])
def clean_comment():
    comment = request.json.get("comment", "")

    cleaned = re.sub(EMAIL_PATTERN, "[이메일 비공개]", comment)
    found = len(re.findall(EMAIL_PATTERN, comment))

    return jsonify({
        "cleaned": cleaned,
        "masked_count": found
    })

if __name__ == "__main__":
    app.run(debug=True)
```

```html
<textarea id="comment" placeholder="댓글을 입력하세요"></textarea>
<button onclick="cleanComment()">등록</button>
<p id="preview"></p>

<script>
async function cleanComment() {
  const comment = document.getElementById("comment").value;

  const res = await fetch("/clean-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment: comment })
  });

  const data = await res.json();
  document.getElementById("preview").textContent =
    `${data.cleaned} (가려진 이메일: ${data.masked_count}개)`;
}
</script>
```

예를 들어 `"질문 있으면 sungjin@example.com 으로 메일 주세요!"`라는 댓글을 등록하면, 화면에는 `"질문 있으면 [이메일 비공개] 으로 메일 주세요! (가려진 이메일: 1개)"`가 표시된다. findall로 개수를 세고 sub로 치환하는, 4대장 중 두 명의 협업 플레이다.

---

## 4. 상황별 선택 가이드 — 이럴 땐 이 함수

머릿속에 흐름도 하나만 넣어두면 된다.

1. **바꾸고 싶다** → `re.sub()`
2. **몇 개인지, 전부 뭔지 알고 싶다** → `re.findall()`
3. **있는지 하나만 확인하고 싶다**
   - 맨 앞부터 형식이 맞아야 한다 → `re.match()`
   - 어디에 있든 상관없다 → `re.search()`

같은 문자열에 4대장을 전부 투입해 보면 차이가 한눈에 보인다.

```python
import re

text = "SungJin: 010-1234-5678, 사무실: 042-987-6543"
pattern = r"\d{2,3}-\d{3,4}-\d{4}"

print(re.match(pattern, text))     # None (맨 앞은 "SungJin"이라 실패)
print(re.search(pattern, text))    # <re.Match ... match='010-1234-5678'> (첫 번째만)
print(re.findall(pattern, text))   # ['010-1234-5678', '042-987-6543'] (전부)
print(re.sub(pattern, "***", text))
# SungJin: ***, 사무실: *** (전부 치환)
```

---

## 5. 사용할 때 자주 하는 실수 2가지

**① findall 결과에 .group()을 호출하기**

```python
results = re.findall(r"\d+", "1과 2와 3")
print(results.group())   # 에러! findall은 리스트를 반환
```

Match 객체를 돌려주는 건 `match()`와 `search()`뿐이다. `findall()`의 결과는 평범한 리스트이므로 인덱싱(`results[0]`)이나 for문으로 다루자.

**② sub이 원본을 바꿔준다고 착각하기**

```python
text = "hello SungJin"
re.sub(r"hello", "hi", text)
print(text)   # hello SungJin ← 그대로!
```

`re.sub()`은 원본을 수정하지 않고 **새 문자열을 반환** 한다. 결과를 쓰려면 반드시 변수에 담자. (`text = re.sub(...)`)

---

## 마무리

오늘 배운 4대장을 다시 한 줄로 정리해보면 다음과 같다.

- `re.match()` — 맨 앞 검사 (형식 검증)
- `re.search()` — 첫 번째 탐색 (포함 확인)
- `re.findall()` — 전부 수집 (리스트 반환)
- `re.sub()` — 찾아서 치환 (새 문자열 반환)

다음 글에서는 같은 패턴을 여러 번 쓸 때 성능을 높여주는 `re.compile()`과, 패턴을 훨씬 유연하게 만들어주는 플래그(`re.IGNORECASE` 등)를 다뤄보자. 
