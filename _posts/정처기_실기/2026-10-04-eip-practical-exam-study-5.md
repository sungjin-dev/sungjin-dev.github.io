---
title: "[정처기 실기 공부 #5] 요구사항 정의와 분석"
excerpt: "요구사항"
categories:
  - 정처기-실기
tags:
  - 정처기
  - 요구사항 개발 프로세스
  - 정보처리기사
  - 실기
  - CASE
  - HIPO
  - DFD
  - 요구공학
toc: true
toc_sticky: true
series: "정처기-실기"
order: 5
---


# 요구사항 정의와 분석

요구사항은 왜 이렇게 공들여 정리할까? 가장 싼 시점에 고치기 위해서다. 코드를 다 짠 뒤에 "이게 아닌데요"를 들으면 비용이 몇 배로 뛴다.

<br>

### 요구사항이란

소프트웨어가 해결해야 할 문제와 제공할 서비스에 대한 설명, 그리고 정상 운영에 필요한 제약 조건이다. 개발과 유지보수의 기준이 되고, 이해관계자 사이의 의사소통을 돕는다.

<br>

### 요구사항 유형

| 유형 | 설명 | 예시 |
|---|---|---|
| 기능 요구사항 | 시스템이 무엇을 하는지 | 로그인, 회원가입, 조회, 입출금 |
| 비기능 요구사항 | 품질이나 제약사항 | 365일 24시간 운용, 화면 응답 3초 이내, 보안 |
| 사용자 요구사항 | 사용자 관점, 친숙한 표현 | "주문 내역을 볼 수 있어야 한다" |
| 시스템 요구사항 | 개발자 관점, 전문적·기술적 표현 | "주문 조회 API는 인덱스를 사용한다" |

비기능 요구사항 중 품질 요구사항에는 가용성, 정합성, 상호호환성, 대응성, 이식성, 확장성, 보안성이 있다.

<br>

### 요구사항 개발 프로세스

도출, 분석, 명세, 확인 네 단계다. 이 과정이 시작되기 전에 타당성 조사가 먼저 선행되어야 한다. 요구사항은 한 번 정리하고 끝나지 않고 개발 생명주기 내내 반복된다.

