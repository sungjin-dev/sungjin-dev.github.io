---
title: "[정보처리기사 필기]  애플리케이션 성능 개선 & 인터페이스 구현 정리"
excerpt: "알고리즘부터 정렬, 코드 품질, 인터페이스 구현·보안까지"
categories:
  - 정처기
tags:
  - 알고리즘
  - 해싱 함수
  - 검색 알고리즘
  - 정렬 알고리즘
  - 클린 코드
  - 맥케이브
toc: true
toc_sticky: true
---

## 1. 알고리즘

### 1-1. 알고리즘 개념

알고리즘은 어떠한 문제를 해결하기 위한 **정해진 일련의 절차나 방법을 공식화한 형태로 표현한 기법**이다.

표현 방법은 자연어, 순서도, **의사 코드**, 프로그래밍 언어 등이 있다. 즉, 프로그래밍 언어가 아니어도 알고리즘 표현은 가능하다.

### 1-2. 알고리즘 특성 5가지

| 특성 | 설명 |
|---|---|
| 입력 | 외부로부터 입력되는 자료가 **0개 이상** |
| 출력 | 출력되는 결과가 **1개 이상** |
| 명확성 | 각 명령어의 의미가 명확 |
| 유한성 | 정해진 단계를 지나면 종료 |
| 유효성 | 모든 명령은 실행 가능한 연산이어야 함 |

> ![star] 암기 팁: **입출명유유** — 입력은 0개 이상, 출력은 1개 이상이라는 숫자 차이가 자주 출제된다.

### 1-3. 알고리즘 설계 기법 ![star] 자주 출제

```mermaid
%%{init: {'theme': 'neutral'}}%%
mindmap
  root((알고리즘<br/>설계 기법))
    분할과 정복
      더 나눌 수 없을 때까지 분할
      각각 해결 후 병합
    동적 계획법
      작은 문제의 연장선으로 접근
      과거에 구한 해를 재활용
    탐욕법
      매 순간 최선의 선택
      최종 해답에 도달
    백트래킹
      노드 유망성 점검
      유망하지 않으면 부모로 회귀
```

| 기법 | 설명 |
|---|---|
| 분할과 정복 (Divide and Conquer) | 문제를 나눌 수 없을 때까지 나누고, 각각을 풀면서 다시 병합하여 답을 얻는다 |
| 동적 계획법 (Dynamic Programming) | 문제를 더 작은 문제의 연장선으로 생각하고, 과거에 구한 해를 활용한다 |
| 탐욕법 (Greedy) | 결정해야 할 때마다 그 순간 가장 좋다고 생각되는 것을 선택해 최종 해답에 도달한다 |
| 백트래킹 (Backtracking) | 노드의 유망성을 점검한 후, 유망하지 않으면 부모 노드로 되돌아가 다른 자손 노드를 검색한다 |

### 1-4. 시간 복잡도에 따른 알고리즘 분류 ![star] 자주 출제

```mermaid
graph LR
    A["O(1)<br/>상수형"] --> B["O(log₂n)<br/>로그형"]
    B --> C["O(n)<br/>선형"]
    C --> D["O(nlog₂n)<br/>선형 로그형"]
    D --> E["O(n²)<br/>제곱형"]
    style A fill:#d4edda
    style B fill:#d1ecf1
    style C fill:#fff3cd
    style D fill:#ffe5d0
    style E fill:#f8d7da
```

왼쪽으로 갈수록 빠르고, 오른쪽으로 갈수록 느리다.

| 복잡도 | 설명 | 대표 알고리즘 |
|---|---|---|
| O(1) | 자료 크기와 무관하게 항상 같은 속도로 작동 | 해시 함수 |
| O(log₂n) | 해결 단계 수가 log₂n번만큼의 수행 시간 | 이진 탐색 |
| O(n) | 입력 자료를 차례로 하나씩 모두 처리, 자료 크기와 정비례 | 순차 탐색 |
| O(nlog₂n) | 해결 단계 수가 nlog₂n번만큼의 수행 시간 | 퀵 정렬, 합병 정렬, 힙 정렬 |
| O(n²) | 주요 처리 루프 구조가 2중인 경우 | 거품 정렬, 삽입 정렬, 선택 정렬 |

> ![star] n이 작을 때는 n²이 nlog₂n보다 빠를 수도 있다는 점도 함께 기억하자.

---

## 2. 해싱 함수

### 2-1. 해싱 함수 개념

해싱 함수(해시 함수)는 **데이터를 키로 변환하는 함수**다. 길고 복잡한 문자열을 짧고 단순한 문자열(또는 수열)로 변경한다.

정확히는 **임의의 길이의 데이터를 고정된 길이의 데이터로 매핑**하는 함수다.

### 2-2. 해싱 함수 종류 ![star] 자주 출제

| 기법 | 설명 |
|---|---|
| 제산법 (Division) | 나머지 연산자(%)를 사용하여 테이블 주소를 계산 |
| 제곱법 (Mid Square) | 레코드 키값을 제곱한 후 결괏값의 **중간 부분** 몇 비트를 선택해 홈 주소로 사용 |
| 숫자 분석법 (Digit Analysis) | 키를 구성하는 수들의 자리별 분포를 조사해 고른 분포의 자릿수를 선택 |
| 폴딩법 (Folding) | 키를 여러 부분으로 나누고, 각 부분을 더하거나 XOR한 값을 홈 주소로 사용 |
| 기수 변환법 (Radix Conversion) | 키를 다른 진법으로 간주하고 변환하여 홈 주소를 얻음 (예: 16진수 → 10진수 간주) |
| 무작위 방법 (Random) | 난수를 발생시켜 각 레코드 키의 홈 주소를 결정 |

해싱 함수 선택 시 고려사항: **계산과정의 단순화, 충돌의 최소화, 기억장소 낭비의 최소화, 오버플로우 최소화**

