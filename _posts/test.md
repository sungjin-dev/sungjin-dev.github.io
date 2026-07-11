# 1. re.compile()로 성능 최적화하기

```python

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

ⓐ비효율적인 방식
  
```python

import re

emails = ["sungjin@gmail.com", "sungjin@naver.com", "invalid-email", ...] # 수만 개 데이터

for email in emails:
    # 루프를 돌 때마다 정규식을 해석하는 비용이 발생할 수 있음
    if re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        print("유효한 이메일")
(참고: 파이썬 내부적으로 최근 사용한 패턴을 임시 저장(캐싱)하긴 하지만, 캐시 용량 한계나 다른 패턴이 섞여 들어오면 캐시가 지워져 성능이 저하될 수 있음.)
```

ⓑ효율적인 방식 (미리 컴파일해 두고 검사만 수행)

```python

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

```python
import re

# 대소문자 무시(re.IGNORECASE) 옵션을 넣어서 컴파일
# 이제 APPLE, apple, ApPlE 모두 통과
VALID_WORD = re.compile(r"^[a-z]+$", re.IGNORECASE)

print(VALID_WORD.match("APPLE")) # 매치 성공!
```

여러 번 반복해서 같은 패턴을 검사할 때나 모듈이나 클래스의 전역 상수로 정규식 패턴을 깔끔하게 정의해 두고 싶을 때 `re.compile()`를 사용하면 된다. 