<svg viewBox="0 0 680 215" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="요구사항 개발 프로세스">
<style>svg{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}.t{font-size:12px;fill:#2b2b2b}.h{font-size:13.5px;font-weight:600;fill:#2b2b2b}.g{fill:#f1f1ef;stroke:#9a9a96}.a{fill:#e1f2e6;stroke:#3f8f5a}.c{fill:#fbe4dd;stroke:#c8553d}.ln{stroke:#777;stroke-width:1.2;fill:none}.ah{fill:#777}@media (prefers-color-scheme:dark){.t,.h{fill:#e8e8e6}.g{fill:#2e2e2c;stroke:#8a8a86}.a{fill:#1f3a2a;stroke:#6cc08a}.c{fill:#432a24;stroke:#e68a74}.ln{stroke:#aaa}.ah{fill:#aaa}}</style>
<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" class="ah"/></marker></defs>
<rect class="g" x="20" y="36" width="180" height="54" rx="6"/>
<text class="h" x="110" y="58" text-anchor="middle">타당성 조사</text>
<text class="t" x="110" y="77" text-anchor="middle">개발 전에 먼저 수행</text>
<line class="ln" x1="200" y1="63" x2="248" y2="63" marker-end="url(#ar)"/>
<rect class="a" x="250" y="36" width="180" height="54" rx="6"/>
<text class="h" x="340" y="58" text-anchor="middle">요구사항 도출</text>
<text class="t" x="340" y="77" text-anchor="middle">인터뷰·설문·워크숍</text>
<line class="ln" x1="430" y1="63" x2="478" y2="63" marker-end="url(#ar)"/>
<rect class="a" x="480" y="36" width="180" height="54" rx="6"/>
<text class="h" x="570" y="58" text-anchor="middle">요구사항 분석</text>
<text class="t" x="570" y="77" text-anchor="middle">모호한 부분 걸러내기</text>
<line class="ln" x1="570" y1="90" x2="570" y2="118" marker-end="url(#ar)"/>
<rect class="a" x="480" y="120" width="180" height="54" rx="6"/>
<text class="h" x="570" y="142" text-anchor="middle">요구사항 명세</text>
<text class="t" x="570" y="161" text-anchor="middle">모델 작성·문서화</text>
<line class="ln" x1="480" y1="147" x2="432" y2="147" marker-end="url(#ar)"/>
<rect class="c" x="250" y="120" width="180" height="54" rx="6"/>
<text class="h" x="340" y="142" text-anchor="middle">요구사항 확인</text>
<text class="t" x="340" y="161" text-anchor="middle">이해관계자 검토·검증</text>
<line class="ln" x1="250" y1="147" x2="202" y2="147" marker-end="url(#ar)"/>
<rect class="g" x="20" y="120" width="180" height="54" rx="6"/>
<text class="h" x="110" y="142" text-anchor="middle">변경 발생</text>
<text class="t" x="110" y="161" text-anchor="middle">↻ 생명주기 동안 반복</text>
<rect class="g" x="20" y="192" width="14" height="14" rx="3"/>
<text class="t" x="40" y="204">사전·반복 조건</text>
<rect class="a" x="170" y="192" width="14" height="14" rx="3"/>
<text class="t" x="190" y="204">정보 수집·정리</text>
<rect class="c" x="320" y="192" width="14" height="14" rx="3"/>
<text class="t" x="340" y="204">검증</text>
</svg>

- **도출:** 시스템, 사용자, 개발자가 의견을 교환해 요구사항을 수집한다. 기법으로는 청취와 인터뷰, 설문, 브레인스토밍, 워크숍, 프로토타이핑, 유스케이스가 있다
- **분석:** 명확하지 않거나 모호한 요구사항을 걸러낸다. 타당성, 비용, 일정 제약을 설정하고, 서로 충돌하는 요구사항을 중재한다
- **명세:** 분석 결과로 모델을 만들고 문서화한다. 기능 요구사항은 빠짐없이, 비기능 요구사항은 필요한 것만 적는다
- **확인:** 명세서가 정확하고 완전한지 이해관계자가 검토한다. 요구사항 관리 도구로 형상 관리(SCM)를 수행한다

<br>

### 명세 기법: 정형 vs 비정형

| 구분 | 정형 명세 | 비정형 명세 |
|---|---|---|
| 기반 | 수학적 원리, 모델 | 상태·기능·객체 중심, 자연어 |
| 장점 | 간결하고 일관적이다. 완전성 검증이 가능하다 | 이해하기 쉽고 의사소통이 쉽다 |
| 단점 | 표기법이 난해하다 | 작성자에 따라 해석이 달라진다 |
| 종류 | VDM, Z, Petri-net, CSP | FSM, 결정 테이블, ER 모델링, State Chart |

<br>

### 구조적 분석 기법

자료의 흐름과 처리를 중심으로 요구사항을 분석하는 하향식 기법이다. 도형 중심의 도구를 쓰기 때문에 사용자에게 설명하기 쉽다. 사용 도구는 자료 흐름도(DFD), 자료 사전(DD), 소단위 명세서, 개체 관계도(ERD), 상태 전이도, 제어 명세서다.

DFD는 네 가지 요소로 그린다.

- 프로세스: 자료를 변환하는 처리 과정
- 자료 흐름: 자료의 이동 경로
- 자료 저장소: 파일, 데이터베이스
- 단말: 시스템과 교신하는 외부 개체

자료 사전은 DFD에 나온 자료를 더 자세히 정의한 것이다. 데이터를 설명하는 데이터이므로 메타 데이터라고도 부른다. 표기 기호는 아래와 같다.

| 기호 | 의미 |
|---|---|
| = | 자료의 정의 (~로 구성되어 있다) |
| + | 자료의 연결 (그리고) |
| ( ) | 자료의 생략 (생략 가능) |
| [ ] | 자료의 선택 (또는) |
| { } | 자료의 반복 |
| * * | 자료의 설명 (주석) |

<br>

### 요구사항 분석용 CASE와 HIPO

CASE 도구는 요구사항 분석과 명세를 자동화한다. 대표적으로 SADT(SoftTech), SREM(TRW의 RSL/REVS), PSL/PSA(미시간 대학), TAGS가 있다.

HIPO는 시스템 실행 과정을 입력, 처리, 출력으로 표현하는 하향식 문서화 도구다. 기능과 자료의 의존 관계를 함께 보여 주고, 가시적 도표(도식 목차), 총체적 도표(개요), 세부적 도표(상세) 세 종류로 구성된다.

<br>

### 정리

요구공학은 무엇을 개발할지 정의하고 분석하고 관리하는 활동 전체를 다루는 학문이다. 요구사항은 반드시 바뀐다고 가정하고, 변경 이력을 형상 관리 도구에 남기는 것이 좋다.