---

## 3. 검색 알고리즘

### 3-1. 순차 검색 (Sequential Search)

배열의 처음부터 끝까지 **차례대로 비교**하여 원하는 데이터를 찾는 알고리즘이다.

- 리스트가 길면 비효율적
- 하지만 가장 단순해서 구현이 쉽고, **정렬되지 않은 리스트에서도 사용 가능**

```mermaid
flowchart LR
    A[92] --> B[100] --> C[215] --> D[...] --> E[901 발견!]
    style E fill:#d4edda
```

**예제**: 11개 데이터 `92, 100, 215, 341, 625, 716, 812, 813, 820, 901, 902`에서 901 찾기
→ 첫 번째부터 하나씩 비교, **10번 시도**에 발견.

### 3-2. 이진 검색 (Binary Search) ![star] 자주 출제

**정렬된 리스트**에서 탐색 범위를 **절반씩 좁혀가며** 데이터를 탐색하는 알고리즘이다. 탐색 효율이 높고 시간이 적게 든다.

**가운데 레코드 번호 공식** (소수점은 버림):

$$M = \left[\frac{F+L}{2}\right]$$

- F: 남은 범위 내 첫 번째 레코드 번호
- L: 남은 범위 내 마지막 레코드 번호
- M: 남은 범위 내 가운데 레코드 번호

**예제**: 위와 같은 11개 데이터에서 901 찾기

```mermaid
flowchart TD
    A["1차 시도: M = (1+11)/2 = 6<br/>6번째 값 716 확인"] -->|"901 > 716<br/>오른쪽 절반으로"| B["2차 시도: M = (7+11)/2 = 9<br/>9번째 값 820 확인"]
    B -->|"901 > 820<br/>오른쪽 절반으로"| C["3차 시도: M = (10+11)/2 = 10.5 → 10<br/>10번째 값 901 확인"]
    C --> D["✅ 901 발견! 종료"]
    style D fill:#d4edda
```

순차 검색은 10번, 이진 검색은 **3번** 만에 찾았다. 이게 O(n)과 O(log₂n)의 차이다.

---

## 4. 정렬 알고리즘

### 4-1. 정렬 알고리즘 한눈에 비교

| 정렬 | 최적 | 평균 | 최악 | 핵심 키워드 |
|---|---|---|---|---|
| 퀵 정렬 | O(nlog₂n) | O(nlog₂n) | **O(n²)** | 피벗 |
| 합병 정렬 | O(nlog₂n) | O(nlog₂n) | O(nlog₂n) | 분할 후 병합 |
| 힙 정렬 | O(nlog₂n) | O(nlog₂n) | O(nlog₂n) | 완전이진트리 |
| 거품 정렬 | O(n²) | O(n²) | O(n²) | 인접 원소 교환 |
| 삽입 정렬 | **O(n)** | O(n²) | O(n²) | 정렬된 부분에 삽입 |
| 선택 정렬 | O(n²) | O(n²) | O(n²) | 최솟값 선택 후 교환 |

> ![star] 퀵 정렬만 최악이 O(n²), 삽입 정렬만 최적이 O(n)이라는 예외를 기억하자.

### 4-2. 퀵 정렬 (Quick Sort)

**피벗**을 두고 피벗의 왼쪽에는 작은 값, 오른쪽에는 큰 값을 두는 과정을 반복하는 알고리즘이다. 레코드의 많은 자료 이동을 없애고 하나의 파일을 부분적으로 나누어 가면서 정렬한다.

```mermaid
flowchart TD
    A["[3, 1, 5, 피벗:4, 2]"] --> B["작은 값 왼쪽<br/>[3, 1, 2]"]
    A --> C["피벗<br/>[4]"]
    A --> D["큰 값 오른쪽<br/>[5]"]
    B --> E[각 부분에서 재귀 반복]
    D --> E
```

### 4-3. 합병 정렬 (Merge Sort)

전체 원소를 **하나의 단위로 분할**한 후, 분할한 원소를 다시 **합병**해서 정렬하는 알고리즘이다.

```mermaid
flowchart TD
    A["[4, 2, 3, 1]"] --> B["[4, 2]"]
    A --> C["[3, 1]"]
    B --> D["[4]"]
    B --> E["[2]"]
    C --> F["[3]"]
    C --> G["[1]"]
    D --> H["병합 [2, 4]"]
    E --> H
    F --> I["병합 [1, 3]"]
    G --> I
    H --> J["최종 병합 [1, 2, 3, 4]"]
    I --> J
    style J fill:#d4edda
```

### 4-4. 힙 정렬 (Heap Sort)

정렬할 입력 레코드들로 **힙을 구성**하고, 가장 큰 키값을 갖는 **루트 노드를 제거하는 과정을 반복**하여 정렬하는 알고리즘이다.

**완전이진트리(Complete Binary Tree)**로 입력 자료의 레코드를 구성한다.

### 4-5. 거품 정렬 (Bubble Sort) ![star] 자주 출제

**인접한 2개의 레코드 키값을 비교**하여 크기에 따라 위치를 서로 교환하는 알고리즘이다. 교환 과정이 거품 모양 같다고 해서 이런 이름이 붙었다.

한 PASS를 수행할 때마다 **가장 큰 값이 맨 뒤로 이동**하므로, PASS를 `요소의 개수 - 1`번 수행하면 정렬이 완료된다.

**예제**: `4, 2, 3, 5, 1` 오름차순 정렬

```mermaid
flowchart TD
    S["시작: 4 2 3 5 1"] --> P1["PASS 1: 2 3 4 1 [5]<br/>가장 큰 값 5가 맨 뒤로"]
    P1 --> P2["PASS 2: 2 3 1 [4 5]<br/>두 번째 큰 값 4 확정"]
    P2 --> P3["PASS 3: 2 1 [3 4 5]<br/>세 번째 큰 값 3 확정"]
    P3 --> P4["PASS 4: 1 [2 3 4 5]<br/>정렬 완료"]
    style P4 fill:#d4edda
```

