---
title: "Python Methods, Functions"
categories: [Python]
tags:
  - Python
toc: true
toc_sticky: true
---

# 파이썬 실전 핵심 


## 1. 순회의 정석

### `enumerate()` — 인덱스와 값을 동시에
`range(len(list))`를 쓰고 있다면 99% enumerate로 바꿀 수 있다.

```python
fruits = ["사과", "바나나", "포도"]

for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 사과
# 1 바나나
# 2 포도

# 1번부터 세고 싶으면 start 파라미터
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}등: {fruit}")
```

### `dict.items()` — 키와 값을 동시에
```python
scores = {"철수": 90, "영희": 85}

for name, score in scores.items():
    print(f"{name}: {score}점")
# 철수: 90점
# 영희: 85점
```

### `zip()` — 여러 리스트를 나란히 묶기
```python
names = ["철수", "영희", "민수"]
scores = [90, 85, 77]

for name, score in zip(names, scores):
    print(name, score)

# 두 리스트로 딕셔너리 만들기 (자주 쓰는 콤보!)
score_dict = dict(zip(names, scores))
# {'철수': 90, '영희': 85, '민수': 77}
```

### `reversed()` / `sorted()` — 원본 안 건드리고 순회
```python
for n in reversed([1, 2, 3]):
    print(n)  # 3, 2, 1

for name in sorted(scores, key=scores.get, reverse=True):
    print(name)  # 점수 높은 순으로 이름 출력
```

---

## 2. 리스트 컴프리헨션 — 파이썬다움의 핵심

```python
nums = [1, 2, 3, 4, 5, 6]

# 기본형: [표현식 for 변수 in 반복대상]
squares = [n ** 2 for n in nums]          # [1, 4, 9, 16, 25, 36]

# 필터링: if는 뒤에
evens = [n for n in nums if n % 2 == 0]   # [2, 4, 6]

# 변환 + 조건: if-else는 앞에 (위치가 다름에 주의!)
labels = ["짝" if n % 2 == 0 else "홀" for n in nums]
# ['홀', '짝', '홀', '짝', '홀', '짝']

# 딕셔너리 컴프리헨션도 가능 
square_map = {n: n ** 2 for n in nums}    # {1: 1, 2: 4, ...}

# 집합 컴프리헨션 (중복 제거하며 변환)
lengths = {len(w) for w in ["a", "bb", "cc"]}  # {1, 2}
```

**실전 예:** 문자열 리스트에서 숫자만 뽑아 int로 변환
```python
data = ["10", "abc", "25", "hello", "3"]
nums = [int(x) for x in data if x.isdigit()]  # [10, 25, 3]
```

---

## 3. 정렬 마스터하기 — `sorted()` + `key`

`key`에 함수를 넘기면 "무엇을 기준으로 정렬할지" 정할 수 있다. 이거 하나로 정렬 문제 해결

```python
words = ["banana", "kiwi", "apple"]

sorted(words)                      # 사전순: ['apple', 'banana', 'kiwi']
sorted(words, key=len)             # 길이순: ['kiwi', 'apple', 'banana']
sorted(words, key=len, reverse=True)  # 긴 것부터

# 튜플/딕셔너리 리스트 정렬 (실무 단골)
students = [("철수", 90), ("영희", 85), ("민수", 90)]
sorted(students, key=lambda x: x[1])            # 점수 오름차순
sorted(students, key=lambda x: (-x[1], x[0]))   # 점수 내림차순, 같으면 이름순
```

**딕셔너리를 값 기준으로 정렬:**
```python
scores = {"철수": 90, "영희": 85, "민수": 95}
ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)
# [('민수', 95), ('철수', 90), ('영희', 85)]
```

---

## 4. 슬라이싱 — 알면 코드가 반으로 줄어듦

