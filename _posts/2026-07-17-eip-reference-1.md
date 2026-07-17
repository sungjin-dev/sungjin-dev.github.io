---
title: " [정처기 공부 #1] 요약 노트"
excerpt: "주요 용어 정리"
categories: [EIP]
order: 7
tags:
  - EIP
toc: true
toc_sticky: true
published: false
---

# 정보처리기사 필기 핵심 요약 (초치기)

> 시험에 나오는 것만 공부한다!

---

## <span style="background:#00a5e3;color:#fff;padding:3px 14px;border-radius:3px">1과목</span> 소프트웨어 설계

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">001</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">소프트웨어 공학의 기본 원칙</span>

- 현대적인 프로그래밍 기술을 계속적으로 적용해야 한다.
- 개발된 소프트웨어의 품질이 유지되도록 지속적으로 검증해야 한다.
- 소프트웨어 개발 관련 사항 및 결과에 대한 명확한 기록을 유지해야 한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">002</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">폭포수 모형</span>

- 이전 단계로 돌아갈 수 없다는 전제하에 각 단계를 확실히 매듭짓고 다음 단계를 진행하는 개발 방법론이다.
- 보헴이 제시한 고전적 생명 주기 모형이다.
- 요구사항을 반영하기 어렵다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">003</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">나선형 모형</span>

- 나선을 따라 돌듯이 점진적으로 완벽한 최종 소프트웨어를 개발하는 것이다.
- '계획 수립 → 위험 분석 → 개발 및 검증 → 고객 평가' 과정이 반복적으로 수행된다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">004</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">애자일 모형의 주요 방법론</span>

- 스크럼(Scrum)
- XP(eXtreme Programming)
- 기능 중심 개발(FDD; Feature Driven Development)
- 칸반(Kanban)
- Lean

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">005</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">애자일 개발 4가지 핵심 가치</span>

- 프로세스와 도구보다는 **개인과 상호작용**에 더 가치를 둔다.
- 방대한 문서보다는 **실행되는 SW**에 더 가치를 둔다.
- 계약 협상보다는 **고객과 협업**에 더 가치를 둔다.
- 계획을 따르기 보다는 **변화에 반응**하는 것에 더 가치를 둔다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">006</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">XP의 핵심 가치</span>

- 의사소통(Communication)
- 단순성(Simplicity)
- 용기(Courage)
- 존중(Respect)
- 피드백(Feedback)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">007</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">주요 비기능 요구사항</span>

- 성능 요구사항
- 보안 요구사항
- 품질 요구사항
- 제약사항
- 인터페이스 요구사항

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">008</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">요구사항 개발 프로세스</span>

`도출(Elicitation)` → `분석(Analysis)` → `명세(Specification)` → `확인(Validation)`

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">009</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">요구사항 분석</span>

- 개발 대상에 대한 사용자의 요구사항을 이해하고 문서화(명세화)하는 활동을 의미한다.
- 소프트웨어 개발의 실제적인 첫 단계이다.
- 사용자 요구의 타당성을 조사하고 비용과 일정에 대한 제약을 설정한다.
- 사용자의 요구를 정확하게 추출하여 목표를 정하고, 해결 방식을 결정한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">010</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">자료 흐름도의 구성 요소</span>

| 기호 | 표기법 |
|---|---|
| 프로세스(Process) | 원 안에 표기 (예: 물품 확인) |
| 자료 흐름(Data Flow) | 화살표 (예: 물품 코드 →) |
| 자료 저장소(Data Store) | 평행선 (예: 물품대장) |
| 단말(Terminator) | 사각형 (예: 공장) |

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">011</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">자료 사전의 표기 기호</span>

- `=` : 정의
- `+` : 연결
- `( )` : 생략
- `[ | ]` : 선택
- `{ }` : 반복
- `* *` : 설명

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">012</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">HIPO</span>

- 하향식 소프트웨어 개발을 위한 문서화 도구이다.
- 기호, 도표 등을 사용하므로 보기 쉽고 이해하기도 쉽다.
- 기능과 자료의 의존 관계를 동시에 표현할 수 있다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">013</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">UML</span>

- 시스템 개발자와 고객 또는 개발자 상호 간의 의사소통이 원활하게 이루어지도록 표준화한 대표적인 객체지향 모델링 언어이다.
- **구성 요소** : 사물(Things), 관계(Relationships), 다이어그램(Diagram)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">014</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">UML의 주요 관계</span>

- **일반화(Generalization) 관계** : 하나의 사물이 다른 사물에 비해 더 일반적인지 구체적인지를 표현
- **의존(Dependency) 관계** : 필요에 의해 서로에게 영향을 주는 짧은 시간 동안만 연관을 유지하는 관계를 표현
- **실체화(Realization) 관계** : 사물이 할 수 있거나 해야 하는 기능으로 서로를 그룹화 할 수 있는 관계를 표현

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">015</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">구조적(Structural) 다이어그램의 종류</span>

- 클래스 다이어그램(Class Diagram)
- 객체 다이어그램(Object Diagram)
- 컴포넌트 다이어그램(Component Diagram)
- 배치 다이어그램(Deployment Diagram)
- 복합체 구조 다이어그램(Composite Structure Diagram)
- 패키지 다이어그램(Package Diagram)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">016</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">행위(Behavioral) 다이어그램의 종류</span>

- 유스케이스 다이어그램(Use Case Diagram)
- 순차 다이어그램(Sequence Diagram)
- 커뮤니케이션 다이어그램(Communication Diagram)
- 상태 다이어그램(State Diagram)
- 활동 다이어그램(Activity Diagram)
- 상호작용 개요 다이어그램(Interaction Overview Diagram)
- 타이밍 다이어그램(Timing Diagram)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">017</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">스테레오 타입</span>

- UML에서 표현하는 기본 기능 외에 추가적인 기능을 표현하기 위해 사용한다.
- 길러멧(Guilemet)이라고 부르는 겹화살괄호(<< >>) 사이에 표현할 형태를 기술한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">018</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">유스케이스 다이어그램 - 액터(Actor)</span>

- 시스템과 상호작용을 하는 모든 외부 요소로, 사람이나 외부 시스템을 의미한다.
- **주액터** : 시스템을 사용함으로써 이득을 얻는 대상으로, 주로 사람이 해당함
- **부액터** : 주액터의 목적 달성을 위해 시스템에 서비스를 제공하는 외부 시스템으로, 조직이나 기관 등이 될 수 있음

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">019</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">순차(Sequence) 다이어그램의 구성 요소</span>

- 액터(Actor)
- 객체(Object)
- 생명선(Lifeline)
- 실행 상자(Active Box)
- 메시지(Message)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">020</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">사용자 인터페이스의 특징</span>

- 사용자의 편리성과 가독성을 높여준다.
- 작업 시간을 단축시킨다.
- 업무에 대한 이해도를 높여준다.
- 사용자 중심으로 설계되어 있다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">021</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">사용자 인터페이스의 구분</span>

- **CLI(Command Line Interface)** : 명령과 출력이 텍스트 형태로 이뤄지는 인터페이스
- **GUI(Graphical User Interface)** : 아이콘이나 메뉴를 마우스로 선택하여 작업을 수행하는 그래픽 환경의 인터페이스
- **NUI(Natural User Interface)** : 사용자의 말이나 행동으로 기기를 조작하는 인터페이스

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">022</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">사용자 인터페이스의 기본 원칙</span>

- **직관성** : 누구나 쉽게 이해하고 사용할 수 있어야 한다.
- **유효성** : 사용자의 목적을 정확하고 완벽하게 달성해야 한다.
- **학습성** : 누구나 쉽게 배우고 익힐 수 있어야 한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">023</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">목업</span>

- 와이어프레임보다 좀 더 실제 화면과 유사하게 만든 정적인 형태의 모형이다.
- 시각적으로만 구성 요소를 배치하는 것으로 실제로 구현되지는 않는다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">024</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">ISO/IEC 9126의 품질 특성</span>

