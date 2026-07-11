---
title: "람다(lambda)와 판다스(pandas)"
excerpt: "정렬방법과 활용예시"
categories: [Python]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 


# 람다 정렬부터 판다스까지 — 정리 노트

> Flask 트러블 관리 앱의 `error_list_view` 정렬 코드를 출발점으로, 람다 → split → datetime → 판다스(필터·groupby·다중 정렬)까지의 흐름 정리.

---

## 1. 람다 정렬 — 지금 코드가 하는 일

```python
all_error_list = sorted(all_error_list, key=lambda x: x['date'], reverse=True)
```

`key`는 "각 항목에서 **무엇을 기준으로 비교할지** 꺼내주는 함수"다.
`lambda x: x['date']`는 이름 없는 일회용 함수로, 풀어 쓰면 아래와 완전히 같다.

```python
def get_date(x):
    return x['date']

all_error_list = sorted(all_error_list, key=get_date, reverse=True)
```

- `sorted`가 리스트의 각 딕셔너리를 하나씩 key 함수에 넣어 `'date'` 값을 뽑고, 그 값들끼리 비교해 순서를 정한다.
- 문자열 날짜인데도 정렬이 되는 이유: 포맷이 `"2026-07-09 14:30:00"`처럼 **큰 단위(년) → 작은 단위(초)** 순서라서, 문자열 사전순 비교가 곧 시간순 비교와 일치하기 때문.
- `reverse=True`는 결과를 뒤집어 최신이 맨 앞에 오게 한다.

### 확장: 다중 기준 정렬 (튜플 반환)

```python
# 진행상태별로 묶고, 그 안에서 최신순
sorted(all_error_list, key=lambda x: (x['progress'], x['date']), reverse=True)
```

튜플은 앞 요소부터 비교하고, 동점일 때만 다음 요소로 넘어간다.

---

## 2. split()을 활용한 방법

split은 정렬 도구가 아니라 **문자열을 쪼개는 도구**다. key 함수 안에서 조합하면 정렬에 쓸 수 있다.

**진짜 필요해지는 상황 = 날짜 포맷이 사전순 비교와 어긋날 때.**

예: `"09/07/2026 14:30"` (일/월/년) 형식이면 문자열 비교는 엉망이 된다 — `"09/..."`가 `"25/..."`보다 앞이라는 이유만으로 정렬되기 때문.

```python
def date_key(x):
    date_part, time_part = x['date'].split(' ')   # "09/07/2026", "14:30"
    day, month, year = date_part.split('/')        # "09", "07", "2026"
    return (year, month, day, time_part)           # 큰 단위부터 튜플로 재조립

sorted(all_error_list, key=date_key, reverse=True)
```

- 튜플은 앞 요소부터 차례로 비교되므로 년 → 월 → 일 → 시간 순으로 올바르게 정렬된다.
- **주의**: 현재 프로젝트의 포맷은 이미 사전순 = 시간순이라 split이 필요 없다. 억지로 쓰면 오히려 복잡해진다. "포맷이 비교에 불리할 때 꺼내는 카드"로 기억할 것.

### 정석 해법: datetime.strptime

```python
from datetime import datetime
sorted(all_error_list, key=lambda x: datetime.strptime(x['date'], '%d/%m/%Y %H:%M'))
```

문자열을 진짜 시간 객체로 바꿔 비교하므로 포맷이 뭐든 안전하다.

---

## 3. 판다스를 활용한 방법

프로젝트에는 이미 판다스가 있다 (`download_excel`). `error_list_view`도 같은 방식이 가능하다.

```python
df = pd.DataFrame(all_error_list)

# 정렬: sorted + lambda 와 동일한 결과
df = df.sort_values('date', ascending=False)

# 다시 딕셔너리 리스트로 되돌려 템플릿에 전달
all_error_list = df.to_dict('records')
```

- `sort_values('date', ascending=False)` = `sorted(..., key=lambda x: x['date'], reverse=True)`의 판다스 버전.
- 람다가 필요 없는 이유: 판다스는 "열 이름" 개념을 이미 갖고 있어서, 열 이름만 대면 그 열을 기준으로 삼는다.

판다스가 빛나는 건 정렬 자체보다 **정렬 이후에 뭔가 더 할 때**:

```python
df[df['progress'] == '미해결']                                       # 필터링
df.groupby('staff_id').size()                                        # 직원별 에러 건수 집계
df.sort_values(['progress', 'date'], ascending=[True, False])        # 다중 정렬
```

---

## 4. 문자열 vs datetime — 굳이 바꿀 이유가 있는가

**정렬만 할 거면 — 없다.** 포맷이 `"2026-07-09 14:30:00"`처럼 큰 단위부터 고정 자릿수로 나열돼 있으면 문자열 비교와 시간 비교 결과가 같다.

변환이 **필요해지는 순간** = 시간을 시간답게 다뤄야 할 때:

```python
df['date'] = pd.to_datetime(df['date'])

# 문자열로는 불가능하거나 고통스러운 작업들
df[df['date'] > '2026-06-01']                        # 특정 시점 이후만 필터
(pd.Timestamp.now() - df['date']).dt.days            # 등록 후 며칠 지났는지 계산
df['date'].dt.month                                   # 월만 추출
df.groupby(df['date'].dt.date).size()                # 일자별 에러 건수 집계
```