```python
a = [0, 1, 2, 3, 4, 5]

a[1:4]     # [1, 2, 3]        (1번부터 4번 앞까지)
a[:3]      # [0, 1, 2]        (앞에서 3개)
a[-2:]     # [4, 5]           (뒤에서 2개)
a[::2]     # [0, 2, 4]        (2칸씩 건너뛰기)
a[::-1]    # [5, 4, 3, 2, 1, 0]  (뒤집기 — 매우 자주 씀!)

# 문자열도 똑같이 동작
s = "hello"
s[::-1]    # 'olleh'  (회문 검사: s == s[::-1])
```

---

## 5. f-string — 문자열 포매팅의 표준

```python
name, score = "철수", 90.5678

print(f"{name}의 점수는 {score}점")        # 철수의 점수는 90.5678점
print(f"{score:.2f}")                     # 90.57 (소수 둘째 자리)
print(f"{1234567:,}")                     # 1,234,567 (천 단위 콤마)
print(f"{name:>10}")                      # '        철수' (오른쪽 정렬)
print(f"{score=}")                        # score=90.5678 (디버깅용, 변수명까지 출력!)
```

---

## 6. 딕셔너리 실전 패턴

### `get()` — KeyError 없이 안전하게 꺼내기
```python
scores = {"철수": 90}

scores["영희"]          # KeyError 발생!
scores.get("영희")      # None (에러 안 남)
scores.get("영희", 0)   # 0 (기본값 지정)
```

### 개수 세기 — `get()` 활용 vs `Counter`
```python
# 패턴 1: get으로 직접 세기
text = "banana"
count = {}
for ch in text:
    count[ch] = count.get(ch, 0) + 1
# {'b': 1, 'a': 3, 'n': 2}

# 패턴 2: Counter — 한 줄 (이걸 쓰세요)
from collections import Counter
count = Counter("banana")       # Counter({'a': 3, 'n': 2, 'b': 1})
count.most_common(1)            # [('a', 3)] — 최빈값
```

### `defaultdict` — "키 없으면 만들기"의 자동화
```python
from collections import defaultdict

# 학생을 반별로 그룹핑
students = [("A반", "철수"), ("B반", "영희"), ("A반", "민수")]
groups = defaultdict(list)
for cls, name in students:
    groups[cls].append(name)   # 키 없어도 자동으로 빈 리스트 생성
# {'A반': ['철수', '민수'], 'B반': ['영희']}
```

### 딕셔너리 병합 (Python 3.9+)
```python
a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}
merged = a | b    # {'x': 1, 'y': 99, 'z': 3} — 뒤의 값이 이김
```

---

## 7. 언패킹(Unpacking) — 변수 다루기의 기술

```python
# 기본 언패킹
x, y = 1, 2
x, y = y, x            # 스왑이 한 줄로! (임시 변수 불필요)

# 별표 언패킹: 나머지를 리스트로
first, *rest = [1, 2, 3, 4]     # first=1, rest=[2, 3, 4]
*init, last = [1, 2, 3, 4]      # init=[1, 2, 3], last=4

# 함수 인자에 리스트 풀어 넣기
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
add(*nums)             # 6  (add(1, 2, 3)과 동일)

print(*["a", "b", "c"], sep="-")   # a-b-c
```

---

## 8. 조건 표현식 & 진리값 활용

```python
# 삼항 연산자 (한 줄 if-else)
age = 20
status = "성인" if age >= 18 else "미성년"

# 빈 컨테이너는 False — 이게 파이썬 스타일
items = []
if not items:              # if len(items) == 0 보다 이렇게
    print("비어 있음")

# any / all — 하나라도? 전부?
nums = [1, 3, 5, 8]
any(n % 2 == 0 for n in nums)   # True  (짝수가 하나라도 있나)
all(n > 0 for n in nums)        # True  (전부 양수인가)

# or로 기본값 지정
name = user_input or "손님"     # user_input이 비었으면 "손님"
```

---

## 9. 문자열 실전 콤보