- **기능성(Functionality)** : 요구사항을 정확하게 만족하는 기능을 제공하는지 여부를 나타냄
- **신뢰성(Reliability)** : 요구된 기능을 오류 없이 수행할 수 있는 정도를 나타냄
- **사용성(Usability)** : 사용자가 쉽게 배우고 사용할 수 있는 정도를 나타냄
- **이식성(Portability)** : 다른 환경에서도 얼마나 쉽게 적용할 수 있는지 정도를 나타냄

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">025</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">소프트웨어 아키텍처의 설계 과정</span>

설계 목표 설정 → 시스템 타입 결정 → 아키텍처 패턴 적용 → 서브시스템 구체화 → 검토

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">026</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">모듈화</span>

- 기능의 분리가 가능하여 인터페이스가 단순해진다.
- 프로그램의 효율적인 관리가 가능하다.
- 오류의 파급 효과를 최소화할 수 있다.
- 모듈의 크기를 너무 작게 나누면 개수가 많아져 모듈간의 통합 비용이 많이 들고, 너무 크게 나누면 개수가 적어 통합 비용은 적게 들지만 모듈 하나의 개발 비용이 많이 든다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">027</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">추상화의 유형</span>

- 과정 추상화
- 데이터(자료) 추상화
- 제어 추상화

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">028</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">정보 은닉</span>

- 한 모듈 내부에 포함된 절차와 자료들의 정보가 감추어져 다른 모듈이 접근하거나 변경하지 못하도록 하는 기법이다.
- 모듈을 독립적으로 수행할 수 있다.
- 수정, 시험, 유지보수가 용이하다.
- 정보 은닉을 표기할 때 private의 의미는 은닉이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">029</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">파이프 - 필터 패턴</span>

- 시스템의 처리 결과물을 파이프를 통해 전달받아 처리한 후 그 결과물을 다시 파이프를 통해 다음 시스템으로 넘겨주는 패턴이다.
- 데이터 변환으로 인한 오버헤드가 발생한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">030</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">MVC (Model-View-Controller) 패턴</span>

- **모델(Model)** : 서브시스템의 핵심 기능과 데이터를 보관함
- **뷰(View)** : 사용자에게 정보를 표시함
- **컨트롤러(Controller)** : 사용자로부터 입력된 변경 요청을 처리하기 위해 모델에게 명령을 보냄

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">031</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">메시지(Message)</span>

- 객체에게 어떤 행위를 하도록 지시하는 명령 또는 요구사항이다.
- 객체들 간에 상호 작용을 하는 데 사용되는 수단이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">032</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">클래스(Class)</span>

- 공통된 속성과 연산(행위)을 갖는 객체의 집합이다.
- 클래스에 속한 각각의 객체를 인스턴스(Instance)라 한다.
- 객체지향 프로그램에서 데이터를 추상화하는 단위이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">033</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">캡슐화(Encapsulation)</span>

- 데이터와 데이터를 처리하는 함수를 하나로 묶는 것을 의미한다.
- 외부 모듈의 변경으로 인한 파급 효과가 적다.
- 인터페이스가 단순화된다.
- 재사용이 용이하다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">034</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">상속(Inheritance)</span>

상위 클래스(부모 클래스)의 모든 속성과 연산을 하위 클래스(자식 클래스)가 물려받는 것이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">035</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">다형성(Polymorphism)</span>

- **오버로딩(Overloading)** : 메소드의 이름은 같지만 인수를 받는 자료형과 개수를 달리하여 여러 기능을 정의할 수 있음
- **오버라이딩(Overriding)** : 메소드의 이름은 같지만 메소드 안의 실행 코드를 달리하여 자식 클래스에서 재정의해서 사용할 수 있음

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">036</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">객체지향 분석 방법론 - Coad와 Yourdon 방법</span>

- E-R 다이어그램을 사용하여 객체의 행위를 모델링한다.
- 객체 식별, 구조 식별, 주제 정의, 속성과 인스턴스 연결 정의, 연산과 메시지 연결 정의 등의 과정으로 구성하는 기법이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">037</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">럼바우(Rumbaugh)의 분석 기법</span>

- **객체(Object) 모델링** : 정보 모델링이라고도 하며, 객체들 간의 관계를 규정하여 객체 다이어그램으로 표시하는 것
- **동적(Dynamic) 모델링** : 상태 다이어그램을 이용하여 객체들 간의 동적인 행위를 표현하는 모델링
- **기능(Functional) 모델링** : 자료 흐름도를 이용하여 자료 흐름을 표현한 모델링

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">038</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">객체지향 설계 원칙(SOLID 원칙)</span>

- **단일 책임 원칙(SRP; Single Responsibility Principle)** : 객체는 단 하나의 책임만 가져야 한다는 원칙
- **개방-폐쇄 원칙(OCP; Open-Closed Principle)** : 기존의 코드를 변경하지 않고 기능을 추가할 수 있도록 설계해야 한다는 원칙
- **리스코프 치환 원칙(LSP; Liskov Substitution Principle)** : 자식 클래스는 최소한 자신의 부모 클래스에서 가능한 행위는 수행할 수 있어야 한다는 설계 원칙
- **인터페이스 분리 원칙(ISP; Interface Segregation Principle)** : 자신이 사용하지 않는 인터페이스와 의존 관계를 맺거나 영향을 받지 않아야 한다는 원칙
- **의존 역전 원칙(DIP; Dependency Inversion Principle)** : 각 객체들 간의 의존 관계가 성립될 때, 추상성이 낮은 클래스보다 추상성이 높은 클래스와 의존 관계를 맺어야 한다는 원칙

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">039</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">모듈(Module)</span>

- 모듈화를 통해 분리된 시스템의 각 기능들이다.
- 단독으로 컴파일이 가능하다.
- 재사용 할 수 있다.
- 다른 모듈에서의 접근이 가능하다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">040</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">결합도의 정도(약함 → 강함)</span>

자료 결합도 → 스탬프 결합도 → 제어 결합도 → 외부 결합도 → 공통 결합도 → 내용 결합도

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">041</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">결합도의 종류</span>

- **자료(Data) 결합도** : 모듈 간의 인터페이스가 자료 요소로만 구성될 때의 결합도
- **스탬프(Stamp) 결합도** : 배열이나 레코드 등의 자료 구조가 전달될 때의 결합도
- **제어(Control) 결합도** : 제어 신호를 이용하여 통신하거나 제어 요소를 전달하는 결합도
- **외부(External) 결합도** : 데이터(변수)를 외부의 다른 모듈에서 참조할 때의 결합도
- **공통(Common) 결합도** : 공유되는 공통 데이터 영역을 여러 모듈이 사용할 때의 결합도
- **내용(Content) 결합도** : 다른 모듈의 내부 자료를 직접 참조하거나 수정할 때의 결합도

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">042</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">응집도의 정도(약함 → 강함)</span>

우연적 응집도 → 논리적 응집도 → 시간적 응집도 → 절차적 응집도 → 교환적 응집도 → 순차적 응집도 → 기능적 응집도

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">043</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">주요 응집도</span>

- **절차적(Procedural) 응집도** : 모듈 안의 구성 요소들이 그 기능을 순차적으로 수행할 경우의 응집도
- **시간적(Temporal) 응집도** : 특정 시간에 처리되는 몇 개의 기능을 모아 하나의 모듈로 작성할 경우의 응집도
- **우연적(Coincidental) 응집도** : 각 구성 요소들이 서로 관련 없는 요소로만 구성된 경우의 응집도

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">044</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">팬인(Fan-In) / 팬아웃(Fan-Out)</span>

- **팬인** : 어떤 모듈을 제어(호출)하는 모듈의 수
- **팬아웃** : 어떤 모듈에 의해 제어(호출)되는 모듈의 수

> **예제** : 다음의 시스템 구조도에서 각 모듈의 팬인(Fan-In)과 팬아웃(Fan-Out)을 구하시오.

```
        A
      / | \
     B  C  D
    /|  |  |\
   E |  F  | G
   | |_/|\_| |
   H    I----
```
(A → B·C·D, B → E·H, C → F, D → F·G, E → H, F → I, G → I)

