---
title: "[정처기 실기 공부 #10]프로세스와 스레드, 그리고 교착상태"
excerpt: "소프트웨어 개발 프레임워크"
categories:
  - 정처기-실기
tags:
  - 정처기
  - 프로세스
  - 정보처리기사
  - 실기
  - 프로세스
  - Dispatch
  - Spooling
  - Wake up
  - 쓰레드
toc: true
toc_sticky: true
series: "정처기-실기"
order: 10
---

# 프로세스와 스레드, 그리고 교착상태


프로그램과 프로세스는 같은 말일까? 아니다. 디스크에 저장된 파일은 프로그램이고, 메모리에 올라와 CPU를 받아 실행 중인 것이 프로세스다.

<br>

### 프로세스와 프로세서

이름이 비슷해서 자주 헷갈리지만 둘은 전혀 다르다. 주방으로 비유하면 쉽다. 프로세서는 요리사이고, 프로세스는 요리사가 지금 조리 중인 주문이다.

| 구분 | 프로세서 | 프로세스 |
|---|---|---|
| 정체 | 하드웨어 (CPU, GPU) | 소프트웨어 (실행 중인 상태) |
| 예시 | 연산과 제어를 수행하는 칩 | 실행 중인 엑셀, 메신저, 브라우저 창 |
| 관련 용어 | 레지스터, ALU, 제어장치, 클록 | PCB, PID, 준비/실행/대기 상태 |

프로세스는 PCB를 가진 프로그램, 프로세서가 할당되는 실체, 운영체제가 관리하는 실행 단위로 정의된다.

<br>

### PCB (프로세스 제어 블록)

운영체제가 프로세스에 대한 중요한 정보를 저장해 두는 곳이다. 프로세스가 생성될 때 고유한 PCB가 만들어지고, 프로세스가 완료되면 제거된다. 저장 정보는 아래와 같다.

- 프로세스의 현재 상태, 포인터, 고유 식별자
- 스케줄링 정보와 우선순위
- CPU 레지스터 정보
- 주기억장치 관리 정보
- 입출력 상태 정보, 계정 정보

<br>

### 프로세스 상태 전이

프로세스는 태어나서 끝날 때까지 CPU를 쓸 수 있는가에 따라 상태가 바뀐다. 준비와 실행 상태가 CPU 쪽이고, 입출력을 기다리는 대기 상태는 CPU를 쓸 수 없다.

