---
title: "[Java] 클래스 변수에 세션을 담으면 안 되는 이유"
excerpt: "static · 싱글톤 빈 · ThreadLocal, 자바에서 상태를 잘못 두는 세 가지 방식"
categories: [Java]
tags:
  - 클래스
  - 세션
  - static 필드
  - 싱글톤 빈
  - ThreadLocal
toc: true
toc_sticky: true
---



로컬에서는 멀쩡했다. QA에서도 통과했다. 그런데 운영에 올린 다음 날, "제 화면에 다른 사람 주문이 떠요"라는 문의가 들어온다. 재현하려고 아무리 눌러봐도 되지 않는다.

왜 사용자가 많아졌을 때만 터질까? 답은 대개 한 줄짜리 코드에 있다. 클래스 변수(static 필드)에 로그인한 사용자를 담아둔 코드다.


## 1. 클래스 변수는 어디에 사는가

인스턴스 변수는 객체가 생길 때마다 힙에 하나씩 생긴다. 반면 static 필드는 클래스 로더가 그 클래스를 적재할 때 딱 한 번 만들어진다. JVM 명세상으로는 메서드 영역(자바 8 이후 메타스페이스)에 속하고, HotSpot 구현에서는 `java.lang.Class` 객체와 함께 힙에 얹힌다. 저장 위치가 어디든 결론은 같다. **클래스당 하나다.**

사무실 화이트보드를 떠올리면 쉽다. 자리에 앉은 사람이 열 명이든 백 명이든, 벽에 걸린 보드는 한 장이다. 누군가 이름을 쓰면 이전에 쓰여 있던 이름은 지워진다. static 필드가 정확히 이 보드다.

```text
<svg viewBox="0 0 680 214" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="여러 요청 스레드가 하나의 static 필드를 공유하는 구조">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .box{fill:#f4f4f5;stroke:#c4c4c8}
    .bad{fill:#fdeeeb;stroke:#d3705c}
    .ln{stroke:#9b9b9f;fill:none}
    .ah{fill:#9b9b9f}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .box{fill:#26262a;stroke:#55555c}
      .bad{fill:#3a2420;stroke:#c9705e}
      .ln{stroke:#7c7c84} .ah{fill:#7c7c84}
    }
  </style>
  <defs>
    <marker id="ah1" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 z" class="ah"/>
    </marker>
  </defs>
  <text x="2" y="16" class="h">요청은 여러 개, 클래스 변수는 한 개</text>
  <rect x="2" y="36" width="198" height="34" rx="6" class="box"/>
  <text x="16" y="58" class="t">요청 1 · 사용자 A</text>
  <rect x="2" y="86" width="198" height="34" rx="6" class="box"/>
  <text x="16" y="108" class="t">요청 2 · 사용자 B</text>
  <rect x="2" y="136" width="198" height="34" rx="6" class="box"/>
  <text x="16" y="158" class="t">요청 3 · 사용자 C</text>
  <text x="2" y="194" class="t">스레드는 풀에서 꺼내 쓰고 반납한다 ↻</text>
  <line x1="206" y1="53" x2="418" y2="88" class="ln" marker-end="url(#ah1)"/>
  <line x1="206" y1="103" x2="418" y2="105" class="ln" marker-end="url(#ah1)"/>
  <line x1="206" y1="153" x2="418" y2="122" class="ln" marker-end="url(#ah1)"/>
  <rect x="426" y="56" width="250" height="100" rx="6" class="bad"/>
  <text x="442" y="84" class="t">클래스당 딱 하나</text>
  <text x="442" y="108" class="t">static User currentUser</text>
  <text x="442" y="132" class="t">마지막에 쓴 값만 남는다</text>
</svg>
```

## 2. 사고는 이렇게 난다

문제가 되는 코드는 대개 이렇게 생겼다. 편의를 위해 만든 유틸리티라 악의도 없고, 읽기에도 깔끔하다.

