---
title: "[정보처리기사 필기] 오답노트 — 3과목 응용SW기초기술 활용"
permalink: /정처기/wrong-note-part5/
categories: [정처기]
tags:
  - 프로그래밍언어활용
  - 네트워크프로토콜
  - 운영체제
  - OSI7계층
  - IP주소
  - TCP_UDP
  - 프로세스스케줄링
  - 정보처리기사
toc: true
toc_sticky: true
---


### 📝 Q43. UNIX SHELL 환경 변수를 출력하는 명령어가 아닌 것은? [20년 4회]

① configenv  
② printenv  
③ env  
④ setenv  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - `env`, `set`, `printenv` 명령어들은 UNIX SHELL에서 환경 변수를 출력하는 명령어이다.
  - `setenv`는 csh(C 셸) 등 관련 셸에서 환경 변수를 설정/출력할 때 쓰인다.
  - `configenv`라는 환경 변수 출력 명령어는 존재하지 않는다.

</div>
</details>

---

### 📝 Q44. 운영체제에서 커널의 기능이 아닌 것은? [20년 4회, 22년 3회]

① 프로세스 생성, 종료  
② 사용자 인터페이스  
③ 기억 장치 할당, 회수  
④ 파일 시스템 관리  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **사용자 인터페이스(UI)**는 커널이 아닌 **셸(Shell)**의 역할이다. 셸은 운영체제의 가장 바깥 부분에 위치하여 사용자 명령을 해석하고 인터페이스 기능을 수행한다.
  - **커널의 핵심 기능:** 프로세스 관리(생성/제거/스케줄링), 기억장치 관리(메모리 할당/회수), 주변장치 관리, 파일 시스템 관리

</div>
</details>

---

### 📝 Q06. 지역성(Locality)에 대한 설명으로 옳지 않은 것은? [19년 2회, 22년 3회]

① 프로세서들은 기억 장치 내의 정보를 균일하게 접근하는 것이 아니라, 어느 한 순간에 특정 부분을 집중적으로 참조한다.  
② 시간 지역성의 예는 "순환, 부 프로그램, 스택" 등이 있다.  
③ 시간 지역성은 최근 사용되었던 기억장소들이 집중적으로 액세스하는 현상이다.  
④ 공간 지역성의 예는 "순차적 코드의 실행"이 있다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **순차적 코드의 실행(Sequential Code Execution)**은 명령어들이 메모리에 순서대로 적재되어 순차적으로 참조되므로 **순차 지역성(Sequential Locality)** 또는 시간/공간 지역성의 복합적 특성을 가지지만, 엄밀한 분류상 순차적 명령 실행은 공간 지역성보다는 순차 지역성에 해당하며, 문제의 출제 의도상 공간 지역성의 대표 예시는 배열 순회, 근처 변수 선언 등이 해당된다.

</div>
</details>

---

### 📝 Q09. 다음과 같은 3개의 작업에 대하여 FCFS 알고리즘을 사용할 때, 임의의 작업 순서로 얻을 수 있는 최대 평균 반환시간을 T, 최소 평균 반환시간을 t라고 가정했을 경우 T-t의 값은? [19년 3회]

[작업목록]
- P1: 실행 시간 9
- P2: 실행 시간 3
- P3: 실행 시간 12

① 3  
② 4  
③ 5  
④ 6  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **최소 평균 반환시간(t):** 실행 시간이 짧은 순서(P2 ➔ P1 ➔ P3)로 처리할 때
    - P2: 반환시간 3
    - P1: 반환시간 3 + 9 = 12
    - P3: 반환시간 12 + 12 = 24
    - 평균(t) = (3 + 12 + 24) / 3 = **13**
  - **최대 평균 반환시간(T):** 실행 시간이 긴 순서(P3 ➔ P1 ➔ P2)로 처리할 때
    - P3: 반환시간 12
    - P1: 반환시간 12 + 9 = 21
    - P2: 반환시간 21 + 3 = 24
    - 평균(T) = (12 + 21 + 24) / 3 = **19**
  - 따라서 **T - t = 19 - 13 = 6** 이다.

</div>
</details>

---

### 📝 Q04. UNIX에서 새로운 프로세스를 생성하는 명령어는? [20년 3회, 25년 1회]