> **해설**
> - 팬인(Fan-In) : A는 0, B·C·D·E·G는 1, F·H·I는 2
> - 팬아웃(Fan-Out) : H·I는 0, C·E·F·G는 1, B·D는 2, A는 3

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">045</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">NS 차트</span>

- 논리의 기술에 중점을 둔 도형을 이용한 표현 방법이다.
- 연속, 선택 및 다중 선택, 반복 등의 제어 논리 구조를 표현한다.
- GOTO나 화살표를 사용하지 않는다.
- 시각적으로 명확히 식별하는 데 적합하다.
- 이해하기 쉽고, 코드 변환이 용이하다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">046</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">재사용(Reuse)</span>

- 이미 개발된 기능을 새로운 시스템이나 기능 개발에 사용할 수 있는 정도를 의미한다.
- **재사용 규모에 따른 분류** : 함수와 객체, 컴포넌트, 애플리케이션

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">047</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">효과적인 모듈 설계 방안</span>

- 결합도는 줄이고 응집도는 높인다.
- 복잡도와 중복성을 줄인다.
- 일관성을 유지시킨다.
- 모듈의 기능은 지나치게 제한적이어서는 안 된다.
- 유지보수가 용이해야 한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">048</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">주요 코드</span>

- **순차 코드** : 일정 기준에 따라서 차례로 일련번호를 부여하는 방법
- **표의 숫자 코드** : 코드화 대상 항목의 중량, 면적, 용량 등의 물리적 수치를 적용시키는 방법

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">049</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">디자인 패턴(Design Pattern)</span>

- 세부적인 구현 방안을 설계할 때 참조할 수 있는 전형적인 해결 방식 또는 예제를 의미한다.
- **디자인 패턴 유형** : 생성 패턴, 구조 패턴, 행위 패턴

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">050</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">생성 패턴(Creational Pattern)</span>

- **추상 팩토리(Abstract Factory)** : 서로 연관·의존하는 객체들의 그룹으로 생성하여 추상적으로 표현함
- **빌더(Builder)** : 작게 분리된 인스턴스를 건축하듯이 조합하여 객체를 생성함
- **팩토리 메소드(Factory Method)** : 객체 생성을 서브 클래스에서 처리하도록 분리하여 캡슐화한 패턴으로, 가상 생성자(Virtual Constructor) 패턴이라고도 함
- **프로토타입(Prototype)** : 원본 객체를 복제하는 방법으로 객체를 생성함
- **싱글톤(Singleton)** : 생성된 객체를 여러 프로세스가 동시에 참조할 수는 없음

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">051</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">구조 패턴(Structural Pattern)</span>

- **어댑터(Adapter)** : 인터페이스를 다른 클래스가 재사용할 수 있도록 변환함
- **브리지(Bridge)** : 서로가 독립적으로 확장할 수 있도록 구성함
- **컴포지트(Composite)** : 복합 객체와 단일 객체를 구분 없이 다루고자 할 때 사용함
- **데코레이터(Decorator)** : 부가적인 기능을 추가하기 위해 다른 객체들을 덧붙이는 방식으로 구현함
- **퍼싸드(Facade)** : 복잡한 서브 클래스들을 피해 더 상위에 인터페이스를 구성함
- **플라이웨이트(Flyweight)** : 가능한 한 인스턴스를 공유해서 사용함으로써 메모리를 절약하는 패턴
- **프록시(Proxy)** : 접근이 어려운 객체와 여기에 연결하려는 객체 사이에서 인터페이스 역할을 수행하는 패턴

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">052</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">행위 패턴 (Behavioral Pattern)</span>

- **책임 연쇄(Chain of Responsibility)** : 요청을 한 객체가 처리하지 못하면 다음 객체로 넘어가는 형태
- **커맨드(Command)** : 재이용하거나 취소할 수 있도록 요청에 필요한 정보를 저장함
- **인터프리터(Interpreter)** : 언어에 문법 표현을 정의함
- **반복자(Iterator)** : 접근이 잦은 객체에 대해 동일한 인터페이스를 사용하도록 함
- **중재자(Mediator)** : 복잡한 상호 작용을 캡슐화하여 객체로 정의함
- **메멘토(Memento)** : 객체를 해당 시점의 상태로 돌릴 수 있는 기능을 제공, Ctrl+Z와 같은 되돌리기 기능을 개발할 때 주로 이용함
- **옵서버(Observer)** : 객체에 상속되어 있는 다른 객체들에게 변화된 상태를 전달함
- **상태(State)** : 객체의 상태에 따라 동일한 동작을 다르게 처리해야 할 때 사용함
- **전략(Strategy)** : 동일한 계열의 알고리즘들을 상호 교환할 수 있게 정의함
- **템플릿 메소드(Template Method)** : 하위 클래스에서 세부 처리를 구체화함
- **방문자(Visitor)** : 처리 기능을 분리하여 별도의 클래스로 구성함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">053</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">요구사항 검증 방법</span>

- **동료검토(Peer Review)** : 작성자가 명세서 내용을 직접 설명하면서 결함을 발견함
- **워크스루(Walk Through)** : 미리 배포한 명세서를 사전 검토한 후 결함을 발견함
- **인스펙션(Inspection)** : 작성자를 제외한 다른 검토 전문가들이 결함을 발견함
- 동료검토와 워크스루가 비공식적인 검토 방법인데 반해 인스펙션은 공식적인 검토 방법이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">054</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">미들웨어(Middleware)</span>

- 분산 컴퓨팅 환경에서 서로 다른 기종 간을 연결한다.
- 운영체제와 응용 프로그램 사이에서 다양한 서비스를 제공한다.
- 위치 투명성을 제공한다.
- 사용자가 미들웨어의 내부 동작을 확인하려면 별도의 응용 소프트웨어를 사용해야 한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">055</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">미들웨어의 종류</span>

- DB(DataBase)
- RPC(Remote Procedure Call)
- MOM(Message Oriented Middleware)
- TP(Transaction Processing)-Monitor
- ORB(Object Request Broker)
- WAS(Web Application Server)

---

## <span style="background:#00a5e3;color:#fff;padding:3px 14px;border-radius:3px">2과목</span> 소프트웨어 개발

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">056</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">자료 구조의 분류</span>

- **선형 구조** : 배열, 선형 리스트, 스택, 큐, 데크
- **비선형 구조** : 트리, 그래프

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">057</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">스택(Stack)</span>

- 리스트의 한쪽 끝으로만 자료의 삽입, 삭제 작업이 이루어지는 자료 구조이다.
- 가장 나중에 삽입된 자료가 가장 먼저 삭제되는 후입선출(LIFO) 방식으로 자료를 처리한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">058</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">스택의 응용 분야</span>

- 인터럽트의 처리
- 수식 계산 및 수식 표기법
- 서브루틴 호출 및 복귀 주소 저장

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">059</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">스택의 삽입(Push)과 삭제(Pop)</span>

- **PUSH** : 스택에 자료를 입력하는 명령
- **POP** : 스택에서 자료를 출력하는 명령

> **예제** : 순서가 A, B, C, D로 정해진 입력 자료를 스택에 입력하였다가 B, C, D, A 순서로 출력하는 과정을 나열하시오.

```
PUSH A → PUSH B → POP B → PUSH C → POP C → PUSH D → POP D → POP A
출력 순서 : B → BC → BCD → BCDA
```

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">060</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">방향/무방향 그래프의 최대 간선 수</span>

- 무방향 그래프의 최대 간선 수 : **n(n-1)/2**
- 방향 그래프의 최대 간선 수 : **n(n-1)**

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">061</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">트리(Tree)</span>

정점(Node, 노드)과 선분(Branch, 가지)을 이용하여 사이클을 이루지 않도록 구성한 그래프(Graph)의 특수한 형태이다.

```
Level 1 :           A
Level 2 :      B    C     D
Level 3 :    E  F   G   H I J
Level 4 :   K L         M        → Depth
```

- **디그리(Degree, 차수)** : 각 노드에서 뻗어 나온 가지의 수
  - 예) A = 3, B = 2, C = 1, D = 3
