---
title: "프로젝트 협업할 때 지켜야할 ROUTIN"
excerpt: ".gitignore, requirements.txt 등"
categories: [Flask]
tags:
  - Python
  - Flask
toc: true
toc_sticky: true
--- 

프로젝트를 하다보면 가상공간을 활용하게 되는데 git저장소를 활용하기에는 너무 헤비하다. 
<br><br>
그래서 무거운 가상공간 데이터, 모듈을 빼고 홀가분하게 코드만 git에 올리는 방법에 대해 알아 보자. 
<br><br>
우선 가상 공간을 생성하는 방법부터 차근차근 알아보아야 한다. 

## 1. 가상 환경 생성 및 활성화

가상 환경은 프로젝트별로 필요한 패키지 버전을 독립적으로 관리하기 위한 '프로젝트 전용 격리 공간'이다.
<br><br>
생성하는 방법은 매우 간단하다. vscode 터미널에
<br><br>
`python -m venv venv`   (참고로 py -m venv venv도 알아두자)
만 치면 된다. 
<br><br>
활성화 방법 또한 간단하다. 
<br><br>
Windows: `venv\Scripts\activate` (v+tab키 s+tab키 a+tab키를 누르면 자동완성된다!)

Mac/Linux: `source venv/bin/activate`
<br><br>
활성화되면 옆에 파일탐색기에도 /venv가 보일거고 터미널 앞에 (venv)라는 초록색 표시가 뜬다.
<br><br>
<img width="613" height="85" alt="image" src="https://github.com/user-attachments/assets/3a0e33f0-af74-4fe7-841b-69590af2891c" />

## 2. 선별적 GIT PUSH 방법 (.gitignore 설정)

프로젝트 최상위 폴더에 `.gitignore` 파일을 하나 만든다.
메모장 파일을 새로 만들어서 '.gitignore' 그대로 복사해서 작명해주면 된다. 
<br><br>
주의할 점은 .txt와 같은 **확장자가 있어서는 안 된다.**

<img width="530" height="159" alt="image" src="https://github.com/user-attachments/assets/31fa8568-d69b-40dc-88df-b6612b7155bd" />

메모장처럼 열어서 다음과 같은 내용을 똑같이 집어 넣으면 끝!

```
# 가상 환경 폴더 제외
venv/

# 파이썬 캐시 파일 제외
__pycache__/
*.pyc

# 운영체제 생성 파일 제외
.DS_Store
.vscode/

# 미디어 파일 제외
*.jpg
*.jpeg
*.png
*.gif
*.svg
*.mp4
*.mov
*.avi

# 폴더 통째로 제외 (예: media 폴더나 images 폴더 전체)
media/
images/
```

## 3. 패키지 설치 및 연동 (requirements.txt)

`pip freeze > requirements.txt`
<br><br>
이 명령어만 치면 프로젝트 폴더 안에 `requirements.txt` 파일이 생성되는데 
<br>
현재 가상 환경에 설치된 모든 패키지와 그 버전 정보가 이 `requirements.txt`에 전부 기록된다.
<br><br>
<img width="703" height="298" alt="image" src="https://github.com/user-attachments/assets/c30d1006-1d77-4130-ba88-c33286bf0218" />

<br><br>
그러면 우리는 '소스 코드'와 방금 만든 따끈한'쇼핑 리스트인(requirements.txt)' 딱 두 가지만 Git에 올리면 된다. 
<br><br>
그럼 이제 다른 컴퓨터에서 `git clone`으로 각각 프로젝트를 내려받았다고 가정해보자. 

코드는 있지만 모듈이 하나도 없어서 실행하면 에러가 발생할거다. 그걸 일일히 찾는 것도 매우 귀찮은 작업이다. 

하지만 이때 터미널에 아래 명령어 딱 한 줄만 치면 되는데
<br><br>
`pip install -r requirements.txt`
<br><br>
그러면 그 프로젝트에 맞는 모듈들이 좌르륵 설치된다. 
<br><br>
**주의사항** :

* **가상환경(Virtual Environment) 필수**: 이 모든 작업은 반드시 프로젝트 전용 가상환경을 켜둔 상태에서 해야 한다.

* **쇼핑 목록 업데이트 하기**: 프로젝트 도중에 새로운 모듈을 pip install로 추가했다면, 잊지 말고 `pip freeze > requirements.txt`를 한 번 더 실행해서 리스트를 최신화하자.
<br><br>
조금 지겨운 이야기일 수도 있지만 이렇듯 독립적인 가상환경을 조성해서 작업하고 또 모듈 목록만 `requirements.txt`에 저장해놨다가 타인이 코드를 내려받고 바로 동일한 환경을 조성할 수 있게 해주는 이 과정 또한 디커플링 (Decoupling)과 데이터 무결성 (Integrity)을 지향하는 방식이다. 