원소가 5개면 PASS 4까지만 돌면 된다. 나머지 1개는 자동으로 맨 앞에 위치하기 때문에 PASS 5는 필요 없다.

### 4-6. 삽입 정렬 (Insertion Sort)

n번째 키를 **앞의 (n-1)개 키와 비교**하여 알맞은 순서에 **삽입**하는 알고리즘이다. 모든 요소를 앞에서부터 이미 정렬된 배열 부분과 비교하여 자신의 위치를 찾아 삽입한다.

**예제**: `4, 2, 3, 5, 1` 오름차순 정렬

| 단계 | 상태 | 설명 |
|---|---|---|
| 시작 | `[4]` 2 3 5 1 | 4는 정렬되었다고 가정 |
| PASS 1 | `[2 4]` 3 5 1 | 2를 {4}에 삽입 |
| PASS 2 | `[2 3 4]` 5 1 | 3을 {2, 4}에 삽입 |
| PASS 3 | `[2 3 4 5]` 1 | 5를 {2, 3, 4}에 삽입 |
| PASS 4 | `[1 2 3 4 5]` | 1을 {2, 3, 4, 5}에 삽입 → 완료 |

### 4-7. 선택 정렬 (Selection Sort)

정렬되지 않은 데이터 중 **가장 작은 데이터를 찾아** 정렬되지 않은 부분의 **가장 앞 데이터와 교환**해 나가는 알고리즘이다.

**예제**: `4, 2, 3, 5, 1` 오름차순 정렬

| 단계 | 상태 | 설명 |
|---|---|---|
| PASS 1 | `[1]` 2 3 5 4 | 최솟값 1과 첫 요소 4 교환 |
| PASS 2 | `[1 2]` 3 5 4 | 최솟값 2는 이미 제자리 |
| PASS 3 | `[1 2 3]` 5 4 | 최솟값 3은 이미 제자리 |
| PASS 4 | `[1 2 3 4]` 5 | 최솟값 4와 5 교환 → 완료 |

> ![star] 거품·삽입·선택 정렬의 차이를 예제 흐름으로 구분해서 기억하자. 거품은 "인접 비교", 삽입은 "정렬된 부분에 끼워넣기", 선택은 "최솟값 찾아 교환"이다.

---

## 5. 소스 코드 품질 분석

### 5-1. 개념

소스 코드 품질 분석은 코딩 스타일, 코딩 표준, 코드 복잡도, **메모리 누수**, **스레드 결함** 등을 발견하기 위한 활동이다.

### 5-2. 정적 분석 vs 동적 분석

```mermaid
flowchart LR
    subgraph 정적 분석
        A["코드를 실행하지 않음<br/>코드 자체만으로 분석"] --> B["코딩 표준 준수 여부<br/>코딩 스타일<br/>잔존 결함 발견"]
    end
    subgraph 동적 분석
        C["애플리케이션을 실행"] --> D["메모리 누수 현황<br/>스레드 결함 분석"]
    end
```

### 5-3. 소스 코드 품질 분석 도구 ![star] 자주 출제

| 구분 | 도구명 | 설명 |
|---|---|---|
| 정적 | pmd | 자바 및 타 언어 소스 코드의 버그, 데드 코드 분석 |
| 정적 | cppcheck | C/C++ 코드의 메모리 누수, 오버플로우 등 분석 |
| 정적 | SonarQube | 소스 코드 품질 통합 플랫폼, 플러그인 확장 가능 |
| 정적 | checkstyle | 자바 코드의 코딩 표준 검사 |
| 정적 | ccm | 다양한 언어의 코드 **복잡도** 분석, 리눅스·맥 CLI 지원 |
| 정적 | cobertura | jcoverage 기반 테스트 **커버리지** 측정 |
| 동적 | Avalanche | Valgrind 프레임워크 및 STP 기반 소프트웨어 에러·취약점 동적 분석 |
| 동적 | Valgrind | 자동화된 메모리 및 스레드 결함 발견 분석 |

> ![star] 동적 분석 도구는 **Avalanche, Valgrind** 딱 2개다. 나머지는 전부 정적이라고 기억하면 편하다.

---

## 6. 맥케이브 회전 복잡도 (McCabe Cyclomatic Complexity)

### 6-1. 개념

소프트웨어의 **제어 흐름을 그래프로 표현**하고 소스 코드의 복잡도를 **정량적**으로 나타내는 지표다.

특징: 정량적 지표, 구조적 평가(실제 동작 이전 상태의 품질 측정), 간접 방식(효율·기능성·품질의 간접적 측정)

### 6-2. 계산식

| 식 | 설명 |
|---|---|
| **V(G) = E − N + 2** | 간선(E) 수와 노드(N) 수로 계산 |
| **V(G) = P + 1** | 조건 분기문(P)의 수로 계산 |

그래프 구성: **Node(원)** = 프로세싱 태스크 표현, **Edge(화살표)** = 태스크 간 제어 흐름 표현

### 6-3. 계산 예제

