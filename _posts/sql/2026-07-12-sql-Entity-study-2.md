---
title: " [SQLD 단권화 #2] 엔터티·속성·관계·식별자"
excerpt: "모델의 4대 부품"
categories: [sql]
order: 2
tags:
  - SQP
toc: true
toc_sticky: true
--- 

# 2. 엔터티·속성·관계·식별자 — 데이터 모델의 4대 부품

> SQLD 1과목 1장 후반부 — 엔터티, 속성, 관계, 식별자

데이터 모델은 결국 부품 조립이다. **엔터티**라는 상자에 **속성**을 채우고, 상자끼리 **관계**로 연결하고, 각 상자 안의 데이터를 **식별자**로 구분한다. 이 네 가지가 이번 편의 전부다.

---

## 1. 엔터티 (Entity)

**엔터티** = 업무에 필요하고 유용한 정보를 저장·관리하기 위한 집합적 실체. DB에서는 **테이블**로 구현된다.

### 엔터티의 6가지 특징 (조건 문제로 출제)

1. 반드시 **업무에서 필요**하고 관리할 가치가 있어야 한다
2. **유일한 식별자**로 식별 가능해야 한다 (예: 학번, 사번)
3. **인스턴스(행)를 2개 이상** 포함해야 한다 ![star]
4. 실제 **업무 프로세스에 활용**되어야 한다 
5. 반드시 **속성**을 가져야 한다 (**2개 이상**) ![star]
6. 다른 엔터티와 **최소 1개 이상의 관계**가 있어야 한다

> "인스턴스가 1개뿐인 것도 엔터티인가?" → 아니다. 2개 이상이어야 한다. 함정 선지로 자주 나온다.

### 엔터티의 분류

**유무형에 따라:**

| 분류 | 설명 | 예시 |
| --- | --- | --- |
| **유형 엔터티** | 물리적 형태가 있음 | 학생, 사원, 강사, 챡, 고객 |
| **개념 엔터티** | 개념적인 정보 | 과목, 학과, 조직, 보험상품 |
| **사건 엔터티** | 업무 수행에 따라 발생 | 수강, 주문, 청구, 예약 |

**발생시점에 따라:**

| 분류 | 설명 | 예시 |
| --- | --- | --- |
| **기본 엔터티** | 독립적으로 생성 가능 | 학생, 고객, 상품 |
| **중심 엔터티** | 기본 엔터티로부터 생성 | 수강신청, 계약, 주문 |
| **행위 엔터티** | 두개 이상 엔터티 간의 행위로 생성 | 수강, 주문목록, 사원변경이력 |

### 엔터티 명명 규칙

- 현업 용어 사용, 약어 지양, **단수 명사** 사용
- 모든 엔터티에서 **유일한 이름** (엔터티 이름은 DB 안에서 식별자 역할을 한다)
- 표기 방식: **CamelCase**(CustomerOrder), **SnakeCase**(customer_order)

---

## 2. 속성 (Attribute)

**속성** = 업무에서 필요로 하는 **최소한의 데이터 단위**, 더 이상 쪼갤 수 없는 정보 원자.

### 속성의 특성

- 업무에서 필요하고 관리해야 할 정보여야 한다
- **주식별자에 함수적으로 종속**되어야 한다 (정규화 이론과 연결)
- **하나의 속성은 하나의 값만** 가진다 (단일값 원칙 → 1정규형의 근거)
- **도메인**: 속성이 가질 수 있는 값의 범위. 데이터의 타입과 크기에 대한 제한사항 정의(데이터 무결성-Data Integrity)

### 속성의 분류

**특성에 따라:**

| 분류 | 설명 | 예시 |
| --- | --- | --- |
| **기본 속성** | 업무 분석에서 바로 정의됨 | 상품이름 |
| **설계 속성** | DB 설계 과정에서 도출됨 | 예금분류코드 |
| **파생 속성** | 다른 속성에서 계산·변형으로 생성 | 이자 |

**엔터티 내 역할에 따라:**