```text
public class LoginContext {
    // 어디서든 꺼내 쓰려고 만든 편의 필드. 여기서 사고가 시작된다.
    public static User currentUser;
}

@RestController
public class LoginController {

    @PostMapping("/login")
    public void login(@RequestBody LoginRequest req) {
        LoginContext.currentUser = userService.authenticate(req);  // 쓰기
    }
}

@Service
public class OrderService {

    public List<Order> myOrders() {
        Long userId = LoginContext.currentUser.getId();            // 읽기
        return orderRepository.findByUserId(userId);
    }
}
```

톰캣 같은 서블릿 컨테이너는 요청마다 스레드를 배정한다. 컨트롤러와 서비스 객체 자체는 새로 만들지 않는다. 즉, 갈아끼워지는 건 스레드뿐이고 클래스 변수는 그 자리에 그대로 있다. 그래서 요청 두 개가 조금이라도 겹치면 아래가 벌어진다.

```text
<svg viewBox="0 0 680 246" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="두 사용자의 요청이 겹치면서 static 값이 덮어써지는 타임라인">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .box{fill:#f4f4f5;stroke:#c4c4c8}
    .bad{fill:#fdeeeb;stroke:#d3705c}
    .ln{stroke:#9b9b9f;fill:none}
    .ah{fill:#9b9b9f}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .box{fill:#26262a;stroke:#55555c}
      .bad{fill:#3a2420;stroke:#c9705e}
      .ln{stroke:#7c7c84} .ah{fill:#7c7c84}
    }
  </style>
  <defs>
    <marker id="ah2" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 z" class="ah"/>
    </marker>
  </defs>
  <text x="2" y="16" class="h">요청이 겹치는 0.2초 사이에 벌어지는 일</text>
  <text x="173" y="38" class="t" text-anchor="middle">t1</text>
  <text x="315" y="38" class="t" text-anchor="middle">t2</text>
  <text x="457" y="38" class="t" text-anchor="middle">t3</text>
  <text x="599" y="38" class="t" text-anchor="middle">t4</text>
  <text x="2" y="80" class="t">스레드 1 · A</text>
  <text x="2" y="136" class="t">스레드 2 · B</text>
  <rect x="104" y="52" width="138" height="46" rx="6" class="box"/>
  <text x="118" y="74" class="t">A 로그인</text>
  <text x="118" y="91" class="t">currentUser ← A</text>
  <rect x="246" y="108" width="138" height="46" rx="6" class="box"/>
  <text x="260" y="130" class="t">B 로그인</text>
  <text x="260" y="147" class="t">currentUser ← B</text>
  <rect x="388" y="52" width="138" height="46" rx="6" class="bad"/>
  <text x="402" y="74" class="t">A가 주문 조회</text>
  <text x="402" y="91" class="t">currentUser 읽기</text>
  <rect x="530" y="52" width="138" height="46" rx="6" class="bad"/>
  <text x="544" y="74" class="t">읽은 값 = B</text>
  <text x="544" y="91" class="t">B의 주문이 노출</text>
  <text x="2" y="198" class="t">static 값</text>
  <rect x="104" y="176" width="138" height="32" rx="6" class="box"/>
  <text x="173" y="197" class="t" text-anchor="middle">A</text>
  <rect x="246" y="176" width="138" height="32" rx="6" class="bad"/>
  <text x="315" y="197" class="t" text-anchor="middle">B</text>
  <rect x="388" y="176" width="138" height="32" rx="6" class="bad"/>
  <text x="457" y="197" class="t" text-anchor="middle">B</text>
  <rect x="530" y="176" width="138" height="32" rx="6" class="bad"/>
  <text x="599" y="197" class="t" text-anchor="middle">B</text>
  <line x1="104" y1="226" x2="668" y2="226" class="ln" marker-end="url(#ah2)"/>
  <text x="2" y="230" class="t">시간</text>
</svg>
```

물론 로컬에서는 아무 문제가 없어 보인다. 혼자 쓰는 서버에서는 요청이 겹칠 일이 없으니 t2가 t3보다 먼저 끼어들 기회 자체가 없기 때문이다. 하지만 동시 접속자가 늘면 겹치는 건 예외가 아니라 기본값이 된다. 이걸 조금 유식한 말로 **경쟁 상태(race condition)** 라고 하고, 그중에서도 사용자 간에 데이터가 새는 이 유형은 보안 쪽에서 **크로스 유저 데이터 유출**로 분류된다. 로그인 실패보다 훨씬 무거운 사고인 것이다.

