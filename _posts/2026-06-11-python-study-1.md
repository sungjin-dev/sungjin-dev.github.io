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
  >  **Tip:** 파이썬으로 엑셀이나 데이터베이스를 다룰 때 `[ {딕셔너리}, {딕셔너리} ]` 형태로 넣는 것이 가공의 표준 공식!
* **`list1.extend(list2)`**: 리스트 안에 리스트를 넣을 때, 껍데기를 벗기고 아이템들만 자연스럽게 합침 (`append`와 차이점)

### 데이터 삭제
* **`list.pop(idx)`**: 리스트 아이템 삭제. 인덱스 값을 안 넣으면 마지막 데이터를 삭제. 
  >  **Tip:** `del`과 달리, 삭제한 값을 변수로 빼서 재활용할 수 있음!
* **`del list[idx]`**: 특정 인덱스의 값을 삭제 (삭제된 값을 반환하지 않음)
* **`list.remove(value)`**: 인덱스 값을 몰라도 원하는 '타겟 값'을 찾아 바로 삭제.

---

## 2. 유용한 내장 함수 및 메서드

### 데이터 탐색 및 개수 확인
* **`enumerate(list)`**: `(인덱스, 값)` 형태의 튜플 순서로 데이터를 반환
* **`list.index(value, start, end)`**: 특정 범위 내에서 찾고자 하는 값의 인덱스 번호를 반환
* **`list.count(value)`**: 데이터 꾸러미(리스트, 튜플, 문자