① ls  
② cat  
③ fork  
④ chmod  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **fork:** 새로운 프로세스를 생성(복제)하는 시스템 호출/명령어이다.
  - **ls:** 디렉터리 내 파일 및 폴더 목록 표시
  - **cat:** 파일 내용 출력
  - **chmod:** 파일 또는 디렉터리의 접근 권한(퍼미션) 변경

</div>
</details>

---

### 📝 Q20. HRN 방식으로 스케줄링할 경우, 입력된 작업이 다음과 같을 때 처리되는 작업 순서로 옳은 것은? [19년 1회, 20년 3회, 23년 2회, 24년 2회]

| 작업 | 대기시간 | 서비스(실행) 시간 |
| :--- | :--- | :--- |
| A | 5 | 20 |
| B | 40 | 20 |
| C | 15 | 45 |
| D | 20 | 2 |

① A -> B -> C -> D  
② A -> C -> B -> D  
③ D -> B -> C -> A  
④ D -> A -> B -> C  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **HRN 우선순위 계산식:** `(대기시간 + 서비스시간) / 서비스시간` (값이 높을수록 우선순위가 높음)
    - **A:** (5 + 20) / 20 = **1.25**
    - **B:** (40 + 20) / 20 = **3**
    - **C:** (15 + 45) / 45 = **1.33**
    - **D:** (20 + 2) / 2 = **11**
  - 숫자가 큰 순서대로 정렬하면 **D(11) -> B(3) -> C(1.33) -> A(1.25)** 가 된다.

</div>
</details>

---

### 📝 Q21. HRN(Highest Response-ratio Next) 스케줄링 방식에 대한 설명으로 옳지 않은 것은? [20년 1회]

① 대기시간이 긴 프로세스일 경우 우선순위가 높아진다.  
② SJF 기법을 보완하기 위한 방식이다.  
③ 긴 작업과 짧은 작업 간의 지나친 불평등을 해소할 수 있다.  
④ 우선순위를 계산하여 그 수치가 가장 낮은 것부터 순서대로 우선순위가 부여된다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - HRN 방식은 계산된 수치(응답률)가 **가장 높은 것부터** 높은 우선순위가 부여된다.

</div>
</details>

---

### 📝 Q22. Microsoft의 Windows 운영체제의 특징이 아닌 것은? [19년 1회, 25년 2회]

① GUI 기반 운영체제이다.  
② 트리 디렉터리 구조를 가진다.  
③ 선점형 멀티태스킹 방식을 사용한다.  
④ 소스가 공개된 개방형(Open) 시스템이다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - Microsoft Windows는 소스코드가 공개되지 않은 **폐쇄형 독점 운영체제**이다. (소스코드가 공개된 개방형 운영체제는 Linux, Unix 등이다.)

</div>
</details>

---

### 📝 Q24. FIFO와 RR 스케줄링 방식을 혼합한 것으로 상위 단계에서 완료되지 못한 작업은 하위 단계로 전달되어 마지막 단계에서는 RR 방식을 사용하는 것은? [18년 3회]

① SJF  
② SRT  
③ HRN  
④ MFQ  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **MFQ(다단계 피드백 큐; Multi-level Feedback Queue):** 프로세스를 여러 큐에 나누어 배치하고, 상위 단계 큐에서 완료되지 못한 작업은 차례로 하위 단계 큐로 내려보내어 마지막 단계에서는 라운드 로빈(RR) 방식으로 처리하는 스케줄링 기법이다.

</div>
</details>

---

### 📝 Q32. 프로세스 상태의 종류가 아닌 것은? [20년 1회, 23년 2회, 25년 3회]

① Ready  
② Running  
③ Request  
④ Exit  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **프로세스 주요 상태 변화:** 생성(Create), 준비(Ready), 실행(Running), 대기/대기 상태(Waiting/Blocked), 완료/종료(Exit/Complete)
  - `Request`는 프로세스 상태의 주요 분류에 해당하지 않는다.

</div>
</details>

### 📝 Q29. TCP 프로토콜과 관련한 설명으로 틀린 것은? [21년 2회]

