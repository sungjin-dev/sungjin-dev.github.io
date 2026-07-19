---
title: "[Java]static 변수에 대한 고찰"
excerpt: "C언어와 자바에서의 static 변수 차이점을 중심으로"
categories:
  - java
tags:
  - static
  - java
  - c
toc: true
toc_sticky: true
published: false
---

# static 변수 완전 정복 — Java를 중심으로, C와 비교하며 이해하기

이 글에서는 Java의 static 변수를 중심으로, 메모리 구조까지 파헤치며 C 언어의 static과 무엇이 같고 무엇이 다른지 비교해보자.

---

## 1. 한 줄 정의부터

> **Java의 static 변수 = "인스턴스가 아니라 클래스에 소속된 변수"**

일반 필드(인스턴스 변수)는 객체를 만들 때마다 하나씩 생기지만, static 변수는 **클래스당 딱 하나만** 존재한다. 

그래서 "클래스 변수(class variable)"라고도 부른다.

비유적으로 표현해보자면,

- **인스턴스 변수** = 아파트 각 세대의 개별 계량기 (세대마다 따로)
- **static 변수** = 아파트 전체가 공유하는 공용 게시판 (단지에 하나, 모든 세대가 같은 것을 봄)

---

## 2. 가장 기본적인 예시: 객체 카운터

static의 대표적인 활용은 "지금까지 객체가 몇 개 만들어졌는지" 세는 것이다.

```java
public class User {
    private String name;          // 인스턴스 변수: 객체마다 하나씩
    private static int count = 0; // static 변수: 클래스 전체에 딱 하나

    public User(String name) {
        this.name = name;
        count++;                  // 모든 객체가 같은 count를 공유
    }

    public static int getCount() {
        return count;
    }
}
```

```java
User a = new User("SungJin");
User b = new User("JiSeong");
User c = new User("GilDong");

System.out.println(User.getCount()); // 3
```

`a`, `b`, `c`는 각자 자신만의 `name`을 갖지만, `count`는 셋이 **하나를 공유**합니다. 만약 `count`가 인스턴스 변수였다면 각 객체의 count는 전부 1이 되어 아무 의미가 없다.

접근할 때도 `a.getCount()`가 아니라 `User.getCount()`처럼 **클래스 이름으로 접근하는 것이 원칙**이다. (인스턴스로도 접근은 되지만 뒤에서 설명)

---

## 3. 메모리 구조로 이해하기 — JVM 편

static 변수가 "어디에" 있는지를 알면 동작이 전부 설명된다.

JVM의 런타임 메모리는 크게 이렇게 나뇐다. 

