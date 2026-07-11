---
title: "Java 조건문과 반복문"
excerpt: "신용권의『이것이 자바다』저서 참조"
categories: [Java]
tags:
  - Java
toc: true
toc_sticky: true
--- 


## 제1부. 조건문 — 프로그램에 분기점 만들기
### 1-1. 왜 조건문이 필요한가
지금까지 작성한 코드는 전부 위에서 아래로 한 줄씩 실행됐습니다. 하지만 현실의 프로그램은:

로그인 → 비밀번호가 맞으면 입장, 틀리면 거부
결제 → 잔액이 충분하면 승인, 부족하면 실패

이렇게 상황에 따라 다른 길로 가야 합니다. 그 갈림길을 만드는 게 조건문입니다.
### 1-2. if문 — 기본형
```java
javaint money = 5000;

if (money >= 4500) {
    System.out.println("아메리카노를 주문한다");
}
System.out.println("카페를 나온다");   // if와 무관하게 항상 실행
```
구조는 단순합니다: if (boolean 조건식) { 조건이 true일 때만 실행할 코드 }
여기서 지난 시간 내용이 바로 연결됩니다. 조건식 자리에는 반드시 boolean이 와야 합니다. C처럼 if (1)은 컴파일 에러라고 했었죠.
### 1-3. if-else — 두 갈래 길
```java
javaint money = 3000;

if (money >= 4500) {
    System.out.println("아메리카노 주문");
} else {
    System.out.println("잔액 부족... 물이나 마시자");
}
```

else는 "그 외 전부"입니다. 두 블록 중 정확히 하나만 실행됩니다.

### 1-4. if - else if - else — 여러 갈래 길

여러분이 전에 작성했던 학점 코드를 확장해봅시다.

```java
javaint score = 85;
char grade;

if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}
System.out.println("학점: " + grade);   // 학점: B
```

⭐ 여기서 가장 중요한 포인트: 조건은 위에서부터 순서대로 검사되고, 하나가 걸리면 나머지는 쳐다보지도 않습니다.
score가 85일 때 score >= 80에서 걸려 B가 되고 끝. "85는 70보다도 크니까 C도 되는 거 아냐?"라는 의문이 들 수 있는데, 이미 위에서 걸렸기 때문에 아래는 실행 자체가 안 됩니다. 그래서 조건의 순서가 곧 로직입니다. 순서를 뒤집으면:
```java
javaif (score >= 70) {          // 85가 여기서 먼저 걸림!
    grade = 'C';            // → 85점인데 C학점이 되는 버그
} else if (score >= 90) {   // 영원히 도달 불가능한 코드
    grade = 'A';
}
```
컴파일 에러도 없이 조용히 잘못된 결과를 내는, 가장 잡기 힘든 종류의 버그입니다. IntelliJ가 지난번처럼 "이 조건은 항상 ~다" 경고를 주는 이유가 이런 걸 잡기 위해서죠.

### 1-5. 중괄호 생략 — 하지 마세요
문법상 실행문이 한 줄이면 중괄호를 생략할 수 있습니다:
```java
javaif (score >= 90)
    System.out.println("A");
되긴 하는데, 유명한 사고 패턴이 있습니다:
javaif (score >= 90)
    System.out.println("A입니다");
    System.out.println("장학금 대상!");   // 들여쓰기는 if 안처럼 보이지만...
```

두 번째 줄은 if와 무관하게 항상 실행됩니다. 자바는 파이썬과 달리 들여쓰기가 문법이 아니거든요. 

실제로 애플이 2014년에 이 패턴 때문에 대형 보안 사고(`goto fail 버그`)를 낸 적이 있습니다. 
신입 개발자의 습관: 한 줄이어도 중괄호는 항상 쓴다!

### 1-6. switch문 — "값이 정확히 무엇인가"로 분기

if가 "범위나 조건"으로 나눈다면, switch는 **"이 변수의 값이 정확히 뭐냐"**로 나눕니다.

```java
javaint day = 3;

switch (day) {
    case 1:
        System.out.println("월요일");
        break;
    case 2:
        System.out.println("화요일");
        break;
    case 3:
        System.out.println("수요일");
        break;
    default:                          // 어느 case에도 없으면
        System.out.println("잘못된 입력");
}
```
⭐ break를 빼먹으면 벌어지는 일 (시험 초단골)
```java

javaint day = 2;
switch (day) {
    case 1: System.out.println("월");
    case 2: System.out.println("화");   // 여기서 시작해서
    case 3: System.out.println("수");   // break가 없으니
    default: System.out.println("잘못");  // 끝까지 전부 실행!
}
// 출력: 화 수 잘못
```

case는 "입장 지점"일 뿐이고, break가 없으면 아래로 줄줄이 흘러내립니다(fall-through). 

의도적으로 쓰는 경우도 있지만, 입문 단계에서는 "case마다 break"를 원칙으로 하세요.