<div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); max-width: 650px; margin: 0 auto; border: 1px solid #eaeaea;">
  
  <!-- 상단 타이틀 영역 -->
  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
    <span style="font-size: 1.5em;">📢</span>
    <span style="background-color: #a07474; color: #ffffff; font-weight: bold; padding: 5px 14px; border-radius: 20px; font-size: 0.9em; box-shadow: 1px 1px 3px rgba(0,0,0,0.15);">개념 박살내기</span>
    <strong style="font-size: 1.25em; color: #333;">맥케이브 회전수 계산</strong>
  </div>

  <!-- 메인 콘텐츠 박스 -->
  <div style="display: flex; border: 1.5px solid #ced4da; background-color: #fcfcfc; flex-wrap: wrap;">
    
    <!-- 왼쪽 영역: 방향 그래프 (SVG) -->
    <div style="flex: 1 1 280px; padding: 20px; display: flex; justify-content: center; align-items: center; border-right: 1.5px solid #ced4da; box-sizing: border-box;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" style="max-width: 250px;">
        <defs>
          <marker id="arrow-mac" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#333" />
          </marker>
        </defs>

        <g stroke="#333" stroke-width="1.5" fill="none">
          <!-- 직선 간선 (Edges) -->
          <line x1="131" y1="79" x2="79" y2="131" marker-end="url(#arrow-mac)" /> <!-- a -> b -->
          <line x1="150" y1="87" x2="150" y2="213" marker-end="url(#arrow-mac)" /> <!-- a -> c -->
          <line x1="79" y1="169" x2="131" y2="221" marker-end="url(#arrow-mac)" /> <!-- b -> c -->
          <line x1="169" y1="221" x2="221" y2="169" marker-end="url(#arrow-mac)" /> <!-- c -> d -->
          <line x1="221" y1="131" x2="169" y2="79" marker-end="url(#arrow-mac)" /> <!-- d -> a -->
          
          <!-- 곡선 간선 (d -> c) -->
          <path d="M 235 170 Q 255 255 170 235" marker-end="url(#arrow-mac)" />
        </g>

        <!-- 노드 (Nodes) -->
        <g fill="#e9ecef" stroke="#333" stroke-width="1.5">
          <circle cx="150" cy="60" r="26" />  <!-- a -->
          <circle cx="60" cy="150" r="26" />  <!-- b -->
          <circle cx="150" cy="240" r="26" /> <!-- c -->
          <circle cx="240" cy="150" r="26" /> <!-- d -->
        </g>

        <!-- 노드 텍스트 -->
        <g font-family="sans-serif" font-size="18" fill="#333" text-anchor="middle" dominant-baseline="central">
          <text x="150" y="62">a</text>
          <text x="60" y="152">b</text>
          <text x="150" y="242">c</text>
          <text x="240" y="152">d</text>
        </g>
      </svg>
    </div>

    <!-- 오른쪽 영역: 수식 계산 텍스트 -->
    <div style="flex: 1 1 250px; padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; font-size: 16px; color: #333; font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.8; box-sizing: border-box;">
      
      <div style="margin-bottom: 20px;">
        E = 화살표 수 = 6<br>
        N = 노드 수 = 4
      </div>
      
      <!-- 등호(=) 정렬을 위한 Flex 레이아웃 -->
      <div style="display: flex;">
        <div style="padding-right: 8px;">V(G)</div>
        <div>
          = E - N + 2<br>
          = 6 - 4 + 2 = 4
        </div>
      </div>
      
    </div>
  </div>
</div>

- E(간선 수) = 6, N(노드 수) = 4
- **V(G) = E − N + 2 = 6 − 4 + 2 = 4**

---

## 7. 코드 최적화와 클린 코드

### 7-1. 코드 최적화 개념

소스 코드 최적화는 **읽기 쉽고 변경 및 추가가 쉬운 클린 코드를 작성**하는 것으로, 소스 코드 품질을 위해 지킬 원칙과 기준을 정의한다.

### 7-2. 클린 코드 vs 배드 코드

```mermaid
flowchart LR
    subgraph 클린 코드
        A["가독성 높음<br/>단순함<br/>의존성 축소<br/>중복 최소화"]
    end
    subgraph 배드 코드
        B["외계인 코드<br/>(Alien Code)"]
        C["스파게티 코드<br/>(Spaghetti Code)"]
    end
    A -.리팩토링 대상.- B
    A -.리팩토링 대상.- C
```

**클린 코드 특징**
- 중복 코드 제거로 애플리케이션 설계가 개선된다
- 가독성이 높아 기능을 쉽게 이해할 수 있다
- **버그**를 찾기 쉬워지고, 프로그래밍 속도가 빨라진다

**배드 코드 유형** ![star] 자주 출제

| 유형 | 설명 |
|---|---|
| 외계인 코드 (Alien Code) | 매우 오래되거나 참고 문서·개발자가 없어 유지보수가 몹시 어려운 코드 |
| 스파게티 코드 (Spaghetti Code) | 소스 코드가 복잡하게 얽힌 모습을 스파게티 면발에 비유. 작동은 정상이지만 읽으면서 동작을 파악하기 어려운 코드 |

### 7-3. 클린 코드 작성 원칙 ![star] 자주 출제

| 작성 원칙 | 설명 |
|---|---|
| 가독성 | 누구든지 읽기 쉽게 작성, 이해하기 쉬운 용어와 들여쓰기 사용 |
| 단순성 | 한 번에 한 가지 처리만 수행, 클래스/메서드/함수를 최소 단위로 분리 |
| 의존성 최소 | 영향도를 최소화, 코드 변경이 다른 부분에 영향 없게 작성 |
| 중복성 제거 | 중복된 코드를 제거, 공통된 코드를 사용 |
| 추상화 | 클래스/메서드/함수에 대해 같은 수준의 추상화 구현, 상세 내용은 하위에서 구현 |

> ![star] 암기 팁: **가단의중추** (가독성·단순성·의존성·중복성·추상화)

### 7-4. 클린 코드 유형

