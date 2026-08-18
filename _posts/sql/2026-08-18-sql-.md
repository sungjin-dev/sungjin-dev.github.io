---
title: "[SQL] IntelliJ로 Oracle, Python까지 연동하기 2편"
permalink: /sql/
categories: [SQL]
tags:
  - IntelliJ
  - Ultimate
  - Python
  - JetBrains
toc: true
toc_sticky: true
mermaid: true
---

1편에서는 SQL Developer의 흐린 글씨와 한글 깨짐을 잡다가 결국 IntelliJ로 갈아탔다. 
그렇다면 IntelliJ 하나로 SQL 작성부터 Python 연동까지 다 되면 얼마나 편할까. 실제로 세팅해보니 대부분 편해졌다. 다만 중간중간 헷갈리는 개념들이 있었는데, 그 지점들을 정리한다.

<br>

## IntelliJ Ultimate 설치와 라이선스 확인

IntelliJ는 Toolbox App이라는 런처를 거쳐 설치하는 것이 편하다. JetBrains 계정으로 한 번 로그인해두면 라이선스가 자동으로 연결되고, 버전 업데이트나 여러 제품(IntelliJ, DataGrip, PyCharm) 설치까지 한 곳에서 관리된다. 여러 기기를 하나로 조작하는 통합 리모컨과 비슷한 역할이다.

Toolbox에 먼저 로그인한 뒤 IntelliJ IDEA를 설치하면 Ultimate 라이선스가 자동으로 물린다.

Ultimate 여부는 Help → About에서 확인한다. 화면 어디에도 "Ultimate Edition"이라고 큼직하게 써있지 않아서 헷갈리기 쉬운데, Build 번호 앞글자만 보면 된다.

- `IU-`로 시작하면 Ultimate
- `IC-`로 시작하면 Community

라이선스 목록에는 보이는데 계속 "No subscription"이라고 뜬다면 아직 Activate 버튼을 누르지 않은 것이다. Manage License 화면에서 Activate를 눌러야 실제로 적용된다.

<br>

## Database 탭이 안 보일 때

IntelliJ를 처음 켜면 Welcome 화면에서 Database 탭을 찾게 되는데, 아무리 찾아도 없다. 물론 어딘가에 숨어 있을 거라 생각하고 메뉴를 한참 뒤지게 된다. 하지만 이건 숨어 있는 게 아니라 애초에 존재하지 않는 상태다. IntelliJ는 프로젝트를 열어야 메뉴바와 사이드바가 나타나기 때문이다. 즉, 빈 프로젝트라도 하나 만들어야 그때부터 Database 패널을 쓸 수 있다.

프로젝트를 열고 나면 화면 오른쪽 끝 세로 아이콘 줄에서 원통 모양 아이콘을 클릭하거나, `View → Tool Windows → Database`로 들어가면 된다.

<br>
예시) 초기화면
<img width="661" height="661" alt="image" src="https://github.com/user-attachments/assets/e94673c3-0abf-492d-8b21-11f519fcac04" />


<br>

## Oracle 접속 설정

1. Database 패널에서 데이터 소스 생성(Alt+Insert)
2. Oracle 선택
3. 최초 1회 "Download missing driver files" 클릭해 드라이버를 받는다
4. Host / Port / SID(또는 Service name) / User / Password 입력
5. Test Connection으로 확인 → 녹색 체크면 성공

접속 정보는 SQL Developer에서 쓰던 것과 동일하게 넣으면 된다.

<br>
예시) 연동이후 
<br>
<img width="412" height="223" alt="1" src="https://github.com/user-attachments/assets/63686851-a6ed-4b22-a327-4d058ec94383" />

<img width="1278" height="693" alt="2" src="https://github.com/user-attachments/assets/0612561c-1fcd-444f-b020-e4a23ee178b7" />

이제 코딩하고 DB에 저장하는 구조까지! 
<img width="1279" height="675" alt="3" src="https://github.com/user-attachments/assets/92e4b615-dcd2-4906-9d53-091184e27d26" />


<br>

## 클라이언트와 DB 서버는 별개다

IntelliJ, SQL Developer, Orange 같은 프로그램은 전부 접속 도구, 즉 클라이언트일 뿐이다. 실제 데이터가 저장되고 처리되는 Oracle 엔진은 `OracleServiceXE` 같은 윈도우 백그라운드 서비스로 별도 실행된다.