<div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); max-width: 550px; margin: 0 auto; border: 1px solid #eaeaea; font-family: 'Helvetica Neue', Arial, sans-serif;">
  
  <div style="text-align: center; font-size: 1.3em; font-weight: bold; color: #212529; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #495057;">
    ☕ JVM 메모리 구조
  </div>

  <!-- 스택 (Stack) -->
  <div style="background-color: #e3f2fd; border: 2px solid #90caf9; border-radius: 6px; padding: 16px; margin-bottom: 12px; position: relative;">
    <div style="font-weight: bold; color: #1565c0; font-size: 1.1em; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
      <span>스택 (Stack)</span>
      <span style="font-size: 0.75em; color: #fff; background-color: #1976d2; padding: 3px 8px; border-radius: 12px; font-weight: normal;">스레드마다 하나</span>
    </div>
    <ul style="margin: 0; padding-left: 22px; color: #333; font-size: 0.95em; line-height: 1.6;">
      <li>지역 변수, 매개변수, 메서드 호출 프레임</li>
      <li>메서드가 끝나면 프레임이 사라짐(Pop)</li>
    </ul>
  </div>

  <!-- 힙 (Heap) -->
  <div style="background-color: #e8f5e9; border: 2px solid #a5d6a7; border-radius: 6px; padding: 16px; margin-bottom: 12px;">
    <div style="font-weight: bold; color: #2e7d32; font-size: 1.1em; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
      <span>힙 (Heap)</span>
      <span style="font-size: 0.75em; color: #fff; background-color: #388e3c; padding: 3px 8px; border-radius: 12px; font-weight: normal;">모든 스레드가 공유</span>
    </div>
    <ul style="margin: 0; padding-left: 22px; color: #333; font-size: 0.95em; line-height: 1.6;">
      <li><code style="background: rgba(255,255,255,0.8); padding: 2px 5px; border-radius: 4px; font-size: 0.9em; color: #c62828;">new</code> 키워드로 생성된 객체 및 배열 저장</li>
      <li><code style="background: rgba(255,255,255,0.8); padding: 2px 5px; border-radius: 4px; font-size: 0.9em; color: #283593;">java.lang.Class</code> 객체 + static 변수 ★</li>
      <li><strong>GC(가비지 컬렉터)</strong>의 주요 관리 대상</li>
    </ul>
  </div>

  <!-- 메타스페이스 (Metaspace) -->
  <div style="background-color: #fff3e0; border: 2px solid #ffcc80; border-radius: 6px; padding: 16px;">
    <div style="font-weight: bold; color: #e65100; font-size: 1.1em; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
      <span>메서드 영역 / 메타스페이스</span>
      <span style="font-size: 0.75em; color: #fff; background-color: #f57c00; padding: 3px 8px; border-radius: 12px; font-weight: normal;">모든 스레드가 공유</span>
    </div>
    <ul style="margin: 0; padding-left: 22px; color: #333; font-size: 0.95em; line-height: 1.6;">
      <li>클래스 메타데이터 (필드·메서드 정보)</li>
      <li>바이트코드, 런타임 상수 풀(Constant Pool) 등 저장</li>
    </ul>
  </div>

</div>

### 흔한 오해 바로잡기: "static 변수는 메서드 영역에 있다"?

많은 블로그와 오래된 책에서 "static 변수는 메서드 영역(PermGen)에 저장된다"고 설명하는데, **이건 Java 7 이전 이야기**이다.

- **Java 7까지**: static 변수는 힙의 특수 영역인 PermGen(Permanent Generation)에 저장.
- **Java 8부터**: PermGen이 제거되고 클래스 *메타데이터*는 네이티브 메모리의 **Metaspace**로 이동. 하지만 **static 변수 자체는 힙(Heap)으로 옮겨져서**, 해당 클래스의 `java.lang.Class` 객체와 함께 저장된다.

즉, 현재의 Java(8+)에서 정확한 문장은 이렇습니다.

> **static 변수는 힙에 있다. 정확히는 그 클래스를 나타내는 `Class` 객체에 붙어서 저장된다.**

이 사실에서 중요한 결론이 하나 나온다. static 변수도 힙에 있으므로 이론상 GC 대상이지만, **클래스를 로드한 클래스로더가 살아 있는 한 `Class` 객체가 회수되지 않으므로, 사실상 프로그램이 끝날 때까지 살아 있다.** static 변수의 수명이 "프로그램 전체"인 이유가 바로 이것이다.

### 그림으로 보는 인스턴스 변수 vs static 변수

위의 `User` 예제를 메모리 그림으로 그리면 이렇습니다.