| 유형 | 핵심 내용 |
|---|---|
| 의미 있는 이름 | 의도가 분명한 이름 사용. 클래스는 명사, 함수는 동사로 |
| 간결하고 명확한 주석 | 주석은 간결·명확하게, 변경 이력은 형상 관리 도구 사용 |
| 보기 좋은 배치 | 괄호·들여쓰기로 표현, 빈 줄로 선언부와 구현부 구별, 반복 구문은 **리팩토링** |
| 작은 함수 | 함수는 작게, 함수 하나당 하는 일은 하나만 |
| 읽기 쉬운 제어 흐름 | if/else 조건문에서 긍정적이고 간단한 내용을 앞쪽에 배치 |
| 오류 처리 | 오류 코드 반환보다 **예외 처리** 활용, Null 전달/반환 금지 |
| 클래스 분할 배치 | 클래스는 하나의 역할·책임만 수행하도록 응집도를 높이고 작게 작성 |
| 느슨한 결합 기법 적용 | 인터페이스 클래스를 이용해 클래스 간 의존성 최소화 |
| 코딩 형식 기법 적용 | 줄바꿈으로 개념 구분, 호출하는 함수를 먼저 배치, 지역 변수는 함수 맨 처음에 선언 |

---

## 8. 인터페이스 구현

### 8-1. 인터페이스 기능 확인

인터페이스 기능은 **이기종 시스템 또는 컴포넌트 간 데이터 교환 및 처리**를 위한 기능이다.

- 인터페이스 설계서를 보고 인터페이스 기능을 확인할 수 있다
- 인터페이스 정의서를 통해 외부 및 내부 모듈의 기능을 확인할 수 있다

### 8-2. 데이터 표준 확인

인터페이스 데이터 표준 확인은 상호 연계하려는 시스템 간 **데이터 형식과 표준을 정의**하는 과정이다. 송·수신 데이터 중 공통 영역을 추출해 정의하거나, 한쪽의 데이터를 변환하는 경우가 있다.

---

## 9. EAI와 ESB ![star] 자주 출제

시스템 인터페이스를 위해 외부 및 내부 모듈을 연계하는 대표적인 방법은 **EAI 방식**과 **ESB 방식**이다.

### 9-1. EAI (Enterprise Application Integration)

기업에서 운영되는 서로 다른 플랫폼 및 애플리케이션 간의 **정보 전달, 연계, 통합**을 가능하게 해주는 솔루션이다. 비즈니스 간 통합·연계성을 증대시켜 효율성과 확장성을 높인다.

**EAI 구축 유형 4가지**