① 인접한 노드 사이의 프레임 전송 및 오류를 제어한다.  
② 흐름 제어(Flow Control)의 기능을 수행한다.  
③ 전이중(Full Duplex) 방식의 양방향 가상회선을 제공한다.  
④ 전송 데이터와 응답 데이터를 함께 전송할 수 있다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - 인접한 노드 사이의 프레임 전송 및 오류 제어는 **2계층인 데이터 링크 계층(Data Link Layer)**의 역할이다.
  - **TCP(Transport Control Protocol):** 4계층인 전송 계층 프로토콜로, 흐름 제어, 전이중 양방향 가상회선 제공, 피기배킹(데이터+응답 함께 전송) 기능 등을 제공한다.

</div>
</details>

---

### 📝 Q45. 사용자가 요청한 디스크 입·출력 내용이 다음과 같은 순서로 큐에 들어 있을 때 SSTF 스케줄링을 사용한 경우의 처리 순서는? (단, 현재 헤드 위치는 53이고, 제일 안쪽이 1번, 바깥쪽이 200번 트랙이다.) [21년 3회, 23년 1회, 25년 2회]

`큐의 내용: 98, 183, 37, 122, 14, 124, 65, 67`

① 53 - 65 - 67 - 37 - 14 - 98 - 122 - 124 - 183  
② 53 - 98 - 183 - 37 - 122 - 14 - 124 - 65 - 67  
③ 53 - 37 - 14 - 65 - 67 - 98 - 122 - 124 - 183  
④ 53 - 67 - 65 - 124 - 14 - 122 - 37 - 183 - 98  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **SSTF (Shortest Seek Time First):** 현재 헤드 위치에서 거리(차이)가 가장 가까운 트랙을 우선 방문한다.
  - 현재 위치 **53**에서 시작:
    1. 53과 가장 가까운 트랙: **65** (|53-65|=12)
    2. 65에서 가장 가까운 트랙: **67** (|65-67|=2)
    3. 67에서 남은 트랙(14, 37, 98, 122, 124, 183) 중 가장 가까운 트랙: **37** (|67-37|=30 vs |67-98|=31)
    4. 37에서 가장 가까운 트랙: **14** (|37-14|=23)
    5. 14에서 방향을 틀어 가장 가까운 트랙: **98** (|14-98|=84)
    6. 이후 순서대로 **122 -> 124 -> 183**
  - 따라서 이동 순서는 **53 - 65 - 67 - 37 - 14 - 98 - 122 - 124 - 183** 이 된다.

</div>
</details>

---

### 📝 Q56. 시간적 구역성(Temporal Locality)과 거리가 먼 것은? [25년 1회]

① 루프  
② 서브루틴  
③ 배열 순회  
④ 스택  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **배열 순회(Array Traversal)**는 연속된 메모리 공간을 차례대로 접근하므로 **공간적 구역성(Spatial Locality)**에 해당한다.
  - **시간적 구역성:** 최근에 참조된 기억장소가 가까운 미래에 다시 참조될 가능성이 높은 현상 (예: Loop, Subroutine, Stack, 집계 변수 등)

</div>
</details>

---

### 📝 Q57. 페이지 교체 기법 중 LRU와 비슷한 알고리즘이며, 최근에 사용하지 않은 페이지를 교체하는 기법으로 시간 오버헤드를 줄이기 위해 각 페이지마다 참조 비트와 변형 비트를 두는 교체 기법은? [25년 2회]

① FIFO  
② LFU  
③ NUR  
④ OPT  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **NUR (Not Used Recently):** LRU와 유사한 알고리즘으로, 각 페이지마다 **참조 비트(Reference Bit)**와 **변형/수정 비트(Modified Bit)** 2개의 비트를 두어 최근에 사용하지 않은 페이지를 찾아 교체하는 기법이다.

</div>
</details>

---

### 📝 Q03. 다음 설명에 해당하는 방식은? [21년 2회, 24년 1회]

- 무선 랜에서 데이터 전송 시, 매체가 비어 있음을 확인한 뒤 충돌을 회피하기 위해서 임의의 시간을 기다린 후 데이터를 전송하는 방법이다.  
- 네트워크에 데이터의 전송이 없는 경우라도 동시에 전송에 의한 충돌에 대비하여 확인 신호를 전송한다.  

① STA  
② Collision Domain  
③ CSMA/CA  
④ CSMA/CD  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance):** IEEE 802.11 **무선 LAN**에서 사용하는 방식으로, 데이터 전송 전 채널을 감지하고 회피(Avoidance) 시간을 두어 충돌을 예방하는 다중 접속 방식이다.
  - CSMA/CD는 IEEE 802.3 **유선 LAN**에서 충돌을 감지(Detection)하는 방식이다.

