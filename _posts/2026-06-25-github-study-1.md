---
title: "Tema Project에서 체계적으로 Git 사용하기"
excerpt: "branch와 dev"
categories: [Git]
tags:
  - Git
  - Flask
toc: true
toc_sticky: true
--- 

`Github`에서 제공하는 `Repository`에 프로젝트의 소스 코드와 변경 이력을 기록하고 저장할 수 있어
<br><br>
개발자들에게 `Git`은 너무나도 소중하다. 
<br><br>
하지만 Git을 사용하는데에는 많은 주의가 필요하다. 
<br><br>
그래서 실수를 방지하고 팀원들의 작업들을 체계적으로 모으고 업데이트하는 방법에 대해 알아보자. 
<br><br>
우선 기본 구조 골격은 다음 그림과 같다. 
<br>
<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/ab0e3c5a-ea11-453f-87d2-9d5ac590f370" />
<br>
그럼 차근 차근 Git저장소를 만드는 것부터 팀장과 조원이 어떻게 관리하면 되는지 알아보자 .

## 1. 먼저 팀장이 해야할일은 다음과 같다. 

Git에 새로운 저장소를 만들고 난 후 프로젝트를 진행할 파일경로에 새폴더를 만들어 `.gitignore` 파일 하나 생성한 후 다음과 같이 진행한다. 여기서 `.gitignore`는 저번 시간에 배운 git에 올리면 부담될 만한 녀셕들을 배제시키는 방식이자 파일이다. 
<br>
```bash
git add .
git commit -m "sungjin"
git remote add origin [저장소 주소]
git branch -M main  <- main으로 지점 옮김
git push origin main
```
<br>
그러면 현재 main은 조촐하게 `.gitignore` 파일 말고는 텅 비어있는 상태다. 
<br><br>
그 다음 `git checkout -b dev`를 입력하여 dev라는 완충지점을 새로 만든다. 
<br><br>
이제 팀장은 각 조원들에게 초대 메일을 전송한다.
<br>
<img width="1156" height="280" alt="image" src="https://github.com/user-attachments/assets/44de5163-a3d2-45f1-8478-14005c08550e" />
<br>


## 2. 각 조원들이 할일

현재 각 조원들은 팀장으로부터 메일로 git 저장소 초대를 받은 상태이다.
<br>
<img width="1509" height="213" alt="image" src="https://github.com/user-attachments/assets/d5adfa8b-3f35-4815-a83a-40e1b41867a8" />
<br>
그러면 각 조원들은 초대를 수락하고 해당 저장소로 들어와 git 주소를 복사한다. 
<br><br>
그 다음 새로운 폴더를 만들고 open git bash를 누른다. 
<br><br>
이 때 주의할 점은 처음에 `git init` 명령어를 치지말고 바로 `git clone [repository 주소] .`를 입력한다. 
<br><br>
여기서 처음 클론을 뜰 때 마지막에 `띄어쓰기 .` 이렇게 해야 불필요한 폴더가 생성되지 않는다. 
<br>
<img width="322" height="128" alt="image" src="https://github.com/user-attachments/assets/bbc136a4-ed63-4c47-9b12-59f2eded2640" />
<br>
그 상태에서 작업을 진행할 폴더를 하나 생성하고 안에 작업 파일들을 생성하여 진행한다. 
<br><br>
작업을 완료하면 각 팀원들은 개개인의 브랜치를 생성한다.
<br><br>
`git checkout -b feature/부서명`
<br><br>
회원정보 관리라면 git checkout -b feature/memberservice 이런식으로 만드는 거다.
<br><br>
다음으로 `git add .` , `git commit -m "커밋명"`을 차례로 입력한다 
<br><br>
그 다음 `git push origin feature/부서명`을 입력한다. 
<br><br>
꼼꼼하게 하려면 `git branch`를 자주 입력하여 현재 어느 지점에 있는지 잘 확인하면 된다. 
<br><br>
지금 상태는 각각의 팀원들이 각자의 브랜치에 자신의 작업물을 올린 상태다. 
<br><br>
이 상태에서 각 팀원은 각자의 feature/부서 지점에 있는 작업물들을 dev라는 곳으로 병합 요청을 보낸다.
<br>
<img width="1164" height="357" alt="image" src="https://github.com/user-attachments/assets/80b44feb-ed09-4996-a3cd-48a509dc268c" />
<br>
빨간색으로 마크된 compare & pull request를 입력한다. 
<br><br>
다음으로 초록색 버튼으로 된 `create pull request`를 누르면 된다. 
<br><br>
다음으로 팀장이 병합을 승인하면 
<img width="1131" height="295" alt="image" src="https://github.com/user-attachments/assets/a0696629-0db0-40be-900a-bf9d3c0fde00" />
<br><br>
이렇게 성공적으로 dev에 저장이 완료된다. 
<img width="1126" height="219" alt="image" src="https://github.com/user-attachments/assets/97d9c7c0-6945-463c-b9a4-70161830ec09" />
<br><br>
팀장은 각각의 팀원들의 병합 요청에 대해 문제가 없을 경우 승인하면 되고 승인이 떨어지면 dev지점에 각 팀원들 자료가 병합된다. 
<br><br>
혹시나 팀원들이 main에 병합시도 하거나 main에 바로 push하는 일이 발생하면 안 되기 때문에 
<br><br>
이런 일을 방지하기 위해 팀장 외에는 main에 대한 접근성을 최대한 배제시킬 수 있다. (방법은 글 하단에 설명)
<br><br>
이렇게 각 팀원들 및 팀장이 각각의 작업 자료들을 dev에 병합했고, 현재 로컬과 원격 feature/member 등 지점에는 각자의 작업물이 남아 있는 상태다. 
<br><br>
그럼 팀장과 팀원 모두 그 브랜치 작업물들을 깨끗하게 청소한다. 

