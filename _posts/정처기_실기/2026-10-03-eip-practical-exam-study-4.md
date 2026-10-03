---
title: "[정처기 실기 공부 #4] 소프트웨어 생명주기와 개발 방법론"
excerpt: "C,JAVA,PYTHON 기준"
categories:
  - 정처기-실기
tags:
  - 정처기
  - 소프트웨어 생명주기
  - 정보처리기사
  - 실기
  - 폭포수 모형
  - 나선형
  - 프로토타입
  - 애자
toc: true
toc_sticky: true
series: "정처기-실기"
order: 4
---


# 소프트웨어 생명주기와 개발 방법론

> CS 기초 정리 시리즈 01/17

개발 방식은 왜 여러 가지일까? 답은 단순하다. 요구사항은 언제든 바뀌고, 그 변화를 얼마나 비싼 값으로 치르느냐가 모형마다 다르기 때문이다.

<br>

### 소프트웨어 생명주기란

소프트웨어를 기획하고, 설계하고, 운영하고, 유지보수하는 과정을 단계별로 나눈 것이다. 즉, 개발의 큰 흐름을 미리 약속해 두는 틀이다. 대표적인 모형은 폭포수, 프로토타입, 나선형, 애자일 네 가지다.

<br>

### 전통 모형 3가지

| 모형 | 핵심 아이디어 | 특징 |
|---|---|---|
| 폭포수 | 단계를 순서대로 진행하고, 이전 단계로 돌아가지 않는다 | 각 단계 결과를 검토·승인한 뒤 다음으로 넘어간다. 가장 오래된 고전적 모형이다 |
| 프로토타입 | 견본품을 먼저 만들어 요구사항을 파악한다 | 사용자와 시스템 사이의 인터페이스에 중점을 둔다 |
| 나선형 | 폭포수 + 프로토타입 + 위험 분석 | 보헴(Boehm)이 제안했다. 대규모·고위험 프로젝트에 적합하다 |

물론 폭포수 모형은 이해하기 쉽다. 하지만 요구사항이 중간에 바뀌면 되돌아갈 길이 없다. 프로토타입은 이 문제를 견본품으로 줄이고, 나선형은 한 걸음 더 나아가 위험까지 따로 분석한다.

나선형의 주요 활동은 아래 네 가지를 반복한다.

1. 계획 수립 (목표 설정)
2. 위험 분석
3. 개발 및 검증
4. 고객 평가

<br>

### 애자일: 변화에 반응하는 개발

폭포수와 대조적인 모형이다. 일정한 주기를 반복하며 개발하고, 고객과의 소통에 초점을 둔다. 애자일이 내세우는 4가지 가치는 아래와 같다.

- 프로세스와 도구보다 **개인과 상호작용**
- 방대한 문서보다 **실행되는 소프트웨어**
- 계약 협상보다 **고객과 협업**
- 계획을 따르기보다 **변화에 반응**

대표적인 방법론은 스크럼, XP, 칸반, Lean, 기능 중심 개발(FDD)이다.

<br>

### 스크럼

팀이 중심이 되어 개발 효율을 높이는 기법이다. 역할은 세 가지로 나뉜다.

| 역할 | 하는 일 |
|---|---|
| 제품 책임자 (PO) | 요구사항이 담긴 백로그를 작성하고 우선순위를 정한다. 요구사항에 책임을 진다 |
| 스크럼 마스터 (SM) | 팀이 스크럼을 잘 수행하도록 가이드한다 |
| 개발팀 (DT) | PO와 SM을 제외한 모든 팀원. 실제 개발을 수행한다 |

진행은 아래 그림처럼 이어진다. 마지막 회고에서 나온 개선점은 다음 스프린트에 반영되므로 사이클은 계속 돈다.

