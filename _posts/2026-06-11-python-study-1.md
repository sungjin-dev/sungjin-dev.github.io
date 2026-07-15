---
title: "Python Methods, Functions"
categories: [Python]
tags:
  - Python
toc: true
toc_sticky: true
---

## 1. 리스트(List) 데이터 추가 및 삭제

### 데이터 추가
* **`list.insert(idx, value)`**: 원하는 자리(idx)에 데이터(value) 삽입 (튜플, 딕셔너리 불가)
* **`list.append(value)`**: 리스트의 맨 마지막 위치에 아이템 추가
  > **Tip:** 파이썬으로 엑셀이나 데이터베이스를 다룰 때 `[ {딕셔너리}, {딕셔너리} ]` 형태로 넣는 것이 가공의 표준 공식!
* **`list1.extend(list2)`**: 리스트 안에 리스트를 넣을 때, 껍데기를 벗기고 아이템들만 자연스럽게 합침 (`append`와 차이점)

### 데이터 삭제
* **`list.pop(idx)`**: 리스트 아이템 삭제. 인덱스 값을 안 넣으면 마지막 데이터를 삭제
  > **Tip:** `del`과 달리, 삭제한 값을 변수로 빼서 재활용할 수 있음!
* **`del list[idx]`**: 특정 인덱스의 값을 삭제 (삭제된 값을 반환하지 않음)
* **`list.remove(value)`**: 인덱스 값을 몰라도 원하는 '타겟 값'을 찾아 바로 삭제

## 2. 유용한 내장 함수 및 메서드

### 데이터 탐색 및 개수 확인
* **`enumerate(list)`**: `(인덱스, 값)` 형태의 튜플 순서로 데이터를 반환
* **`list.index(value, start, end)`**: 특정 범위 내에서 찾고자 하는 값의 인덱스 번호를 반환
* **`list.count(value)`**: 리스트에서 특정 값이 몇 개 있는지 개수를 반환
* **`len(list)`**: 리스트의 총 길이(요소 개수)를 반환
* **`max(list)`**: 리스트에서 최댓값을 반환
* **`min(list)`**: 리스트에서 최솟값을 반환
* **`sum(list)`**: 리스트의 모든 요소를 더한 합계를 반환

### 데이터 정렬 및 역순
* **`list.sort()`**: 리스트를 오름차순으로 정렬 (제자리 정렬)
  > **Tip:** `reverse=True` 파라미터로 내림차순 정렬 가능
* **`sorted(list)`**: 정렬된 새로운 리스트를 반환 (원본 변경 없음)
* **`list.reverse()`**: 리스트의 순서를 역순으로 뒤집음
* **`reversed(list)`**: 역순 반복자를 반환 (원본 변경 없음)

### 데이터 복사 및 초기화
* **`list.copy()`**: 리스트의 얕은 복사본(shallow copy) 생성
* **`list.clear()`**: 리스트의 모든 요소를 삭제

## 3. 문자열(String) 메서드

### 문자열 검색 및 조회
* **`str.find(substring)`**: 부분 문자열이 처음 나타나는 인덱스 반환 (없으면 -1)
* **`str.rfind(substring)`**: 부분 문자열이 마지막으로 나타나는 인덱스 반환
* **`str.count(substring)`**: 부분 문자열이 몇 번 나타나는지 개수 반환
* **`str.startswith(prefix)`**: 문자열이 특정 접두사로 시작하는지 확인 (True/False)
* **`str.endswith(suffix)`**: 문자열이 특정 접미사로 끝나는지 확인 (True/False)
* **`substring in str`**: 부분 문자열 포함 여부 확인

### 문자열 변환 및 치환
* **`str.upper()`**: 모든 문자를 대문자로 변환
* **`str.lower()`**: 모든 문자를 소문자로 변환
* **`str.capitalize()`**: 첫 번째 문자만 대문자로, 나머지는 소문자로 변환
* **`str.title()`**: 각 단어의 첫 글자를 대문자로 변환
* **`str.replace(old, new)`**: 특정 문자열을 새로운 문자열로 치환
* **`str.strip()`**: 문자열 앞뒤의 공백 제거
* **`str.lstrip()`**: 문자열 앞의 공백만 제거
* **`str.rstrip()`**: 문자열 뒤의 공백만 제거

### 문자열 분할 및 결합
* **`str.split(delimiter)`**: 구분자를 기준으로 문자열을 분할해 리스트로 반환
  > **Tip:** 파라미터를 안 주면 공백 기준으로 분할
* **`str.join(iterable)`**: 리스트의 요소들을 하나의 문자열로 결합
* **`str.partition(separator)`**: 구분자를 기준으로 3개 튜플로 분할
* **`str.splitlines()`**: 줄 바꿈(`\n`)을 기준으로 분할

### 문자열 검증
* **`str.isdigit()`**: 문자열이 모두 숫자인지 확인
* **`str.isalpha()`**: 문자열이 모두 문자인지 확인
* **`str.isalnum()`**: 문자열이 문자와 숫자만 포함하는지 확인
* **`str.isspace()`**: 문자열이 모두 공백인지 확인
* **`str.isupper()`**: 문자열이 모두 대문자인지 확인
* **`str.islower()`**: 문자열이 모두 소문자인지 확인