- "6월 이후 미해결 에러", "등록 7일 넘게 방치된 건" 같은 요구가 생기면 문자열은 한계, datetime이 필수.
- 숨은 이점: **잘못된 포맷 검증 효과.** 문자열 정렬은 `"2026-7-9"`(0 없는 포맷)가 섞여도 조용히 엉뚱한 자리에 끼워 넣지만, `pd.to_datetime`은 파싱 단계에서 처리하거나 에러를 내준다.

> **정리: 정렬만 = 변환 불필요 / 계산·필터·집계 = 변환 필수**

---

## 5. `df[df['progress'] == '미해결']` — 필터의 내부 동작

한 단계가 아니라 **두 단계**다.

**1단계**: `df['progress'] == '미해결'` 자체가 하나의 결과물. 각 행에 대해 조건을 검사한 True/False 목록(불리언 Series)이 만들어진다.

```python
mask = df['progress'] == '미해결'
# 0     True
# 1    False
# 2     True
# 3    False
```

**2단계**: `df[mask]`는 "True인 행만 남겨라"는 뜻. 대괄호에 불리언 목록을 넣으면 판다스는 행 필터로 해석한다 (boolean indexing).

이 구조를 알면 조건을 자유롭게 조립할 수 있다:

```python
df[df['date'] > '2026-06-01']                                        # 비교 연산
df[(df['progress'] == '미해결') & (df['category'] == 'DB')]          # AND
df[(df['progress'] == '미해결') | (df['progress'] == '보류')]        # OR
df[df['issue'].str.contains('로그인')]                               # 문자열 포함 검색
```

**주의점 2가지**
1. 조건을 묶을 땐 `and` / `or`가 아니라 **`&` / `|`**
2. 각 조건을 **반드시 괄호로** 감쌀 것 (연산자 우선순위 때문에 안 감싸면 에러)

같은 `[]`인데 넣는 것에 따라 역할이 갈린다:
- 문자열 → 열 선택 (`df['progress']`)
- 불리언 목록 → 행 필터 (`df[mask]`)

---

## 6. `groupby(기준).size()` — size에는 뭐가 담기는가

`size()`의 결과는 **항상 정수, 무조건 정수**. "각 그룹에 행이 몇 개냐"라는 **개수 세기** 전용이라 문자열이 담길 여지가 없다.

```python
df.groupby('staff_id').size()
# staff_id
# staff_A    5
# staff_B    3
# staff_C    8
```

그룹별로 개수 말고 다른 것을 뽑으려면 **size 자리에 다른 함수를 끼운다**. groupby는 "그룹으로 쪼갠다"까지만 하고, 뒤에 붙는 함수가 각 그룹에서 무엇을 계산할지 결정한다:

```python
df.groupby('staff_id').size()                    # 개수 → 정수
df.groupby('category')['date'].max()             # 그룹별 가장 최근 날짜 → 문자열/datetime
df.groupby('staff_id')['issue'].first()          # 그룹별 첫 issue → 문자열
df.groupby('staff_id')['progress'].unique()      # 그룹별 progress 종류 목록 → 배열
```

문자열이 나올 수 없는 건 size의 특성이지 groupby의 한계가 아니다.

**size vs count**
- `size()` : 결측값(NaN) 포함 전체 행 수
- `count()` : 결측값 제외 개수

---

## 7. 다중 정렬의 동작 순서

```python
df.sort_values(['progress', 'date'], ascending=[True, False])
```

**첫 번째 기준(progress)이 절대적 우선**이고, 두 번째 기준(date)은 **첫 번째가 동점일 때만 개입하는 타이브레이커**다.

"전체를 progress로 정렬한 다음 전체를 date로 다시 정렬"이 아니다 — 그렇게 하면 나중 정렬이 앞 정렬을 파괴한다.

```
정렬 전                          정렬 후
progress   date                  progress   date
해결       07-01                 미해결     07-08   ← 미해결 그룹 내에서
미해결     07-03                 미해결     07-03      date 내림차순
해결       07-09                 해결       07-09   ← 해결 그룹 내에서
미해결     07-08                 해결       07-01      date 내림차순
```

- 미해결끼리 한 덩어리, 해결끼리 한 덩어리로 먼저 묶이고(progress 오름차순), **각 덩어리 내부에서만** date 내림차순이 적용된다.
- 미해결의 07-03이 해결의 07-09보다 위에 있다 — date가 아무리 최신이어도 progress 벽을 넘을 수 없다.
- `ascending=[True, False]`는 각 기준의 방향을 **자릿수대로 짝지어** 지정하는 것. 방향이 달라도 우선순위 구조(첫째가 왕, 둘째는 동점 처리반)는 변하지 않는다.

> 참고: `sorted(key=lambda x: (x['progress'], x['date']))`의 튜플 비교도 정확히 같은 원리. 튜플은 앞 요소부터 비교하고 동점일 때만 다음 요소로 넘어간다. 판다스의 다중 정렬은 그 개념을 열 이름 리스트로 표현한 것.

---

## 한눈에 보는 선택 기준

| 상황 | 도구 |
|------|------|
| 리스트 하나를 단순 정렬해서 넘기기 | `sorted + lambda` |
| 날짜 포맷이 사전순 비교와 어긋남 | `split` 또는 `datetime.strptime`으로 key 보강 |
| 집계·필터·엑셀 출력이 엮인 데이터 가공 | 판다스 |
| 날짜로 계산·기간 필터·월별 집계 | `pd.to_datetime` 변환 필수 |