<svg viewBox="0 0 680 240" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="프로세스 상태 전이도">
<style>svg{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}.t{font-size:12px;fill:#2b2b2b}.h{font-size:13.5px;font-weight:600;fill:#2b2b2b}.g{fill:#f1f1ef;stroke:#9a9a96}.a{fill:#e1f2e6;stroke:#3f8f5a}.c{fill:#fbe4dd;stroke:#c8553d}.ln{stroke:#777;stroke-width:1.2;fill:none}.ah{fill:#777}@media (prefers-color-scheme:dark){.t,.h{fill:#e8e8e6}.g{fill:#2e2e2c;stroke:#8a8a86}.a{fill:#1f3a2a;stroke:#6cc08a}.c{fill:#432a24;stroke:#e68a74}.ln{stroke:#aaa}.ah{fill:#aaa}}</style>
<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" class="ah"/></marker></defs>
<text class="h" x="20" y="22">프로세스 상태 전이</text>
<rect class="g" x="20" y="40" width="70" height="50" rx="6"/>
<text class="h" x="55" y="70" text-anchor="middle">생성</text>
<line class="ln" x1="90" y1="65" x2="128" y2="65" marker-end="url(#ar)"/>
<rect class="a" x="130" y="40" width="110" height="50" rx="6"/>
<text class="h" x="185" y="70" text-anchor="middle">준비</text>
<line class="ln" x1="240" y1="55" x2="328" y2="55" marker-end="url(#ar)"/>
<text class="t" x="284" y="46" text-anchor="middle">Dispatch</text>
<line class="ln" x1="330" y1="78" x2="242" y2="78" marker-end="url(#ar)"/>
<text class="t" x="286" y="96" text-anchor="middle">타임아웃</text>
<rect class="a" x="330" y="40" width="120" height="50" rx="6"/>
<text class="h" x="390" y="70" text-anchor="middle">실행</text>
<line class="ln" x1="450" y1="65" x2="568" y2="65" marker-end="url(#ar)"/>
<text class="t" x="509" y="56" text-anchor="middle">작업 완료</text>
<rect class="g" x="570" y="40" width="90" height="50" rx="6"/>
<text class="h" x="615" y="70" text-anchor="middle">종료</text>
<line class="ln" x1="390" y1="90" x2="390" y2="138" marker-end="url(#ar)"/>
<text class="t" x="400" y="120">입출력 요청</text>
<rect class="c" x="330" y="140" width="120" height="50" rx="6"/>
<text class="h" x="390" y="170" text-anchor="middle">대기</text>
<path class="ln" d="M330,165 H185 V92" marker-end="url(#ar)"/>
<text class="t" x="257" y="157" text-anchor="middle">Wake up</text>
<rect class="a" x="20" y="212" width="14" height="14" rx="3"/>
<text class="t" x="40" y="224">CPU를 쓸 수 있는 상태</text>
<rect class="c" x="200" y="212" width="14" height="14" rx="3"/>
<text class="t" x="220" y="224">CPU를 쓸 수 없는 상태</text>
<rect class="g" x="390" y="212" width="14" height="14" rx="3"/>
<text class="t" x="410" y="224">시작·끝</text>
</svg>

관련 용어를 정리하면 아래와 같다.

- **Dispatch:** 준비 상태의 프로세스 하나가 CPU를 할당받아 실행 상태가 되는 것
- **Wake up:** 입출력이 끝나 대기 상태에서 준비 상태로 바뀌는 것
- **Spooling:** 느린 입출력 장치를 보완하려고 데이터를 디스크에 모았다가 나중에 한꺼번에 처리하는 방식. 다중 프로그래밍 시스템의 효율을 높인다
- **교통량 제어기(Traffic Controller):** 프로세스의 상태를 조사하고 통보하는 담당자

<br>

### 스레드

스레드는 시스템 자원을 할당받아 실행되는 단위이며, 프로세스 내부의 작업 단위다. 프로세스의 일부 특성을 가지고 있어 경량 프로세스라고도 부른다.

- 프로세스 하나에 스레드 하나만 있으면 단일 스레드다
- 하나 이상의 스레드가 있으면 다중 스레드다
- 스레드 기반 시스템에서는 스레드가 독립적인 스케줄링의 최소 단위가 된다

즉, 운영체제가 CPU를 나눠 줄 때 무거운 프로세스 대신 가벼운 스레드를 기본 실행 단위로 삼는 구조다.

<br>

### 교착상태 (Deadlock)

둘 이상의 프로세스가 서로 상대가 점유한 자원을 기다리며 무한정 멈춰 있는 상태다. 내가 필요한 자원은 네가 쥐고, 네가 필요한 자원은 또 다른 놈이 쥐고, 결국 그 자원이 나한테 돌아오는 구조다. P1은 프린터 작업, P2는 파일 작업, P3는 DB 작업이라면 P1이 P2를, P2가 P3를, P3가 P1을 기다리는 식이다.

교착상태는 아래 네 가지 조건이 모두 충족될 때 발생한다. 하나라도 깨지면 발생하지 않는다.

| 조건 | 설명 |
|---|---|
| 상호 배제 | 한 번에 한 프로세스만 공유 자원을 사용할 수 있다 |
| 점유와 대기 | 자원을 점유한 채 다른 프로세스의 자원을 기다린다 |
| 비선점 | 할당된 자원을 강제로 빼앗을 수 없다 |
| 환형 대기 | 자원을 기다리는 프로세스들이 원형으로 연결된다 |

해결 방법은 네 가지다.

| 기법 | 내용 |
|---|---|
| 예방 | 네 가지 조건 중 하나를 미리 제거한다. 확실하지만 자원 낭비가 가장 심하다 |
| 회피 | 발생 가능성을 배제하지 않고 피해 나간다. 은행원 알고리즘(다익스트라 제안)이 대표적이다 |
| 발견 | 교착상태가 발생했는지 점검한다. 자원 할당 그래프 등을 쓴다 |
| 회복 | 교착상태 프로세스를 종료하거나 자원을 선점해 복구한다 |

<br>

### 정리

교착상태 문제는 네 조건의 이름을 외우는 것보다 "서로 물고 물린다"는 그림을 떠올리는 것이 좋다. 그림이 그려지면 예방과 회피가 왜 다른지도 자연스럽게 이해된다.