### `split()` + `join()` — 분해했다가 다시 조립
```python
s = "  hello world python  "

words = s.split()               # ['hello', 'world', 'python'] (공백 알아서 처리)
"-".join(words)                 # 'hello-world-python'

# CSV 한 줄 파싱
row = "철수,90,서울"
name, score, city = row.split(",")

# 실전 콤보: 각 단어 첫 글자만 뽑기
"".join(w[0] for w in words)    # 'hwp'
```

### `strip()` — 입력값 정리의 필수
```python
user_input = "  hello  \n"
user_input.strip()              # 'hello' (앞뒤 공백/줄바꿈 제거)
```

### `in` — 포함 여부는 이걸로 끝
```python
"world" in "hello world"        # True
"철수" in ["철수", "영희"]       # True
"x" in {"x": 1}                 # True (딕셔너리는 키 기준)
```

---

## 10. 입출력 & 파일 다루기

### `with open()` — 파일은 무조건 이 패턴으로
```python
# 읽기 — with 블록을 나가면 자동으로 close됨
with open("data.txt", "r", encoding="utf-8") as f:
    lines = f.read().splitlines()   # 줄바꿈 문자 없이 줄 리스트로

# 쓰기
with open("out.txt", "w", encoding="utf-8") as f:
    f.write("첫 줄\n")

# 줄 단위로 순회 (큰 파일도 메모리 걱정 없음)
with open("data.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

### 여러 값 입력받기 (코딩테스트 단골)
```python
# "3 5 7" 입력 → [3, 5, 7]
nums = list(map(int, input().split()))

a, b = map(int, input().split())   # 두 개만 받을 때
```

---

## 11. 예외 처리 — 안 죽는 코드 만들기

```python
try:
    n = int(input("숫자 입력: "))
    result = 10 / n
except ValueError:
    print("숫자가 아닙니다")
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다")
else:
    print(f"결과: {result}")   # 예외가 없었을 때만 실행
finally:
    print("항상 실행됨")        # 정리 작업용
```

**실전 패턴:** 변환 실패해도 계속 진행
```python
data = ["10", "abc", "25"]
nums = []
for x in data:
    try:
        nums.append(int(x))
    except ValueError:
        continue        # 못 바꾸는 값은 건너뜀
# [10, 25]
```

---

## 12. 함수 관련 필수 문법

### 기본값 인자 & 키워드 인자
```python
def greet(name, greeting="안녕하세요"):
    return f"{greeting}, {name}님"

greet("철수")                    # '안녕하세요, 철수님'
greet("철수", greeting="반가워요")  # '반가워요, 철수님'
```

### `*args`, `**kwargs` — 개수 미정 인자
```python
def total(*nums):               # 여러 개를 튜플로 받음
    return sum(nums)

total(1, 2, 3, 4)               # 10

def show(**info):               # 키워드 인자를 딕셔너리로 받음
    for k, v in info.items():
        print(k, v)

show(name="철수", age=20)
```

### `lambda` — 일회용 미니 함수 (key와 함께 쓸 때 빛남)
```python
pairs = [(1, "b"), (2, "a")]
sorted(pairs, key=lambda p: p[1])   # [(2, 'a'), (1, 'b')]

max(scores.items(), key=lambda x: x[1])   # 최고 점수인 (이름, 점수)
```

---

## 13. 알아두면 이득인 한 줄 도구들

```python
# min/max도 key를 받습니다
words = ["banana", "kiwi", "apple"]
max(words, key=len)             # 'banana' (가장 긴 단어)

# sum의 두 번째 인자 = 시작값
sum([1, 2, 3], 100)             # 106

# round 주의: 파이썬은 은행가 반올림 (짝수 쪽으로)
round(2.5)                      # 2 (3이 아님!)
round(3.5)                      # 4

# divmod: 몫과 나머지를 한 번에
m, s = divmod(200, 60)          # m=3, s=20 → "3분 20초"