## 3. dev 병합 승인 후 각 팀장 조원들이 할일

 1. 먼저 기준이 되는 dev 브랜치로 이동한다. `git checkout dev`
<br><br>
 2. (기존 작업이 끝난) 로컬 feature 브랜치를 삭제한다. `git branch -D feature/부서명`
<br><br>
 3. 원격 저장소의 최신 상태를 동기화하고 정리한다. `git fetch --prune`
<br><br>
 4. 최신 코드가 반영된 dev 브랜치를 내 로컬로 가져온다. (팀원들 소스 병합) `git pull origin dev`
<br><br>
 5.  원격 브랜치 삭제   `git push origin --delete feature/부서명`
<br><br>

(참고자료: git config --global fetch.prune true  git fetch만 쳐도 이후로는  git fetch --prune 으로 처리)
<br><br>
여기서 prune 역할은 원격 저장소의 최신 상태를 가져오면서, 원격에는 이미 지워지고 없는데 내 로컬에 찌꺼기처럼 남아있는 origin/... 브랜치들을 싹 다 청소한다. 
<br><br>
이제 로컬에는 각 팀원들과 팀장이 작업한 자료들이 전부 병합된 파일들을 가지고 있는 상태다. 
<br><br>
그리고 다음날 작업할 때는 새 작업을 할 feature 브랜치를 다시 생성하면 된다. `git checkout -b feature/부서명` 
<br>

<img width="1145" height="643" alt="image" src="https://github.com/user-attachments/assets/44b88862-4016-4f47-a6b6-4bd566753e3f" />


## 4. GitHub에서 브랜치 보호 설정하기 (Direct Push 금지)

**1. Settings(설정)** 탭으로 이동
<br>
 -> 저장소(Repository) 메인 페이지 상단 탭에서 ⚙️ Settings를 클릭. (이 메뉴는 저장소 관리자/조장 권한이 있는 팀장만 보인다)
<br><br>
**2. Branches(브랜치)** 메뉴 선택
<br>
-> 왼쪽 사이드바 메뉴에서 Branches를 찾아 클릭.
<br><br>
**3. 규칙 추가 (Add rule)**
<br>
-> Branch protection rules 섹션에서 `Add branch protection rule` 버튼 누르기.
<br><br>
**4. 보호할 브랜치 이름 지정**
<br>
`Branch name pattern` 칸에 보호하고 싶은 브랜치 이름인 `main`을 입력.

**5. 핵심 제한 옵션 체크하기 (중요!)**
여기서 직접 접근을 막고 조장님의 승인을 강제할 수 있다. 아래 항목들을 체크해보자
<br><br>
✅ `Require a pull request before merging`
<br><br>
효과: 누군가 main에 코드를 넣으려면 무조건 PR(Pull Request)을 생성하도록 강제한다. 즉, 로컬에서 `git push origin main`을 직접 하는 것을 원천 차단
<br><br>
> ↳ 하위 옵션 ✅ Require approvals: 최소 몇 명의 승인(Approve)이 있어야 병합(Merge) 버튼이 활성화될지 정한다. 보통 1로 설정하고 팀장이 승인
<br><br>
>> (선택) ✅ Do not allow bypassing the above settings
<br><br>
효과: 프로젝트 관리자(Admin) 권한을 가진 팀장이 깜빡하고 실수로 직접 푸시하는 것을 막아줌. 예외 없이 모두에게 적용시킬 수 있다. 
<br><br>
설정변경이 완료되면 맨 아래로 스크롤을 내려서 `Create` 또는 `Save changes`를 누르면 즉시 적용된다. 
<br><br>
이제 팀원이 실수로 본인의 로컬 터미널에서 `git push origin main`을 입력하면, 터미널에 "이 브랜치는 보호되어 있으므로 직접 푸시할 수 없습니다. PR을 사용하세요."라는 에러 메시지가 뜨면서 안전하게 튕겨내게 된다. 