<div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); overflow-x: auto; max-width: 850px; margin: 0 auto; border: 1px solid #eaeaea;">
  
  <h3 style="margin-top: 0; margin-bottom: 20px; color: #333; display: flex; align-items: center; gap: 8px; font-size: 1.25em;">
    <span style="color: #a05252;">🔘</span> EAI 구축 유형
  </h3>
  
  <table style="width: 100%; border-collapse: collapse; min-width: 750px; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14.5px; text-align: left; color: #333;">
    <thead>
      <tr style="background-color: #d8cecd; border-top: 2px solid #bbaaa8; border-bottom: 2px solid #bbaaa8; text-align: center;">
        <th style="padding: 15px; border-right: 1px solid #c9bbba; width: 22%;">유형</th>
        <th style="padding: 15px; border-right: 1px solid #c9bbba; width: 35%;">구성도</th>
        <th style="padding: 15px; width: 43%;">설명</th>
      </tr>
    </thead>
    <tbody>
      
      <!-- 1. 포인트 투 포인트 -->
      <tr style="border-bottom: 1px solid #dee2e6;">
        <td style="padding: 15px; border-right: 1px solid #dee2e6; text-align: center;">
          <strong style="font-size: 1.05em;">포인트 투 포인트</strong><br>
          <span style="font-size: 0.85em; color: #666;">(Point-to-Point)</span>
        </td>
        <td style="padding: 15px; border-right: 1px solid #dee2e6;">
          <svg viewBox="0 0 200 120" width="100%" style="max-width: 180px; display: block; margin: 0 auto;">
            <!-- 연결선 -->
            <g stroke="#555" stroke-width="1.5">
              <line x1="40" y1="30" x2="110" y2="20" />
              <line x1="40" y1="30" x2="120" y2="100" />
              <line x1="40" y1="30" x2="160" y2="50" />
              <line x1="110" y1="20" x2="40" y2="90" />
              <line x1="110" y1="20" x2="120" y2="100" />
              <line x1="160" y1="50" x2="120" y2="100" />
            </g>
            <!-- 노드 -->
            <g fill="#fff" stroke="#555" stroke-width="1.5">
              <circle cx="40" cy="30" r="11" />
              <circle cx="110" cy="20" r="11" />
              <circle cx="160" cy="50" r="11" />
              <circle cx="40" cy="90" r="11" />
              <circle cx="120" cy="100" r="11" />
            </g>
          </svg>
        </td>
        <td style="padding: 15px; line-height: 1.6;">
          • 중간에 미들웨어를 두지 않고 각각의 애플리케이션 간에 점대 점 형태로 연결
        </td>
      </tr>

      <!-- 2. 허브 앤 스포크 -->
      <tr style="border-bottom: 1px solid #dee2e6;">
        <td style="padding: 15px; border-right: 1px solid #dee2e6; text-align: center;">
          <strong style="font-size: 1.05em;">허브 앤 스포크</strong><br>
          <span style="font-size: 0.85em; color: #666;">(Hub &amp; Spoke)</span>
        </td>
        <td style="padding: 15px; border-right: 1px solid #dee2e6;">
          <svg viewBox="0 0 200 120" width="100%" style="max-width: 180px; display: block; margin: 0 auto;">
            <!-- 연결선 -->
            <g stroke="#555" stroke-width="1.5">
              <line x1="100" y1="35" x2="100" y2="50" />
              <line x1="55" y1="92" x2="75" y2="75" />
              <line x1="145" y1="92" x2="125" y2="75" />
            </g>
            <!-- 중앙 허브 -->
            <rect x="65" y="50" width="70" height="25" fill="#f8f9fa" stroke="#555" stroke-width="1.5" />
            <text x="100" y="67" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#333">Hub</text>
            <!-- 스포크 노드 -->
            <g fill="#fff" stroke="#555" stroke-width="1.5">
              <circle cx="100" cy="22" r="11" />
              <circle cx="50" cy="100" r="11" />
              <circle cx="150" cy="100" r="11" />
            </g>
            <!-- 텍스트 -->
            <text x="135" y="26" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#333">Spoke</text>
          </svg>
        </td>
        <td style="padding: 15px; line-height: 1.6;">
          • 단일한 접점의 허브 시스템을 통하여 데이터를 전송하는 중앙 집중식 방식<br>
          • 허브 장애 시 전체 장애 발생
        </td>
      </tr>

      <!-- 3. 메시지 버스 -->
      <tr style="border-bottom: 1px solid #dee2e6;">
        <td style="padding: 15px; border-right: 1px solid #dee2e6; text-align: center;">
          <strong style="font-size: 1.05em;">메시지 버스</strong><br>
          <span style="font-size: 0.85em; color: #666;">(Message Bus)</span>
        </td>
        <td style="padding: 15px; border-right: 1px solid #dee2e6;">
          <svg viewBox="0 0 200 120" width="100%" style="max-width: 180px; display: block; margin: 0 auto;">
            <!-- 버스 라인 -->
            <line x1="25" y1="60" x2="175" y2="60" stroke="#555" stroke-width="1.5" />
            <text x="100" y="75" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#333">Bus</text>
            <!-- 연결선 -->
            <g stroke="#555" stroke-width="1.5">
              <line x1="60" y1="35" x2="60" y2="60" />
              <line x1="140" y1="35" x2="140" y2="60" />
              <line x1="75" y1="88" x2="75" y2="60" />
              <line x1="125" y1="88" x2="125" y2="60" />
            </g>
            <!-- 노드 -->
            <g fill="#fff" stroke="#555" stroke-width="1.5">
              <circle cx="60" cy="24" r="11" />
              <circle cx="140" cy="24" r="11" />
              <circle cx="75" cy="99" r="11" />
              <circle cx="125" cy="99" r="11" />
            </g>
            <!-- 텍스트 -->
            <text x="175" y="28" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#333">서비스</text>
          </svg>
        </td>
        <td style="padding: 15px; line-height: 1.6;">
          • 애플리케이션 사이 미들웨어(버스)를 두어 연계하는 미들웨어 통합 방식<br>
          • 뛰어난 확장성과 대용량 데이터 처리 가능
        </td>
      </tr>

      <!-- 4. 하이브리드 -->
      <tr>
        <td style="padding: 15px; border-right: 1px solid #dee2e6; text-align: center;">
          <strong style="font-size: 1.05em;">하이브리드</strong><br>
          <span style="font-size: 0.85em; color: #666;">(Hybrid)</span>
        </td>
        <td style="padding: 15px; border-right: 1px solid #dee2e6;">
          <svg viewBox="0 0 200 120" width="100%" style="max-width: 180px; display: block; margin: 0 auto;">
            <!-- 버스 라인 -->
            <line x1="30" y1="20" x2="170" y2="20" stroke="#555" stroke-width="1.5" />
            <text x="100" y="15" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#333">Bus</text>
            <!-- 버스 to 허브 연결선 -->
            <g stroke="#555" stroke-width="1.5">
              <line x1="60" y1="20" x2="60" y2="50" />
              <line x1="140" y1="20" x2="140" y2="50" />
            </g>
            
            <!-- 허브 1 (왼쪽) -->
            <rect x="40" y="50" width="40" height="20" fill="#f8f9fa" stroke="#555" stroke-width="1.5" />
            <text x="60" y="64" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#333">Hub</text>
            <!-- 스포크 연결선 및 노드 1 -->
            <line x1="38" y1="88" x2="50" y2="70" stroke="#555" stroke-width="1.5" />
            <line x1="82" y1="88" x2="70" y2="70" stroke="#555" stroke-width="1.5" />
            <circle cx="34" cy="94" r="7" fill="#fff" stroke="#555" stroke-width="1.5" />
            <circle cx="86" cy="94" r="7" fill="#fff" stroke="#555" stroke-width="1.5" />
            <line x1="60" y1="40" x2="60" y2="50" stroke="#555" stroke-width="1.5" />
            <circle cx="60" cy="35" r="7" fill="#fff" stroke="#555" stroke-width="1.5" />

            <!-- 허브 2 (오른쪽) -->
            <rect x="120" y="50" width="40" height="20" fill="#f8f9fa" stroke="#555" stroke-width="1.5" />
            <text x="140" y="64" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#333">Hub</text>
            <!-- 스포크 연결선 및 노드 2 -->
            <line x1="118" y1="88" x2="130" y2="70" stroke="#555" stroke-width="1.5" />
            <line x1="162" y1="88" x2="150" y2="70" stroke="#555" stroke-width="1.5" />
            <circle cx="114" cy="94" r="7" fill="#fff" stroke="#555" stroke-width="1.5" />
            <circle cx="166" cy="94" r="7" fill="#fff" stroke="#555" stroke-width="1.5" />
            <line x1="140" y1="40" x2="140" y2="50" stroke="#555" stroke-width="1.5" />
            <circle cx="140" cy="35" r="7" fill="#fff" stroke="#555" stroke-width="1.5" />
          </svg>
        </td>
        <td style="padding: 15px; line-height: 1.6;">
          • 그룹 내는 허브 앤 스포크 방식을 사용하고, 그룹 간에는 메시지 버스 방식을 사용하는 통합 방식
        </td>
      </tr>
      
    </tbody>
  </table>
</div>


### 9-2. ESB (Enterprise Service Bus)