- **단말 노드(Terminal Node) = 잎 노드(Leaf Node)** : 자식이 하나도 없는 노드, 즉 디그리가 0인 노드
  - 예) K, L, F, G, M, I, J

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">062</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">이진 트리의 운행법</span>

> 예) 다음 트리를 Inorder, Preorder, Postorder 방법으로 운행했을 때 각 노드를 방문한 순서는?

```
        A
      /   \
     B     C
    / \   / \
   D   E F   G
  / \
 H   I
```

**Preorder 운행법의 방문 순서**
1. Preorder는 Root → Left → Right이므로 A13이 된다.
2. 1은 B2E이므로 AB2E3이 된다.
3. 2는 DHI이므로 ABDHIE3이 된다.
4. 3은 CFG이므로 ABDHIECFG가 된다.
- ∴ 방문 순서 : **ABDHIECFG**

**Inorder 운행법의 방문 순서**
1. Inorder는 Left → Root → Right이므로 1A3이 된다.
2. 1은 2BE이므로 2BEA3이 된다.
3. 2는 HDI이므로 HDIBEA3이 된다.
4. 3은 FCG이므로 HDIBEAFCG가 된다.
- ∴ 방문 순서 : **HDIBEAFCG**

**Postorder의 방문 순서**
1. Postorder는 Left → Right → Root이므로 13A가 된다.
2. 1은 2EB이므로 2EB3A가 된다.
3. 2는 HID이므로 HIDEB3A가 된다.
4. 3은 FGC이므로 HIDEBFGCA가 된다.
- ∴ 방문 순서 : **HIDEBFGCA**

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">063</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">수식의 표기법(Infix → Postfix)</span>

Infix로 표기된 수식에서 연산자를 해당 피연산자 두 개의 뒤(오른쪽)에 오도록 이동하면 Postfix가 된다.

```
X = A / B * (C + D) + E  →  X A B / C D + * E + =
```

1. 연산 우선순위에 따라 괄호로 묶는다.
   `( X = ( ( (A / B) * (C + D) ) + E ) )`
2. 연산자를 해당 괄호의 뒤로 옮긴다.
   `( X ( ( (AB) / (CD) + ) * E ) + ) =`
3. 괄호를 제거한다.
   `X A B / C D + * E + =`

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">064</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">수식의 표기법(Infix → Prefix)</span>

Infix로 표기된 수식에서 연산자를 해당 피연산자 두 개의 앞(왼쪽)에 오도록 이동하면 Prefix가 된다.

```
X = A / B * (C + D) + E  →  X + * / A B + C D E
```

1. 연산 우선순위에 따라 괄호로 묶는다.
   `( X = ( ( (A / B) * (C + D) ) + E ) )`
2. 연산자를 해당 괄호의 앞으로 옮긴다.
   `= ( X + ( * ( / (A B) + (C D) ) E ) )`
3. 괄호를 제거한다.
   `= X + * / A B + C D E`

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">065</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">수식의 표기법(Postfix → Infix)</span>

Postfix는 Infix 표기법에서 연산자를 해당 피연산자 2개의 뒤(오른쪽)로 이동한 것이므로 연산자를 다시 해당 피연산자 2개의 가운데로 옮기면 된다.

```
A B C - / D E F + * +  →  A / (B - C) + D * (E + F)
```

1. 인접한 피연산자 2개와 오른쪽의 연산자를 괄호로 묶는다.
   `( ( A (B C -) / ) ( D (E F +) * ) + )`
2. 연산자를 해당 피연산자의 가운데로 이동시킨다.
   `( ( A / (B - C) ) + ( D * (E + F) ) )`
3. 필요 없는 괄호를 제거한다.
   `A / (B - C) + D * (E + F)`

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">066</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">삽입 정렬(Insertion Sort)</span>

> **예제** : 8, 5, 6, 2, 4를 삽입 정렬로 정렬하시오.

- **초기 상태** : `8 5 6 2 4`
- **1회전** : `8 5 6 2 4` → `5 8 6 2 4`
  - 두 번째 값을 첫 번째 값과 비교하여 5를 첫 번째 자리에 삽입하고 8을 한 칸 뒤로 이동시킨다.
- **2회전** : `5 8 6 2 4` → `5 6 8 2 4`
  - 세 번째 값을 첫 번째, 두 번째 값과 비교하여 6을 8자리에 삽입하고 8을 한 칸 뒤로 이동시킨다.
- **3회전** : `5 6 8 2 4` → `2 5 6 8 4`
  - 네 번째 값 2를 처음부터 비교하여 맨 처음에 삽입하고 나머지를 한 칸씩 뒤로 이동시킨다.
- **4회전** : `2 5 6 8 4` → `2 4 5 6 8`
  - 다섯 번째 값 4를 처음부터 비교하여 5자리에 삽입하고 나머지를 한 칸씩 뒤로 이동시킨다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">067</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">선택 정렬(Selection Sort)</span>

> **예제** : 8, 5, 6, 2, 4를 선택 정렬로 정렬하시오.

- **초기 상태** : `8 5 6 2 4`
- **1회전** : `5 8 6 2 4` → `5 8 6 2 4` → `2 8 6 5 4` → `2 8 6 5 4`
- **2회전** : `2 6 8 5 4` → `2 5 8 6 4` → `2 4 8 6 5`
- **3회전** : `2 4 6 8 5` → `2 4 5 8 6`
- **4회전** : `2 4 5 6 8`

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">068</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">버블 정렬(Bubble Sort)</span>

> **예제** : 8, 5, 6, 2, 4를 버블 정렬로 정렬하시오.

- **초기 상태** : `8 5 6 2 4`
- **1회전** : `5 8 6 2 4` → `5 6 8 2 4` → `5 6 2 8 4` → `5 6 2 4 8`
- **2회전** : `5 6 2 4 8` → `5 2 6 4 8` → `5 2 4 6 8`
- **3회전** : `2 5 4 6 8` → `2 4 5 6 8`
- **4회전** : `2 4 5 6 8`

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">069</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">이분 검색(이진 검색)</span>

- 검색할 데이터가 정렬되어 있어야 한다.
- 비교 횟수를 거듭할 때마다 검색 대상이 되는 데이터의 수가 절반으로 줄어든다.
- 탐색 효율이 좋다.
- 탐색 시간이 적게 소요된다.
- **중간 레코드 번호(M)** : (F+L) / 2 (단, F : 첫 번째 레코드 번호, L : 마지막 레코드 번호)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">070</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">주요 해싱 함수</span>

- **제산법(Division)** : 레코드 키 값(K)을 해시표(Hash Table)의 크기보다 큰 수 중에서 가장 작은 소수(Prime, Q)로 나눈 나머지를 홈 주소로 삼는 방식
- **제곱법(Mid-Square)** : 레코드 키 값(K)을 제곱한 후 그 중간 부분의 값을 홈 주소로 삼는 방식
- **폴딩법(Folding)** : 레코드 키 값(K)을 여러 부분으로 나눈 후 각 부분의 값을 더하거나 XOR한 값을 홈 주소로 삼는 방식
- **숫자 분석법(Digit Analysis)** : 키 값을 이루는 숫자의 분포를 분석하여 비교적 고른 자리를 필요한 만큼 선택해서 홈 주소로 삼는 방식

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">071</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">스키마 3계층</span>

- **외부 스키마** : 사용자나 응용 프로그래머가 각 개인의 입장에서 필요로 하는 데이터베이스의 논리적 구조를 정의한 것
- **개념 스키마** : 데이터베이스의 전체적인 논리적 구조로서, 개체 간의 관계와 제약 조건을 나타내고, 데이터베이스의 접근 권한, 보안 및 무결성 규칙에 관한 명세를 정의함
- **내부 스키마** : 물리적 저장장치의 입장에서 본 데이터베이스 구조로서, 실제로 데이터베이스에 저장될 레코드의 형식을 정의하고 저장 데이터 항목의 표현 방법, 내부 레코드의 물리적 순서 등을 나타냄

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">072</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">빌드 자동화 도구</span>

