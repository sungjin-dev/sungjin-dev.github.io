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

14번 문제 

**14. UML(Unified Modeling Language)에 대한 설명 중 틀린 것은?** [21년 2회]
<br>
① 기능적 모델은 사용자 측면에서 본 시스템 기능이며, UML에서는 Use Case Diagram을 사용한다.<br>
② 정적 모델은 객체, 속성, 연관 관계, 오퍼레이션의 시스템 구조를 나타내며, UML에서는 Class Diagram을 사용한다.<br>
③ 동적 모델은 시스템의 내부 동작을 말하며, UML에서는 Sequence Diagram, State Diagram, Activity Diagram을 사용한다.<br>
④ State Diagram은 객체들 사이의 메시지 교환을 나타내며, Sequence Diagram은 하나의 객체가 가진 상태와 그 상태의 변화에 의한 동작 순서를 나타낸다.<br>
<br>
**해설:**
<br>
Sequence Diagram은 객체들 사이의 메시지 교환을 나타내며, State Diagram은 하나의 객체가 가진 상태와 그 상태의 변화에 의한 동작 순서를 나타낸다.
<br>
정답: ④
<br>
18번 문제 
**18. 요구사항 정의 및 분석·설계의 결과물을 표현하기 위한 모델링 과정에서 사용되는 다이어그램(Diagram)이 아닌 것은?** [21년 3회, 24년 2회, 25년 3회]<br>
① Data Flow Diagram<br>
② UML Diagram<br>
③ E-R Diagram<br>
④ AVL Diagram<br>
<br>
**해설:**
<br>
AVL 트리는 스스로 균형을 잡는 이진 탐색 트릿이고, AVL 다이어그램은 존재하지 않는다.
<br>
Data Flow Diagram (DFD): 데이터가 각 프로세스를 따라 흐르면서 변환되는 모습을 표현하는 방식
<br>
UML Diagram: 객체 지향 소프트웨어 개발 과정에서 산출물을 명세화, 시각화, 문서화할 때 사용되는 모델링 기술과 방법론을 통합해서 만든 언어인 UML로 표현하는 방식
<br>
E-R Diagram: 객체 타입과 관계 타입을 기본 개념으로 현실 세계를 개념적으로 표현하는 방식
<br>
정답: ④
<br>
22번 문제 
**22. 애자일 방법론에 해당하지 않는 것은?**[20년 4회]<br>
① 기능 중심 개발<br>
② 스크럼<br>
③ 익스트림 프로그래밍<br>
④ 모듈 중심 개발<br>
<br>
**해설:**
<br>
애자일 방법론은 프로젝트의 요구사항을 모듈 중심으로 정의하지 않고, 기능 중심으로 정의한다.
<br>
정답: ④
<br>

2**3. UML의 기본 구성요소가 아닌 것은?** [20년 4회, 24년 3회, 25년 1회]<br>
① Things<br>
② Terminal<br>
③ Relationship<br>
④ Diagram<br>
<br>
해설:
<br>
사관다: 사물(Things) / 관계(Relationships) / 다이어그램(Diagrams)
<br>
정답: ②
<br>
**24. 다음 중 자료 사전(Data Dictionary)에서 선택의 의미를 나타내는 것은?** [20년 4회]<br>
① [ ]<br>
② { }<br>
③ +<br>
④<br>