- **PK 속성**: 엔터티를 식별하는 속성
- **FK 속성**: 다른 엔터티와의 관계에서 들어온 속성
- **일반 속성**: PK도 FK도 아닌 속성

---

## 3. 관계 (Relationship)

**관계** = 엔터티의 인스턴스 간에 논리적 연관성을 가지는 형태나 행위.

### 관계의 표현

2개의 엔터티 사이 관계는 **2개의 관계명**을 가진다 (양방향 명명).

> 고객은 주문을 *생성한다* / 주문은 고객에 의해 *생성된다*

### 관계의 분류

**종류:**
- **존재에 의한 관계**: 항상 존재 (사원은 부서에 *속한다*)
- **행위에 의한 관계**: 특정 행위로 발생 (고객이 상품을 *구매한다*)

>**존재에 의한 관계**: 사원 - 부서 (사원이 부서에 '속해 있다'는 상태)
>
>**행위에 의한 관계**: 고객 - 주문 (고객이 주문을 '하는' 행위)
>
> "사원이 부서에 속하는 것은 행위에 의한 관계이다." ➡️ (X) 존재에 의한 관계

**카디널리티(참여자 수):**
- **1:1** — 양쪽 인스턴스가 1:1 대응
- **1:M** — 한쪽 인스턴스가 여러 인스턴스와 관계
- **N:M** — 다대다 관계

**선택성:**
- **필수적 관계**: 반드시 관계를 가짐 → **실선**
- **선택적 관계**: 있을 수도, 없을 수도 → **점선**

### 관계명 표기 규칙