- **Ant** : 아파치 소프트웨어 재단에서 개발한 소프트웨어
- **Maven** : Ant의 대안으로 개발한 소프트웨어
- **Jenkins** : JAVA 기반의 오픈 소스 형태의 빌드 자동화 도구
- **Gradle** : Groovy를 기반으로 한 오픈 소스 형태의 빌드 자동화 도구

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">073</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">소프트웨어 패키징</span>

- 모듈별로 생성한 실행 파일들을 묶어 배포용 설치 파일을 만드는 것이다.
- 개발자가 아니라 사용자를 중심으로 진행한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">074</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">소프트웨어 패키징 시 고려사항</span>

- 내부 콘텐츠에 대한 암호화 및 보안을 고려한다.
- 다른 여러 콘텐츠 및 단말기 간 DRM(디지털 저작권 관리) 연동을 고려한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">075</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">DRM(디지털 저작권 관리)의 구성 요소</span>

- **클리어링 하우스(Clearing House)** : 저작권에 대한 사용 권한, 라이선스 발급, 사용량에 따른 결제 관리 등을 수행하는 곳
- **콘텐츠 제공자(Contents Provider)** : 콘텐츠를 제공하는 저작권자
- **패키저(Packager)** : 콘텐츠를 메타 데이터와 함께 배포 가능한 형태로 묶어 암호화하는 프로그램
- **콘텐츠 분배자(Contents Distributor)** : 암호화된 콘텐츠를 유통하는 곳이나 사람
- **DRM 컨트롤러(DRM Controller)** : 배포된 콘텐츠의 이용 권한을 통제하는 프로그램

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">076</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">DRM(디지털 저작권 관리)의 기술 요소</span>

- 콘텐츠 암호화 및 키 관리
- 콘텐츠 식별체계 표현
- 라이선스 발급 및 관리
- 정책 관리 기술
- 크랙 방지 기술

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">077</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">소프트웨어 설치 매뉴얼</span>

- 설치 매뉴얼은 사용자를 기준으로 작성한다.
- **기본 사항** : 소프트웨어 개요, 설치 관련 파일, 프로그램 삭제 등

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">078</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">형상 관리(SCM)</span>

- 소프트웨어의 개발 과정에서 소프트웨어의 변경 사항을 관리하기 위해 개발된 일련의 활동이다.
- **목적** : 개발 비용 감소, 방해 요인 최소화
- **관리 항목** : 소스 코드, 프로젝트 분석서, 운영 및 설치 지침서 등
- **형상 관리 도구** : Git, CVS, Subversion 등

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">079</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">소프트웨어의 버전 등록 관련 주요 기능</span>

- **체크아웃(Check-Out)** : 프로그램을 수정하기 위해 저장소에서 파일을 받아옴
- **체크인(Check-In)** : 체크아웃 한 파일의 수정을 완료한 후 저장소의 파일을 새로운 버전으로 갱신함
- **커밋(Commit)** : 체크인을 수행할 때 이전에 갱신된 내용이 있는 경우에는 충돌(Conflict)을 알리고 diff 도구를 이용해 수정한 후 갱신을 완료함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">080</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">파레토 법칙(Pareto Principle)</span>

소프트웨어 테스트에서 오류의 80%는 전체 모듈의 20% 내에서 발견된다는 법칙이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">081</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">화이트박스 테스트 (White Box Test)</span>

- 모듈의 원시 코드를 오픈시킨 상태에서 원시 코드의 논리적인 모든 경로를 테스트하여 테스트 케이스를 설계하는 방법이다.
- 프로그램의 제어 구조에 따라 선택, 반복 등의 분기점 부분들을 수행함으로써 논리적 경로를 제어한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">082</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">화이트박스 테스트의 종류</span>

- 기초 경로 검사
- 제어 구조 검사 : 조건 검사, 루프 검사, 데이터 흐름 검사

※ **기초 경로(Base Path = Basis Path)** : 수행 가능한 모든 경로를 의미함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">083</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">블랙박스 테스트 종류</span>

- 동치 분할 검사
- 경계값 분석
- 원인-효과 그래프 검사
- 오류 예측 검사
- 비교 검사

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">084</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">단위 테스트(Unit Test)</span>

코딩 직후 소프트웨어 설계의 최소 단위인 모듈이나 컴포넌트에 초점을 맞춰 테스트하는 것이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">085</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">단위 테스트로 발견 가능한 오류</span>

- 알고리즘 오류에 따른 원치 않는 결과
- 탈출구가 없는 반복문의 사용
- 틀린 계산 수식에 의한 잘못된 결과

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">086</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">인수 테스트의 종류</span>

- **알파 테스트** : 개발자의 장소에서 사용자가 개발자 앞에서 행하는 테스트 기법
- **베타 테스트** : 선정된 최종 사용자가 여러 명의 사용자 앞에서 행하는 테스트 기법으로, 필드 테스팅(Field Testing)이라고도 불림

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">087</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">통합 테스트 (Integration Test)</span>

- **하향식 통합 테스트** : 프로그램의 상위 모듈에서 하위 모듈 방향으로 통합하면서 테스트하는 기법으로, 깊이 우선 통합법이나 넓이 우선 통합법을 사용함
- **상향식 통합 테스트** : 프로그램의 하위 모듈에서 상위 모듈 방향으로 통합하면서 테스트하는 기법

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">088</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">테스트 드라이버(Test Driver)</span>

- 테스트 대상의 하위 모듈을 호출하는 도구이다.
- 매개 변수(Parameter)를 전달하고, 모듈 테스트 수행 후의 결과를 도출한다.
- **상향식 통합 테스트**에 사용된다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">089</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">테스트 스텁(Test Stub)</span>

- 일시적으로 필요한 조건만을 가지고 있는 시험용 모듈이다.
- **하향식 통합 테스트**에 사용된다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">090</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">테스트 오라클(Test Oracle)</span>

- 테스트 결과가 올바른지 판단하기 위해 사전에 정의된 참 값을 대입하여 비교하는 기법 및 활동이다.
- **종류** : 참 오라클, 샘플링 오라클, 추정 오라클, 일관성 검사 오라클

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">091</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">주요 최악의 시간 복잡도</span>

| 복잡도 | 설명 |
|---|---|
| O(1) | 입력값(n)에 관계 없이 일정하게 문제 해결에 하나의 단계만을 거침<br>예) 스택의 삽입(Push), 삭제(Pop) |
| O(nlog₂n) | 문제 해결에 필요한 단계가 n(log₂n)번만큼 수행됨<br>예) 힙 정렬(Heap Sort), 2-Way 합병 정렬(Merge Sort) |

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">092</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">클린 코드 작성 원칙</span>

- **가독성** : 누구든지 코드를 쉽게 읽을 수 있도록 작성함
- **단순성** : 코드를 간단하게 작성함
- **의존성 배제** : 코드가 다른 모듈에 미치는 영향을 최소화함
- **중복성 최소화** : 코드의 중복을 최소화함
- **추상화** : 상위 클래스/메소드/함수에서는 간략하게 애플리케이션의 특성을 나타내고, 상세 내용은 하위 클래스/메소드/함수에서 구현함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">093</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">외계인 코드(Alien Code)</span>

아주 오래되거나 참고문서 또는 개발자가 없어 유지 보수 작업이 어려운 코드를 의미한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">094</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">소스 코드 품질 분석 도구 - 정적 분석 도구</span>

- 하드웨어 또는 소프트웨어적인 방법으로 코드 분석이 가능하다.
- **종류** : pmd, checkstyle, cppcheck 등

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">095</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">EAI의 구축 유형</span>

- **Point-to-Point** : 애플리케이션을 1:1로 연결함
- **Hub & Spoke** : 단일 접점인 허브 시스템을 통해 데이터를 전송하는 중앙 집중형 방식
- **Message Bus(ESB 방식)** : 애플리케이션 사이에 미들웨어를 두어 처리하는 방식
- **Hybrid** : Hub & Spoke와 Message Bus의 혼합 방식

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">096</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">JSON (JavaScript Object Notation)</span>

속성-값 쌍(Attribute-Value Pairs)으로 이루어진 데이터 객체를 전달하기 위해 사람이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">097</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">AJAX(Asynchronous JavaScript and XML)</span>

