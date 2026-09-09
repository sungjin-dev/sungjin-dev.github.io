---
title: "[정처기 실기 공부 #3] 연산자 정리"
excerpt: "C,JAVA,PYTHON 기준"
categories:
  - 정처기-실기
tags:
  - 정처기
  - 연산자
  - 정보처리기사
  - 실기
  - java
  - python
  - c
  - 단산시관비논삼대순
toc: true
toc_sticky: true
series: "정처기-실기"
order: 3
---


# C / Java / Python 연산자 우선순위 정리 — 정보처리기사 실기용

정보처리기사 실기에서 연산자 우선순위 문제는 매번 비슷한 형태로 나온다. 그런데 왜 굳이 C, Java, Python 세 개를 한 표에 몰아넣어야 할까. 세 언어 문법이 겉보기엔 비슷하기 때문이다. 물론 대부분의 구간은 정말로 똑같다. 하지만 딱 한 구간에서 파이썬만 순서가 뒤집혀 있고, 이 부분을 모르고 넘어가면 시험장에서 딱 그 문제 하나를 틀리게 된다. 그래서 공통 구간은 하나의 표로, 다른 구간은 따로 짚어보는 방식으로 정리했다.

<br>

### 우선순위란 무엇을 뜻하는가

연산자 우선순위는 줄 서 있는 여러 연산 중 누가 먼저 계산되는지를 정하는 규칙이다. 즉, 우선순위가 높은 연산자는 줄에서 새치기를 허락받은 셈이고, 나머지는 그 계산이 끝날 때까지 자기 차례를 기다린다. 정보처리기사에서 자주 쓰는 두음 암기법은 "단산시관비논삼대순"이다. 단항 → 산술 → 시프트 → 관계 → 비트 → 논리 → 삼항 → 대입 → 순서, 이 아홉 글자만 외워두면 웬만한 구간은 순서대로 따라갈 수 있다.

<br>

### 우선순위 전체표 (C / Java 기준)

아래 표는 C와 Java를 기준으로 정리했다. 두 언어는 이 표 그대로 적용하면 된다. 파이썬은 6~11번 구간의 실제 동작 순서가 다르므로, 표를 본 뒤 바로 아래 파이썬 전용 설명을 함께 보는 것이 좋다.

| 순위 | 두음 | 분류 | C | Java | Python |
|---|---|---|---|---|---|
| 1 | 단 | 단항 연산자 | `++` `--` `+` `-` `!` `~` `(형변환)` `sizeof` `*`(역참조) `&`(주소) | `++` `--` `+` `-` `!` `~` | `+x` `-x` `~x` (증감 연산자 없음) |
| 2 | 산 | 곱셈 · 나눗셈 · 나머지 | `*` `/` `%` | `*` `/` `%` | `*` `/` `//` `%` `@` |
| 3 | 산 | 덧셈 · 뺄셈 | `+` `-` | `+` `-` | `+` `-` |
| 4 | 시 | 시프트 | `<<` `>>` | `<<` `>>` `>>>` | `<<` `>>` |
| 5 | 관 | 관계 (대소 비교) | `<` `<=` `>` `>=` | `<` `<=` `>` `>=` `instanceof` | `<` `<=` `>` `>=` |
| 6 | 관 | 등가 비교 | `==` `!=` | `==` `!=` | `==` `!=` `is` `is not` `in` `not in` |
| 7 | 비 | 비트 AND | `&` | `&` | `&` |
| 8 | 비 | 비트 XOR | `^` | `^` | `^` |
| 9 | 비 | 비트 OR | `\|` | `\|` | `\|` |
| 10 | 논 | 논리 AND | `&&` | `&&` | `and` |
| 11 | 논 | 논리 OR | `\|\|` | `\|\|` | `or` |
| 12 | 삼 | 삼항 조건 | `?:` | `?:` | 기호 없음 (`x if 조건 else y`) |
| 13 | 대 | 대입 | `=` `+=` `-=` 등 | `=` `+=` `-=` 등 | `=` `+=` `-=` 등 (식이 아닌 문장) |
| 14 | 순 | 순서 (콤마) | `,` | 없음 (for문 초기화/증감부에서만 구분자로 사용) | 없음 (콤마는 튜플을 만드는 문법) |

숫자가 낮을수록 먼저 계산된다. 결합 방향은 단항·대입·삼항이 오른쪽에서 왼쪽, 나머지는 왼쪽에서 오른쪽이다.

<br>

### 파이썬만 다른 지점 세 가지

**1. 비교와 비트 연산자의 순위가 뒤바뀐다.** 이게 가장 중요한 함정이다. C와 Java는 등가 비교(`==`)가 비트 연산자(`&` `^` `|`)보다 먼저 계산된다. 반대로 파이썬은 비트 연산자가 비교 연산자보다 먼저 계산된다. 즉, 같은 모양의 식이 언어에 따라 다른 결과를 낸다는 뜻이다.

```
0 == 0 | 1

C / Java: (0 == 0) | 1  →  1 | 1  →  1 (참)
Python  : 0 == (0 | 1)  →  0 == 1  →  False
```

같은 문자열인데 결과가 다르다. C 코드를 읽던 감각 그대로 파이썬 코드를 읽으면 딱 이 지점에서 틀린다.

<div align="center">