<div style="background-color: #ffffff; padding: 30px 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); max-width: 700px; margin: 0 auto; border: 1px solid #eaeaea; overflow-x: auto;">
  
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 320" width="100%" style="display: block; margin: 0 auto; min-width: 580px; font-family: 'Helvetica Neue', Arial, sans-serif;">
    <defs>
      <!-- 화살표 머리 디자인 -->
      <marker id="arrow-ref" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#e65100" />
      </marker>
    </defs>

    <!-- 타이틀 -->
    <text x="90" y="30" font-size="18" font-weight="bold" fill="#1565c0" text-anchor="middle">스택 (Stack)</text>
    <text x="410" y="30" font-size="18" font-weight="bold" fill="#2e7d32" text-anchor="middle">힙 (Heap)</text>

    <!-- 스택 영역 박스 -->
    <rect x="40" y="50" width="100" height="240" rx="6" fill="#e3f2fd" stroke="#90caf9" stroke-width="2" />
    
    <!-- 힙 영역 박스 -->
    <rect x="240" y="50" width="340" height="240" rx="6" fill="#e8f5e9" stroke="#a5d6a7" stroke-width="2" />

    <!-- ==================== 화살표 연결선 ==================== -->
    <g stroke="#ffb74d" stroke-width="2.5" fill="none">
      <line x1="100" y1="85" x2="252" y2="85" marker-end="url(#arrow-ref)" />
      <line x1="100" y1="145" x2="252" y2="145" marker-end="url(#arrow-ref)" />
      <line x1="100" y1="205" x2="252" y2="205" marker-end="url(#arrow-ref)" />
    </g>

    <!-- ==================== 스택 내부 (참조 변수) ==================== -->
    <g font-size="16" font-weight="bold" fill="#333" text-anchor="middle">
      <text x="90" y="91">a</text>
      <text x="90" y="151">b</text>
      <text x="90" y="211">c</text>
      
      <!-- 참조점 포인트 -->
      <circle cx="115" cy="85" r="4" fill="#e65100" />
      <circle cx="115" cy="145" r="4" fill="#e65100" />
      <circle cx="115" cy="205" r="4" fill="#e65100" />
    </g>

    <!-- ==================== 힙 내부 (객체들) ==================== -->
    
    <!-- 객체 1 (Alice) -->
    <rect x="260" y="65" width="300" height="40" rx="6" fill="#ffffff" stroke="#ced4da" stroke-width="1.5" />
    <text x="280" y="90" font-size="15" fill="#333">User 객체</text>
    <text x="380" y="90" font-size="15" fill="#c62828" font-family="monospace">name="Alice"</text>

    <!-- 객체 2 (Bob) -->
    <rect x="260" y="125" width="300" height="40" rx="6" fill="#ffffff" stroke="#ced4da" stroke-width="1.5" />
    <text x="280" y="150" font-size="15" fill="#333">User 객체</text>
    <text x="380" y="150" font-size="15" fill="#c62828" font-family="monospace">name="Bob"</text>

    <!-- 객체 3 (Carol) -->
    <rect x="260" y="185" width="300" height="40" rx="6" fill="#ffffff" stroke="#ced4da" stroke-width="1.5" />
    <text x="280" y="210" font-size="15" fill="#333">User 객체</text>
    <text x="380" y="210" font-size="15" fill="#c62828" font-family="monospace">name="Carol"</text>

    <!-- 공통 Class 객체 (static 변수 포함) -->
    <rect x="260" y="240" width="300" height="35" rx="6" fill="#fff3e0" stroke="#ffcc80" stroke-width="1.5" stroke-dasharray="4" />
    <text x="275" y="263" font-size="14" fill="#424242">User의 Class 객체</text>
    
    <!-- static 변수 하이라이트 -->
    <rect x="410" y="245" width="140" height="24" rx="12" fill="#ffe0b2" />
    <text x="480" y="262" font-size="13" font-weight="bold" fill="#e65100" text-anchor="middle">└ count=3 ★공유</text>

  </svg>
</div>

`name`은 객체 안에 3개, `count`는 `Class` 객체에 1개. 이 그림 하나가 static의 본질이다.

---

## 4. 초기화는 "언제" 일어날까 — 클래스 로딩과 static 블록

static 변수는 `new`를 할 때가 아니라 **클래스가 초기화될 때** 만들어지고 초기화된다. 그리고 Java의 클래스 초기화는 **게으르게(lazy)** 일어납니다. JLS(자바 언어 명세)상 클래스는 다음과 같은 시점에 처음으로 초기화된다.

- 그 클래스의 인스턴스를 처음 생성할 때
- 그 클래스의 static 메서드를 처음 호출할 때
- 그 클래스의 static 변수를 처음 읽거나 쓸 때 (단, 컴파일 타임 상수는 예외 — 아래에서 설명)

