---
title: "[정보처리기사 필기] 오답노트 — 객체지향에서 미들웨어"
permalink: /정처기/wrong-note-part3/
categories: [정처기]
tags:
  - 객체지향
  - 오버로딩
  - 오버라이딩
  - 럼바우
  - 인터페이스
  - 디자인 패턴
  - 정형기술검토
  - 미들웨어
toc: true
toc_sticky: true
mermaid: true
---


### 📝 Q21. 객체 지향 설계 원칙 중, 서브 타입(상속받은 하위 클래스)은 어디에서나 자신의 기반 타입(상위 클래스)으로 교체할 수 있어야 함을 의미하는 원칙은? [20년 3회, 4회]

① ISP(Interface Segregation Principle)  
② DIP(Dependency Inversion Principle)  
③ LSP(Liskov Substitution Principle)  
④ SRP(Single Responsibility Principle)  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **LSP (리스코프 자환의 원칙):** 자식 타입(상속받은 하위 클래스)은 언제나 부모 타입(상위 클래스)으로 교체할 수 있어야 한다는 원칙
  - **SRP (단일 책임의 원칙):** 하나의 클래스는 하나의 목적을 위해서만 생성되어야 함
  - **ISP (인터페이스 분리의 원칙):** 한 클래스는 자신이 사용하지 않는 인터페이스를 구현하지 말아야 함
  - **DIP (의존성 역전의 원칙):** 추상화를 매개로 메시지를 주고받음으로써 관계를 느슨하게 유지함

</div>
</details>


---

### 📝 Q32. 객체 지향 기법에서 클래스들 사이의 '부분-전체(part-whole)' 관계 또는 '부분(is-a-part-of)'의 관계로 설명되는 연관성을 나타내는 용어는? [20년 1회, 24년 1회, 25년 2회]

① 일반화  
② 추상화  
③ 캡슐화  
④ 집단화  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **집단화(Aggregation):** is-part-of 관계, part-whole 관계 / 관련 있는 여러 객체를 묶어 하나의 상위 객체를 만드는 특징
  - **일반화(Generalization):** is-a 관계 / 상위 클래스의 특성을 하위 클래스가 상속받음

</div>
</details>

---

### 📝 Q34. 객체 지향 소프트웨어 설계 시 디자인 패턴을 구성하는 요소로서 가장 거리가 먼 것은? [20년 3회]

① 개발자 이름  
② 문제 및 배경  
③ 사례  
④ 샘플 코드  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **디자인 패턴 구성요소:** 패턴 이름, 문제(Problem), 솔루션(Solution), 사례(Example), 결과(Consequence), 샘플 코드(Sample Code) 등

</div>
</details>

---

### 📝 Q37. 다음 내용이 설명하는 디자인 패턴은? [20년 3회]

- 객체를 생성하기 위한 인터페이스를 정의하여 어떤 클래스가 인스턴스화 될 것인지는 서브 클래스가 결정하도록 하는 것
- Virtual-Constructor 패턴이라고도 함

① Visitor 패턴  
② Observer 패턴  
③ Factory Method 패턴  
④ Bridge 패턴  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **Factory Method 패턴:** 객체 생성을 상위 클래스가 아닌 서브 클래스에서 인스턴스를 생성하도록 위임하는 **생성 패턴**
  - **Visitor (방문자):** 오퍼레이션을 별도의 클래스에 새롭게 정의하는 행위 패턴
  - **Observer (옵저버):** 상태 변화를 의존자들에게 알리고 자동 업데이트하는 행위 패턴
  - **Bridge (브리지):** 추상과 구현을 분리하여 결합도를 낮춘 구조 패턴

</div>
</details>

---

### 📝 Q40. GoF(Gang of Four) 디자인 패턴의 생성 패턴에 속하지 않는 것은? [21년 1회, 22년 1회]

① 추상 팩토리(Abstract Factory)  
② 빌더(Builder)  
③ 어댑터(Adapter)  
④ 싱글턴(Singleton)  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **어댑터(Adapter) 패턴**은 **구조 패턴(Structure Pattern)**에 속합니다.
  - **생성 패턴 암기 팁 (생빌프로팩앱싱):** 빌더(Builder), 프로토타입(Prototype), 팩토리 메서드(Factory Method), 추상 팩토리(Abstract Factory), 싱글턴(Singleton)

</div>
</details>

---

