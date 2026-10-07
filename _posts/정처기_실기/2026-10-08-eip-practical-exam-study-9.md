---
title: "[정처기 실기 공부 #9] 프레임워크와 소프트웨어 품질 표준"
excerpt: "소프트웨어 개발 프레임워크"
categories:
  - 정처기-실기
tags:
  - 정처기
  - 소프트웨어 아키텍처
  - 정보처리기사
  - 실기
  - 제어의 역흐름
  - 의존성 주입
  - ISO/IEC 12207
  - CMMI
  - SPICE
toc: true
toc_sticky: true
series: "정처기-실기"
order: 9
---


# 프레임워크와 소프트웨어 품질 표준

프레임워크를 쓰면 왜 개발이 빨라질까? 공통으로 필요한 뼈대가 이미 만들어져 있기 때문이다. 이번 글은 프레임워크의 구조와 IoC, 그리고 개발 조직의 수준을 재는 국제 표준을 정리한다.

<br>

### 소프트웨어 개발 프레임워크

개발에 공통으로 쓰이는 구성요소와 아키텍처를 일반화해 두고, 필요한 부분만 구현하도록 만든 반제품 형태의 소프트웨어 시스템이다. 선행 사업자의 기술에 종속되지 않는 표준화된 개발 기반이 생긴다는 점도 장점이다.

주요 기능은 예외 처리, 트랜잭션 처리, 메모리 공유, 데이터 소스 관리, 서비스 관리, 쿼리 서비스, 로깅 서비스, 사용자 인증 서비스다.

| 특성 | 내용 |
|---|---|
| 모듈화 | 캡슐화로 모듈화를 강화해 변경의 영향을 줄이고 품질을 높인다 |
| 재사용성 | 재사용 가능한 모듈을 제공해 예산 절감과 생산성 향상이 가능하다 |
| 확장성 | 다형성을 통한 인터페이스 확장으로 다양한 기능의 애플리케이션을 개발한다 |
| 제어의 역흐름 | 개발자가 관리하던 객체의 제어를 프레임워크에 넘긴다 |

대표적인 프레임워크는 아래와 같다.

| 프레임워크 | 설명 |
|---|---|
| 스프링 | 자바 플랫폼용 오픈 소스 경량형 프레임워크. 동적 웹 사이트 개발을 지원한다 |
| 전자정부 프레임워크 | 공공부문 정보화 사업의 개발 표준 프레임워크. 스프링 기반이다 |
| 닷넷 | 마이크로소프트의 Windows 프로그램 개발·실행 환경. CLR이라는 가상머신 위에서 코드를 실행한다 |

<br>

### 제어의 역흐름(IoC)과 의존성 주입(DI)

라이브러리는 내가 호출하고, 프레임워크는 나를 호출한다. 이 차이를 가장 잘 보여 주는 개념이 IoC다. 개발자가 직접 객체를 만들고 생명주기를 통제하는 대신, 그 권한을 프레임워크에 넘기는 원칙을 제어의 역흐름(IoC)이라고 한다. 이걸 구현하려고 외부에서 객체 사이의 의존 관계를 넣어 주는 기술적 메커니즘이 의존성 주입(DI)이다.