이때 static 변수의 초기화식과 **static 초기화 블록**이 위에서 아래 순서로 실행된다.

```java
public class Config {
    static String env = "dev";           // ① 먼저 실행
    static Map<String, String> settings;

    static {                             // ② static 초기화 블록
        System.out.println("Config 클래스 초기화!");
        settings = new HashMap<>();
        settings.put("timeout", "30");
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("main 시작");
        System.out.println(Config.env);   // 이 순간 Config가 초기화됨
    }
}
```

실행 결과:

```
main 시작
Config 클래스 초기화!
dev
```

### JVM의 시선으로 보는 실행 순서 해석

**1. main 메서드 진입**
프로그램이 켜지고 가장 먼저 Main 클래스의 main 메서드가 실행. 
화면에 main 시작이 가장 먼저 출력. (이때까지 JVM은 Config 클래스의 존재에 관심 X.)

**2. Config.env 호출과 '클래스 로딩(Class Loading)'**
다음 줄에서 System.out.println(Config.env);를 만남.
이때 JVM은 속으로 "어? Config라는 클래스의 env를 달라고 하네? 근데 아직 Config 클래스를 메모리에 안 올려놨잖아? 당장 메타스페이스에 클래스 정보를 읽어오고 초기화하자!"

**3. Config 클래스 초기화 (최초 1회만 실행)**
이제 Config 클래스가 메모리에 올라가면서 (Class 객체가 생성) 내부에 있는 static 요소들이 위에서 아래로 순서대로 세팅.

① static 변수 할당: env에 "dev"라는 값이 들어간다.

② static 블록 실행: 그 아래에 있는 static { } 블록이 자동으로 실행. 그래서 화면에 Config 클래스 초기화!가 출력되고, settings라는 맵(Map)이 만들어지며 "timeout" 데이터가 들어감.

4. 다시 main으로 복귀
Config 클래스의 준비(초기화)가 완벽하게 끝났으니, 원래 하려던 작업인 Config.env의 값 "dev"를 화면에 출력하고 프로그램이 종료.

💡 이 코드에서 얻어가야 할 핵심 포인트 2가지
`게으른 로딩 (Lazy Loading)`: 자바는 프로그램이 시작될 때 모든 클래스를 한꺼번에 다 메모리에 올리지 않는다. 메모리를 아끼기 위해 "해당 클래스가 처음으로 사용되는 그 순간(변수 접근, 메서드 호출, 객체 생성 등)"에 메모리에 올리고 초기화한다.

static 블록의 역할: `static { ... }` 블록은 클래스가 메모리에 올라갈 때 딱 한 번만 실행됩니다. 보통 위 코드처럼 맵(Map)에 복잡한 기본 세팅 값을 미리 꽉꽉 채워 넣거나, DB 연결 같은 무거운 초기 설정 작업을 할 때 아주 유용하게 쓰인다.

`Config`를 실제로 건드리기 전까지는 초기화가 일어나지 않는다는 점에 주목하자. 이 lazy 초기화는 뒤에서 볼 C와의 중요한 차이이다.

참고 : Python의 `__init__`과 비교 

**1. 파이썬의 __init__ = 자바의 생성자(Constructor)**

파이썬의 __init__(self)는 '객체(인스턴스)'가 새로 만들어질 때마다 실행된다. 붕어빵을 10개 구우면 __init__도 10번 실행.

자바에서는 이것을 static 블록이 아니라 생성자(Constructor)가 담당한다.

**Python:**

```python
class User:
    def __init__(self, name):
        self.name = name  # 붕어빵이 구워질 때마다(객체 생성 시) 실행!
```

**Java:**

```java
public class User {
    String name;
    public User(String name) {  // 붕어빵이 구워질 때마다(객체 생성 시) 실행! (생성자)
        this.name = name;
    }
}
```
**2. 그럼 자바의 static { }은 파이썬에서 뭘까?**