</div>
</details>

---

### 📝 Q09. OSI 7계층 중 네트워크 계층에 대한 설명으로 틀린 것은? [21년 2회]

① 패킷을 발신지로 부터 최종 목적지까지 전달하는 책임을 진다.  
② 한 노드로부터 다른 노드로 프레임을 전송하는 책임을 진다.  
③ 패킷에 발신지와 목적지의 논리 주소를 추가한다.  
④ 라우터 또는 교환기는 패킷 전달을 위해 경로를 지정하거나 교환 기능을 제공한다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - 한 노드에서 다른 노드로 **프레임(Frame)을 전송하는 책임**은 2계층인 **데이터 링크 계층(Data Link Layer)**에 해당한다.
  - 네트워크 계층은 패킷(Packet) 단위로 논리 주소(IP)를 지정하고 경로를 설정(Routing)하여 최종 목적지까지 전달한다.

</div>
</details>

---

### 📝 Q10. 오류 제어에 사용되는 자동반복 요청 방식(ARQ)이 아닌 것은? [21년 3회, 23년 2회]

① Stop-and-wait ARQ  
② Go-back-N ARQ  
③ Selective-Repeat ARQ  
④ Non-Acknowledge ARQ  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - 주요 ARQ 방식에는 **Stop-and-wait ARQ(정지-대기)**, **Go-back-N ARQ**, **Selective-Repeat ARQ(선택적 재전송)** 등이 있다.
  - `Non-Acknowledge ARQ`라는 종류는 존재하지 않는다.

</div>
</details>

---

### 📝 Q11. CIDR(Classless Inter-Domain Routing) 표기로 203.241.132.82/27과 같이 사용되었다면, 해당 주소의 서브넷 마스크(Subnet Mask)는? [21년 2회, 25년 2회]

① 255.255.255.0  
② 255.255.255.224  
③ 255.255.255.240  
④ 255.255.255.248  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - `/27`은 서브넷 마스크의 비트 중 앞에서부터 **1이 27개** 있다는 뜻이다.
  - 2진수: `11111111.11111111.11111111.11100000`
  - 10진수로 변환:
    - 1~3번째 옥텟: `255.255.255`
    - 4번째 옥텟 (`11100000`₂): 128 + 64 + 32 = **224**
  - 따라서 서브넷 마스크는 **255.255.255.224** 가 된다.

</div>
</details>

---

### 📝 Q13. 192.168.1.0/24 네트워크를 FLSM 방식을 이용하여 4개의 Subnet으로 나누고 IP Subnet-Zero를 적용했다. 이 때 Subnetting된 네트워크 중 4번째 네트워크의 4번째 사용 가능한 IP는 무엇인가? [21년 3회]

① 192.168.1.192  
② 192.168.1.195  
③ 192.168.1.196  
④ 192.168.1.1  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - `/24` 네트워크를 4개($2^2=4$)로 나누려면 서브넷 비트로 **2비트**를 추가로 사용한다 (`/26`).
  - 서브넷 단위 크기: $2^{8-2} = 64$개씩 분할
    - **1번째 서브넷:** 192.168.1.0 ~ 192.168.1.63
    - **2번째 서브넷:** 192.168.1.64 ~ 192.168.1.127
    - **3번째 서브넷:** 192.168.1.128 ~ 192.168.1.191
    - **4번째 서브넷:** 192.168.1.192 ~ 192.168.1.255
  - **4번째 서브넷 분석 (192.168.1.192/26):**
    - 네트워크 주소: 192.168.1.192 (사용 불가)
    - 1번째 사용 가능 IP: 192.168.1.193
    - 2번째 사용 가능 IP: 192.168.1.194
    - 3번째 사용 가능 IP: 192.168.1.195
    - **4번째 사용 가능 IP:** **192.168.1.196**

</div>
</details>

---

### 📝 Q17. IPv6의 헤더 항목이 아닌 것은? [19년 3회, 25년 2회]

① Flow label  
② Payload length  
③ HOP limit  
④ Section  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **IPv6 기본 헤더 구성 요소:** Version, Traffic Class, Flow Label, Payload Length, Next Header, Hop Limit, Source Address, Destination Address
  - `Section`은 IPv6 헤더 항목에 포함되지 않는다.