- 자바 스크립트(JavaScript) 등을 이용한 비동기 통신 기술이다.
- 클라이언트와 서버 간에 XML 데이터를 교환 및 제어한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">098</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">인터페이스 보안 기능 적용 - 네트워크 영역</span>

- 네트워크 트래픽에 대한 암호화를 설정한다.
- 암호화는 IPSec, SSL, S-HTTP 등의 다양한 방식으로 적용한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">099</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">tripwire</span>

크래커가 침입하여 백도어를 만들어 놓거나, 설정 파일을 변경했을 때 분석하는 데이터 무결성 검사 도구 중 하나이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">100</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">인터페이스 구현 검증 도구</span>

- **xUnit** : JUnit, CppUnit, NUnit, HttpUnit 등 다양한 언어에 적용되는 단위 테스트 프레임워크
- **STAF** : 서비스 호출 및 컴포넌트 재사용 등 다양한 환경을 지원하는 테스트 프레임워크
- **FitNesse** : 웹 기반 테스트 케이스 설계, 실행, 결과 확인 등을 지원하는 테스트 프레임워크
- **NTAF** : FitNesse와 STAF의 장점을 통합한 NHN(Naver)의 테스트 자동화 프레임워크
- **watir** : Ruby를 사용하는 애플리케이션 테스트 프레임워크

---

## <span style="background:#00a5e3;color:#fff;padding:3px 14px;border-radius:3px">3과목</span> 데이터베이스 구축

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">101</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">개념적 설계 (정보 모델링, 개념화)</span>

- 정보의 구조를 얻기 위하여 현실 세계에 대한 인식을 추상적 개념으로 표현하는 과정이다.
- 개념 스키마 모델링과 트랜잭션 모델링을 병행 수행한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">102</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">논리적 설계(데이터 모델링)</span>

- 자료를 특정 DBMS가 지원하는 논리적 자료 구조로 변환(mapping)시키는 과정이다.
- 트랜잭션의 인터페이스를 설계한다.
- 개념 스키마를 평가 및 정제한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">103</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">물리적 설계</span>

- 논리적 구조로 표현된 데이터를 물리적 구조의 데이터로 변환하는 과정이다.
- 데이터베이스 파일의 저장 구조 및 액세스 경로를 결정한다.
- 저장 레코드의 형식, 순서, 접근 경로, 조회가 집중되는 레코드와 같은 정보를 사용한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">104</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">데이터 모델에 표시할 요소</span>

- **구조(Structure)** : 논리적으로 표현된 개체 타입들 간의 관계로서 데이터 구조 및 정적 성질을 표현함
- **연산(Operation)** : 데이터베이스에 저장된 실제 데이터를 처리하는 작업에 대한 명세로서 데이터베이스를 조작하는 기본 도구
- **제약 조건(Constraint)** : 데이터베이스에 저장될 수 있는 실제 데이터의 논리적인 제약 조건

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">105</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">E-R 다이어그램</span>

| 기호 | 기호 이름 | 의미 |
|---|---|---|
| □ | 사각형 | 개체(Entity) 타입 |
| ◇ | 마름모 | 관계(Relationship) 타입 |
| ○ | 타원 | 속성(Attribute) |
| ◎ | 이중 타원 | 다중값 속성(복합 속성) |
| ― | 선, 링크 | 개체 타입과 속성을 연결 |

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">106</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">튜플(Tuple)</span>

- 릴레이션을 구성하는 각각의 행을 말한다.
- 튜플의 수 = **카디널리티(Cardinality)**

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">107</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">속성(Attribute)</span>

- 데이터베이스를 구성하는 가장 작은 논리적 단위이다.
- 속성의 수 = **디그리(Degree)** = 차수

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">108</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">도메인(Domain)</span>

하나의 애트리뷰트가 취할 수 있는 같은 타입의 원자(Atomic)값들의 집합이다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">109</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">릴레이션의 특징</span>

- 한 릴레이션에는 똑같은 튜플이 포함될 수 없으므로 릴레이션에 포함된 튜플들은 모두 상이하다.
- 한 릴레이션에 포함된 튜플 사이에는 순서가 없다.
- 속성의 유일한 식별을 위해 속성의 명칭은 유일해야 한다.
- 속성의 값은 논리적으로 더 이상 쪼갤 수 없는 원자값만을 저장한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">110</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">후보키(Candidate Key)</span>

- 릴레이션을 구성하는 속성들 중에서 튜플을 유일하게 식별하기 위해 사용하는 속성들의 부분집합, 즉 기본키로 사용할 수 있는 속성들을 말한다.
- 릴레이션에 있는 모든 튜플에 대해서 **유일성과 최소성**을 만족시켜야 한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">111</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">기본키(Primary Key)</span>

- 후보키 중에서 특별히 선정된 주키(Main Key)로 중복된 값을 가질 수 없다.
- NULL 값을 가질 수 없다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">112</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">대체키(Alternate Key)</span>

- 후보키가 둘 이상일 때 기본키를 제외한 나머지 후보키를 의미한다.
- 보조키라고도 한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">113</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">슈퍼키(Super Key)</span>

- 한 릴레이션 내에 있는 속성들의 집합으로 구성된 키이다.
- 릴레이션을 구성하는 모든 튜플에 대해 **유일성은 만족시키지만, 최소성은 만족시키지 못한다.**

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">114</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">외래키(Foreign Key)</span>

- 다른 릴레이션의 기본키를 참조하는 속성 또는 속성들의 집합을 의미한다.
- 한 릴레이션에 속한 속성 A와 참조 릴레이션의 기본키인 B가 동일한 도메인 상에서 정의되었을 때의 속성 A를 외래키라고 한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">115</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">무결성</span>

- **개체 무결성** : 기본 테이블의 기본키를 구성하는 어떤 속성도 Null 값이나 중복값을 가질 수 없다는 규정
- **참조 무결성** : 외래키 값은 Null이거나 참조 릴레이션의 기본키 값과 동일해야 함. 즉 릴레이션은 참조할 수 없는 외래키 값을 가질 수 없다는 규정

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">116</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">관계대수</span>

- 관계형 데이터베이스에서 원하는 정보와 그 정보를 검색하기 위해서 어떻게 유도하는가를 기술하는 **절차적인 언어**이다.
- 질의에 대한 해를 구하기 위해 수행해야 할 연산의 순서를 명시한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">117</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">순수 관계 연산자 - Select</span>

- 릴레이션에 존재하는 튜플 중에서 선택 조건을 만족하는 튜플의 부분집합을 구하여 새로운 릴레이션을 만드는 연산이다.
- **기호** : 시그마(σ)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">118</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">순수 관계 연산자 - Project</span>

- 주어진 릴레이션에서 속성 리스트에 제시된 속성 값만을 추출하여 새로운 릴레이션을 만드는 연산이다.
- **기호** : 파이(π)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">119</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">순수 관계 연산자 - Join</span>

- 공통 속성을 중심으로 두 개의 릴레이션을 하나로 합쳐서 새로운 릴레이션을 만드는 연산이다.
- **기호** : ⋈

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">120</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">순수 관계 연산자 - Division</span>

- X⊃Y인 두 개의 릴레이션 R(X)와 S(Y)가 있을 때, R의 속성이 S의 속성값을 모두 가진 튜플에서 S가 가진 속성을 제외한 속성만을 구하는 연산이다.
- **기호** : ÷

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">121</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">일반 집합 연산자 - 교차곱 (CARTESIAN PRODUCT)</span>

- 두 릴레이션에 있는 튜플들의 순서쌍을 구하는 연산이다.
- 교차곱의 디그리는 두 릴레이션의 디그리를 **더한** 것과 같다.
- 교차곱의 카디널리티는 두 릴레이션의 카디널리티를 **곱한** 것과 같다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">122</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">관계해석</span>

- 관계 데이터 모델의 제안자인 코드(Codd)가 수학의 Predicate Calculus(술어 해석)에 기반을 두고 관계 데이터베이스를 위해 제안했다.
- **주요 기호**