자바의 static { } 블록은 객체를 100개를 만들든 0개를 만들든 상관없이, 클래스(설계도)가 메모리에 처음 올라갈 때 `딱 1번만 실행`

| 구분 | 파이썬 (Python) | 자바 (Java) | 실행 시점 |
| :--- | :--- | :--- | :--- |
| **객체 1개당 세팅** | `def __init__(self):` | `public 클래스명() { }`<br>(생성자) | `new`로 객체를 **만들 때마다** (여러 번) |
| **클래스 전체 공통 세팅** | 클래스 바로 아래에 작성 | `static { }` 블록 | 클래스가 메모리에 **처음 로딩될 때** (딱 1번) |

---

### static final 상수와 인라이닝

```java
public class Constants {
    public static final int MAX_SIZE = 100;              // 컴파일 타임 상수
    public static final long NOW = System.currentTimeMillis(); // 런타임에 결정
}
```

`MAX_SIZE`처럼 원시 타입/문자열이면서 상수 표현식으로 초기화되는 `static final` 필드는 **컴파일 타임 상수**로 취급되어, 사용하는 쪽 바이트코드에 값이 **그대로 복사(인라이닝)** 다. 그래서 이 상수를 읽어도 클래스 초기화가 일어나지 않으며, 상수 값만 바꾸고 사용하는 클래스를 재컴파일하지 않으면 옛 값이 남는 함정도 생긴다. 반면 `NOW`처럼 런타임에 결정되는 값은 일반적인 static 변수처럼 클래스 초기화 시점에 계산된다.

### 인라이닝이란? 

**인라이닝(Inlining)** 은 컴파일러가 프로그램 실행속도를 높이기 위해 쓰는 '자동 복사 붙여넣기' 기술이다. 자바나 다른 프로그래밍 언어에서 메서드(함수)를 하나 부를 때마다 스택(Stack) 영역에는 '프레임'이라는 메모리 공간이 새로 생기고, 작업이 끝나면 지워지는 과정이 반복되는데, 컴퓨터 입장에서는 함수를 부를 때마다 원래 하던 일을 멈추고, 스택에 메모리를 할당하고, 매개변수를 넘겨주고, 끝나면 다시 원래 주소로 돌아오는 이 모든 과정이 시간이 소모되는 작업(오버헤드)이다. 작업 속도를 증진시키기 위해 자바의 JIT 컴파일러나 C/C++ 컴파일러가 코드를 알아서 분석하고, 딱 필요하고 효율적인 곳에만 몰래 인라이닝을 적용해준다. 

---

## 5. C 언어의 static — 같은 단어, 다른 철학

이제 C로 넘어가 보자. 결론부터 말하면, **C의 static은 Java와 이름만 같고 개념이 상당히 다르다.** C에는 클래스가 없으니 "클래스 소속"이라는 의미 자체가 성립하지 않고, 대신 static이 두 가지 완전히 다른 역할을 한다.

### 역할 ① 함수 안의 static: "수명 연장"

```c
#include <stdio.h>

void counter(void) {
    static int count = 0;  // 프로그램 시작 시 한 번만 초기화
    int local = 0;         // 호출될 때마다 새로 만들어짐
    count++;
    local++;
    printf("count=%d, local=%d\n", count, local);
}

int main(void) {
    counter();  // count=1, local=1
    counter();  // count=2, local=1
    counter();  // count=3, local=1
    return 0;
}
```

`local`은 스택에 있어서 함수가 끝나면 사라지지만, `static`이 붙은 `count`는 **함수가 끝나도 값이 유지**된다. 스코프(보이는 범위)는 함수 안이지만, 수명은 프로그램 전체인 셈이다. Java에는 이런 "지역 static 변수"가 없다. Java에서 같은 효과를 내려면 클래스 레벨의 static 필드를 써야 한다.

### Python과 자바와의 비교 

🐍 파이썬 (Python)
파이썬은 __init__ 바깥(클래스 바로 아래)에 변수를 놓으면 모든 객체가 공유하는 변수가 된다.