### 📝 Q47. 객체 지향 개념에서 다형성(Polymorphism)과 관련한 설명으로 틀린 것은? [22년 1회, 24년 3회, 25년 1회]

① 다형성은 현재 코드를 변경하지 않고 새로운 클래스를 쉽게 추가할 수 있게 한다.  
② 다형성이란 여러 가지 형태를 가지고 있다는 의미로, 여러 형태를 받아들일 수 있는 특징을 말한다.  
③ 메서드 오버라이딩(Overriding)은 상위 클래스에서 정의한 일반 메서드의 구현을 하위 클래스에서 무시하고 재정의할 수 있다.  
④ 오버로딩(Overloading)의 경우 매개변수 타입은 동일하지만 메서드명을 다르게 함으로써 구현, 구분할 수 있다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **오버로딩(Overloading):** **메서드 이름은 동일**하게 유지하면서, 매개변수의 타입이나 개수를 다르게 하여 여러 개 정의하는 기법입니다.

</div>
</details>

---

### 📝 Q52. 다음에서 설명하는 구조 패턴은 무엇인가? [24년 1회]

기존에 구현되어 있는 클래스에 필요한 기능을 추가해 나가는 설계 패턴으로 기능 확장이 필요할 때 객체 간의 결합을 통해 기능을 동적으로 유연하게 확장할 수 있게 해주어 상속의 대안으로 사용하는 디자인 패턴

① Bridge  
② Decorator  
③ Facade  
④ Flyweight  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **②**
- **해설:** 
  - **Decorator 패턴:** 객체에 동적으로 새로운 책임(기능)을 추가하는 구조 패턴으로, 상속을 통한 기능 확장 대신 유연하게 사용할 수 있습니다.

</div>
</details>


### 📝 Q06. 요구사항 개발 프로세스의 순서로 옳은 것은? [21년 2회, 22년 3회]

㉠ 도출(Elicitation)  
㉡ 분석(Analysis)  
㉢ 명세(Specification)  
㉣ 확인(Validation)  

① ㉠ - ㉡ - ㉢ - ㉣  
② ㉠ - ㉢ - ㉡ - ㉣  
③ ㉠ - ㉡ - ㉣ - ㉢  
④ ㉠ - ㉣ - ㉡ - ㉢  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **①**
- **해설:** 
  - **요구사항 개발 프로세스 절차:** 도출(Elicitation) -> 분석(Analysis) -> 명세(Specification) -> 확인(Validation)

</div>
</details>

---

### 📝 Q07. 소프트웨어 공학에서 워크스루(Walkthrough)에 대한 설명으로 틀린 것은? [22년 2회, 23년 1회]

① 사용 사례를 확장하여 명세하거나 설계 다이어그램, 원시 코드, 테스트 케이스 등에 적용할 수 있다.  
② 복잡한 알고리즘 또는 반복, 실시간 동작, 병행 처리와 같은 기능이나 동작을 이해하려고 할 때 유용하다.  
③ 인스펙션(Inspection)과 동일한 의미를 가진다.  
④ 단순한 테스트 케이스를 이용하여 프로토타입을 수작업으로 수행해 보는 것이다.  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **③**
- **해설:** 
  - **워크스루(Walkthrough):** 검토 회의 전 자료를 배포해 사전 검토 후, 짧은 시간 동안 회의를 진행하는 비공식적 검토 방법 (수작업 프로토타입 검토)
  - **인스펙션(Inspection):** 소프트웨어 요구, 설계, 원시 코드 등의 작성자가 아닌 다른 전문가 또는 팀이 검사하여 오류를 찾아내는 공식적 검토 방법

</div>
</details>

---

### 📝 Q10. 소프트웨어 개발 방법 중 요구사항 분석(Requirements Analysis)과 거리가 먼 것은? [20년 1회]

① 비용과 일정에 대한 제약설정  
② 타당성 조사  
③ 요구사항 정의 문서화  
④ 설계 명세서 작성  

<details>
<summary><b> 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

- **정답:** **④**
- **해설:** 
  - **설계 명세서 작성**은 요구사항 분석 단계 이후인 **설계 단계**에서 진행됩니다.
  - **요구사항 분석 단계의 주요 활동:** 요구사항 도출, 요구사항 분석/모델링, 요구사항 우선순위 부여, 비용과 일정에 대한 제약 설정, 타당성 조사, 요구사항 정의 문서화 등

</div>
</details>

---