## 4. 딕셔너리(Dictionary) 메서드

### 키/값 접근 및 확인
* **`dict[key]`**: 키를 통해 값에 접근 (키 없으면 KeyError 발생)
* **`dict.get(key, default)`**: 키를 통해 값에 접근 (키 없으면 default 값 반환)
* **`key in dict`**: 특정 키가 딕셔너리에 존재하는지 확인
* **`dict.keys()`**: 모든 키를 반환
* **`dict.values()`**: 모든 값을 반환
* **`dict.items()`**: (키, 값) 쌍을 튜플로 반환

### 데이터 추가 및 수정
* **`dict[key] = value`**: 새로운 키-값 쌍 추가 또는 기존 값 수정
* **`dict.update(other_dict)`**: 다른 딕셔너리의 키-값 쌍으로 업데이트
* **`dict.setdefault(key, default)`**: 키가 없으면 default 값을 설정하고 반환

### 데이터 삭제
* **`del dict[key]`**: 특정 키-값 쌍 삭제 (키 없으면 KeyError)
* **`dict.pop(key, default)`**: 특정 키-값 쌍을 삭제하고 값 반환 (키 없으면 default 반환)
* **`dict.popitem()`**: 임의의 키-값 쌍을 삭제하고 튜플로 반환
* **`dict.clear()`**: 딕셔너리의 모든 항목 삭제

## 5. 튜플(Tuple) 메서드

### 데이터 조회
* **`tuple.index(value)`**: 특정 값의 인덱스 반환 (값 없으면 ValueError)
* **`tuple.count(value)`**: 특정 값이 몇 번 나타나는지 개수 반환
* **`len(tuple)`**: 튜플의 길이 반환

## 6. 집합(Set) 메서드

### 집합 연산
* **`set1.union(set2)` 또는 `set1 | set2`**: 합집합 반환
* **`set1.intersection(set2)` 또는 `set1 & set2`**: 교집합 반환
* **`set1.difference(set2)` 또는 `set1 - set2`**: 차집합 반환 (set1에만 있는 요소)
* **`set1.symmetric_difference(set2)` 또는 `set1 ^ set2`**: 대칭차집합 반환

### 데이터 추가 및 삭제
* **`set.add(element)`**: 집합에 요소 추가
* **`set.remove(element)`**: 특정 요소 삭제 (요소 없으면 KeyError)
* **`set.discard(element)`**: 특정 요소 삭제 (요소 없어도 에러 안 남)
* **`set.pop()`**: 임의의 요소 삭제하고 반환
* **`set.clear()`**: 집합의 모든 요소 삭제

### 데이터 확인
* **`element in set`**: 특정 요소가 집합에 포함되는지 확인
* **`set1.issubset(set2)`**: set1이 set2의 부분집합인지 확인
* **`set1.issuperset(set2)`**: set1이 set2의 상위집합인지 확인
* **`set1.isdisjoint(set2)`**: set1과 set2가 교집합이 없는지 확인

## 7. 반복문과 리스트 컴프리헨션

### 반복문 활용
* **`for item in list:`**: 리스트 순회
* **`for idx, item in enumerate(list):`**: 인덱스와 값을 동시에 순회
* **`for item in reversed(list):`**: 리스트를 역순으로 순회
* **`for key, value in dict.items():`**: 딕셔너리의 키-값 쌍 순회

### 리스트 컴프리헨션
* **`[expression for item in list]`**: 조건 없이 새로운 리스트 생성
* **`[expression for item in list if condition]`**: 조건을 만족하는 요소로 새로운 리스트 생성
* **`[expression for item in list if condition else other_expression]`**: if-else를 포함한 리스트 생성

## 8. 기타 유용한 내장 함수

### 타입 변환
* **`int(value)`**: 정수로 변환
* **`float(value)`**: 실수로 변환
* **`str(value)`**: 문자열로 변환
* **`list(iterable)`**: 리스트로 변환
* **`tuple(iterable)`**: 튜플로 변환
* **`set(iterable)`**: 집합으로 변환
* **`dict(iterable)`**: 딕셔너리로 변환

### 수치 연산
* **`abs(number)`**: 절댓값 반환
* **`round(number, digits)`**: 반올림 (digits 자리수까지)
* **`pow(base, exponent)`**: 거듭제곱 (base^exponent)
* **`divmod(a, b)`**: (몫, 나머지) 튜플 반환

### 반복 제어
* **`zip(list1, list2, ...)`**: 여러 리스트를 쌍으로 묶어 반환
  > **Tip:** 길이가 다르면 짧은 것 기준으로 끝남
* **`map(function, iterable)`**: 함수를 각 요소에 적용하고 반복자 반환
* **`filter(function, iterable)`**: 함수 조건을 만족하는 요소만 필터링

---

**참고:** 
- 메서드는 객체에 속하며 `.` 뒤에 붙여 사용 (예: `list.append()`)
- 함수는 독립적으로 사용 (예: `len(list)`)
- 제자리 정렬(in-place)은 원본을 변경하고 None을 반환