```python
class User:
    count = 0  # 파이썬의 클래스 레벨 변수 (모두가 공유)

    def __init__(self, name):
        self.name = name  # 객체 레벨 변수 (각자 다름)
```
        
☕ 자바 (Java)
자바에서 위 파이썬 코드와 '같은 효과(모두가 공유)'를 내려면, 변수 앞에 static을 붙여줘야 한다.

```java
public class User {
    static int count = 0; // 자바의 클래스 레벨 static 필드 (모두가 공유)
    
    String name;          // 객체 레벨 일반 필드 (각자 다름)

    public User(String name) {
        this.name = name;
    }
}
```

### 역할 ② 파일 스코프의 static: "링키지 제한" (정보 은닉)

```c
/* util.c */
static int cache_size = 128;   // 이 파일 안에서만 보임 (internal linkage)
int global_limit = 1000;       // 다른 파일에서 extern으로 접근 가능

static void helper(void) {     // 이 함수도 이 파일 전용
    /* ... */
}
```

전역 변수나 함수에 static을 붙이면 **다른 번역 단위(소스 파일)에서 접근할 수 없게** 된다. 이건 메모리나 수명 이야기가 아니라 **가시성(링키지)** 의 문제다. Java에서는 이 역할을 static이 아니라 `private`, package-private 같은 **접근 제어자**가 담당한다.

### C의 메모리 레이아웃과 static의 위치

C 프로그램의 전형적인 메모리 구조는 이렇다.

<div style="background-color: #ffffff; padding: 25px 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; font-family: 'Helvetica Neue', Arial, sans-serif;">
  
  <div style="text-align: center; font-size: 1.25em; font-weight: bold; color: #212529; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #dee2e6;">
    🧠 프로그램 메모리 구조
  </div>

  <!-- 높은 주소 -->
  <div style="text-align: center; font-size: 0.9em; font-weight: bold; color: #e65100; margin-bottom: 8px;">
    ▲ 높은 주소 (High Address)
  </div>

  <!-- 메모리 전체 박스 -->
  <div style="border: 2px solid #495057; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">

    <!-- 스택 (Stack) -->
    <div style="background-color: #e3f2fd; padding: 16px; border-bottom: 1px dashed #90caf9; text-align: center;">
      <div style="font-weight: bold; color: #1565c0; font-size: 1.15em; margin-bottom: 6px;">스택 (Stack)</div>
      <div style="font-size: 0.95em; color: #333;">지역 변수, 매개변수</div>
      <div style="margin-top: 12px; color: #1565c0; font-weight: bold; font-size: 0.95em;">
        ↓ 아래로 성장 (높은 주소 → 낮은 주소)
      </div>
    </div>

    <!-- 여유 공간 -->
    <div style="background-color: #f8f9fa; padding: 18px; text-align: center; color: #adb5bd; font-size: 0.85em; letter-spacing: 2px;">
      (여유 메모리 공간)
    </div>

    <!-- 힙 (Heap) -->
    <div style="background-color: #e8f5e9; padding: 16px; border-top: 1px dashed #a5d6a7; border-bottom: 2px solid #495057; text-align: center;">
      <div style="margin-bottom: 12px; color: #2e7d32; font-weight: bold; font-size: 0.95em;">
        ↑ 위로 성장 (낮은 주소 → 높은 주소)
      </div>
      <div style="font-weight: bold; color: #2e7d32; font-size: 1.15em; margin-bottom: 6px;">힙 (Heap)</div>
      <div style="font-size: 0.95em; color: #333;">동적 할당 (malloc, free 등)</div>
    </div>

    <!-- BSS 영역 -->
    <div style="background-color: #fff3e0; padding: 16px; border-bottom: 1px solid #ffb74d; text-align: center;">
      <div style="font-weight: bold; color: #e65100; font-size: 1.1em; margin-bottom: 6px;">BSS 영역 (.bss)</div>
      <div style="font-size: 0.95em; color: #333;">
        초기화 안 됐거나 0인 static/전역 변수<br>
        <span style="font-weight: bold; color: #d84315; background-color: #ffe0b2; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 6px;">→ 0으로 자동 채워짐 ★</span>
      </div>
    </div>

    <!-- 데이터 영역 -->
    <div style="background-color: #fff9c4; padding: 16px; border-bottom: 1px solid #fbc02d; text-align: center;">
      <div style="font-weight: bold; color: #f57f17; font-size: 1.1em; margin-bottom: 6px;">데이터 영역 (.data)</div>
      <div style="font-size: 0.95em; color: #333;">
        0이 아닌 값으로 <br>
        <span style="font-weight: bold; color: #d84315; background-color: #fff59d; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 6px;">초기화된 static/전역 변수 ★</span>
      </div>
    </div>

    <!-- 텍스트 영역 -->
    <div style="background-color: #f1f3f5; padding: 16px; text-align: center;">
      <div style="font-weight: bold; color: #495057; font-size: 1.1em; margin-bottom: 6px;">텍스트 영역 (.text)</div>
      <div style="font-size: 0.95em; color: #333;">기계어 코드 (읽기 전용)</div>
    </div>

  </div>

  <!-- 낮은 주소 -->
  <div style="text-align: center; font-size: 0.9em; font-weight: bold; color: #1565c0; margin-top: 8px;">
    ▼ 낮은 주소 (Low Address)
  </div>

