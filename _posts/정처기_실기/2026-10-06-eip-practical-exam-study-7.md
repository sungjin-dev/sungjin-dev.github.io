---
title: "[정처기 실기 공부 #7] UML 행위 다이어그램"
excerpt: "행위 다이어그램 종류와 내용"
categories:
  - 정처기-실기
tags:
  - 정처기
  - UML
  - 정보처리기사
  - 실기
  - 유스케이스 다이어그램
  - 행위 다이어그램
  - 활동 다이어그램
  - 커뮤니케이션 다이어그램
  - 상태 다이어그램
toc: true
toc_sticky: true
series: "정처기-실기"
order: 7
---


# UML 행위 다이어그램

구조 다이어그램이 "시스템에 무엇이 있는가"를 보여 준다면, 행위 다이어그램은 "그것들이 어떻게 움직이는가"를 보여 준다. 다섯 가지를 한 번에 구분하는 요령부터 정리한다.

<br>

### 한눈에 구분하기

| 다이어그램 | 분류 | 핵심 키워드 |
|---|---|---|
| 유스케이스 | 기능 모델링 | 액터, 시스템 경계, 유스케이스 |
| 활동 | 기능 모델링 | 스윔레인, 포크/조인, 조건 노드 |
| 순차 | 동적 모델링 | 생명선, 실행 상자, 메시지 |
| 커뮤니케이션 | 동적 모델링 | 객체 사이의 링크 |
| 상태 | 동적 모델링 | 상태 전이, 이벤트 |

<br>

### 유스케이스 다이어그램

사용자와 외부 시스템이 개발할 시스템을 이용해 수행할 수 있는 기능을 사용자 관점에서 표현한다. 외부 요소와 시스템 사이의 상호작용을 확인하고 시스템의 범위를 파악하는 데 쓴다.

- **시스템 경계:** 시스템의 범위를 사각형으로 표시한다
- **액터:** 시스템과 상호작용하는 외부 요소. 사용자일 수도, 결제 시스템 같은 다른 시스템일 수도 있다
- **유스케이스:** 사용자가 얻는 기능 하나를 타원으로 표현한다
- **관계:** 포함(include), 확장(extend), 일반화가 있다

쇼핑몰 예시로 보면 쉽다. 회원이 주문하려면 반드시 로그인을 해야 하므로 "주문"은 "로그인"을 포함한다. 반면 "사진 업로드"는 리뷰 작성 중 필요할 때만 쓰므로 리뷰 작성을 확장하는 관계다.

<br>

### 활동 다이어그램

시스템이 수행하는 기능을 처리 흐름에 따라 순서대로 표현한다. 하나의 유스케이스 안에서, 또는 유스케이스 사이에서 일어나는 복잡한 처리 흐름을 명확하게 보여 준다. 자료 흐름도와 비슷한 느낌이다.

이 다이어그램만의 특징적 요소는 아래와 같다.

- **스윔레인:** 활동을 수행하는 주체를 구분하는 선. 핵심은 "누가 하는가"를 나누는 기준이라는 점이다
- **포크 노드 / 조인 노드:** 흐름을 병렬로 나누고 다시 합친다. 주문 시 결제 인증과 재고 확인을 동시에 진행하는 장면이 대표적이다
- **조건 노드 / 병합 노드:** 조건에 따른 분기와 합류
- **시작 노드(●) / 종료 노드(◉)**

<br>

### 순차 다이어그램

시스템이나 객체가 메시지를 주고받으며 상호작용하는 과정을 시간 순서대로 그린다. 위에서 아래로 시간이 흐른다고 생각하면 된다. 구성요소는 아래와 같다.

| 구성요소 | 의미 |
|---|---|
| 액터 | 시스템과 상호작용하는 외부 요소 |
| 객체 | 메시지를 주고받는 주체 |
| 생명선 | 객체가 존재하는 기간을 나타내는 점선 |
| 실행 상자(활성 상자) | 객체가 메시지를 받아 실제로 동작 중인 구간 |
| 메시지 | 객체 사이에 오가는 호출과 응답 |
| 객체 소멸 | 생명선 끝의 X 표시 |
| 프레임 | 다이어그램 전체 또는 일부를 감싸는 영역 |

객체 소멸 표시가 있다는 것은 생명선이 존재한다는 뜻이다. 순차 다이어그램을 알아보는 가장 쉬운 단서다.

<br>