</div>
</details>

---

### 📝 Q18. C Class에 속하는 IP Address는? [19년 3회, 21년 3회]

① 200.168.30.1  
② 10.3.2.1  
③ 225.2.4.1  
④ 172.16.98.3  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **IPv4 클래스별 첫 번째 옥텟 범위:**
    - **A Class:** 0 ~ 127 (예: ② `10.3.2.1`)
    - **B Class:** 128 ~ 191 (예: ④ `172.16.98.3`)
    - **C Class:** **192 ~ 223** (예: ① `200.168.30.1`)
    - **D Class (멀티캐스트):** 224 ~ 239 (예: ③ `225.2.4.1`)
    - **E Class (연구용):** 240 ~ 255

</div>
</details>

---

### 📝 Q20. 링크 상태 라우팅 알고리즘을 사용하며, 대규모 네트워크에 적합한 것은? [19년 3회]

① RIP  
② VPN  
③ OSPF  
④ XOP  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **OSPF (Open Shortest Path First):** **링크 상태(Link State)** 알고리즘을 사용하며, 홉 카운트 제한이 없어 대규모 네트워크에 적합한 내부 라우팅 프로토콜이다.
  - RIP는 거리 벡터(Distance Vector) 알고리즘을 사용하며 소규모 네트워크에 적합하다 (최대 15홉).

</div>
</details>

---

### 📝 Q21. OSI 7계층 데이터 링크 계층의 프로토콜로 맞지 않는 것은? [19년 1회, 25년 2회]

① HTTP  
② HDLC  
③ PPP  
④ LLC  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **HTTP**는 7계층인 **응용 계층(Application Layer)** 프로토콜이다.
  - 데이터 링크 계층 프로토콜에는 HDLC, PPP, LLC, MAC, LAPB, Frame Relay 등이 있다.

</div>
</details>

---

### 📝 Q22. IPv4 주소 구조 중 실험적인 주소로 공용으로는 사용되지 않는 클래스는? [18년 3회]

① A 클래스  
② B 클래스  
③ C 클래스  
④ E 클래스  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **E 클래스(240.0.0.0 ~ 255.255.255.255):** 연구 및 실험용 주소로 비워둔 특수 목적 클래스이다.
  - D 클래스는 멀티캐스트용으로 사용된다.

</div>
</details>

---

### 📝 Q23. 라우팅 프로토콜이 아닌 것은? [18년 3회]

① BGP (Border Gateway Protocol)  
② OSPF (Open Shortest Path First)  
③ RIP (Routing Information Protocol)  
④ SLIP (Serial Line Internet Protocol)  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **SLIP:** 직렬 회선(RS-232 등)을 이용해 다이얼업 접속을 제공하는 데이터 링크 계층의 접속 규약 프로토콜이다.
  - BGP, OSPF, RIP는 모두 대표적인 라우팅 프로토콜이다.

</div>
</details>

---

### 📝 Q24. UDP 특성에 해당하는 것은? [18년 3회, 20년 4회, 23년 3회]

① 데이터 전송 후, ACK를 받는다.  
② 송신 중에 링크를 유지 관리하므로 신뢰성이 높다.  
③ 흐름 제어나 순서 제어가 없어 전송 속도가 빠르다.  
④ 제어를 위한 오버헤드가 크다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **UDP (User Datagram Protocol):** 비연결형 프로토콜로, 신뢰성보다는 속도를 우선시한다. 흐름 제어나 순서 제어가 없으며 헤더 오버헤드가 적어 전송 속도가 빠르다. (실시간 스트리밍, 동영상 전송 등에 이용)

</div>
</details>


### 📝 Q30. TCP/IP 관련 프로토콜 중 응용계층에 해당하지 않는 것은? [19년 3회, 24년 2회]

① ARP  
② DNS  
③ SMTP  
④ HTTP  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **ARP(Address Resolution Protocol):** IP 주소를 MAC 주소로 변환하는 **네트워크 계층(인터넷 계층)** 프로토콜이다.
  - DNS, SMTP, HTTP는 모두 응용 계층(Application Layer) 프로토콜에 해당한다.

</div>
</details>

---

### 📝 Q32. TCP/IP 네트워크에서 IP 주소를 MAC 주소로 변환하는 프로토콜은? [20년 1회, 22년 3회]