</div>

C에서 static 변수(그리고 전역 변수)는 **`.data` 또는 `.bss` 세그먼트**에 들어다.

- `static int x = 42;` → 초기값이 실행 파일에 기록되어야 하므로 **`.data`**
- `static int y;` 또는 `static int z = 0;` → 실행 파일에 값을 저장할 필요 없이, 로더가 **`.bss`** 영역을 0으로 채워주기만 하면 됨 (실행 파일 크기 절약)

이 영역들은 프로그램이 메모리에 적재될 때 확정되고, 프로그램이 끝날 때까지 그대로 유지된다. C에서 초기화되지 않은 static/전역 변수가 항상 0인 이유가 바로 `.bss`의 zero-fill 덕분이다. (반면 스택의 지역 변수는 초기화하지 않으면 쓰레기 값이다.)

또 하나 중요한 차이: C의 static 변수 초기화는 **상수 표현식만 허용**되고, `main`이 실행되기 전에 이미 끝나 있다. Java처럼 "처음 사용될 때 초기화 코드가 실행되는" lazy 방식이 아닌 것이다.

```c
static int a = 10;        // OK: 상수 표현식
static int b = rand();    // 컴파일 에러! C에서는 런타임 초기화 불가
```

---

## 6. Java vs C 핵심 비교 정리

| 관점 | Java의 static | C의 static |
|---|---|---|
| 핵심 의미 | 클래스 소속 (인스턴스와 무관) | ① 수명 연장 ② 링키지 제한 |
| 저장 위치 | 힙 — `Class` 객체와 함께 (Java 8+) | `.data` 또는 `.bss` 세그먼트 |
| 초기화 시점 | 클래스 첫 사용 시 (lazy) | 프로그램 시작 전 (eager) |
| 런타임 초기화 코드 | 가능 (static 블록, 메서드 호출 등) | 불가 (상수 표현식만) |
| 함수/메서드 안의 static | 불가능 | 가능 (값 유지되는 지역 변수) |
| 정보 은닉 역할 | 없음 → 접근 제어자가 담당 | 파일 스코프 static이 담당 |
| 초기값 보장 | 타입 기본값 (0, null, false) | 0으로 초기화 (.bss) |
| 메모리 해제 | 클래스로더 수명과 함께 (사실상 프로그램 종료까지) | 프로그램 종료까지 |

흥미로운 점은 언어와 메커니즘은 달라도, **"객체(또는 함수 호출)의 수명과 무관하게 프로그램 내내 하나로 유지되는 데이터"** 라는 결과는 양쪽 모두 같다. 단지 Java는 그것을 "클래스"라는 단위에, C는 "세그먼트"라는 메모리 영역에 묶어둔 것 뿐이다.