- **현재형 동사** 사용
- 참여자 관점에서 **능동적**으로 명명
- **양방향**(능동/수동)으로 명명

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 760" width="100%" height="100%" style="background-color: #ffffff; font-family: 'Malgun Gothic', 'Noto Sans KR', sans-serif;">
  
  <!-- Outer Frame -->
  <rect x="15" y="15" width="790" height="730" fill="none" stroke="#333333" stroke-width="1.5" rx="4"/>

  <!-- ==================== 1:1 Relationship ==================== -->
  <g id="section-1-1">
    <text x="35" y="45" font-size="16" font-weight="bold" fill="#111827">[1:1 관계]</text>
    
    <!-- Entity: 고객 -->
    <rect x="45" y="65" width="190" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="45" y="65" width="190" height="32" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="140" y="86" font-size="15" font-weight="bold" text-anchor="middle" fill="#111827">고객</text>
    <text x="60" y="118" font-size="13" fill="#374151">고객ID</text>
    <text x="60" y="140" font-size="13" fill="#374151">이름</text>
    <text x="60" y="162" font-size="13" fill="#374151">전화번호</text>
    <line x1="45" y1="124" x2="235" y2="124" stroke="#e5e7eb" stroke-width="1"/>

    <!-- Entity: 장바구니 -->
    <rect x="585" y="65" width="190" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="585" y="65" width="190" height="32" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="680" y="86" font-size="15" font-weight="bold" text-anchor="middle" fill="#111827">장바구니</text>
    <text x="600" y="118" font-size="13" fill="#374151">장바구니ID</text>
    <text x="600" y="140" font-size="13" fill="#374151">고객ID</text>
    <text x="600" y="162" font-size="13" fill="#374151">생성일자</text>
    <line x1="585" y1="124" x2="775" y2="124" stroke="#e5e7eb" stroke-width="1"/>

    <!-- Line & Cardinality -->
    <line x1="235" y1="120" x2="585" y2="120" stroke="#111827" stroke-width="1.5"/>
    <!-- 1 mandatory left -->
    <line x1="250" y1="110" x2="250" y2="130" stroke="#111827" stroke-width="1.5"/>
    <!-- 1 mandatory right -->
    <line x1="570" y1="110" x2="570" y2="130" stroke="#111827" stroke-width="1.5"/>

    <!-- Relationship Text -->
    <rect x="365" y="105" width="90" height="30" fill="#ffffff"/>
    <text x="410" y="125" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">보유한다</text>
  </g>


  <!-- ==================== 1:M Relationship ==================== -->
  <g id="section-1-m">
    <text x="35" y="280" font-size="16" font-weight="bold" fill="#111827">[1:M 관계]</text>
    
    <!-- Entity: 고객 -->
    <rect x="45" y="300" width="190" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="45" y="300" width="190" height="32" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="140" y="321" font-size="15" font-weight="bold" text-anchor="middle" fill="#111827">고객</text>
    <text x="60" y="353" font-size="13" fill="#374151">고객ID</text>
    <text x="60" y="375" font-size="13" fill="#374151">이름</text>
    <text x="60" y="397" font-size="13" fill="#374151">전화번호</text>
    <line x1="45" y1="359" x2="235" y2="359" stroke="#e5e7eb" stroke-width="1"/>

    <!-- Entity: 주문 -->
    <rect x="585" y="300" width="190" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="585" y="300" width="190" height="32" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="680" y="321" font-size="15" font-weight="bold" text-anchor="middle" fill="#111827">주문</text>
    <text x="600" y="353" font-size="13" fill="#374151">주문번호</text>
    <text x="600" y="375" font-size="13" fill="#374151">고객ID</text>
    <text x="600" y="397" font-size="13" fill="#374151">주문일자</text>
    <line x1="585" y1="359" x2="775" y2="359" stroke="#e5e7eb" stroke-width="1"/>

    <!-- Line & Cardinality -->
    <line x1="235" y1="355" x2="585" y2="355" stroke="#111827" stroke-width="1.5"/>
    <!-- 1 mandatory left -->
    <line x1="250" y1="345" x2="250" y2="365" stroke="#111827" stroke-width="1.5"/>
    <!-- M optional right (Circle + Crow's foot) -->
    <circle cx="550" cy="355" r="6" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <path d="M 585 355 L 560 343 M 585 355 L 560 367" stroke="#111827" stroke-width="1.5"/>

    <!-- Relationship Text -->
    <rect x="365" y="340" width="90" height="30" fill="#ffffff"/>
    <text x="410" y="360" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">주문한다</text>
  </g>


  <!-- ==================== M:N Relationship ==================== -->
  <g id="section-m-n">
    <text x="35" y="515" font-size="16" font-weight="bold" fill="#111827">[M:N 관계]</text>
    
    <!-- Entity: 고객 -->
    <rect x="45" y="535" width="190" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="45" y="535" width="190" height="32" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="140" y="556" font-size="15" font-weight="bold" text-anchor="middle" fill="#111827">고객</text>
    <text x="60" y="588" font-size="13" fill="#374151">고객ID</text>
    <text x="60" y="610" font-size="13" fill="#374151">이름</text>
    <text x="60" y="632" font-size="13" fill="#374151">전화번호</text>
    <line x1="45" y1="594" x2="235" y2="594" stroke="#e5e7eb" stroke-width="1"/>

    <!-- Entity: 상품 -->
    <rect x="585" y="535" width="190" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="585" y="535" width="190" height="32" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="680" y="556" font-size="15" font-weight="bold" text-anchor="middle" fill="#111827">상품</text>
    <text x="600" y="588" font-size="13" fill="#374151">상품코드</text>
    <text x="600" y="610" font-size="13" fill="#374151">상품명</text>
    <text x="600" y="632" font-size="13" fill="#374151">판매가격</text>
    <line x1="585" y1="594" x2="775" y2="594" stroke="#e5e7eb" stroke-width="1"/>

    <!-- Line & Cardinality -->
    <line x1="235" y1="590" x2="585" y2="590" stroke="#111827" stroke-width="1.5"/>
    <!-- M optional left -->
    <circle cx="270" cy="590" r="6" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <path d="M 235 590 L 260 578 M 235 590 L 260 602" stroke="#111827" stroke-width="1.5"/>
    <!-- N optional right -->
    <circle cx="550" cy="590" r="6" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <path d="M 585 590 L 560 578 M 585 590 L 560 602" stroke="#111827" stroke-width="1.5"/>

    <!-- Relationship Text -->
    <rect x="365" y="575" width="90" height="30" fill="#ffffff"/>
    <text x="410" y="595" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">찜한다</text>
  </g>


  <!-- ==================== Annotations & Callouts ==================== -->
  <!-- Relationship Label Pointer -->
  <text x="410" y="220" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">관계명</text>
  <path d="M 410 200 L 410 145" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3"/>
  <path d="M 410 230 L 410 335" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3"/>
  
  <polygon points="406,145 410,137 414,145" fill="#dc2626"/>
  <polygon points="406,335 410,343 414,335" fill="#dc2626"/>

  <!-- Optional Participation Label Pointer -->
  <text x="410" y="475" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">선택적 참여 (O)</text>
  <!-- Pointer to 1:M optional circle -->
  <path d="M 465 465 L 545 365" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3"/>
  <polygon points="540,363 547,362 546,370" fill="#dc2626"/>
  <!-- Pointer to M:N optional circle -->
  <path d="M 465 480 L 545 580" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3"/>
  <polygon points="546,575 547,583 540,582" fill="#dc2626"/>
</svg>


---

## 4. 식별자 (Identifier)

**식별자** = 엔터티 안에서 각 인스턴스를 구별해주는 속성(또는 속성 조합). 

용어 구분: **논리 모델링에서는 '식별자', 물리 모델링에서는 '키(Key)'** 라고 부른다.

### 식별자의 4가지 특성 (단골 출제)

| 특성 | 의미 |
| --- | --- |
| **유일성** | 인스턴스를 유일하게 구분 |
| **대표성** | 엔터티를 대표할 수 있는 속성이어야 함 |
| **최소성** | 필요 최소한의 속성으로 구성 |
| **불변성** | 값이 변하지 않아야 함 |
| **존재성** | 반드시 값이 존재 (**NULL 불가**) |

### 식별자의 분류 — 4가지 기준

| 기준 | 분류 | 예시 |
| --- | --- | --- |
| 대표성 | **주식별자** / 보조식별자 | 사원번호 / 주민등록번호 |
| 생성 방식 | 내부식별자 / **외부식별자** | 고객번호 / 주문 테이블 안의 고객번호 |
| 속성 수 | 단일식별자 / **복합식별자** | 고객번호 / 주문번호+상세순번 |
| 대체 가능성 | **본질식별자** / **인조식별자** | 주민등록번호 / 시퀀스 일련번호 |

> 본질 vs 인조 식별자는 함정이 많아서 4편에서 따로 자세히 다룬다.

### 식별자 도출 기준

- 업무에서 **자주 사용되는** 속성 우선
- 명칭·내역 같은 **서술형 속성은 지양**
- **속성 수가 적은** 것 우선
- **변경 가능성이 적은** 속성 우선

---

## 5. 식별자 관계 vs 비식별자 관계

부모의 주식별자가 자식에게 **어떻게 넘어가느냐**의 문제다.

| 구분 | 식별자 관계 | 비식별자 관계 |
| --- | --- | --- |
| 부모 PK가 자식의 | **주식별자(PK)에 포함** | **일반 속성**으로 포함 |
| ERD 표시 | **실선** | **점선** |
| 자식의 존재 | 부모에 **종속적** | 부모 없이도 **독립 가능** |

>실선(식별자): "너 없으면 나 주식별자(PK) 설정 못 해!" -> 운명공동체(실선)
>점선(비식별자): "너는 그냥 참고용 일반 속성일 뿐, 내 PK는 따로 있어!" -> 느슨한 관계(점선)

### 어떤 관계를 선택할까?

- 자식이 부모 없이 독립적으로 존재 가능 → **비식별자 관계**
- 자식의 존재가 부모에 종속적 → **식별자 관계**
- 복합식별자가 너무 많아지면 → **비식별자 관계** 고려
- 객체 재사용이 필요하면 → **비식별자 관계** 고려

식별자 관계만 계속 쓰면 부모 PK가 자식→손자로 계속 전이(상속)되면서 PK가 눈덩이처럼 불어난다. 그래서 실무에서는 적절히 비식별자 관계를 섞는다.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 380" width="100%" height="100%" style="background-color: #ffffff; font-family: 'Malgun Gothic', 'Noto Sans KR', sans-serif;">
  
  <!-- Outer Frame -->
  <rect x="15" y="15" width="790" height="350" fill="none" stroke="#333333" stroke-width="1.5" rx="4"/>

  <!-- ==================== 식별자 관계 ==================== -->
  <g id="identifying-relationship">
    <text x="35" y="48" font-size="16" font-weight="bold" fill="#1d4ed8">[식별자 관계] - 실선</text>
    
    <!-- Parent Entity: 주문 -->
    <rect x="40" y="70" width="150" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="40" y="70" width="150" height="28" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="115" y="89" font-size="14" font-weight="bold" text-anchor="middle" fill="#111827">주문</text>
    
    <!-- Red Box on Parent PK -->
    <rect x="48" y="103" width="56" height="20" fill="none" stroke="#dc2626" stroke-width="1.5"/>
    <text x="52" y="117" font-size="13" font-weight="bold" fill="#dc2626">주문번호</text>
    
    <line x1="40" y1="128" x2="190" y2="128" stroke="#111827" stroke-width="1.2"/>
    <text x="52" y="146" font-size="12" fill="#4b5563">주문일자</text>
    <text x="52" y="166" font-size="12" fill="#4b5563">결제금액</text>

    <!-- Child Entity: 주문상세 -->
    <rect x="235" y="70" width="150" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="235" y="70" width="150" height="28" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="310" y="89" font-size="14" font-weight="bold" text-anchor="middle" fill="#111827">주문상세</text>
    
    <!-- Red Box on Child PK (FK included in PK section) -->
    <rect x="243" y="102" width="80" height="20" fill="none" stroke="#dc2626" stroke-width="1.5"/>
    <text x="247" y="116" font-size="12" font-weight="bold" fill="#dc2626">주문번호(FK)</text>
    <text x="247" y="132" font-size="12" fill="#111827">상품코드</text>

    <line x1="235" y1="138" x2="385" y2="138" stroke="#111827" stroke-width="1.2"/>
    <text x="247" y="156" font-size="12" fill="#4b5563">주문수량</text>

    <!-- Solid Relationship Line -->
    <line x1="190" y1="120" x2="235" y2="120" stroke="#111827" stroke-width="1.8"/>
    <line x1="198" y1="112" x2="198" y2="128" stroke="#111827" stroke-width="1.8"/>
    <!-- Crow's foot right -->
    <path d="M 235 120 L 220 112 M 235 120 L 220 128" stroke="#111827" stroke-width="1.8"/>

    <!-- Description -->
    <text x="40" y="210" font-size="12" fill="#1e40af" font-weight="bold">✔ 부모 PK가 자식의 [PK 영역]으로 들어감</text>
    <text x="40" y="230" font-size="12" fill="#4b5563">✔ 부모 없이는 자식이 존재할 수 없음 (강한 결합)</text>
  </g>

  <!-- Section Separator Line -->
  <line x1="405" y1="35" x2="405" y2="345" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="4,4"/>

  <!-- ==================== 비식별자 관계 ==================== -->
  <g id="non-identifying-relationship">
    <text x="425" y="48" font-size="16" font-weight="bold" fill="#4b5563">[비식별자 관계] - 점선</text>

    <!-- Parent Entity: 고객 -->
    <rect x="430" y="70" width="150" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="430" y="70" width="150" height="28" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="505" y="89" font-size="14" font-weight="bold" text-anchor="middle" fill="#111827">고객</text>
    
    <!-- Red Box on Parent PK -->
    <rect x="438" y="103" width="48" height="20" fill="none" stroke="#dc2626" stroke-width="1.5"/>
    <text x="442" y="117" font-size="13" font-weight="bold" fill="#dc2626">고객ID</text>

    <line x1="430" y1="128" x2="580" y2="128" stroke="#111827" stroke-width="1.2"/>
    <text x="442" y="146" font-size="12" fill="#4b5563">이름</text>
    <text x="442" y="166" font-size="12" fill="#4b5563">전화번호</text>

    <!-- Child Entity: 주문 -->
    <rect x="625" y="70" width="150" height="110" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <rect x="625" y="70" width="150" height="28" fill="#f3f4f6" stroke="#111827" stroke-width="1.5"/>
    <text x="700" y="89" font-size="14" font-weight="bold" text-anchor="middle" fill="#111827">주문</text>
    
    <text x="637" y="117" font-size="13" font-weight="bold" fill="#111827">주문번호</text>
    <line x1="625" y1="128" x2="775" y2="128" stroke="#111827" stroke-width="1.2"/>
    
    <!-- Red Box on Child Normal Attribute (FK area) -->
    <rect x="633" y="133" width="68" height="20" fill="none" stroke="#dc2626" stroke-width="1.5"/>
    <text x="637" y="147" font-size="12" font-weight="bold" fill="#dc2626">고객ID(FK)</text>
    <text x="637" y="166" font-size="12" fill="#4b5563">주문일자</text>

    <!-- Dashed Relationship Line -->
    <line x1="580" y1="120" x2="625" y2="120" stroke="#111827" stroke-width="1.8" stroke-dasharray="5,4"/>
    <line x1="588" y1="112" x2="588" y2="128" stroke="#111827" stroke-width="1.8"/>
    <!-- Optional Circle + Crow's foot right -->
    <circle cx="612" cy="120" r="4" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>
    <path d="M 625 120 L 615 112 M 625 120 L 615 128" stroke="#111827" stroke-width="1.8"/>

    <!-- Description -->
    <text x="430" y="210" font-size="12" fill="#374151" font-weight="bold">✔ 부모 PK가 자식의 [일반 속성 영역]으로 들어감</text>
    <text x="430" y="230" font-size="12" fill="#4b5563">✔ 자식이 독립적인 PK를 가지며 느슨하게 연결됨</text>
  </g>

  <!-- Bottom Comparison Table -->
  <g id="comparison-footer">
    <rect x="35" y="260" font-size="12" width="750" height="85" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1" rx="4"/>
    <text x="50" y="285" font-size="13" font-weight="bold" fill="#111827">💡 시험 단골 암기 포인트</text>
    <text x="50" y="308" font-size="12" fill="#1f2937">• <tspan font-weight="bold" fill="#1d4ed8">식별자 관계:</tspan> 실선 표기 / 자식의 PK에 포함 / 상속받은 키가 없으면 자식 행 생성 불가</text>
    <text x="50" y="328" font-size="12" fill="#1f2937">• <tspan font-weight="bold" fill="#4b5563">비식별자 관계:</tspan> 점선 표기 / 자식의 일반 속성에 포함 / 부모 연결 없이도 독자적인 PK 존재</text>
  </g>

</svg>


---

## 정리 한 장

1. **엔터티**는 업무에 필요한 정보 집합. 식별자·속성·관계·인스턴스 2개 이상이 필수 조건
2. 엔터티 분류: 유형/개념/사건, 기본/중심/행위
3. **속성**은 최소 데이터 단위. 기본/설계/파생, PK/FK/일반으로 분류
4. **관계**는 1:1, 1:M, N:M 카디널리티 + 필수(실선)/선택(점선) 참여
5. **식별자**의 특성은 유일성·최소성·불변성·존재성
6. **식별자 관계 = 실선 = 부모 PK가 자식 PK로**, **비식별자 관계 = 점선 = 부모 PK가 자식 일반 속성으로**

다음 편은 1과목의 최대 출제 포인트, **정규화와 반정규화**다.

  : /assets/images/star.png#blog-star-emoji "star"