식당에 비유하면 클라이언트는 주문을 넣는 창구고, DB 서버는 실제로 음식을 만드는 주방이다. 손님이 자리를 떠나도 주방은 계속 운영되는 것과 같다. 즉, 클라이언트를 꺼도 DB는 계속 돌아간다. DB를 끄려면 `services.msc`에서 직접 중지해야 한다. 다만 대부분 설치 시 자동 시작으로 설정돼 있어서 평소엔 신경 쓸 일이 없다.

<br>

## COMMIT과 파일 저장은 완전히 다른 이야기

초보자가 가장 많이 헷갈리는 지점이 여기다. Ctrl+S를 눌렀다고 해서 데이터가 저장되는 게 아니다.

| 동작 | 저장되는 것 | 위치 |
|---|---|---|
| `COMMIT;` | 테이블 안의 데이터 | 데이터베이스 |
| Ctrl+S | 워크시트에 쓴 SQL 텍스트 | 내 컴퓨터 디스크 |

<svg viewBox="0 0 680 230" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="COMMIT과 파일 저장 구분 흐름도">
  <style>
    .node-title { font-family: 'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif; font-size: 13.5px; font-weight: 700; }
    .node-body { font-family: 'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif; font-size: 12px; }
    .box-grey { fill: #e9e9ec; stroke: #b9b9c0; stroke-width: 1.2; }
    .box-green { fill: #dff3e6; stroke: #3f9f63; stroke-width: 1.2; }
    .box-coral { fill: #fbe4e0; stroke: #d9694f; stroke-width: 1.2; }
    .txt { fill: #1c1c1e; }
    .arrow { stroke: #9a9aa0; stroke-width: 1.6; fill: none; }
    .arrow-head { fill: #9a9aa0; }
    @media (prefers-color-scheme: dark) {
      .box-grey { fill: #3a3a3d; stroke: #6a6a70; }
      .box-green { fill: #1f3a2c; stroke: #4caf7d; }
      .box-coral { fill: #3d2822; stroke: #e08a72; }
      .txt { fill: #f2f2f2; }
      .arrow { stroke: #a9a9ae; }
      .arrow-head { fill: #a9a9ae; }
    }
  </style>

  <rect x="190" y="15" width="300" height="55" rx="10" class="box-grey"/>
  <text x="340" y="36" text-anchor="middle" class="node-title txt">스크립트를 실행했다</text>
  <text x="340" y="56" text-anchor="middle" class="node-body txt">무엇을 저장했는지 확인한다</text>

  <path d="M300,70 L185,112" class="arrow"/>
  <polygon points="185,112 195,110 191,120" class="arrow-head"/>
  <path d="M380,70 L495,112" class="arrow"/>
  <polygon points="495,112 485,110 489,120" class="arrow-head"/>

  <rect x="20" y="112" width="300" height="100" rx="10" class="box-coral"/>
  <text x="170" y="140" text-anchor="middle" class="node-title txt">Ctrl+S만 눌렀다</text>
  <text x="170" y="163" text-anchor="middle" class="node-body txt">SQL 텍스트만 내 컴퓨터에 저장</text>
  <text x="170" y="184" text-anchor="middle" class="node-body txt">DB에는 반영되지 않음</text>

  <rect x="360" y="112" width="300" height="100" rx="10" class="box-green"/>
  <text x="510" y="140" text-anchor="middle" class="node-title txt">COMMIT까지 실행했다</text>
  <text x="510" y="163" text-anchor="middle" class="node-body txt">테이블 데이터가 DB에 저장</text>
  <text x="510" y="184" text-anchor="middle" class="node-body txt">파일을 잃어도 데이터는 안전</text>
</svg>

INSERT 후 COMMIT까지 했다면 스크립트 파일을 잃어버려도 데이터는 DB에 영구 저장되어 있다. 반대로 파일만 저장하고 실행을 안 했다면 DB에는 아무것도 안 들어간다.

실습 스크립트를 실행할 때는 아래 순서를 따르는 것이 좋다.

- Ctrl+Enter가 아니라 F5로 전체 스크립트를 실행한다
- 스크립트 출력 탭에서 ORA- 에러가 없는지 위에서부터 확인한다
- 스크립트에 COMMIT이 없다면 직접 커밋한다
- `SELECT COUNT(*) FROM 테이블명;`으로 실제 적재 건수를 확인한다

<br>

## FK 없는 실습 데이터에서 조인 관계 찾기

교재용 실습 스크립트는 명시적인 FOREIGN KEY 제약이 없는 경우가 많다. 이러면 IDE의 제약조건 탭을 봐도 아무 관계가 뜨지 않는다. 결국 컬럼명과 값을 직접 비교해서 관계를 찾아야 한다.

가장 빠른 방법은 워크시트에서 `DESC 테이블명;`을 쳐보는 것이다. 좌측 트리에서 테이블을 더블클릭해 열/데이터/제약조건/SQL 탭을 눌러봐도 되지만, DESC 한 줄이 훨씬 빠르다.

```sql
-- 직원별 실적 + 소속 학과명
SELECT p.NAME, p.ACHIEVEMENT, d.DNAME AS 소속학과
FROM PERFORMANCE p
JOIN DEPARTMENT d ON p.BRANCHID = d.DEPTNO;

-- 자기참조 조인: 학과와 상위학과
SELECT d1.DNAME AS 학과, d2.DNAME AS 상위학과
FROM DEPARTMENT d1
JOIN DEPARTMENT d2 ON d1.PDEPT = d2.DEPTNO;
```

`DEPARTMENT.PDEPT`가 같은 테이블의 `DEPTNO`를 가리키는 자기참조 구조이고, `PERFORMANCE.BRANCHID` 값이 `DEPARTMENT.DEPTNO`와 겹친다는 것을 데이터를 눈으로 대조해서 파악한 사례다.

<br>

## Python으로 Oracle 붙이기

라이브러리는 `oracledb`를 쓴다. 예전에 쓰던 `cx_Oracle`에서 이름만 바뀐 것으로, 기본 Thin 모드로 동작해서 별도 Oracle Client 설치 없이 바로 접속할 수 있다.

```bash
pip install oracledb
```

```python
import oracledb

connection = oracledb.connect(
    user="계정명",
    password="비밀번호",
    dsn="localhost:1521/XEPDB1"   # 호스트:포트/서비스명
)

cursor = connection.cursor()
cursor.execute("SELECT * FROM DEPARTMENT")
rows = cursor.fetchall()

for row in rows:
    print(row)
```

`fetchall()`은 컬럼명 없는 튜플 리스트만 돌려준다. 여기에 컬럼명을 붙이려면 `cursor.description`에서 컬럼명을 뽑아 값과 순서대로 짝지으면 된다. 이걸 zip으로 짝짓기라고 표현해도 무방하다. 코드 두 줄이면 충분하다.

```python
import json

columns = [col[0] for col in cursor.description]
result = [dict(zip(columns, row)) for row in rows]

print(json.dumps(result, indent=2, ensure_ascii=False))
```

`ensure_ascii=False`는 꼭 챙겨야 한다. 이걸 빼면 한글이 `\uAC00` 같은 유니코드 이스케이프로 출력되어 또 깨진 것처럼 보인다. 1편에서 다룬 한글 깨짐과는 원인이 전혀 다르지만, 증상만 보면 똑같이 당황스럽다.

<br>

## 가상환경과 pip 트러블슈팅

가상환경을 쓰는 이유는 단순하다. 프로젝트별로 패키지 버전이 충돌하지 않고, 정리할 때도 폴더만 지우면 끝난다.

```bash
python -m venv venv
venv\Scripts\activate        # Windows
pip install oracledb
```

IntelliJ에서 Python 프로젝트를 새로 만들 때 Interpreter 설정에서 New Virtualenv Environment를 고르면 위 과정을 IDE가 알아서 처리해준다.

`pip : 'pip' 용어가 ... 인식되지 않습니다` 같은 에러가 뜬다면 파이썬이 PATH에 등록되지 않은 상태다.

1. `python --version`으로 설치 여부를 확인한다
2. 버전이 뜬다면 `python -m pip install oracledb`로 우회한다 — 이 방법이 거의 항상 통한다
3. 이것도 안 되면 파이썬이 아예 없는 것이다. python.org에서 설치하되 **"Add python.exe to PATH"** 체크박스를 반드시 체크하는 것이 좋다
4. 설치 후에는 기존 터미널 창을 닫고 새로 열어야 PATH 변경이 반영된다

<br>

## 마무리

1편에서는 흐린 글씨와 한글 깨짐 잡느라 시간을 다 썼는데, 2편은 오히려 개념 정리에 시간이 더 걸렸다. 도구 하나로 통합되니 편하긴 한데, 클라이언트/서버 구분이나 COMMIT 개념처럼 뒤로 미뤄뒀던 기본기를 다시 짚고 넘어가야 했다.

Python 연동은 여기까지는 코드만 정리해둔 상태다. 실제로 돌려본 결과는 스크린샷과 함께 다음에 따로 정리하는 것이 좋겠다.