### 커뮤니케이션 다이어그램

순차 다이어그램과 같은 상호작용을 다른 관점으로 그린다. 시간 순서보다 객체 사이의 관계에 초점을 맞춘다. 그래서 가장 중요한 요소는 객체를 잇는 링크(실선)다. 클래스 다이어그램에서 관계가 제대로 표현됐는지 점검하는 용도로도 쓴다.

<br>

### 상태 다이어그램

객체가 어떤 이벤트를 받아 상태가 바뀌는 과정을 그린다. 객체의 상태란 객체가 가진 속성 값의 변화를 뜻한다. 시스템에서 상태 변환 이벤트를 확인할 필요가 있는 객체만 골라서 그린다.

구성요소는 상태, 시작 상태(●), 종료 상태(◉), 상태 전이(화살표), 이벤트, 프레임이다. 가장 핵심은 상태 전이이고, 상태 사이의 흐름과 변화를 화살표로 표현한다.

<svg viewBox="0 0 680 240" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="상품 결제 객체의 상태 다이어그램">
<style>svg{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}.t{font-size:12px;fill:#2b2b2b}.h{font-size:13.5px;font-weight:600;fill:#2b2b2b}.g{fill:#f1f1ef;stroke:#9a9a96}.a{fill:#e1f2e6;stroke:#3f8f5a}.c{fill:#fbe4dd;stroke:#c8553d}.ln{stroke:#777;stroke-width:1.2;fill:none}.ah{fill:#777}@media (prefers-color-scheme:dark){.t,.h{fill:#e8e8e6}.g{fill:#2e2e2c;stroke:#8a8a86}.a{fill:#1f3a2a;stroke:#6cc08a}.c{fill:#432a24;stroke:#e68a74}.ln{stroke:#aaa}.ah{fill:#aaa}}</style>
<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" class="ah"/></marker></defs>
<text class="h" x="20" y="24">상품 결제 객체의 상태 변화</text>
<circle class="ah" cx="36" cy="75" r="8"/>
<line class="ln" x1="44" y1="75" x2="68" y2="75" marker-end="url(#ar)"/>
<rect class="a" x="70" y="50" width="130" height="50" rx="22"/>
<text class="h" x="135" y="80" text-anchor="middle">결제 준비</text>
<line class="ln" x1="200" y1="75" x2="268" y2="75" marker-end="url(#ar)"/>
<text class="t" x="234" y="66" text-anchor="middle">정보 입력</text>
<rect class="a" x="270" y="50" width="130" height="50" rx="22"/>
<text class="h" x="335" y="80" text-anchor="middle">결제 대기</text>
<line class="ln" x1="400" y1="75" x2="468" y2="75" marker-end="url(#ar)"/>
<text class="t" x="434" y="66" text-anchor="middle">정보 일치</text>
<rect class="a" x="470" y="50" width="130" height="50" rx="22"/>
<text class="h" x="535" y="80" text-anchor="middle">결제 완료</text>
<line class="ln" x1="600" y1="75" x2="628" y2="75" marker-end="url(#ar)"/>
<circle class="ln" cx="642" cy="75" r="10"/>
<circle class="ah" cx="642" cy="75" r="5"/>
<line class="ln" x1="335" y1="100" x2="335" y2="148" marker-end="url(#ar)"/>
<text class="t" x="345" y="130">정보 불일치</text>
<rect class="c" x="270" y="150" width="130" height="50" rx="22"/>
<text class="h" x="335" y="180" text-anchor="middle">결제 실패</text>
<text class="t" x="420" y="172">재시도 이벤트 → 결제 준비</text>
<text class="t" x="420" y="190">↻ 처음 상태로 돌아간다</text>
<circle class="g" cx="28" cy="226" r="6"/>
<text class="t" x="42" y="230">시작·종료</text>
<rect class="a" x="140" y="219" width="14" height="14" rx="3"/>
<text class="t" x="160" y="230">정상 흐름</text>
<rect class="c" x="260" y="219" width="14" height="14" rx="3"/>
<text class="t" x="280" y="230">예외 상태</text>
</svg>

<br>

### 정리

행위 다이어그램은 이름이 아니라 특징 요소로 구분하는 것이 좋다. 스윔레인이 보이면 활동, 생명선이 보이면 순차, 링크가 중심이면 커뮤니케이션, 상태 전이 화살표가 중심이면 상태 다이어그램이다.