<svg viewBox="0 0 680 300" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="C/Java와 Python의 비교·비트 연산자 우선순위 위치가 서로 바뀌어 있음을 보여주는 다이어그램">
<style>
  svg{
    --bg:#ffffff;
    --border:#d1d5db;
    --text:#1f2937;
    --sub:#6b7280;
    --gray-fill:#f3f4f6;
    --gray-border:#9ca3af;
    --green-fill:#e6f4ea;
    --green-border:#4c9a6a;
    --line:#9ca3af;
    font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif;
  }
  @media (prefers-color-scheme: dark){
    svg{
      --bg:#1f2328;
      --border:#3d4451;
      --text:#e6e6e6;
      --sub:#9aa4b2;
      --gray-fill:#2b3038;
      --gray-border:#5a6270;
      --green-fill:#1f3428;
      --green-border:#5fae83;
      --line:#5a6270;
    }
  }
  .title{ font-size:13.5px; fill:var(--text); }
  .label{ font-size:12px; fill:var(--text); }
  .sub{ font-size:12px; fill:var(--sub); }
  .box{ stroke-width:1.3; rx:8; }
</style>
<rect x="0" y="0" width="680" height="300" fill="var(--bg)"/>
<text x="340" y="22" text-anchor="middle" class="title">비교 연산자 vs 비트 연산자 — 순위 위치가 서로 바뀐다</text>

<text x="16" y="180" class="sub" transform="rotate(-90 16 180)" text-anchor="middle">우선순위 높음 ↑</text>

<text x="170" y="52" text-anchor="middle" class="label">C / Java</text>
<rect x="60" y="65" width="220" height="66" class="box" fill="var(--gray-fill)" stroke="var(--gray-border)"/>
<text x="170" y="92" text-anchor="middle" class="label">관계 · 등가 비교</text>
<text x="170" y="112" text-anchor="middle" class="sub">&lt; &lt;= &gt; &gt;= == !=</text>

<rect x="60" y="155" width="220" height="66" class="box" fill="var(--green-fill)" stroke="var(--green-border)"/>
<text x="170" y="182" text-anchor="middle" class="label">비트 AND / XOR / OR</text>
<text x="170" y="202" text-anchor="middle" class="sub">&amp; ^ |</text>

<text x="510" y="52" text-anchor="middle" class="label">Python</text>
<rect x="400" y="65" width="220" height="66" class="box" fill="var(--green-fill)" stroke="var(--green-border)"/>
<text x="510" y="92" text-anchor="middle" class="label">비트 AND / XOR / OR</text>
<text x="510" y="112" text-anchor="middle" class="sub">&amp; ^ |</text>

<rect x="400" y="155" width="220" height="66" class="box" fill="var(--gray-fill)" stroke="var(--gray-border)"/>
<text x="510" y="182" text-anchor="middle" class="label">관계 · 등가 · in · is</text>
<text x="510" y="202" text-anchor="middle" class="sub">&lt; &lt;= &gt; &gt;= == != is in</text>

<path d="M 282 98 Q 340 60 398 190" fill="none" stroke="var(--line)" stroke-width="1.2" stroke-dasharray="4 3"/>
<path d="M 282 188 Q 340 230 398 98" fill="none" stroke="var(--line)" stroke-width="1.2" stroke-dasharray="4 3"/>
<text x="340" y="145" text-anchor="middle" class="sub">위치가 뒤바뀐다</text>

<rect x="60" y="248" width="560" height="34" class="box" fill="var(--bg)" stroke="var(--border)"/>
<text x="340" y="270" text-anchor="middle" class="sub">0 == 0 | 1  →  C / Java 결과: 1 (참)      Python 결과: False</text>
</svg>

</div>

**2. 삼항 연산자가 기호가 아니라 문장 형태다.** C와 Java는 `조건 ? 참값 : 거짓값` 형태의 기호 연산자를 쓴다. 파이썬은 `참값 if 조건 else 거짓값` 처럼 단어로 풀어 쓴다. 우선순위상 위치는 대입보다 위, 논리 연산보다 아래로 동일한 자리를 차지하지만 문법 자체가 다르므로 헷갈리지 않도록 주의하는 것이 좋다.

**3. 증감 연산자와 콤마 연산자가 아예 없다.** 파이썬에는 `++`, `--`가 없어서 `i++` 같은 코드는 문법 오류가 난다. `i += 1`로 풀어 써야 한다. 콤마도 C처럼 식을 연달아 계산하는 연산자가 아니라 튜플을 만드는 문법이다. 덧붙이자면 파이썬의 거듭제곱 `**`는 단항 마이너스보다 우선순위가 높아서 `-2 ** 2`는 `-4`가 나온다. 부호부터 계산하는 C/Java 감각과 다르니 이 부분도 따로 기억해두는 것이 좋다.

<br>

### 대표 함정 문제로 확인하기

두음 순서를 그대로 적용해서 다음 식을 손으로 짚어보자.

```
result = 2 + 3 * 4 > 10 && 5 == 5;
```

1. 산(곱셈) — `3 * 4` → `12`
2. 산(덧셈) — `2 + 12` → `14`
3. 관(대소) — `14 > 10` → `1` (참)
4. 관(등가) — `5 == 5` → `1` (참)
5. 논(AND) — `1 && 1` → `1`

결과는 `result = 1`이다. 표에서 본 두음 순서를 그대로 따라가면 복잡해 보이는 식도 한 단계씩 풀린다.

<br>

### 마무리

이론표를 눈으로 읽는 것보다 식 하나를 직접 손으로 짚어보는 쪽이 오래 남는다. 오늘 정리한 표를 옆에 두고, 그동안 풀었던 기출 문제의 연산식을 단산시관비논삼대순 순서로 한 번씩 다시 짚어보는 것이 좋다. 특히 비트와 비교가 섞인 식이 나오면, 그 문제가 어떤 언어를 기준으로 하는지부터 확인하는 습관을 들이는 것이 좋다.