# 중복 제거 (순서 무관하면 set, 순서 유지하면 dict.fromkeys)
list(set([1, 2, 2, 3]))             # [1, 2, 3] (순서 보장 X)
list(dict.fromkeys([3, 1, 3, 2]))   # [3, 1, 2] (순서 유지!)

# isinstance: 타입 확인의 정석 (type() == 보다 권장)
isinstance(3.14, (int, float))  # True
```

---

## 14. 자주 하는 실수 Top 5

```python
# ① 리스트 복사는 = 가 아님 (같은 객체를 가리킴)
a = [1, 2, 3]
b = a          # 복사가 아니라 별명!
b.append(4)
print(a)       # [1, 2, 3, 4] — a도 바뀜
b = a.copy()   # 또는 a[:], list(a) → 진짜 복사

# ② sort()는 None을 반환 (제자리 정렬)
a = [3, 1, 2]
a = a.sort()   # a = None 이 되어버림!
a.sort()       # 이렇게 쓰거나, a = sorted(a)

# ③ 순회 중인 리스트를 수정하면 안 됨
nums = [1, 2, 3, 4]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)   # 건너뛰는 요소 발생!
nums = [n for n in nums if n % 2 != 0]   # 새 리스트를 만드는 게 정답

# ④ 기본값 인자에 가변 객체 금지
def add_item(item, box=[]):      # box가 호출 간에 공유됨!
    box.append(item)
    return box

add_item(1)   # [1]
add_item(2)   # [1, 2] ← 새 리스트가 아님!

def add_item(item, box=None):    # 올바른 패턴
    if box is None:
        box = []
    box.append(item)
    return box

# ⑤ is 와 == 구분
a = [1, 2]
b = [1, 2]
a == b    # True  (값이 같은가)
a is b    # False (같은 객체인가) — is는 None 비교에만: if x is None
```

---

## 한눈에 보는 우선순위

| 상황 | 이것부터 떠올리기 |
|---|---|
| 인덱스 필요한 순회 | `enumerate()` |
| 딕셔너리 순회 | `.items()` |
| 두 리스트 나란히 | `zip()` |
| 조건으로 리스트 만들기 | 리스트 컴프리헨션 |
| 기준 정해서 정렬 | `sorted(..., key=lambda ...)` |
| 뒤집기 / 일부만 | 슬라이싱 `[::-1]`, `[:n]` |
| 문자열 만들기 | f-string |
| 키 없을까 봐 불안 | `.get(key, 기본값)` |
| 개수 세기 | `Counter` |
| 그룹핑 | `defaultdict(list)` |
| 파일 열기 | `with open(...)` |
| 하나라도/전부 | `any()` / `all()` |


### 참고 : `range(len(list))`만 써야하는 그 1%

range(len())이 필요한 경우들
1️⃣ 인덱스를 세밀하게 제어할 때
python# 특정 인덱스부터 시작
for i in range(1, len(list)):  # 0번째 제외
    process(list[i])

**스텝 제어 (2칸씩 점프)**
for i in range(0, len(list), 2):
    process(list[i], list[i+1])

**역순 순회**
for i in range(len(list)-1, -1, -1):
    process(list[i])
→ enumerate()는 이런 세밀한 범위/스텝 조정이 어렵습니다.
2️⃣ 여러 리스트를 인덱스로 동기화할 때
pythonnames = ['Alice', 'Bob']
scores = [90, 85]

**인덱스 중심으로 제어**
for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")
→ zip()이 더 좋지만, 길이가 다르고 더 긴 쪽을 기준으로 해야 할 때는 range(len())이 필요합니다.
3️⃣ 인덱스로만 작업하고 요소는 필요 없을 때
python# 예: 특정 조건의 인덱스만 수집
indices = [i for i in range(len(list)) if some_condition(i)]
→ 이 경우 요소 값이 필요 없으므로 enumerate()가 낭비입니다.