---

## 7. 실전에서 조심할 것들

### (1) 인스턴스 참조로 static에 접근하지 말 것

```java
User a = new User("Alice");
int n = a.getCount();   // 컴파일은 되지만 나쁜 스타일
int m = User.getCount(); // 이렇게 쓰세요
```

문법상 허용되지만, 코드를 읽는 사람이 인스턴스 메서드로 착각하게 만든다.

더 위험한 예:

```java
User a = null;
System.out.println(a.getCount()); // NPE가 날 것 같지만... 정상 동작!
```

static 멤버 접근은 컴파일 시점에 `User.getCount()`로 해석되므로 `a`가 null이어도 예외가 발생하지 않습니다. 직관과 어긋나는 코드가 되는 거다.

### (2) 멀티스레드 환경에서는 공유 = 경쟁

static 변수는 모든 스레드가 공유하므로, 여러 스레드가 동시에 수정하면 race condition이 발생한다.

```java
public class Counter {
    private static int count = 0;

    public static void increment() {
        count++;   // 읽기→증가→쓰기 3단계라 원자적이지 않음!
    }
}
```

두 스레드가 각각 1000번씩 호출해도 결과가 2000이 안 나올 수 있다. 해결하려면 `synchronized`를 쓰거나 `AtomicInteger`를 사용해야 한다.

```java
private static final AtomicInteger count = new AtomicInteger(0);

public static void increment() {
    count.incrementAndGet();  // 원자적 연산
}
```

참고로 C도 마찬가지 문제가 있으며, 함수 내 static 변수의 최초 초기화조차 C 표준에서는 스레드 안전을 보장하지 않는다.

### (3) static 컬렉션은 메모리 누수의 단골

```java
public class Cache {
    private static final Map<String, Object> cache = new HashMap<>();

    public static void put(String key, Object value) {
        cache.put(key, value);  // 지우지 않으면 영원히 안 사라짐
    }
}
```

static 변수는 사실상 프로그램이 끝날 때까지 GC되지 않으므로, static 컬렉션에 넣기만 하고 빼지 않으면 그 안의 객체들도 전부 살아남아 메모리를 계속 점유한다. 캐시가 필요하면 크기 제한이나 만료 정책이 있는 구조(예: Caffeine 같은 캐시 라이브러리, 상황에 따라 `WeakHashMap`)를 고려해야 한다.

### (4) 가변(mutable) public static은 사실상 전역 변수

`public static` 가변 필드는 어디서든 읽고 쓸 수 있는 전역 상태가 되어, 코드 흐름 추적과 테스트를 어렵게 만든다. static 변수는 가능하면 `private`으로 숨기고, 불변 상수라면 `static final`로 선언하는 것이 정석이다.

---

## 8. 마무리 요약

- **Java의 static 변수는 클래스당 하나**이며, 모든 인스턴스(그리고 인스턴스가 없어도)가 공유한다.
- 저장 위치는 **힙의 `Class` 객체** (Java 8+). "메서드 영역/PermGen에 있다"는 설명은 옛날 정보다.
- 초기화는 **클래스가 처음 사용될 때(lazy)** 일어나며, static 블록으로 복잡한 초기화도 가능하다.
- **C의 static은 다른 개념**: 함수 안에서는 "수명 연장", 파일 스코프에서는 "링키지 제한"을 뜻하고, 변수는 `.data`/`.bss` 영역에 프로그램 시작 전부터 자리 잡는다.
- 공통점은 하나 — **프로그램 수명과 함께하는, 하나뿐인 데이터**라는 것. 그래서 양쪽 모두 공유 상태의 위험(동시성, 누수, 전역 상태 남용)을 똑같이 조심해야 한다.

static을 "그냥 붙이면 공유되는 키워드"가 아니라 "이 데이터가 메모리 어디에서, 언제부터 언제까지 사는가"의 문제로 바라보면, Java든 C든 헷갈릴 일은 없을 것이다. 