## 3. static만의 문제가 아니다

여기서 한 걸음 더 들어가야 한다. static을 지웠다고 안전해지는 건 아니기 때문이다.

```text
@Service
public class OrderService {

    private Long userId;   // static이 아니다. 그래도 위험하다.

    public void bind(Long userId) {
        this.userId = userId;
    }

    public List<Order> myOrders() {
        return orderRepository.findByUserId(this.userId);
    }
}
```

스프링 공식 문서에서 언급하듯 빈의 기본 스코프는 싱글톤이다. 컨테이너 안에 `OrderService` 인스턴스는 하나뿐이고, 모든 요청 스레드가 그 하나를 나눠 쓴다. 필드에 `static`이 붙어 있지 않을 뿐, 공유되는 정도는 앞의 화이트보드와 똑같다.

그래서 기억해야 할 기준은 "static을 쓰지 마라"가 아니다. 더 정확히는 이렇다.

> **생명주기가 요청보다 긴 객체에는, 요청 범위의 상태를 담지 않는다.**

즉 판단 기준은 문법이 아니라 수명인 것이다. 누가 이 객체를 얼마나 오래 들고 있는지를 먼저 보면 된다.

| 담는 곳 | 수명 | 사용자별 상태를 담아도 되는가 |
|---|---|---|
| static 필드 | 클래스 언로드까지 | 안 된다 |
| 싱글톤 빈의 인스턴스 필드 | 애플리케이션 종료까지 | 안 된다 |
| 메서드 지역 변수 · 파라미터 | 호출 한 번 | 된다 |
| ThreadLocal | 스레드 반납까지(직접 비워야 함) | 조건부로 된다 |
| HttpSession · Redis | 세션 만료까지 | 된다 |

## 4. 그럼 어디에 담아야 하나

```text
<svg viewBox="0 0 680 226" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="값의 성격에 따라 어디에 담을지 판단하는 기준표">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .box{fill:#f4f4f5;stroke:#c4c4c8}
    .ok{fill:#e9f4ec;stroke:#4f9a6c}
    .ln{stroke:#9b9b9f;fill:none}
    .ah{fill:#9b9b9f}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .box{fill:#26262a;stroke:#55555c}
      .ok{fill:#1e3227;stroke:#4f9a6c}
      .ln{stroke:#7c7c84} .ah{fill:#7c7c84}
    }
  </style>
  <defs>
    <marker id="ah3" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L8,3 L0,6 z" class="ah"/>
    </marker>
  </defs>
  <text x="2" y="16" class="h">왼쪽이 판단, 오른쪽이 조치</text>
  <rect x="2" y="32" width="314" height="38" rx="6" class="box"/>
  <text x="16" y="56" class="t">값이 절대 변하지 않는 상수인가</text>
  <line x1="322" y1="51" x2="346" y2="51" class="ln" marker-end="url(#ah3)"/>
  <rect x="354" y="32" width="322" height="38" rx="6" class="ok"/>
  <text x="368" y="56" class="t">static final 로 둬도 안전하다</text>
  <rect x="2" y="78" width="314" height="38" rx="6" class="box"/>
  <text x="16" y="102" class="t">요청 · 사용자마다 달라지는 값인가</text>
  <line x1="322" y1="97" x2="346" y2="97" class="ln" marker-end="url(#ah3)"/>
  <rect x="354" y="78" width="322" height="38" rx="6" class="ok"/>
  <text x="368" y="102" class="t">메서드 파라미터로 넘긴다</text>
  <rect x="2" y="124" width="314" height="38" rx="6" class="box"/>
  <text x="16" y="148" class="t">호출 깊이가 깊어 넘기기 번거로운가</text>
  <line x1="322" y1="143" x2="346" y2="143" class="ln" marker-end="url(#ah3)"/>
  <rect x="354" y="124" width="322" height="38" rx="6" class="ok"/>
  <text x="368" y="148" class="t">ThreadLocal + finally 에서 remove()</text>
  <rect x="2" y="170" width="314" height="38" rx="6" class="box"/>
  <text x="16" y="194" class="t">요청이 끝나도 유지해야 하는가</text>
  <line x1="322" y1="189" x2="346" y2="189" class="ln" marker-end="url(#ah3)"/>
  <rect x="354" y="170" width="322" height="38" rx="6" class="ok"/>
  <text x="368" y="194" class="t">HttpSession · Redis 같은 외부 저장소</text>
</svg>
```