서로 다른 플랫폼·애플리케이션들을 **하나의 시스템으로 관리 운영**할 수 있도록 **서비스 중심의 통합**을 지향하는 아키텍처 또는 기술이다.

버스를 중심으로 각각의 프로토콜이 호환되도록 애플리케이션 통합을 **낮은 결합(느슨한 결합)** 방식으로 지원한다.

```mermaid
graph TD
    A1[Application 1] <-->|HTTP| ESB
    A2[Application 2] <-->|HTTPS| ESB
    A3[Application 3] <-->|SOAP| ESB
    ESB[Enterprise Service Bus]
    ESB <-->|SOAP| A4[Application 4]
    ESB <-->|HTTP| A5[Application 5]
    ESB <-->|MQ/JMS| A6[Application 6]
    style ESB fill:#d1ecf1
```

> ![star] EAI는 "애플리케이션 통합", ESB는 "서비스 중심 + 낮은 결합"이 핵심 키워드다.

---

## 10. 인터페이스 데이터 포맷과 교환 기술

### 10-1. 인터페이스 데이터 포맷 (JSON, XML, YAML)

| 포맷 | 설명 |
|---|---|
| JSON (JavaScript Object Notation) | 비동기 브라우저/서버 통신(AJAX)을 위해 "속성-값 쌍", "키-값 쌍"으로 이루어진 데이터 오브젝트를 전달하기 위해 인간이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷 |
| XML (eXtensible Markup Language) | W3C에서 개발된, 다른 특수한 목적을 갖는 **마크업 언어**를 만드는 데 사용하도록 권장하는 다목적 마크업 언어 |
| YAML (YAML Ain't Markup Language) | 데이터를 **사람이 쉽게 읽을 수 있는 형태**로 표현하기 위해 사용하는 데이터 직렬화 양식 |

### 10-2. 인터페이스 데이터 교환 기술 (REST, AJAX)

| 기술 | 설명 |
|---|---|
| REST (Representational State Transfer) | 웹과 같은 분산 하이퍼 미디어 환경에서 자원의 존재/상태 정보를 **표준화된 HTTP 메서드**로 주고받는 웹 아키텍처 |
| AJAX (Asynchronous JavaScript and XML) | 자바스크립트를 사용하여 웹 서버와 클라이언트 간 **비동기적**으로 XML 데이터를 교환하고 조작하기 위한 웹 기술 |

---

## 11. 인터페이스 구현 검증 도구 ![star] 자주 출제

인터페이스 구현 검증 도구는 인터페이스 **동작 상태를 검증하고 모니터링**할 수 있는 도구다. 세부 기능을 기능 단위로 테스트하는 단위 테스트와 전체 흐름을 확인하는 시나리오 기반 통합 테스트가 필요하다.

```mermaid
%%{init: {'theme': 'neutral'}}%%
mindmap
  root((구현 검증<br/>도구))
    xUnit
      다양한 언어 지원 단위 테스트
    STAF
      데몬 사용, 분산 환경
    FitNesse
      웹 기반, 테이블 작성
    NTAF
      FitNesse + STAF 결합
    Selenium
      웹 앱, 플레이백 도구
    watir
      Ruby 기반
```

| 도구 | 설명 |
|---|---|
| xUnit | Java(jUnit), C++(cppUnit), .Net(nUnit), Web(httpUnit) 등 **다양한 언어를 지원하는 단위 테스트 프레임워크** |
| STAF | 서비스 호출, 컴포넌트 재사용 등 다양한 환경 지원. 각 테스트 대상 분산 환경에 **데몬**을 사용하여 테스트를 수행·통합·자동화하는 검증 도구 |
| FitNesse | **웹 기반** 테스트 케이스 설계/실행/결과 확인 지원. 사용자가 **테스트 케이스 테이블**을 작성하면 빠르고 편하게 자동 테스트 가능 |
| NTAF | **FitNesse와 STAF의 장점을 결합**한 테스트 자동화 프레임워크 |
| Selenium | 다양한 브라우저·개발 언어를 지원하는 웹 애플리케이션 테스트 프레임워크. 테스트 스크립트 언어를 학습할 필요 없이 기능 테스트를 만드는 **플레이백 도구** 제공 |
| watir | **Ruby 기반** 웹 애플리케이션 테스트 프레임워크. 모든 언어 기반의 웹 앱 테스트와 브라우저 호환성 테스팅 가능 |

> ![star] NTAF = FitNesse + STAF 조합이라는 것, watir = Ruby라는 것이 단골 출제 포인트다.

---

## 12. 인터페이스 보안

### 12-1. 인터페이스 보안의 중요성

인터페이스는 시스템 모듈 간 통신·정보 교환의 중요한 접점이라, 보안 취약성이 시스템에 심각한 피해를 입힐 수 있다.

**인터페이스 보안 취약점**

| 취약점 | 설명 |
|---|---|
| 데이터 통신 시 데이터 탈취 위협 | **스니핑**을 통해 데이터 전송 내역을 감청하여 데이터를 탈취 |
| 데이터 통신 시 데이터 위·변조 위협 | 전송 데이터에 대한 삽입, 삭제, 변조 공격을 통한 시스템 위협 |

### 12-2. 시큐어 코딩 가이드

인터페이스 개발 시 보안 취약점을 방지할 수 있는 시큐어 코딩 가이드에 따른 개발이 필요하다.

| 적용 대상 | 보안 약점 | 대응 방안 |
|---|---|---|
| 입력 데이터 검증 및 표현 | 입력값 검증 누락·부적절한 검증, 잘못된 형식 지정 | 유효성 검증 체계 수립, 실패 시 처리 설계·구현 |
| 보안 기능 | 인증·접근 제어·기밀성·암호화·권한 관리의 부적절한 구현 | 인증·접근 통제·권한 관리·비밀번호 정책을 적절하게 반영 |
| 시간 및 상태 | 병렬 시스템·멀티 프로세스 환경에서 시간·상태의 부적절한 관리 | 공유 자원 접근 직렬화, 병렬 실행 가능 프레임워크 사용, 블록문 내에서만 재귀 함수 호출 |
| 에러 처리 | 에러 미처리·불충분한 처리로 에러 메시지에 중요 정보 포함 | 중요 정보 유출 등 보안 약점이 발생하지 않도록 시스템 설계·구현 |
| 코드 오류 | 개발자가 범할 수 있는 코딩 오류 | 코딩 규칙 도출 후 검증 가능한 스크립트 구성, 경고 순위 최상향 조정 후 경고 메시지 코드 제거 |
| 캡슐화 | 기능성이 불충분한 캡슐화로 인가되지 않은 사용자에게 데이터 누출 | 디버거 코드 제거, 필수 정보 외 클래스 내 private 접근자 지정 |
| API 오용 | 의도된 사용에 반하는 API 사용, 보안에 취약한 API 사용 | 개발 언어별 취약 API 확보, 취약 API 검출 프로그램 사용 |

### 12-3. 데이터베이스 암호화 기법

중요 민감 데이터는 안전성이 검증된 암호화 알고리즘으로 반드시 암호화한다.

```mermaid
flowchart TD
    Q{암호화를 어디서<br/>수행하는가?}
    Q -->|애플리케이션에서| API["API 방식<br/>· 앱 레벨에서 암호 모듈 적용<br/>· 앱 서버에 부하 발생"]
    Q -->|DB에서| PLUG["Plug-in 방식<br/>· DBMS에 Plug-in 모듈로 동작<br/>· DB 서버에 부하 발생"]
    Q -->|양쪽 혼합| HYB["Hybrid 방식<br/>· API + Plug-in 결합<br/>· DB 서버와 앱 서버로 부하 분산"]
```

### 12-4. 중요 인터페이스 데이터의 암호화 전송 ![star] 자주 출제

민감한 정보를 통신 채널로 전송할 때는 반드시 암·복호화 과정을 거쳐야 하고, **S-HTTP, IPSec, SSL/TLS** 등 보안 채널을 활용하여 전송한다.

**① S-HTTP (Secure Hypertext Transfer Protocol)**
- 클라이언트와 서버 간 전송되는 **모든 메시지를 각각 암호화**하여 전송
- HTTP를 사용한 애플리케이션에 대해서만 메시지 보호 가능

**② IPSec (IP Security)**
- **IP 계층(3계층)**에서 무결성과 인증을 보장하는 인증헤더(AH)와 기밀성을 보장하는 암호화(ESP)를 이용해 양 종단 간 보안 서비스를 제공하는 **터널링 프로토콜**
- 동작 모드: **전송(Transport) 모드**와 **터널(Tunnel) 모드**
- IPSec 정책에는 SPD, SAD가 있음

```mermaid
flowchart TD
    IPSEC[IPSec 주요 프로토콜]
    IPSEC --> AH["AH (Authentication Header)<br/>MAC 이용, 인증·송신처 인증·무결성 제공<br/>❌ 기밀성(암호화)은 제공 안 함"]
    IPSEC --> ESP["ESP (Encapsulation Security Payload)<br/>MAC + 암호화 이용<br/>인증·송신처 인증·무결성 + ✅ 기밀성 제공"]
    IPSEC --> IKE["IKE (Internet Key Exchange)<br/>암호화 키의 관리와 생성 제공"]
```

> ![star] AH는 암호화(기밀성) 없음, ESP는 암호화 있음 — 이 차이가 핵심이다.

**③ SSL/TLS**
- **전송계층(4계층)과 응용계층(7계층) 사이**에서 클라이언트-서버 간 웹 데이터 암호화(기밀성), 상호 인증, 전송 시 데이터 무결성을 보장하는 보안 프로토콜
- 인증 모드: 익명 모드, 서버 인증 모드, 클라이언트-서버 인증 모드
- IPSec과 달리 Client-Server 간 상호 인증·암호 방식에 대해 **협상**을 거침
- 대칭 키 암호화, 공개키 암호화, 일방향 해시 함수, 메시지 인증코드 등 특정 암호 기술에 의존하지 않고 다양한 암호 기술 적용
- `https://~` 표시 형식과 **443 포트** 이용

---

## 마무리 요약

```mermaid
%%{init: {'theme': 'neutral'}}%%
mindmap
  root((핵심 요약))
    알고리즘
      설계 기법 4가지
      시간 복잡도 5단계
    검색과 정렬
      이진 검색 M 공식
      정렬별 시간 복잡도
    코드 품질
      정적/동적 분석 도구
      ["V(G) = E - N + 2"]
      클린 코드 원칙 5가지
    인터페이스
      EAI 4유형 / ESB
      JSON XML YAML
      REST AJAX
      검증 도구 6종
    보안
      시큐어 코딩 7영역
      DB 암호화 3방식
      S-HTTP IPSec SSL/TLS
```

시험에 자주 나오는 포인트만 다시 짚으면 이렇다.

1. **시간 복잡도**: 퀵 정렬 최악만 O(n²), 삽입 정렬 최적만 O(n)
2. **이진 검색**: M = (F+L)/2, 소수점 버림
3. **맥케이브**: V(G) = E − N + 2 = P + 1
4. **동적 분석 도구**: Avalanche, Valgrind 딱 2개
5. **EAI**: 허브 앤 스포크는 허브 장애 시 전체 장애
6. **NTAF** = FitNesse + STAF, **watir** = Ruby
7. **IPSec**: AH는 기밀성 없음, ESP는 기밀성 있음, SSL/TLS는 443 포트

👉 **[오답노트 — 2과목 소프트웨어 개발](/정처기/wrong-note-part5/)**

[star]: /assets/images/star.png#blog-star-emoji "star"