**해설:** 자료 사전 기호는 다음과 같다.<br>
<br>
[ ] : 자료의 선택을 나타내는 기호
<br>
{ } : 자료의 반복을 나타내는 기호
<br>
+ : 자료의 연결(and, along with)을 나타내는 기호
<br>
** : 자료의 설명을 나타내는 기호
<br>
정답: ①
<br>
**25. XP(eXtreme Programming)의 기본원리로 볼 수 없는 것은?** [20년 4회, 24년 1회, 25년 2회]<br>
① Linear Sequential Method<br>
② Pair Programming<br>
③ Collective Ownership<br>
④ Continuous Integration<br>
<br>
정답: ①
<br>
**38. 유스케이스 다이어그램(Use Case Diagram)에 관련된 내용으로 틀린 것은?** [22년 2회]<br>
① 시스템과 상호 작용하는 외부 시스템은 액터로 파악해서는 안 된다.<br>
② 유스케이스는 사용자 측면에서의 요구사항으로, 사용자가 원하는 목표를 달성하기 위해 수행할 내용을 기술한다.<br>
③ 시스템 액터는 다른 프로젝트에서 이미 개발되어 사용되고 있으며, 본 시스템과 데이터를 주고받는 등 서로 연동되는 시스템을 말한다.<br>
④ 액터가 인식할 수 없는 시스템 내부의 기능을 하나의 유스케이스로 파악해서는 안 된다.<br>
<br>
**해설:**
<br>
액터는 구현 대상이 아닌 시스템 외부에서 시스템과 상호 작용하는 존재로 사람뿐만 아니라 외부 시스템도 액터로 표현될 수 있다.<br>
<br>
정답: ①
<br>
**39. 객체 지향 개념을 활용한 소프트웨어 구현과 관련된 설명 중 틀린 것은?** [22년 2회]<br>
① 객체(Object)란 필요한 자료 구조와 수행되는 함수들을 가진 하나의 독립된 존재이다.<br>
② JAVA에서 정보 은닉(Information Hiding)을 표기할 때 private의 의미는 '공개'이다.<br>
③ 상속(Inheritance)은 개별 클래스를 상속 관계로 묶음으로써 클래스 간의 체계화된 전체 구조를 파악하기 쉽다는 장점이 있다.<br>
④ 같은 클래스에 속하는 개개의 객체이자 하나의 클래스에서 생성된 객체를 인스턴스(Instance)라고 한다.<br>
<br>
**해설:** private의 의미는 '비공개(제한)'이다.
<br>
정답: ②
<br>
33번 문제 
**33. 요구분석(Requirement Analysis)에 대한 설명으로 틀린 것은?** [21년 3회]<br>
① 요구분석은 소프트웨어 개발의 실제적인 첫 단계로 사용자의 요구에 대해 이해하는 단계라 할 수 있다.<br>
② 요구추출(Requirement Elicitation)은 프로젝트 계획 단계에 정의한 문제의 범위 안에 있는 사용자의 요구를 찾는 단계이다.<br>
③ 도메인 분석(Domain Analysis)은 요구에 대한 정보를 수집하고 배경을 분석하여 이를 토대로 모델링을 하게 된다.<br>
④ 기능적(Functional) 요구에서 시스템 구축에 대한 성능, 보안, 품질, 안정 등에 대한 요구사항을 도출한다.<br>
<br>
**해설:**
<br>
시스템 구축에 대한 성능, 보안, 품질, 안정 등에 대한 요구사항은 비기능적 요구사항에 해당한다.<br>
<br>
기능적 요구사항은 수행될 기능과 관련되어 소프트웨어가 가져야 하는 기능적 속성에 대한 요구사항을 의미한다.
<br>
정답: ④
<br>
**44. UML에서 사물(Things)로 사용할 수 없는 것은?** [23년 1회]<br>
① Behavioral Things<br>
② Structural Things<br>
③ Grouping Things<br>
④ Internet Of Things<br>
<br>
해설:
<br>
구행그주: 구조 사물(Structural Things) / 행동 사물(Behavioral Things) / 그룹 사물(Grouping Things) / 주해 사물(Annotational Things)<br>
<br>
정답: ④
<br>
**45. 스크럼에서 해당 스프린트가 계획된 대로 나아가고 있는지, 정해진 목표를 달성하기 위해 팀 차원의 조정이 필요한지 알 수 있게 하고, 수행할 작업의 진행 상황을 확인할 수 있는 것은?** [23년 1회, 24년 3회]<br>
① User Story<br>
② Burn Down Chart<br>
③ Kanban Board<br>
④ Crystal Chart<br>
<br>
**해설:**
<br>
스크럼에서 해당 스프린트가 계획된 대로 나아가고 있는지, 정해진 목표를 달성하기 위해 팀 차원의 조정이 필요한지 알 수 있게 하고, 수행할 작업의 진행 상황을 확인할 수 있는 차트는 번 다운 차트(Burn Down Chart)이다.<br>
<br>
정답: ②
<br>
47번 문제 
**47. 다음 중 동적 다이어그램이 아닌 것은?** <br>
① State Diagram<br>
② Deployment Diagram<br>
③ Activity Diagram<br>
④ Timing Diagram<br>
<br>
**해설:**
<br>
유시커상활타: 유스케이스(Usecase) / 시퀀스(Sequence) / 커뮤니케이션(Communication) / 상태(State) / 활동(Activity) / 타이밍(Timing) 등은 행위적(동적) 다이어그램이다. Deployment(배치) 다이어그램은 구조적(정적) 다이어그램에 해당한다.
<br>
정답: ②<br>

