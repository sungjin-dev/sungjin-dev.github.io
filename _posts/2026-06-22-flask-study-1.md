pip freeze > requirements.txt

결과: 프로젝트 폴더 안에 requirements.txt 파일이 생성


대신, 우리가 짠 '소스 코드'와 방금 만든 '쇼핑 리스트(requirements.txt)' 딱 두 가지만 Git에 올림

* 가상환경 폴더는 꼭 .gitignore 파일에 등록해서 Git이 무시하도록 설정할 것

이제 다른 컴퓨터에서 git clone으로 각각 프로젝트를 내려받았다고 가정해보면 , 코드는 있지만 모듈이 하나도 없어서 실행하면 에러가 발생하게됨

이때 터미널에 아래 명령어 딱 한 줄만 치면 되는데

pip install -r requirements.txt

주의사항 :

가상환경(Virtual Environment) 필수: 이 모든 작업은 반드시 프로젝트 전용 가상환경을 켜둔 상태에서 해야 함
업데이트 하기: 프로젝트 도중에 새로운 모듈을 pip install로 추가했다면, 잊지 말고 pip freeze > requirements.txt를 한 번 더 실행해서 리스트를 최신화하기
