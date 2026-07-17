---
title: "[정보처리기사 필기] 오답노트 — 1과목 소프트웨어 설계"
permalink: /정처기/wrong-note-part1/
categories: [정처기]
tags:
  - UML
  - 애자일
  - XP
  - 스크럼
  - 요구사항분석
toc: true
toc_sticky: true
mermaid: true
---

> ### 📝 Q14. UML(Unified Modeling Language)에 대한 설명 중 틀린 것은? `[21년 2회]`
> 
> ① 기능적 모델은 사용자 측면에서 본 시스템 기능이며, UML에서는 Use Case Diagram을 사용한다.  
> ② 정적 모델은 객체, 속성, 연관 관계, 오퍼레이션의 시스템 구조를 나타내며, UML에서는 Class Diagram을 사용한다.  
> ③ 동적 모델은 시스템의 내부 동작을 말하며, UML에서는 Sequence Diagram, State Diagram, Activity Diagram을 사용한다.  
> ④ State Diagram은 객체들 사이의 메시지 교환을 나타내며, Sequence Diagram은 하나의 객체가 가진 상태와 그 상태의 변화에 의한 동작 순서를 나타낸다.  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **④**
* **해설:** 
  * **Sequence Diagram**: 객체들 사이의 메시지 교환을 나타냄
  * **State Diagram**: 하나의 객체가 가진 상태와 그 상태의 변화에 의한 동작 순서를 나타냄

</div>
</details>

---

> ### 📝 Q18. 요구사항 정의 및 분석·설계의 결과물을 표현하기 위한 모델링 과정에서 사용되는 다이어그램(Diagram)이 아닌 것은? `[21년 3회, 24년 2회, 25년 3회]`
> 
> ① Data Flow Diagram  
> ② UML Diagram  
> ③ E-R Diagram  
> ④ AVL Diagram  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **④**
* **해설:** 
  * **AVL 트리**는 스스로 균형을 잡는 이진 탐색 트리이며, *AVL 다이어그램*은 존재하지 않습니다.
  * **Data Flow Diagram (DFD)**: 데이터가 각 프로세스를 따라 흐르면서 변환되는 모습을 표현하는 방식
  * **UML Diagram**: 객체 지향 소프트웨어 개발 과정에서 산출물을 명세화, 시각화, 문서화할 때 사용하는 모델링 언어
  * **E-R Diagram**: 객체 타입과 관계 타입을 기본 개념으로 현실 세계를 개념적으로 표현하는 방식

</div>
</details>

---

> ### 📝 Q22. 애자일 방법론에 해당하지 않는 것은? `[20년 4회]`
> 
> ① 기능 중심 개발  
> ② 스크럼  
> ③ 익스트림 프로그래밍  
> ④ 모듈 중심 개발  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **④**
* **해설:** 
  * 애자일 방법론은 프로젝트의 요구사항을 모듈 중심으로 정의하지 않고, **기능 중심**으로 정의합니다.

</div>
</details>

---

> ### 📝 Q23. UML의 기본 구성요소가 아닌 것은? `[20년 4회, 24년 3회, 25년 1회]`
> 
> ① Things  
> ② Terminal  
> ③ Relationship  
> ④ Diagram  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **②**
* **해설:** 
  * UML의 3대 기본 구성요소는 **사관다**로 외우시면 쉽습니다.
    * **사물 (Things)**
    * **관계 (Relationships)**
    * **다이어그램 (Diagrams)**

</div>
</details>

---

> ### 📝 Q24. 다음 중 자료 사전(Data Dictionary)에서 선택의 의미를 나타내는 것은? `[20년 4회]`
> 
> ① [ ]  
> ② { }  
> ③ +  
> ④ **  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **①**
* **해설:** 자료 사전의 주요 기호 정의는 다음과 같습니다.
  * **`[ ]`** : 자료의 **선택**을 나타내는 기호
  * **`{ }`** : 자료의 **반복**을 나타내는 기호
  * **`+`** : 자료의 **연결(and)**을 나타내는 기호
  * **`**`** : 자료의 **설명(주석)**을 나타내는 기호

</div>
</details>

---

> ### 📝 Q25. XP(eXtreme Programming)의 기본원리로 볼 수 없는 것은? `[20년 4회, 24년 1회, 25년 2회]`
> 
> ① Linear Sequential Method  
> ② Pair Programming  
> ③ Collective Ownership  
> ④ Continuous Integration  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **①**
* **해설:** 
  * **Linear Sequential Method(선형 순차적 모델)**는 폭포수 모델(Waterfall Model) 등 전통적인 방법론의 특징이며, 변화를 빠르게 수용하는 애자일 기반의 XP 원리와는 거리가 멉니다.
  * XP의 핵심 실천 원리로는 짝 프로그래밍(Pair Programming), 공동 소유권(Collective Ownership), 지속적인 통합(Continuous Integration) 등이 있습니다.

</div>
</details>

---