참고로 자바 14부터는 이 문제를 없앤 새 문법도 있습니다. 요즘 코드에서 보게 될 테니 눈에만 익혀두세요:

```java
javaString dayName = switch (day) {
    case 1 -> "월요일";
    case 2 -> "화요일";
    case 3 -> "수요일";
    default -> "잘못된 입력";
};   // 화살표 문법: break 불필요, 값을 바로 반환
```
if vs switch 선택 기준: 범위 비교(score >= 90)는 if만 가능. 특정 값 매칭(메뉴 번호, 요일, 등급 문자)은 switch가 깔끔.

## 제2부. 반복문 — 같은 일을 컴퓨터에게 시키기

### 2-1. 왜 반복문인가
"1부터 100까지 더하라"를 지금까지 배운 걸로 하면 1+2+3+... 을 직접 쳐야 합니다. 컴퓨터의 존재 이유가 반복 노동 대행인데 사람이 반복하면 안 되겠죠.
### 2-2. for문 — 횟수가 정해진 반복

```java
javafor (int i = 1; i <= 5; i++) {
    System.out.println(i + "번째 반복");
}
구조를 해부하면:
javafor (① 초기식; ② 조건식; ④ 증감식) {
    ③ 실행문
}
```java
실행 순서가 핵심입니다: ① → ② → ③ → ④ → ② → ③ → ④ → ... (②가 false가 되면 종료)
①은 딱 한 번만 실행되고, 이후 ②③④가 사이클을 돕니다. i를 종이에 적어가며 따라가 보세요:
회차i 값i <= 5?동작시작1true"1번째" 출력, i++22true"2번째" 출력, i++............55true"5번째" 출력, i++66false종료
1부터 100까지의 합:

```java
javaint sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;         // 지난 시간 복합 대입 연산자!
}
System.out.println(sum);   // 5050
```

⭐ 스코프 복습: int i는 for문 안에서 선언됐으므로 for가 끝나면 소멸합니다. for 밖에서 System.out.println(i)는 에러 — 변수 단원에서 배운 그대로죠.

### 2-3. while문 — 조건이 만족되는 동안 반복

```java
javaint hp = 100;

while (hp > 0) {
    System.out.println("전투 중... 남은 HP: " + hp);
    hp -= 30;
}
System.out.println("게임 오버");
// 출력: 100 → 70 → 40 → 10 → 게임 오버
```
for vs while 선택 기준:

몇 번 돌지 아는 경우 ("100번 반복") → for
몇 번일지 모르고 조건만 아는 경우 ("HP가 0이 될 때까지", "사용자가 종료를 입력할 때까지") → while

⭐ 무한 루프 주의: while 블록 안에서 조건을 변화시키는 코드(hp -= 30)를 빼먹으면 조건이 영원히 true라서 프로그램이 멈추지 않습니다. while을 쓸 때는 항상 "이 조건이 언제 false가 되지?"를 자문하세요. (참고: 의도적 무한 루프 while (true)는 서버 프로그램 등에서 실제로 쓰입니다.)

### 2-4. do-while — 일단 한 번은 실행

```java
javaint input = 0;

do {
    System.out.println("메뉴를 표시합니다");   // 조건 검사 전에 무조건 1회 실행
    input = 9;   // (실제로는 사용자 입력을 받는 자리)
} while (input != 9);
```
while은 조건을 먼저 검사하지만, do-while은 실행 후 검사합니다. "메뉴를 일단 보여주고, 종료 선택 전까지 반복" 같은 상황에 씁니다. 사용 빈도는 셋 중 가장 낮으니 개념만 알아두세요.

### 2-5. break와 continue — 반복 흐름 제어

```java
java// break: 반복문 자체를 탈출
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    System.out.print(i + " ");
}
// 출력: 1 2 3 4

// continue: 이번 회차만 건너뛰고 다음 회차로
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;   // 짝수면 아래 출력을 건너뜀
    System.out.print(i + " ");
}
// 출력: 1 3 5 7 9
```

break는 "퇴장", continue는 "이번 판 패스"입니다. switch의 break와 이름이 같지만 여기서는 반복문을 탈출한다는 점만 구분하면 됩니다.

### 2-6. 중첩 반복문 — 반복 속의 반복
```java
javafor (int i = 2; i <= 4; i++) {         // 바깥: 단
    for (int j = 1; j <= 3; j++) {     // 안쪽: 곱하는 수
        System.out.println(i + " x " + j + " = " + (i * j));
    }
    System.out.println("---");
}
```
핵심 감각: 바깥 루프가 1번 돌 때, 안쪽 루프는 끝까지 다 돕니다. 시계의 시침(바깥)이 한 칸 갈 때 분침(안쪽)이 한 바퀴 도는 것과 같습니다. 위 코드는 2단이 3줄 전부 출력된 후에야 3단으로 넘어갑니다.