| 기호 | 구성 요소 | 설명 |
|---|---|---|
| ∀ | 전칭 정량자 | 가능한 모든 튜플에 대하여 |
| ∃ | 존재 전량자 | 하나라도 일치하는 튜플이 있음(There Exists) |

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">123</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">정규화(Normalization)</span>

- 함수적 종속성 등의 종속성 이론을 이용하여 잘못 설계된 관계형 스키마를 더 작은 속성의 세트로 쪼개어 바람직한 스키마로 만들어 가는 과정이다.
- 논리적 설계 단계에서 수행한다.
- 데이터 중복을 배제하여 이상(Anomaly)의 발생 방지한다.
- 자료 저장 공간의 최소화가 가능하다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">124</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">이상(Anomaly)</span>

- 정규화를 거치지 않으면 데이터베이스 내에 데이터들이 불필요하게 중복되어 릴레이션 조작 시 예기치 못한 곤란한 현상이 발생하는 것을 의미한다.
- **종류** : 삽입 이상, 삭제 이상, 갱신 이상

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">125</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">정규화 과정</span>

```
비정규 릴레이션
   ↓ 도메인이 원자값
  1NF
   ↓ 부분적 함수 종속 제거
  2NF
   ↓ 이행적 함수 종속 제거
  3NF
   ↓ 결정자이면서 후보키가 아닌 것 제거
  BCNF
   ↓ 다치 종속 제거
  4NF
   ↓ 조인 종속성 이용
  5NF
```

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">126</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">함수적 종속 (Functional Dependency)</span>

- 데이터들이 어떤 기준값에 의해 종속되는 것을 의미한다.
- '학번'에 따라 '이름'이 결정될 때 '이름'을 '학번'에 함수 종속적이라고 하며 `학번 → 이름`과 같이 쓴다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">127</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">이행적 종속 관계</span>

A → B이고 B → C일 때 A → C를 만족하는 관계를 의미한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">128</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">반정규화(Denormalization)</span>

- 시스템의 성능 향상, 개발 및 운영의 편의성 등을 위해 정규화된 데이터 모델을 통합, 중복, 분리하는 과정으로, 의도적으로 정규화 원칙을 위배하는 행위이다.
- **방법** : 테이블 통합, 테이블 분할, 중복 테이블 추가, 중복 속성 추가 등

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">129</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">시스템 카탈로그 (System Catalog)</span>

- 시스템 그 자체에 관련이 있는 다양한 객체에 관한 정보를 포함하는 시스템 데이터베이스이다.
- 사용자가 시스템 카탈로그 내용을 검색할 수는 있지만 갱신할 수는 없다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">130</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">트랜잭션(Transaction) 정의</span>

- 데이터베이스의 상태를 변환시키는 하나의 논리적 기능을 수행하기 위한 작업의 단위
- 한꺼번에 모두 수행되어야 할 일련의 연산

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">131</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">트랜잭션의 상태</span>

- **활동(Active)** : 트랜잭션이 실행 중인 상태
- **실패(Failed)** : 트랜잭션 실행 중 오류가 발생하여 중단된 상태
- **철회(Aborted)** : 트랜잭션이 비정상적으로 종료되어 Rollback 연산을 수행한 상태
- **부분 완료(Partially Committed)** : 트랜잭션의 마지막 연산까지 완료했지만, Commit 연산이 실행되기 직전의 상태
- **완료(Committed)** : 트랜잭션이 성공적으로 종료되어 Commit 연산까지 수행한 상태

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">132</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">트랜잭션의 특성</span>

- **Atomicity(원자성)** : 트랜잭션의 연산은 데이터베이스에 모두 반영되도록 완료(Commit)되든지 아니면 전혀 반영되지 않도록 복구(Rollback)되어야 함
- **Consistency(일관성)** : 트랜잭션이 그 실행을 성공적으로 완료하면 언제나 일관성 있는 데이터베이스 상태로 변환함
- **Isolation(독립성)** : 둘 이상의 트랜잭션이 동시에 병행 실행되는 경우 어느 하나의 트랜잭션 실행 중에 다른 트랜잭션의 연산이 끼어들 수 없음
- **Durability(영속성)** : 성공적으로 완료된 트랜잭션의 결과는 시스템이 고장나더라도 영구적으로 반영되어야 함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">133</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">인덱스(Index)</span>

- 데이터 레코드를 빠르게 접근하기 위해 <키 값, 포인터> 쌍으로 구성되는 데이터 구조이다.
- 데이터 정의어(DDL)를 이용하여 사용자가 생성, 변경, 제거할 수 있다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">134</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">뷰(View)</span>

- 기본 테이블로부터 유도된, 이름을 가지는 가상 테이블이다.
- 뷰는 가상 테이블이기 때문에 물리적으로 구현되어 있지 않다.
- 뷰로 구성된 내용에 대한 삽입, 삭제, 갱신 연산에 제약이 따른다.
- 뷰를 정의할 때는 CREATE문, 제거할 때는 DROP문을 사용한다.
- 독립적인 인덱스를 가질 수 없다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">135</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">파티션의 종류</span>

- **범위 분할(Range Partitioning)** : 지정한 열의 값을 기준으로 범위를 지정하여 분할함 (예: 일별, 월별, 분기별 등)
- **해시 분할(Hash Partitioning)** : 해시 함수를 적용한 결과 값에 따라 데이터를 분할함
- **조합 분할(Composite Partitioning)** : 범위 분할로 분할한 다음 해시 함수를 적용하여 다시 분할하는 방식
- **목록 분할(List Partitioning)** : 지정한 열 값에 대한 목록을 만들어 이를 기준으로 분할함
- **라운드 로빈 분할(Round Robin Partitioning)** : 레코드를 균일하게 분배하는 방식

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">136</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">분산 데이터베이스</span>

- 논리적으로는 하나의 시스템에 속하지만 물리적으로는 네트워크를 통해 연결된 여러 개의 컴퓨터 사이트(Site)에 분산되어 있는 데이터베이스를 말한다.
- 데이터베이스 설계 및 소프트웨어 개발이 어렵다.
- **분산 데이터베이스의 구성 요소** : 분산 처리기, 분산 데이터베이스, 통신 네트워크

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">137</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">분산 데이터베이스의 목표</span>

- **위치 투명성(Location Transparency)** : 액세스하려는 데이터베이스의 실제 위치를 알 필요 없이 단지 데이터베이스의 논리적인 명칭만으로 액세스할 수 있음
- **중복 투명성(Replication Transparency)** : 동일 데이터가 여러 곳에 중복되어 있더라도 사용자는 마치 하나의 데이터만 존재하는 것처럼 사용하고, 시스템은 자동으로 여러 자료에 대한 작업을 수행함
- **병행 투명성(Concurrency Transparency)** : 분산 데이터베이스와 관련된 다수의 트랜잭션들이 동시에 실현되더라도 그 트랜잭션의 결과는 영향을 받지 않음
- **장애 투명성(Failure Transparency)** : 트랜잭션, DBMS, 네트워크, 컴퓨터 장애에도 불구하고 트랜잭션을 정확하게 처리함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">138</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">암호화·복호화 과정</span>

- **암호화(Encryption) 과정** : 암호화되지 않은 평문을 정보 보호를 위해 암호문으로 바꾸는 과정
- **복호화(Decryption) 과정** : 암호문을 원래의 평문으로 바꾸는 과정

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">139</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">접근통제 기술</span>

- **임의 접근통제(DAC; Discretionary Access Control)** : 데이터에 접근하는 사용자의 신원에 따라 접근 권한을 부여하는 방식
- **강제 접근통제(MAC; Mandatory Access Control)** : 주체와 객체의 등급을 비교하여 접근 권한을 부여하는 방식
- **역할기반 접근통제(RBAC; Role Based Access Control)** : 사용자의 역할에 따라 접근 권한을 부여하는 방식

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">140</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">벨 라파듈라 모델 (Bell-LaPadula Model)</span>

