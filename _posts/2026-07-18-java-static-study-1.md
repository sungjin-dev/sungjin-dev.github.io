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



프로그래밍을 공부하다 보면 무조건 한 번은 마주치는 키워드가 있습니다. 바로 static이죠.하지만 재미있게도 C 언어에서의 static과 Java에서의 static은 그 성격과 쓰임새가 살짝 다릅니다. 오늘은 두 언어에서 static 변수가 어떻게 다르게 동작하는지, 그리고 메모리 상에서는 어디에 위치하는지 명확하게 비교해 보겠습니다.1. C 언어에서의 static: "유지"와 "고립"C 언어에서 static 변수는 선언되는 위치에 따라 두 가지 역할을 합니다. 지역 변수냐, 전역 변수냐에 따라 말이죠.static 지역 변수 (유지): 함수 내부에서 선언되지만, 함수가 종료되어도 메모리에서 사라지지 않고 값을 유지합니다.static 전역 변수 (고립): 파일의 외부(다른 소스 파일)에서 extern 키워드로 접근하는 것을 막아줍니다. 즉, 해당 파일 안에서만 쓸 수 있는 '프라이빗 전역 변수'가 됩니다.[메모리 영역]C 언어에서 static 변수들은 초기화 여부에 따라 Data 영역(초기화됨) 또는 BSS 영역(초기화되지 않음)에 저장됩니다. 프로그램이 시작될 때 할당되고, 종료될 때 해제되죠.2. Java에서의 static: "클래스 레벨의 공유"자바는 객체지향 언어입니다. 그래서 C 언어처럼 파일 단위의 전역/지역 개념보다는 '클래스'와 '인스턴스(객체)'의 관점에서 static을 바라봐야 합니다.자바에서 static이 붙은 변수는 객체(인스턴스)에 종속되지 않고 클래스 자체에 종속됩니다. 즉, 객체를 생성(new)하지 않아도 사용할 수 있으며, 모든 객체가 하나의 static 변수를 공유하게 됩니다.💡 예제로 보는 Java의 static인터넷 강의 화면(image_ee7be6.jpg)에 아주 좋은 예시 코드가 있습니다.Javaclass AB {
    public int a = 20; // 인스턴스 변수
    static int b = 0;  // 스태틱(클래스) 변수
}

class Main {
    public static void main(String[] args) {
        // 객체 생성 없이 클래스 이름으로 바로 접근 가능!
        AB.b = 10; 
        
        // 에러 발생: 인스턴스 변수 'a'는 객체 생성(new) 후에만 접근 가능
        // AB.a = 10; 
        
        AB ia = new AB();
        System.out.println(AB.b++); // 출력 및 1 증가
        System.out.println(ia.b);   // 객체를 통해서도 접근 가능하지만 권장하지 않음
    }
}
위 코드에서 보듯 static 변수 b는 AB.b처럼 클래스 이름으로 직접 접근합니다. 반면 a는 반드시 new AB()를 통해 객체를 힙(Heap) 영역에 생성해야만 접근할 수 있죠.[메모리 영역 - 핵심 주의!]자바에서 객체들은 힙(Heap) 영역에 생성됩니다. 하지만 static 변수는 객체와 함께 힙에 생성되는 것이 아닙니다.클래스가 메모리에 로드될 때 메서드(Method) 영역 (또는 Static 영역)에 단 한 번 생성되어 모든 객체가 이를 공유합니다. (※ Java 8 이후 메모리 구조 변경으로 논리적 Method 영역의 데이터가 물리적 Heap 내부로 이동하긴 했으나, 인스턴스 변수들과는 여전히 철저히 구분되어 관리됩니다.)3. 요약: 한눈에 비교하는 C vs Java구분C 언어Java주요 목적값의 유지(지역), 접근 제어(전역)객체 간 데이터 공유소속함수 또는 파일클래스메모리 영역Data 또는 BSS 영역Method 영역 (Static 영역)생성 시점프로그램 시작 시클래스가 메모리에 로드될 때마무리


static 변수의 저장 위치
답: Heap이 아니라 Metaspace (Native Memory)에 저장됩니다.
javapublic class MyClass {
    static int count = 0;           // ← 이 값은 어디?
    static String name = "test";    // ← 이 값은 어디?
    
    int instanceVar = 5;            // ← 이건 Heap
}

count = 0 : Metaspace (static 변수 값)
name 참조: Metaspace (참조 자체)
new String("test") 객체: Heap (실제 객체)
instanceVar = 5 : Heap (각 인스턴스마다)

Metaspace = Native Memory와의 연결
Metaspace (Native Memory)
├─ Class 메타데이터
│  ├─ 메서드 정보
│  ├─ 필드 정보
│  └─ 상수 풀
│
└─ static 변수 데이터 ← ★ 여기!
   ├─ static int count
   ├─ static String name (참조)
   └─ static List<?> items (참조)
왜 이게 중요한가?
1. GC의 영향을 덜 받음
Heap의 인스턴스 변수 → GC 대상
Metaspace의 static 변수 → GC 대상 아님 (클래스 언로드 시에만)
2. 메모리 누수의 원인
javastatic List<?> cache = new ArrayList<>();
cache.add(new HugeObject()); // ← static이라 GC 안 됨!
Heap의 객체는 GC 가능하지만, cache 참조가 static이라 영구적으로 alive
3. Metaspace OOM의 원인
java// ClassLoader로 동적 클래스 생성
// ↓ 클래스가 Metaspace에 쌓임
// ↓ static 변수들도 함께 쌓임
// ↓ OutOfMemoryError: Metaspace
실무 체크리스트
❌ "static은 Heap에 저장돼"
✅ "static은 Metaspace(Native Memory)에 저장돼"

❌ "static이니까 GC 대상이야"
✅ "static은 클래스 언로드 시에만 정리돼"

❌ "static List cache = new ArrayList(); 안전해"
✅ "참조가 static이라 List와 그 내용이 영구 메모리에 남아"
결론: static 변수의 값/참조는 Metaspace, static이 가리키는 객체는 Heap입니다. 이 차이 때문에 static 남용이 메모리 누수로 이어지는 거고, Metaspace OOM도 static 변수가 원인이 될 수 있습니다.