① UDP  
② ARP  
③ TCP  
④ ICMP  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **ARP(Address Resolution Protocol):** 논리 주소인 IP 주소를 기반으로 물리 주소인 **MAC 주소**를 조회하여 변환하는 프로토콜이다.
  - 반대로 MAC 주소를 IP 주소로 변환하는 프로토콜은 **RARP**이다.

</div>
</details>

---

### 📝 Q33. UDP 헤더에 포함되지 않는 것은? [16년 3회]

① Checksum  
② UDP Total Length  
③ Sequence Number  
④ Source Port Address  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **UDP 헤더 구조:** Source Port Number, Destination Port Number, UDP Length, UDP Checksum (총 8바이트로 구조가 단순함)
  - **Sequence Number(순서 번호):** 데이터의 신뢰성 있는 순서 제어를 담당하는 **TCP 헤더**의 구성 요소이다.

</div>
</details>

---

### 📝 Q35. TCP 헤더와 관련된 설명으로 틀린 것은? [21년 3회]

① 순서번호(Sequence Number)는 전달하는 바이트마다 번호가 부여된다.  
② 수신 번호 확인(Acknowledgement Number)은 상대편 호스트에서 받으려는 바이트 번호를 정의한다.  
③ 체크섬(Checksum)은 데이터를 포함한 세그먼트의 오류를 검사한다.  
④ 윈도우 크기는 송수신 측의 버퍼 크기로 최대 크기는 32767bit이다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - TCP 헤더의 **Window Size** 필드는 16비트로 구성되어 있으며, 최대 표시할 수 있는 버퍼 크기는 $2^{16} - 1 =$ **65,535 Byte**이다.

</div>
</details>

---

### 📝 Q39. SSH(Secure Shell)에 대한 설명으로 틀린 것은? [21년 2회, 22년 3회, 24년 1회, 25년 2회]

① SSH의 기본 네트워크 포트는 220번을 사용한다.  
② 전송되는 데이터는 암호화된다.  
③ 키를 통한 인증은 클라이언트의 공개키를 서버에 등록해야 한다.  
④ 서로 연결되어 있는 컴퓨터 간 원격 명령 실행이나 셸 서비스 등을 수행한다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **SSH(Secure Shell):** 기본적으로 **22번 포트(Port 22)**를 사용한다. (220번이 아님)
  - Telnet보다 강화된 보안 원격 접속 프로토콜로 인증, 암호화, 압축, 무결성을 제공한다.

</div>
</details>

---

### 📝 Q43. TCP/IP 계층 구조에서 IP의 동작 과정에서의 전송 오류가 발생하는 경우에 대비해 오류 정보를 전송하는 목적으로 사용하는 프로토콜은? [22년 1회, 24년 3회, 25년 1회]

① ECP(Error Checking Protocol)  
② ARP(Address Resolution Protocol)  
③ ICMP(Internet Control Message Protocol)  
④ PPP(Point-to-Point Protocol)  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **ICMP(Internet Control Message Protocol):** IP 패킷 전송 중 발생하는 오류 처리, 진단, 상태 보고 메시지를 보낼 때 사용되는 인터넷 제어 메시지 프로토콜이다. (예: `ping` 명령어가 ICMP 활용)

</div>
</details>

---

### 📝 Q44. IP 주소 체계와 관련된 설명으로 틀린 것은? [22년 1회]

① IPv6의 패킷 헤더는 32 Octet의 고정된 길이를 가진다.  
② IPv6는 주소 자동 설정(Auto Configuration) 기능을 통해 손쉽게 이용자의 단말을 네트워크에 접속시킬 수 있다.  
③ IPv4는 호스트 주소를 자동으로 설정하며 유니캐스트(Unicast)를 지원한다.  
④ IPv4는 클래스별로 네트워크와 호스트 주소의 길이가 다르다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **IPv6 기본 헤더 크기:** **40 Octet (40 Byte)** 고정 길이를 가진다. (32 Octet이 아님)
  - 참고로 IPv4의 기본 헤더 크기는 20 Octet이다.

</div>
</details>

---

### 📝 Q46. IP 프로토콜에서 사용하는 필드와 해당 필드에 대한 설명으로 틀린 것은? [22년 2회]