### 4-1. 파라미터로 넘긴다

가장 재미없고, 가장 안전하다. 값이 어디서 와서 어디로 가는지가 시그니처에 다 드러난다.

```text
@RestController
public class OrderController {

    @GetMapping("/orders")
    public List<Order> myOrders(@AuthenticationPrincipal LoginUser user) {
        return orderService.findOrders(user.getId());   // 상태를 들고 있지 않는다
    }
}

@Service
public class OrderService {

    public List<Order> findOrders(Long userId) {        // 필드가 아니라 인자
        return orderRepository.findByUserId(userId);
    }
}
```

`OrderService`는 이제 아무 상태도 기억하지 않는다. 즉 스레드가 몇 개든 서로 밟을 값 자체가 없다. 이걸 조금 유식한 말로 **무상태(stateless) 설계**라고 한다.

### 4-2. 요청을 넘어 유지해야 하면 세션에 담는다

로그인 정보처럼 여러 요청에 걸쳐 살아 있어야 하는 값은 `HttpSession`이나 스프링 시큐리티의 세션 저장소가 제자리다. 서버를 여러 대로 늘릴 계획이라면 세션 자체를 Redis로 빼두는 편이 낫다.

```text
@PostMapping("/login")
public void login(@RequestBody LoginRequest req, HttpSession session) {
    User user = userService.authenticate(req);
    session.setAttribute("LOGIN_USER", user.getId());   // 세션마다 별도 저장
}
```

### 4-3. 호출 깊이가 깊으면 ThreadLocal

감사 로그나 멀티테넌시 식별자처럼 모든 계층에서 필요한데 파라미터로 다 끌고 다니기 곤란한 값이 있다. 이럴 때 쓰는 게 `ThreadLocal`이다.

```text
public final class UserContext {

    private static final ThreadLocal<Long> HOLDER = new ThreadLocal<>();

    private UserContext() {}

    public static void set(Long userId) { HOLDER.set(userId); }
    public static Long  get()           { return HOLDER.get(); }
    public static void  clear()         { HOLDER.remove(); }
}
```

## 5. ThreadLocal도 static인데 왜 괜찮은가

당연히 나올 질문이다. `HOLDER`는 분명 `static final`이고, 앞에서 위험하다고 한 그 클래스 변수다.

차이는 무엇을 공유하느냐에 있다. 공유되는 건 **열쇠**이고, 값은 각자의 **사물함** 안에 들어간다. `ThreadLocal.set()`을 호출하면 값은 `HOLDER` 안이 아니라 현재 스레드 객체가 들고 있는 `ThreadLocalMap`에 저장되고, `HOLDER`는 그 맵을 찾는 키로만 쓰인다. 즉 스레드가 100개면 값도 100벌이다.

문제는 사물함을 비우지 않고 자리를 넘길 때다. 톰캣 스레드는 요청이 끝나면 사라지지 않고 풀로 돌아가 다음 요청에 재사용된다.

