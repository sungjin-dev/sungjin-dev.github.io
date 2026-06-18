---
title: "Python Methods, Functions"
categories: [Python]
tags:
  - Python
  - 오답노트
toc: true
toc_sticky: true
---

   for idx, value in enumerate(list):
   idx, value 이 순서로 나옴. tuple형식

    insert(자리번호 idx, 넣을_데이터 value)
    list만 가능(튜플은 수정x 딕셔너리는 인덱스가 없으니 당연히 x)

    list1.extend(list2)
    append의 경우 리스트인 경우 그 형태 그대로 합쳐지기 때문에 자연스럽게 붙이는건 extend()를 활용한다.

    list.pop(idx)
    list 아이템 삭제. ★ del과는 달리 변수로 빼서 그 값을 활용할 수 있다 pop() 인덱스값을 안 넣어주면 마지막 데이터를 삭제함

    del list[idx]
    이건 삭제된 값 반환 x

    list.append(value)
    list 안의 아이템을 추가할 때 쓰임. 일반적으로 마지막 위치에 삽입. [1,2..]
    파이썬으로 엑셀이나 데이터베이스를 다룰 때, 이 "리스트 안에 딕셔너리 넣기"가 가공의 표준 공식

    

    list.remove(value)
    ★ 인덱스값을 몰라도 원하는 타겟 값을 바로 삭제 가능 for item in fruits: if item == '당근' or item == '토마토': fruits.remove(item) -> 이런식으로 활용

    list.sort(reverse = False)
    list.sort(reverse = True) 기본적으로 False가 내장되어있고 당연히 True값을 넣으면 역순으로 배열된다. ★값을 따로 반환 안 함. 원본을 직접 수정

    sorted(list)
    new_numbers = sorted(numbers) ★ sort()와는 달리 값을 반환해서 활용가능
    딕셔너리의 경우 key값에 대응하는 value는 무시하고 key값만 리스트로 반환함

    횟수(개수) = 데이터꾸러미.count(찾고 싶은 값)
    리스트 내에서 '특정 데이터'가 몇 번 등장하는지 빈도를 셀 때 사용(리스트, 튜플, 또는 문자열)

    몫, 나머지 = divmod(나눠질 수, 나누는 수)
    # 기존 방식 (두 번 계산) 몫 = 10 // 3 #3, 나머지 = 10 % 3 # 1

    round(변수, 자릿수)
    (오사오입) -> 가장 가까운 짝수 round(3.5, 0) -> 4.0 round(2.5, 0) -> 2.0
    데이터 타입은 여전히 실수형(float)을 유지

    index(value, start, end)
    일반적으로 idx값을 찾아줌. 특정 범위 내에서만 값을 찾도록 제한
    만약 letters = ['A', 'B', 'C', 'A', 'D', 'E', 'A', 'F']이고 result = letters.index('A', 2, 5)해보면
    print(result) # 출력: 3

    1.1 파이썬 고급
    lambda 매개변수 : 표현식(리턴값)
   lambda x: ➡️ "앞으로 보따리 하나가 들어오면 그건 x"
     x[1] ➡️ ".items()로 변신한 보따리 (키, 밸류) 중에서 1번 자리에 있는 '밸류값(틀린 횟수)'을 쏙 뽑아서 정렬 기준으로 삼기!"

    sorted_notes = sorted(wrong_notes.items(), key=lambda x: x[1], reverse=True)

    (※ 주의: 람다 안에는 return을 쓰지 않아도, 결과가 자동으로 return)

   람다에게 :(콜론)은 단순히 구별 기호가 아니라, "지금부터 내가 쓰는 식의 계산 결과가 곧 return될 값이다"라는 뜻을 내포

   
    ※ df는 DataFrame(데이터프레임)

    reduce(lambda a, b: 표현식, 데이터꾸러미)
            from functools import reduce

            numbers = [1, 2, 3, 4]
            total = reduce(lambda a, b: a + b, numbers)
            print(total) # 출력: 10
            

              딕셔너리 안에 딕셔너리가 있을 때, 람다로 특정 값을 어떻게 저격할까?

              안에 있는 밸류가 리스트가 아니라 딕셔너리라면 인덱스(숫자)가 아닌 '키(Key) 이름'으로 저격해야 합니다.
            
            즉, x[1]로 안쪽 딕셔너리를 꺼낸 뒤, 연달아 ['키이름']을 붙여서 x[1]['email'] 형태로 연속 타격합니다!
            

                        # 🗂️ 딕셔너리 안에 또 딕셔너리(이메일, 비밀번호)가 있는 상황
            users = {
            "user_A": {"pw": "1234", "email": "zebra@test.com"},
            "user_B": {"pw": "5678", "email": "apple@test.com"}
            }

            # ➡️ x[1]로 밸류(딕셔너리)를 잡고, ['email']로 알맹이를 정확히 저격!
            result = sorted(users.items(), key=lambda x: x[1]['email'])
              

            



    