① Header Length는 IP 프로토콜의 헤더 길이를 32비트 워드 단위로 표시한다.  
② Packet Length는 IP를 제외한 패킷 전체의 길이를 나타내며 최대 크기는 $2^{32}-1$비트이다.  
③ Time To Live는 송신 호스트가 패킷을 전송하기 전 네트워크에서 생존할 수 있는 시간을 지정한 것이다.  
④ Version Number는 IP 프로토콜의 버전 번호를 나타낸다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **Total Length(Packet Length):** IP 헤더를 **포함한** IP 패킷 전체의 길이를 바이트(Byte) 단위로 나타내며, 16비트 필드이므로 최대 크기는 $2^{16}-1 =$ **65,535 Byte**이다.

</div>
</details>

---

### 📝 Q49. UDP 프로토콜의 특징이 아닌 것은? [22년 2회, 24년 3회]

① 비연결형 서비스를 제공한다.  
② 단순한 헤더 구조로 오버헤드가 적다.  
③ 주로 주소를 지정하고, 경로를 설정하는 기능을 한다.  
④ TCP와 같이 트랜스포트 계층에 존재한다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - 주소를 지정하고 경로를 설정(Routing)하는 기능은 **3계층인 네트워크 계층(IP 프로토콜 등)**의 역할이다.
  - UDP는 4계층(전송 계층)의 비연결형 프로토콜이다.

</div>
</details>

---

### 📝 Q50. IPv4(Internet Protocol) 헤더 구조에 포함되지 않는 것은? [19년 1회, 23년 1회]

① Version  
② Reserved Len  
③ Protocol  
④ Identification  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **IPv4 헤더 구성요소 암기 팁 (버헤타토 아플프 체소데):**
    - Version, Header Length, Type of Service, Total Length
    - Identification, Flags, Fragment Offset
    - Time To Live, Protocol, Header Checksum
    - Source Address, Destination Address
  - `Reserved Len`이라는 항목은 존재하지 않는다.

</div>
</details>

---

### 📝 Q51. OSI(Open System Interconnection) 7계층별 PDU(Protocol Data Unit) 중 틀린 것은? [24년 1회]

① 물리계층 - 메시지  
② 전송계층 - 세그먼트  
③ 네트워크계층 - 패킷  
④ 데이터링크계층 - 프레임  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **계층별 PDU(데이터 단위):**
    - 1계층(물리 계층): **비트(Bit)**
    - 2계층(데이터 링크 계층): **프레임(Frame)**
    - 3계층(네트워크 계층): **패킷(Packet)**
    - 4계층(전송 계층): **세그먼트(Segment)**
    - 5~7계층(세션/표현/응용 계층): **메시지(Message) / 데이터(Data)**

</div>
</details>

---

### 📝 Q52. 다음 중 세션 계층 프로토콜로 가장 알맞은 것은? [24년 3회]

① ARP(Address Resolution Protocol)  
② RPC(Remote Procedure Call)  
③ TCP(Transmission Control Protocol)  
④ HDLC(High-level Data Link Control)  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **RPC(Remote Procedure Call):** 원격 절차 호출 프로토콜로 OSI 5계층인 **세션 계층(Session Layer)** 프로토콜에 해당한다.
  - ARP는 네트워크 계층, TCP는 전송 계층, HDLC는 데이터 링크 계층이다.

</div>
</details>

---

### 📝 Q56. OSI 7계층 중 암호화, 코드 변환, 데이터 압축의 역할을 담당하는 계층은? [25년 1회]

① Data Link Layer  
② Application Layer  
③ Presentation Layer  
④ Session Layer  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **표현 계층(Presentation Layer, 6계층):** 응용 프로그램 간의 데이터 표현 차이를 해결하며, 데이터 **암호화/복호화**, **코드 변환**, **데이터 압축** 등의 기능을 담당한다.

</div>
</details>

---

### 📝 Q59. IP 주소와 호스트 이름 간의 변환을 제공하는 시스템은? [25년 3회]

① DNS  
② NFS  
③ Router  
④ Modem  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **DNS(Domain Name System):** 사람이 읽을 수 있는 도메인 이름(호스트 이름, 예: `google.com`)을 컴퓨터가 인식하는 IP 주소(예: `142.250.196.142`)로 서로 변환해 주는 시스템이다.

</div>
</details>