```text
<svg viewBox="0 0 680 224" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ThreadLocal remove 호출 여부에 따른 스레드 재사용 결과 비교">
  <style>
    text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif}
    .t{font-size:12px;fill:#3a3a3a}
    .h{font-size:13.5px;font-weight:700;fill:#161616}
    .bad{fill:#fdeeeb;stroke:#d3705c}
    .ok{fill:#e9f4ec;stroke:#4f9a6c}
    @media (prefers-color-scheme:dark){
      .t{fill:#c8c8cc} .h{fill:#ededf0}
      .bad{fill:#3a2420;stroke:#c9705e}
      .ok{fill:#1e3227;stroke:#4f9a6c}
    }
  </style>
  <text x="2" y="16" class="h">같은 스레드를 물려받은 다음 요청 ↻</text>
  <rect x="2" y="30" width="330" height="178" rx="6" class="bad"/>
  <text x="18" y="54" class="h">remove() 를 빼먹은 경우</text>
  <text x="18" y="82" class="t">요청 1(A) 종료 · 사물함에 A 그대로</text>
  <text x="18" y="106" class="t">스레드 풀에 반납 ↻</text>
  <text x="18" y="130" class="t">요청 2(B)가 같은 스레드를 배정받음</text>
  <text x="18" y="154" class="t">UserContext.get() → A</text>
  <text x="18" y="184" class="t">B가 A로 인식된다</text>
  <rect x="346" y="30" width="330" height="178" rx="6" class="ok"/>
  <text x="362" y="54" class="h">finally 에서 remove() 한 경우</text>
  <text x="362" y="82" class="t">요청 1(A) 종료 · 사물함 비움</text>
  <text x="362" y="106" class="t">스레드 풀에 반납 ↻</text>
  <text x="362" y="130" class="t">요청 2(B)가 같은 스레드를 배정받음</text>
  <text x="362" y="154" class="t">UserContext.get() → null</text>
  <text x="362" y="184" class="t">정상적으로 B를 다시 채운다</text>
</svg>
```

그래서 값을 채우는 지점과 비우는 지점은 반드시 짝을 이뤄야 한다. 필터에서 `try ~ finally`로 감싸는 게 정석이다.

```text
public class UserContextFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        try {
            UserContext.set(resolveUserId(req));
            chain.doFilter(req, res);
        } finally {
            UserContext.clear();   // 이 줄이 빠지면 위 그림의 왼쪽이 된다
        }
    }
}
```

스프링 시큐리티의 `SecurityContextHolder`가 정확히 이 구조다. 기본 전략이 ThreadLocal이고, 필터 체인이 끝날 때 `clearContext()`를 호출해 사물함을 비운다. 남의 코드라고 특별한 마법을 쓰는 게 아니라, 같은 규칙을 성실히 지키고 있을 뿐이다.

비우지 않으면 정보 유출만 문제가 아니다. 스레드가 살아 있는 한 그 값도 GC 대상이 되지 않아 메모리가 조금씩 샌다. 웹앱을 리로드하면 톰캣이 "created a ThreadLocal but failed to remove it" 류의 경고를 남기는데, 이때는 클래스로더까지 붙잡혀 통째로 누수된다.

한 가지 더. `@Async`나 직접 만든 스레드로 작업을 넘기면 ThreadLocal 값은 따라가지 않는다. `InheritableThreadLocal`이 대안처럼 보이지만, 스레드 풀에서는 "스레드가 생성되던 시점"의 값이 복사되므로 오히려 엉뚱한 사용자 정보가 굳어버린다. 물론 상속이 되는 건 맞다. 하지만 풀 환경에서는 그 상속 시점이 요청 시점과 일치하지 않는다. 값을 넘겨야 한다면 `DelegatingSecurityContextExecutor`처럼 작업을 감싸 명시적으로 전파하는 편이 안전하다.

## 6. 같은 뿌리에서 자라는 다른 버그들

이 문제를 "세션을 static에 넣지 마라"로만 기억하면 절반만 배운 셈이다. 뿌리는 **공유 자원에 가변 상태를 두는 것**이고, 그 뿌리에서 자란 버그는 여러 갈래다.

**첫째, static 포맷터.** 가장 유명한 사례다.

```text
public class DateUtils {
    // SimpleDateFormat은 내부에 Calendar 상태를 들고 있어 스레드 안전하지 않다
    private static final SimpleDateFormat FMT = new SimpleDateFormat("yyyy-MM-dd");
}
```

`final`이라 안심하기 쉽지만 `final`은 참조를 못 바꾼다는 뜻이지 객체 내부가 안 변한다는 뜻이 아니다. 동시 호출이 들어오면 날짜가 뒤섞이거나 예외가 난다. 자바 8 이후로는 불변이라 스레드 안전한 `DateTimeFormatter`로 바꾸는 것이 좋다.