- 군대의 보안 레벨처럼 정보의 기밀성에 따라 상하 관계가 구분된 정보를 보호하기 위해 사용하는 접근제어 모델
- 보안 취급자의 등급을 기준으로 읽기 권한과 쓰기 권한이 제한된다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">141</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">DAS (Direct Attached Storage)</span>

- 서버와 저장장치를 전용 케이블로 직접 연결하는 방식이다.
- 일반 가정에서 컴퓨터에 외장하드를 연결하는 것이 여기에 해당된다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">142</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">SAN(Storage Area Network)</span>

- DAS의 빠른 처리와 NAS의 파일 공유 장점을 혼합한 방식이다.
- 서버와 저장장치를 연결하는 전용 네트워크를 별도로 구성한다.

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">143</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">DDL(데이터 정의어)</span>

- 스키마, 도메인, 테이블, 뷰, 인덱스를 정의하거나 변경 또는 삭제할 때 사용하는 언어이다.
- **CREATE** : 스키마, 도메인, 테이블, 뷰, 인덱스를 정의함
- **ALTER** : TABLE에 대한 정의를 변경하는 데 사용함
- **DROP** : 스키마, 도메인, 테이블, 뷰, 인덱스를 삭제함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">144</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">DML(데이터 조작어)</span>

- 데이터베이스 사용자가 응용 프로그램이나 질의어를 통하여 저장된 데이터를 실질적으로 처리하는 데 사용되는 언어이다.
- **SELECT** : 테이블에서 조건에 맞는 튜플을 검색함
- **INSERT** : 테이블에 새로운 튜플을 삽입함
- **DELETE** : 테이블에서 조건에 맞는 튜플을 삭제함
- **UPDATE** : 테이블에서 조건에 맞는 튜플의 내용을 변경함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">145</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">DCL(데이터 제어어)</span>

- 데이터의 보안, 무결성, 회복, 병행 수행 제어 등을 정의하는 데 사용되는 언어이다.
- **COMMIT** : 명령에 의해 수행된 결과를 실제 물리적 디스크로 저장하고, 데이터베이스 조작 작업이 정상적으로 완료되었음을 관리자에게 알려줌
- **ROLLBACK** : 데이터베이스 조작 작업이 비정상적으로 종료되었을 때 원래의 상태로 복구함
- **GRANT** : 데이터베이스 사용자에게 사용 권한을 부여함
- **REVOKE** : 데이터베이스 사용자의 사용 권한을 취소함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">146</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">CREATE TABLE</span>

- 테이블을 정의하는 명령문이다.
- **표기 형식**

```sql
CREATE TABLE 테이블명
    (속성명 데이터_타입 [DEFAULT 기본값] [NOT NULL], …
    [, PRIMARY KEY(기본키_속성명, …)]
    [, UNIQUE(대체키_속성명, …)]
    [, FOREIGN KEY(외래키_속성명, …)]
        [REFERENCES 참조테이블(기본키_속성명, …)]
        [ON DELETE 옵션]
        [ON UPDATE 옵션]
    [, CONSTRAINT 제약조건명] [CHECK (조건식)]);
```

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">147</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">ALTER TABLE</span>

- 테이블에 대한 정의를 변경하는 명령문이다.
- **표기 형식**

```sql
ALTER TABLE 테이블명 ADD 속성명 데이터_타입 [DEFAULT '기본값'];
ALTER TABLE 테이블명 ALTER 속성명 [SET DEFAULT '기본값'];
ALTER TABLE 테이블명 DROP COLUMN 속성명 [CASCADE];
```

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">148</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">DROP TABLE</span>

- 기본 테이블을 제거하는 명령문이다.
- **표기 형식**

```sql
DROP TABLE 테이블명 [CASCADE | RESTRICT];
```

- **CASCADE** : 제거할 요소를 참조하는 다른 모든 개체를 함께 제거함
- **RESTRICT** : 다른 개체가 제거할 요소를 참조중일 때는 제거를 취소함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">149</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">삽입문(INSERT INTO~)</span>

- 기본 테이블에 새로운 튜플을 삽입할 때 사용한다.
- **표기 형식**

```sql
INSERT INTO 테이블명([속성명1, 속성명2,…])
VALUES (데이터1, 데이터2,… );
```

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">150</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">삭제문(DELETE FROM~)</span>

- 기본 테이블에 있는 튜플들 중에서 특정 튜플(행)을 삭제할 때 사용한다.
- **표기 형식**

```sql
DELETE
FROM 테이블명
[WHERE 조건];
```

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">151</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">갱신문(UPDATE~ SET~)</span>

- 기본 테이블에 있는 튜플들 중에서 특정 튜플의 내용을 변경할 때 사용한다.
- **표기 형식**

```sql
UPDATE 테이블명
SET 속성명 = 데이터[, 속성명=데이터, …]
[WHERE 조건];
```

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">152</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">데이터 조작문의 네 가지 유형</span>

- **SELECT(검색)** : SELECT~ FROM~ WHERE~
- **INSERT(삽입)** : INSERT INTO~ VALUES~
- **DELETE(삭제)** : DELETE~ FROM~ WHERE~
- **UPDATE(변경)** : UPDATE~ SET~ WHERE~

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">153</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">Select문</span>

```sql
SELECT [PREDICATE] [테이블명.]속성명1, [테이블명.]속성명2,…
FROM 테이블명1, 테이블명2,…
[WHERE 조건]
[GROUP BY 속성명1, 속성명2,…]
[HAVING 조건]
[ORDER BY 속성명 [ASC | DESC]];
```

- **SELECT절**
  - Predicate : 불러올 튜플 수를 제한할 명령어
    - DISTINCT : 중복된 튜플이 있으면 그 중 첫 번째 한 개만 검색
  - 속성명 : 검색하여 불러올 속성(열) 및 수식들
- **FROM절** : 질의에 의해 검색될 데이터들을 포함하는 테이블명
- **WHERE절** : 검색할 조건
- **GROUP BY절** : 특정 속성을 기준으로 그룹화하여 검색할 때 그룹화 할 속성
- **HAVING절** : 그룹에 대한 조건
- **ORDER BY절**
  - 속성명 : 정렬의 기준이 되는 속성명
  - [ASC | DESC] : 정렬 방식(ASC는 오름차순, DESC 또는 생략하면 내림차순)

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">154</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">조건 연산자 - LIKE</span>

- 대표 문자를 이용해 지정된 속성의 값이 문자 패턴과 일치하는 튜플을 검색하기 위해 사용된다.
- **대표 문자**
  - `%` : 모든 문자를 대표함
  - `_` : 문자 하나를 대표함
  - `#` : 숫자 하나를 대표함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">155</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">조건 연산자 - BETWEEN</span>

지정된 속성이 두 숫자 사이의 값을 가지는 튜플을 검색하기 위해 사용된다.

> 예) 생일이 '01/09/69'에서 '10/22/73' 사이인 자료만 검색
> → `WHERE 생일 BETWEEN #01/09/69# AND #10/22/73#`

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">156</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">그룹 함수</span>

- GROUP BY절에 지정된 그룹별로 속성의 값을 집계할 때 사용된다.
- **COUNT/SUM/AVG/MAX/MIN(속성명)** : 그룹별 튜플 수/합계/평균/최대값/최소값을 구하는 함수

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">157</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">집합 연산자의 종류</span>

- **UNION** : 두 조회 결과를 통합하여 모두 출력하되, 중복된 행은 한 번만 출력함
- **UNION ALL** : 두 조회 결과를 통합하여 모두 출력하되, 중복된 행도 그대로 출력함
- **INTERSECT** : 두 조회 결과 중 공통된 행만 출력함
- **EXCEPT** : 첫 번째 조회 결과에서 두 번째 조회 결과를 제외한 행을 출력함

### <span style="background:#1ba3e1;color:#fff;padding:2px 10px;border-radius:4px">158</span> <span style="background:#e5e5e5;padding:2px 12px;border-radius:4px">트리거(Trigger)</span>

데이터의 삽입(Insert), 갱신(Update), 삭제(Delete) 등의 이벤트(Event)가 발생할 때마다 관련 작업이 자동으로 수행되는 절차형 SQL이다.

---