<svg viewBox="0 0 680 250" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="스크럼 한 사이클">
<style>svg{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}.t{font-size:12px;fill:#2b2b2b}.h{font-size:13.5px;font-weight:600;fill:#2b2b2b}.g{fill:#f1f1ef;stroke:#9a9a96}.a{fill:#e1f2e6;stroke:#3f8f5a}.c{fill:#fbe4dd;stroke:#c8553d}.ln{stroke:#777;stroke-width:1.2;fill:none}.ah{fill:#777}@media (prefers-color-scheme:dark){.t,.h{fill:#e8e8e6}.g{fill:#2e2e2c;stroke:#8a8a86}.a{fill:#1f3a2a;stroke:#6cc08a}.c{fill:#432a24;stroke:#e68a74}.ln{stroke:#aaa}.ah{fill:#aaa}}</style>
<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" class="ah"/></marker></defs>
<text class="h" x="20" y="24">스크럼 한 사이클</text>
<rect class="g" x="20" y="40" width="190" height="62" rx="6"/>
<text class="h" x="115" y="62" text-anchor="middle">제품 백로그</text>
<text class="t" x="115" y="82" text-anchor="middle">요구사항 + 우선순위</text>
<line class="ln" x1="210" y1="71" x2="248" y2="71" marker-end="url(#ar)"/>
<rect class="g" x="250" y="40" width="190" height="62" rx="6"/>
<text class="h" x="345" y="62" text-anchor="middle">스프린트 계획 회의</text>
<text class="t" x="345" y="82" text-anchor="middle">이번 스프린트 작업 선택</text>
<text class="t" x="460" y="75">백로그 관리: 제품 책임자(PO)</text>
<path class="ln" d="M345,102 V122 H115 V138" marker-end="url(#ar)"/>
<rect class="a" x="20" y="140" width="190" height="64" rx="6"/>
<text class="h" x="115" y="162" text-anchor="middle">스프린트 (2~4주)</text>
<text class="t" x="115" y="180" text-anchor="middle">실제 개발 수행</text>
<text class="t" x="115" y="196" text-anchor="middle">일일 스크럼 15분</text>
<line class="ln" x1="210" y1="172" x2="248" y2="172" marker-end="url(#ar)"/>
<rect class="c" x="250" y="140" width="190" height="64" rx="6"/>
<text class="h" x="345" y="162" text-anchor="middle">스프린트 검토 회의</text>
<text class="t" x="345" y="180" text-anchor="middle">요구사항 부합 여부 테스트</text>
<line class="ln" x1="440" y1="172" x2="478" y2="172" marker-end="url(#ar)"/>
<rect class="c" x="480" y="140" width="180" height="64" rx="6"/>
<text class="h" x="570" y="162" text-anchor="middle">스프린트 회고</text>
<text class="t" x="570" y="180" text-anchor="middle">규칙 준수·개선점 기록</text>
<text class="t" x="570" y="196" text-anchor="middle">↻ 다음 스프린트로</text>
<rect class="g" x="20" y="226" width="14" height="14" rx="3"/>
<text class="t" x="40" y="238">계획·입력</text>
<rect class="a" x="130" y="226" width="14" height="14" rx="3"/>
<text class="t" x="150" y="238">실행</text>
<rect class="c" x="220" y="226" width="14" height="14" rx="3"/>
<text class="t" x="240" y="238">점검 회의</text>
</svg>

일일 스크럼에서 남은 작업 시간은 소멸 차트(번다운 차트)에 표시한다. 시간이 지날수록 남은 작업량이 줄어드는 그래프라서 진행 상황을 한눈에 볼 수 있다.

<br>

### XP (eXtreme Programming)

고객의 요구사항이 수시로 바뀌는 상황에 대응하기 위해 고객 참여와 개발 과정의 반복을 극대화한 방법론이다. 릴리즈 기간을 짧게 반복해서 고객이 요구사항 반영 결과를 자주 볼 수 있게 한다.

핵심 가치는 용기, 단순성, 의사소통, 피드백, 존중 다섯 가지다. 개발 프로세스는 아래 순서로 돈다.

1. 릴리즈 계획 수립: 부분 혹은 전체 개발 완료 시점의 일정을 정한다
2. 이터레이션: 실제 개발 작업, 보통 1~3주
3. 승인 검사: 이터레이션 안에서 부분 완료 제품이 구현되면 수행한다
4. 소규모 릴리즈: 요구사항에 유연하게 대응하도록 릴리즈 규모를 줄인다

주요 실천 방법은 아래와 같다.

| 실천 방법 | 내용 |
|---|---|
| 짝 프로그래밍 | 두 사람이 함께 개발하며 책임을 나눠 갖는다 |
| 공동 코드 소유 | 개발 코드에 대한 권한과 책임을 모두가 공유한다 |
| 테스트 주도 개발 (TDD) | 코드를 쓰기 전에 테스트 케이스부터 작성한다 |
| 전체 팀 | 고객을 포함한 모든 구성원이 각자 역할과 책임을 가진다 |
| 지속적 통합 (CI) | 모듈 단위로 개발한 코드를 작업이 끝날 때마다 통합한다 |
| 리팩토링 | 기능은 그대로 두고 구조만 정리해 이해와 수정을 쉽게 한다 |
| 소규모 릴리즈 | 릴리즈 기간을 짧게 반복해 요구 변화에 신속히 대응한다 |

TDD는 시험 문제의 정답지를 먼저 만들어 두고 답안을 쓰는 것과 비슷하다. 무엇을 만들어야 하는지가 코드보다 먼저 정해지는 셈이다.

<br>

### 정리

요구사항이 안정적이고 단계별 승인이 중요하면 폭포수가 맞다. 변화가 잦으면 애자일이, 위험 요소가 크면 나선형이 맞다. 정답은 없으므로 프로젝트 성격을 먼저 보고 모형을 고르는 것이 좋다.
