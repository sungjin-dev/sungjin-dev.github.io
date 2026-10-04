---
title: "[정처기 실기 공부 #6] 요구사항 정의와 분석"
excerpt: "요구사항"
categories:
  - 정처기-실기
tags:
  - 정처기
  - UML
  - 정보처리기사
  - 실기
  - 구조적 다이어그램
  - 행위 다이어그램
  - 클래스 다이어그램
  - 패키지 다이어그램
toc: true
toc_sticky: true
series: "정처기-실기"
order: 6
---


# UML 기초와 구조 다이어그램


말로 설계를 설명하다 보면 반드시 오해가 생긴다. 그렇다면 개발자와 고객이 같은 그림을 보면 어떨까? 이 질문의 답이 UML이다.

<br>

### UML이란

시스템 분석, 설계, 구현 과정에서 개발자와 고객, 또는 개발자끼리 의사소통하기 위해 표준화한 객체지향 모델링 언어다. 럼바우, 부치, 야콥슨의 방법론 장점을 통합했고, 객체기술 국제표준화기구인 OMG에서 표준으로 지정했다. 구성요소는 사물, 관계, 다이어그램 세 가지다.

<br>

### 사물 4종류

| 사물 | 의미 | 예시 |
|---|---|---|
| 구조 사물 | 시스템의 개념적·물리적 요소 | 클래스, 컴포넌트, 인터페이스, 노드, 유스케이스 |
| 행동 사물 | 시간과 공간에 따른 행위 | 상호작용, 상태 머신 |
| 그룹 사물 | 요소를 묶음 | 패키지 |
| 주해 사물 | 부가 설명, 제약조건 | 노트 |

<br>

### 관계 6종

사물과 사물 사이의 연관성을 표현한다. 아래 그림에서 선의 모양만 구분할 수 있으면 절반은 끝난 것이다.