<svg viewBox="0 0 680 205" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="전통 방식과 IoC 비교">
<style>svg{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}.t{font-size:12px;fill:#2b2b2b}.h{font-size:13.5px;font-weight:600;fill:#2b2b2b}.g{fill:#f1f1ef;stroke:#9a9a96}.a{fill:#e1f2e6;stroke:#3f8f5a}.c{fill:#fbe4dd;stroke:#c8553d}.ln{stroke:#777;stroke-width:1.2;fill:none}.ah{fill:#777}@media (prefers-color-scheme:dark){.t,.h{fill:#e8e8e6}.g{fill:#2e2e2c;stroke:#8a8a86}.a{fill:#1f3a2a;stroke:#6cc08a}.c{fill:#432a24;stroke:#e68a74}.ln{stroke:#aaa}.ah{fill:#aaa}}</style>
<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10z" class="ah"/></marker></defs>
<rect class="c" x="20" y="16" width="300" height="30" rx="6"/>
<text class="h" x="170" y="36" text-anchor="middle">전통 방식: 개발자가 직접 제어</text>
<rect class="a" x="360" y="16" width="300" height="30" rx="6"/>
<text class="h" x="510" y="36" text-anchor="middle">IoC + DI: 컨테이너가 제어</text>
<rect class="g" x="40" y="76" width="110" height="50" rx="6"/>
<text class="t" x="95" y="105" text-anchor="middle">개발자 코드</text>
<line class="ln" x1="150" y1="101" x2="208" y2="101" marker-end="url(#ar)"/>
<rect class="g" x="210" y="76" width="100" height="50" rx="6"/>
<text class="t" x="260" y="105" text-anchor="middle">객체 B</text>
<text class="t" x="170" y="155" text-anchor="middle">직접 생성하고 생명주기까지 관리</text>
<rect class="g" x="380" y="76" width="130" height="50" rx="6"/>
<text class="t" x="445" y="97" text-anchor="middle">컨테이너</text>
<text class="t" x="445" y="115" text-anchor="middle">(객체 B 생성)</text>
<line class="ln" x1="510" y1="101" x2="548" y2="101" marker-end="url(#ar)"/>
<rect class="g" x="550" y="76" width="100" height="50" rx="6"/>
<text class="t" x="600" y="105" text-anchor="middle">개발자 코드</text>
<text class="t" x="510" y="155" text-anchor="middle">만들어서 필요한 곳에 넣어 준다</text>
<line class="ln" x1="340" y1="60" x2="340" y2="175"/>
<rect class="c" x="20" y="182" width="12" height="12" rx="3"/>
<text class="t" x="38" y="192">결합도 높음</text>
<rect class="a" x="140" y="182" width="12" height="12" rx="3"/>
<text class="t" x="158" y="192">결합도 낮음</text>
</svg>

<br>

### 개발 표준 3가지

개발 과정을 표준화하면 품질이 개인의 능력에만 기대지 않는다. 대표 표준은 ISO/IEC 12207, CMMI, SPICE다.

**ISO/IEC 12207**

ISO에서 만든 표준 소프트웨어 생명주기 프로세스로, 소프트웨어의 개발, 운영, 유지보수를 체계적으로 관리하기 위한 기준이다.

| 구분 | 프로세스 |
|---|---|
| 기본 | 획득, 공급, 개발, 운영, 유지보수 |
| 지원 | 품질 보증, 검증, 확인, 활동 검토, 감사, 문서화, 형상 관리, 문제 해결 |
| 조직 | 관리, 기반 구조, 훈련, 개선 |

**CMMI**

미국 카네기 멜론 대학의 SEI가 개발한 능력 성숙도 통합 모델이다. 소프트웨어 개발 조직의 업무 능력과 성숙도를 평가한다.

| 단계 | 이름 | 특징 |
|---|---|---|
| 1 | 초기 | 정의된 프로세스가 없고 작업자 능력에 따라 성패가 갈린다 |
| 2 | 관리 | 프로젝트 단위로 프로세스를 정의하고 수행한다 |
| 3 | 정의 | 조직의 표준 프로세스를 활용한다 |
| 4 | 정량적 관리 | 프로젝트를 정량적으로 관리하고 통제한다 |
| 5 | 최적화 | 프로세스를 지속적으로 개선한다 |

**SPICE (ISO/IEC 15504)**

정보 시스템 분야의 소프트웨어 품질과 생산성 향상을 위한 프로세스 평가 및 개선 국제 표준이다. 프로세스 수행 능력은 0단계부터 시작하므로 주의해야 한다.

| 수준 | 이름 | 의미 |
|---|---|---|
| 0 | 불완전 | 프로세스가 구현되지 않았거나 목적을 달성하지 못했다 |
| 1 | 수행 | 프로세스가 수행되고 목적이 달성됐다 |
| 2 | 관리 | 정의된 자원 한도 안에서 작업 산출물을 인도한다 |
| 3 | 확립 | 소프트웨어 공학 원칙에 기반한 프로세스가 수행된다 |
| 4 | 예측 | 정량적 측정으로 일관되게 수행된다 |
| 5 | 최적화 | 지속적 개선으로 업무 목적을 만족한다 |

<br>

### 정리

CMMI는 1부터 5까지, SPICE는 0부터 5까지라는 차이가 가장 자주 나오는 함정이다. 두 표준 모두 "조직이 얼마나 체계적으로 일하는가"를 묻는다는 점을 먼저 기억하는 것이 좋다.