> ### 📝 Q38. 유스케이스 다이어그램(Use Case Diagram)에 관련된 내용으로 틀린 것은? `[22년 2회]`
> 
> ① 시스템과 상호 작용하는 외부 시스템은 액터로 파악해서는 안 된다.  
> ② 유스케이스는 사용자 측면에서의 요구사항으로, 사용자가 원하는 목표를 달성하기 위해 수행할 내용을 기술한다.  
> ③ 시스템 액터는 다른 프로젝트에서 이미 개발되어 사용되고 있으며, 본 시스템과 데이터를 주고받는 등 서로 연동되는 시스템을 말한다.  
> ④ 액터가 인식할 수 없는 시스템 내부의 기능을 하나의 유스케이스로 파악해서는 안 된다.  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **①**
* **해설:** 
  * 액터는 구현 대상이 되는 시스템 외부에 존재하며 상호 작용하는 모든 대상입니다. 따라서 사람 사용자뿐만 아니라, 연동되는 **외부 시스템** 역시 액터로 간주하고 표현할 수 있습니다.

</div>
</details>

---

> ### 📝 Q39. 객체 지향 개념을 활용한 소프트웨어 구현과 관련된 설명 중 틀린 것은? `[22년 2회]`
> 
> ① 객체(Object)란 필요한 자료 구조와 수행되는 함수들을 가진 하나의 독립된 존재이다.  
> ② JAVA에서 정보 은닉(Information Hiding)을 표기할 때 private의 의미는 '공개'이다.  
> ③ 상속(Inheritance)은 개별 클래스를 상속 관계로 묶음으로써 클래스 간의 체계화된 전체 구조를 파악하기 쉽다는 장점이 있다.  
> ④ 같은 클래스에 속하는 개개의 객체이자 하나의 클래스에서 생성된 객체를 인스턴스(Instance)라고 한다.  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **②**
* **해설:** 
  * JAVA 등 객체 지향 프로그래밍 언어에서 `private` 접근 제한자는 외부 공개를 차단하는 **'비공개'**를 의미합니다. (공개는 `public`입니다.)

</div>
</details>

---

> ### 📝 Q33. 요구분석(Requirement Analysis)에 대한 설명으로 틀린 것은? `[21년 3회]`
> 
> ① 요구분석은 소프트웨어 개발의 실제적인 첫 단계로 사용자의 요구에 대해 이해하는 단계라 할 수 있다.  
> ② 요구추출(Requirement Elicitation)은 프로젝트 계획 단계에 정의한 문제의 범위 안에 있는 사용자의 요구를 찾는 단계이다.  
> ③ 도메인 분석(Domain Analysis)은 요구에 대한 정보를 수집하고 배경을 분석하여 이를 토대로 모델링을 하게 된다.  
> ④ 기능적(Functional) 요구에서 시스템 구축에 대한 성능, 보안, 품질, 안정 등에 대한 요구사항을 도출한다.  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **④**
* **해설:** 
  * 시스템 구축에 대한 **성능, 보안, 품질, 안정성** 등은 시스템이 '어떻게' 동작해야 하는지에 대한 제약 사항으로 **비기능적(Non-Functional) 요구사항**에 해당합니다.
  * **기능적 요구사항**은 시스템이 '무엇을' 해야 하는지, 어떤 동작을 수행해야 하는지에 관한 기능적 속성들을 명시하는 것입니다.

</div>
</details>

---

> ### 📝 Q44. UML에서 사물(Things)로 사용할 수 없는 것은? `[23년 1회]`
> 
> ① Behavioral Things  
> ② Structural Things  
> ③ Grouping Things  
> ④ Internet Of Things  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **④**
* **해설:** 
  * UML 사물의 유형은 **구행그주**로 외웁니다.
    * **구조 사물 (Structural Things)**
    * **행동 사물 (Behavioral Things)**
    * **그룹 사물 (Grouping Things)**
    * **주해 사물 (Annotational Things)**
  * *Internet Of Things(사물인터넷)*는 UML 구성요소가 아닌 일반 정보통신 기술 용어입니다.

</div>
</details>

---

> ### 📝 Q45. 스크럼에서 해당 스프린트가 계획된 대로 나아가고 있는지, 정해진 목표를 달성하기 위해 팀 차원의 조정이 필요한지 알 수 있게 하고, 수행할 작업의 진행 상황을 확인할 수 있는 것은? `[23년 1회, 24년 3회]`
> 
> ① User Story  
> ② Burn Down Chart  
> ③ Kanban Board  
> ④ Crystal Chart  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **②**
* **해설:** 
  * **소멸 차트(Burn Down Chart)**는 남은 작업 시간 및 작업량을 날짜별로 누적하여 그래프 형식으로 하향 곡선을 그리며 모니터링하는 시각화 도구로, 계획 대비 실적 현황을 한눈에 보기에 가장 적합합니다.

</div>
</details>

---

> ### 📝 Q47. 다음 중 동적 다이어그램이 아닌 것은?
> 
> ① State Diagram  
> ② Deployment Diagram  
> ③ Activity Diagram  
> ④ Timing Diagram  

<details>
<summary><b>💡 정답 및 해설 보기 (클릭)</b></summary>
<div markdown="1">

* **정답:** **②**
* **해설:** 
  * 행위적(동적) 다이어그램의 대표 주자는 **유시커상활타**입니다. (유스케이스, 시퀀스, 커뮤니케이션, 상태, 활동, 타이밍 등)
  * **Deployment Diagram(배치 다이어그램)**은 물리적 노드의 배치와 정적 연결 구조를 다루므로 정적(구조) 다이어그램에 속합니다.

</div>
</details>