<svg viewBox="0 0 680 310" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="UML 관계 6종">
<style>svg{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}.t{font-size:12px;fill:#2b2b2b}.h{font-size:13.5px;font-weight:600;fill:#2b2b2b}.g{fill:#f1f1ef;stroke:#9a9a96}.a{fill:#e1f2e6;stroke:#3f8f5a}.c{fill:#fbe4dd;stroke:#c8553d}.ln{stroke:#777;stroke-width:1.2;fill:none}.ah{fill:#777}.hol{fill:#fff;stroke:#555;stroke-width:1.2}@media (prefers-color-scheme:dark){.t,.h{fill:#e8e8e6}.g{fill:#2e2e2c;stroke:#8a8a86}.a{fill:#1f3a2a;stroke:#6cc08a}.c{fill:#432a24;stroke:#e68a74}.ln{stroke:#aaa}.ah{fill:#aaa}.hol{fill:#1c1c1b;stroke:#bbb}}</style>
<text class="h" x="20" y="22">UML 관계 6종</text>
<rect class="a" x="20" y="40" width="130" height="28" rx="5"/>
<text class="t" x="85" y="58" text-anchor="middle">연관</text>
<line class="ln" x1="190" y1="54" x2="380" y2="54"/>
<text class="t" x="410" y="58">선생님 — 학생 (서로 알고 있다)</text>
<rect class="a" x="20" y="82" width="130" height="28" rx="5"/>
<text class="t" x="85" y="100" text-anchor="middle">집합</text>
<polygon class="hol" points="190,96 202,90 214,96 202,102"/>
<line class="ln" x1="214" y1="96" x2="380" y2="96"/>
<text class="t" x="410" y="100">컴퓨터 — 프린터 (따로 존재)</text>
<rect class="a" x="20" y="124" width="130" height="28" rx="5"/>
<text class="t" x="85" y="142" text-anchor="middle">포함 (합성)</text>
<polygon class="ah" points="190,138 202,132 214,138 202,144"/>
<line class="ln" x1="214" y1="138" x2="380" y2="138"/>
<text class="t" x="410" y="142">집 — 방 (함께 생성·소멸)</text>
<rect class="g" x="20" y="166" width="130" height="28" rx="5"/>
<text class="t" x="85" y="184" text-anchor="middle">일반화 (is a)</text>
<line class="ln" x1="190" y1="180" x2="368" y2="180"/>
<polygon class="hol" points="368,174 380,180 368,186"/>
<text class="t" x="410" y="184">아메리카노 → 커피</text>
<rect class="g" x="20" y="208" width="130" height="28" rx="5"/>
<text class="t" x="85" y="226" text-anchor="middle">실체화 (can do)</text>
<line class="ln" x1="190" y1="222" x2="368" y2="222" stroke-dasharray="5 4"/>
<polygon class="hol" points="368,216 380,222 368,228"/>
<text class="t" x="410" y="226">새 ⇢ 날기 (기능 구현)</text>
<rect class="c" x="20" y="250" width="130" height="28" rx="5"/>
<text class="t" x="85" y="268" text-anchor="middle">의존</text>
<line class="ln" x1="190" y1="264" x2="378" y2="264" stroke-dasharray="5 4"/>
<polyline class="ln" points="368,258 380,264 368,270"/>
<text class="t" x="410" y="268">할인율 ⇢ 등급 (잠깐 영향)</text>
<rect class="a" x="20" y="292" width="12" height="12" rx="3"/>
<text class="t" x="38" y="302">소유·연결</text>
<rect class="g" x="130" y="292" width="12" height="12" rx="3"/>
<text class="t" x="148" y="302">타입 관계</text>
<rect class="c" x="240" y="292" width="12" height="12" rx="3"/>
<text class="t" x="258" y="302">일시적 사용</text>
</svg>

- **연관:** 두 사물이 서로 관련된 관계다. 실선으로 잇고, 방향은 화살표로 표시한다. 양방향이면 화살표를 생략한다
- **집합:** 전체와 부분이 서로 독립적이다. 전체 쪽에 속이 빈 마름모를 붙인다
- **포함:** 집합의 특수한 형태다. 전체와 부분이 생명주기를 함께하고, 전체 쪽에 속이 채워진 마름모를 붙인다
- **일반화:** 일반적인 상위(부모)와 구체적인 하위(자식)의 관계다. 하위에서 상위로 속이 빈 삼각형 화살표를 잇는다
- **실체화:** 사물이 할 수 있거나 해야 하는 기능을 구현하는 관계다. 점선에 속이 빈 삼각형 화살표를 쓴다
- **의존:** 필요에 의해 짧은 시간 동안만 연관을 유지하는 관계다. 영향을 받는 쪽에서 주는 쪽으로 점선 화살표를 잇는다

연관 관계에는 다중도를 선 위에 적는다.

| 표기 | 의미 |
|---|---|
| 1 | 1개의 객체가 연관된다 |
| n | n개의 객체가 연관된다 |
| 0..1 | 연관된 객체가 없거나 1개다 |
| 0..* 또는 * | 연관된 객체가 없거나 다수다 |
| 1..* | 적어도 1개 이상이다 |
| n..m | 최소 n개에서 최대 m개다 |

<br>

### 다이어그램의 분류

| 구분 | 용도 | 종류 |
|---|---|---|
| 구조적 다이어그램 | 정적 모델링 | 클래스, 객체, 컴포넌트, 배치, 복합체 구조, 패키지 |
| 행위 다이어그램 | 동적 모델링 | 유스케이스, 순차, 커뮤니케이션, 상태, 활동, 상호작용 개요, 타이밍 |

행위 다이어그램은 다음 글에서 따로 다룬다. 이번 글은 구조 쪽을 본다.

<br>

### 클래스 다이어그램

클래스와 클래스가 가지는 속성, 클래스 사이의 관계를 표현한다. 시스템을 구성하는 요소를 이해하고 문서화하는 데 쓴다. 클래스는 보통 직사각형 안에 이름, 속성, 동작을 나눠 적는다.

접근 제한자는 앞에 붙는 기호로 구분한다.

| 기호 | 접근 제한자 | 접근 범위 |
|---|---|---|
| + | public | 어디서나 접근 가능 |
| - | private | 해당 클래스 내부에서만 접근 가능 |
| # | protected | 해당 클래스와 자식 클래스에서 접근 가능 |
| ~ | package | 같은 패키지 내에서 접근 가능 |

자주 헷갈리는 부분이 private와 protected다. 가장 제한적인 것은 private이다. protected는 자식 클래스에서 접근할 수 있고, private는 자식도 접근할 수 없다.

두 클래스의 연관 관계 자체에 속성이나 동작이 필요하면 연관 클래스를 만든다. 연관선 가운데에서 점선을 내려 클래스를 붙인다. 예를 들어 팀과 경기 사이의 "참여"에 참여 횟수, 참여 결과를 담는 식이다.

<br>

### 패키지 다이어그램

패키지는 클래스보다 상위 개념이다. 유스케이스나 클래스 같은 요소를 그룹화한 패키지 사이의 의존 관계를 표현한다. 대규모 시스템에서 주요 요소 간 종속성을 파악할 때 쓴다. 패키지끼리, 패키지와 객체 사이의 의존 관계는 점선 화살표로 그린다. 여기서 import와 access를 구분해야 한다.

| 표기 | 의미 |
|---|---|
| import | 패키지에 포함된 객체를 직접 가져와서 이용한다 |
| access | 인터페이스를 통해 패키지 안의 객체에 접근해서 이용한다 |

<br>

### 정리

관계는 선 모양과 화살촉 모양으로 외우기보다 의미를 먼저 이해하는 것이 좋다. "함께 사라지는가", "잠깐 쓰는가", "타입이 같은 계열인가"를 물으면 선 모양은 자연스럽게 따라온다.