**둘째, static 캐시와 스케일아웃.** `static Map`에 조회 결과를 담아두면 처음엔 잘 돈다. 하지만 서버를 2대로 늘리는 순간 캐시도 2벌이 되고, 한쪽에서 갱신한 값이 다른 쪽에는 반영되지 않는다. 즉 상태를 프로세스 안에 두는 순간 그 애플리케이션은 수평 확장이 어려워지는 것이다. 캐시가 정말 필요하면 Redis처럼 프로세스 밖으로 빼거나, 최소한 크기 제한과 만료가 있는 캐시 라이브러리를 쓰는 게 낫다.

**셋째, 테스트 격리.** static 상태는 테스트 사이에도 그대로 남는다. 각각 돌리면 통과하는데 전체를 돌리면 실패하는 테스트, 실행 순서를 바꾸면 결과가 달라지는 테스트가 여기서 나온다. 테스트가 이상하게 깨진다면 static 필드부터 의심해볼 만하다.

**넷째, 클래스 로더 경계.** static은 "JVM당 하나"가 아니라 "클래스 로더당 하나"다. 하나의 WAS에 여러 애플리케이션을 올리면 같은 이름의 클래스라도 static 값은 서로 별개다. 싱글톤이 두 개가 되는 기묘한 현상이 여기서 나온다.

## 7. 스레드가 사라지는 시대에는

ThreadLocal은 "요청 하나 = 스레드 하나"라는 전제 위에 서 있다. 그런데 이 전제가 흔들리고 있다.

- **가상 스레드(Java 21+).** 요청마다 새로 만들고 버리므로 풀 재사용에 따른 유출 위험은 줄어든다. 다만 스레드가 수십만 개가 되면 ThreadLocal 값의 사본도 그만큼 늘어난다.
- **ScopedValue(JDK 25 정식).** 값을 불변으로 두고 실행 범위 안에서만 보이게 한다. 비우는 걸 잊을 수 없는 구조라는 점이 핵심이다.

```text
private static final ScopedValue<Long> USER_ID = ScopedValue.newInstance();

ScopedValue.where(USER_ID, userId)
           .run(() -> handleRequest(request));   // 이 블록 밖에서는 존재하지 않는다
// 여기서는 USER_ID.get() 이 예외를 던진다
```

- **리액티브(WebFlux).** 하나의 요청이 여러 스레드를 옮겨 다니므로 ThreadLocal은 아예 성립하지 않는다. 대신 요청 흐름을 따라다니는 Reactor Context를 쓴다.

그릇 이름은 계속 바뀐다. 하지만 원칙은 하나로 유지된다. **요청 범위의 데이터는 요청 범위를 가진 그릇에 담는다.** 이름을 외우기보다 이 문장을 붙잡는 편이 오래간다.

## 8. 코드 리뷰 체크리스트

- `static` 필드 중 `final`이 아닌 것이 있는가. 있다면 왜 변해야 하는지 설명할 수 있는가.
- `static final`이지만 내부 상태가 변하는 객체(포맷터, 컬렉션, 커넥션)를 담고 있지는 않은가.
- 싱글톤 빈에 사용자 · 요청 정보를 담는 인스턴스 필드가 있는가.
- `ThreadLocal.set()`을 쓴 곳마다 `finally`에 `remove()`가 짝지어져 있는가.
- 비동기나 별도 스레드로 넘어가는 지점에서 컨텍스트 전파를 명시적으로 처리했는가.
- 이 서버를 2대로 늘려도 동작이 같은가.

## 마무리

편의를 위해 만든 static 필드는 개발자 한 명이 쓸 때는 완벽하게 동작한다. 그 편리함이 함정이다. 문제는 사용자가 늘어난 뒤에, 그것도 재현되지 않는 형태로 나타나기 때문이다.

새 필드를 선언할 때 질문 하나만 던져보자. **"이 값은 사용자마다 다른가?"** 답이 '그렇다'라면 그 값은 클래스에 붙일 것이 아니라 요청을 따라 흘러가게 만드는 것이 좋다.
