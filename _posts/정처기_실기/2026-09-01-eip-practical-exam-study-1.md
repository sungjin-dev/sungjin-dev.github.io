---
title: "[정처기 실기 공부 #1] 실기 문제 연습"
excerpt: "C,JAVA,PYTHON 기출 및 예상 문제"
categories:
  - 정처기-실기
tags:
  - 정처기
  - 정보처리기사
  - 실기
  - java
  - python
  - c
toc: true
toc_sticky: true
series: "정처기-실기"
order: 1
---

<iframe src="..." width="100%" height="900" style="border:0">


<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>정보처리기사 실기 · 프로그래밍 언어 활용 코드 문제</title>
<style>
  :root{
    --paper:#ffffff;
    --ink:#16202b;
    --muted:#616b78;
    --rule:#dde2e8;
    --code-bg:#f5f7f9;
    --ok:#1c6b48;
    --ok-bg:#eaf4ef;
    --bad:#a63a2a;
    --bad-bg:#fbeeeb;
    --mark:#24506e;
    --sans:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;
    --mono:'JetBrains Mono','D2Coding','SFMono-Regular',Consolas,'Nanum Gothic Coding',monospace;
  }
  @media (prefers-color-scheme: dark){
    :root{
      --paper:#12161b; --ink:#e6eaef; --muted:#9aa5b1; --rule:#2b323a;
      --code-bg:#181d23; --ok:#63c295; --ok-bg:#16261f; --bad:#e08977; --bad-bg:#2a1b18;
      --mark:#8fb8d6;
    }
  }
  *{box-sizing:border-box}
  body{
    margin:0; background:var(--paper); color:var(--ink);
    font-family:var(--sans); font-size:15px; line-height:1.7;
    -webkit-text-size-adjust:100%;
  }
  .wrap{max-width:760px; margin:0 auto; padding:28px 18px 80px}

  /* ── 답안지 머리글 ── */
  header{
    border-bottom:2px solid var(--ink); padding-bottom:14px; margin-bottom:8px;
  }
  header h1{font-size:20px; font-weight:700; margin:0 0 4px; letter-spacing:-.01em}
  header p{margin:0; color:var(--muted); font-size:13.5px}

  .scorebar{
    position:sticky; top:0; z-index:5; background:var(--paper);
    display:flex; align-items:center; gap:12px;
    padding:10px 0 12px; border-bottom:1px solid var(--rule); margin-bottom:26px;
    font-size:13.5px; color:var(--muted);
  }
  .track{flex:1; height:4px; background:var(--rule); border-radius:2px; overflow:hidden}
  .track i{display:block; height:100%; width:0; background:var(--mark); transition:width .25s ease}
  .scorebar b{color:var(--ink); font-variant-numeric:tabular-nums}

  /* ── 단원 필터 ── */
  .filters{display:flex; flex-wrap:wrap; gap:6px; margin:0 0 8px}
  #filters-lang{margin-top:-8px}
  #filters-unit{margin-bottom:4px}
  .chip{
    font-family:inherit; font-size:12.5px; cursor:pointer;
    background:transparent; color:var(--muted);
    border:1px solid var(--rule); border-radius:14px; padding:3px 11px;
  }
  .chip[aria-pressed="true"]{background:var(--ink); color:var(--paper); border-color:var(--ink)}

  /* ── 문항 ── */
  .q{padding:22px 0 26px; border-bottom:1px solid var(--rule)}
  .qhead{display:flex; align-items:baseline; gap:10px; flex-wrap:wrap; margin-bottom:10px}
  .qno{font-family:var(--mono); font-size:13.5px; color:var(--mark); font-weight:700}
  .qtag{font-size:12.5px; color:var(--muted)}
  .qtag span{color:var(--ink)}
  .qtext{margin:0 0 12px; font-size:14.5px}

  pre.code{
    margin:0 0 12px; background:var(--code-bg); border:1px solid var(--rule);
    border-radius:4px; padding:12px 12px 12px 0; overflow-x:auto;
    font-family:var(--mono); font-size:13px; line-height:1.65; tab-size:4;
  }
  pre.code .ln{
    display:inline-block; width:38px; padding-right:12px; margin-right:10px;
    text-align:right; color:var(--muted); opacity:.65; border-right:1px solid var(--rule);
    user-select:none;
  }
  .stdin{
    margin:0 0 12px; font-size:13px; color:var(--muted);
    display:flex; gap:8px; align-items:flex-start;
  }
  .stdin code{font-family:var(--mono); color:var(--ink); background:var(--code-bg);
    border:1px solid var(--rule); border-radius:3px; padding:1px 6px}

  /* ── 답안란 ── */
  .answer{position:relative}
  .answer label{display:block; font-size:13px; color:var(--muted); margin-bottom:6px}
  textarea{
    width:100%; min-height:72px; resize:vertical;
    font-family:var(--mono); font-size:13.5px; line-height:1.8; color:var(--ink);
    background:transparent; border:0; border-bottom:1px solid var(--ink);
    padding:6px 2px; outline:none; border-radius:0;
  }
  textarea:focus{border-bottom-width:2px; padding-bottom:5px}
  textarea:disabled{color:var(--muted)}
  .hintline{font-size:12.5px; color:var(--muted); margin-top:6px}

  .btns{display:flex; gap:8px; margin-top:12px; flex-wrap:wrap}
  button{
    font-family:inherit; font-size:13.5px; cursor:pointer;
    border:1px solid var(--ink); background:var(--ink); color:var(--paper);
    padding:6px 16px; border-radius:3px;
  }
  button.ghost{background:transparent; color:var(--ink); border-color:var(--rule)}
  button:focus-visible{outline:2px solid var(--mark); outline-offset:2px}
  button:disabled{opacity:.45; cursor:default}

  /* ── 메모 ── */
  .memo{margin-top:12px; border-left:2px solid var(--mark); padding:8px 0 4px 12px; border-radius:0}
  .memo label{display:block; font-size:12.5px; color:var(--muted); margin-bottom:4px}
  .memo textarea{min-height:56px; font-family:var(--sans); font-size:14px; border-bottom:1px dashed var(--rule)}
  button.has{border-color:var(--mark); color:var(--mark)}

  /* ── 채점 결과 ── */
  .verdict{margin-top:14px; border-radius:4px; padding:12px 14px; font-size:14px; display:none}
  .verdict.show{display:block}
  .verdict.ok{background:var(--ok-bg); border-left:3px solid var(--ok)}
  .verdict.bad{background:var(--bad-bg); border-left:3px solid var(--bad)}
  .verdict .mark{font-weight:700; margin-right:6px}
  .verdict.ok .mark{color:var(--ok)}
  .verdict.bad .mark{color:var(--bad)}
  .correct{
    margin:10px 0 0; font-family:var(--mono); font-size:13px; white-space:pre-wrap;
    background:var(--paper); border:1px solid var(--rule); border-radius:3px; padding:8px 10px;
  }
  .explain{margin:12px 0 0; font-size:13.5px; line-height:1.75}
  .explain ol{margin:6px 0 0; padding-left:20px}
  .explain li{margin:2px 0}
  .explain code{font-family:var(--mono); font-size:12.5px; background:var(--code-bg);
    border:1px solid var(--rule); border-radius:3px; padding:0 4px}

  footer{margin-top:28px; display:flex; flex-direction:column; gap:12px; align-items:flex-start}
  footer .total{font-size:14px; color:var(--muted)}
  footer .total b{color:var(--ink); font-size:17px; font-variant-numeric:tabular-nums}
  footer .btns{margin-top:0}
  #wrongonly[aria-pressed="true"]{background:var(--ink); color:var(--paper); border-color:var(--ink)}
  .exportbox{width:100%; border-top:1px solid var(--rule); padding-top:14px}
  .exportbox p{margin:0 0 8px; font-size:13px; color:var(--muted)}
  .exportbox code{font-family:var(--mono); font-size:12.5px; color:var(--ink)}
  .exportbox pre{
    margin:0 0 10px; background:var(--code-bg); border:1px solid var(--rule); border-radius:4px;
    padding:10px 12px; overflow-x:auto; white-space:pre-wrap; word-break:break-all;
    font-family:var(--mono); font-size:12.5px; line-height:1.6;
  }
</style>
</head>
<body>
<div class="wrap">

  <header>
    <h1>프로그래밍 언어 활용 · 코드 해석 연습</h1>
    <p>코드를 읽고 출력 결과를 직접 적어 본다. 줄바꿈과 공백은 자동으로 정규화되니 형태보다 값에 집중하면 된다.</p>
  </header>

  <div class="scorebar">
    <span>진행 <b id="done">0</b>/<b id="total">0</b></span>
    <div class="track"><i id="bar"></i></div>
    <span>정답 <b id="hit">0</b></span>
  </div>

  <div class="filters" id="filters-lang"></div>
  <div class="filters" id="filters-unit"></div>

  <main id="list"></main>

  <footer>
    <div class="total" id="scoreline">아직 채점한 문항이 없다</div>
    <div class="btns">
      <button class="ghost" id="wrongonly" aria-pressed="false">오답만 보기</button>
      <button class="ghost" id="retrywrong">오답 다시 풀기</button>
      <button class="ghost" id="export">메모 내보내기</button>
      <button class="ghost" id="reset">전체 다시 풀기</button>
    </div>
    <div class="exportbox" id="exportbox" hidden>
      <p>아래 블록을 복사해 파일 안의 <code>const NOTES = { ... }</code> 자리에 통째로 바꿔 넣는다.</p>
      <pre id="exportcode"></pre>
      <button class="ghost" id="copy">복사</button>
    </div>
  </footer>
</div>

<script>
/* ─────────────────────────────────────────────
   1) 문제 데이터 — UI와 완전히 분리된 순수 데이터
      문항을 추가할 때는 이 배열에만 손대면 된다.
   ───────────────────────────────────────────── */
const PROBLEMS = [
  {
    id: "310-c-1",
    unit: "310 데이터 입출력",
    lang: "C",
    prompt: "다음 C 코드에 <code>3 4</code>를 입력했을 때 출력 결과를 쓰시오.",
    stdin: "3 4",
    code:
`#include <stdio.h>
main()
{
	int i, j, k;
	scanf("%d %d", &i, &j);
	k = i + j;
	printf("%d\\n", k);
}`,
    answers: ["7"],
    hint: "scanf의 서식 문자열에 있는 공백은 입력의 공백·개행을 건너뛰라는 뜻이다.",
    explain:
`<code>scanf("%d %d", &i, &j)</code>가 3과 4를 각각 i, j에 담고 k에 합을 저장한다.
<code>printf("%d\\n", k)</code>는 7을 찍고 줄을 바꾼다. 마지막 개행은 눈에 보이지 않으므로 답안에는 7만 적으면 된다.`
  },
  {
    id: "310-c-2",
    unit: "310 데이터 입출력",
    lang: "C",
    prompt: "다음 C 코드에 <code>10#10</code>을 입력했을 때 출력 결과를 쓰시오.",
    stdin: "10#10",
    code:
`#include <stdio.h>
main() {
	int i, j;
	scanf("%o#%x", &i, &j);
	printf("%d %d", i, j);
}`,
    answers: ["8 16"],
    hint: "%o와 %x가 입력을 몇 진수로 해석하는지 떠올려 본다.",
    explain:
`서식 문자열의 <code>#</code>는 변환 지정자가 아니라 그냥 글자다. 입력에 있는 <code>#</code>와 그대로 짝을 맞추는 구분자 역할만 한다.
<ol>
<li><code>%o</code>는 앞의 <code>10</code>을 8진수로 읽는다 → 8</li>
<li><code>%x</code>는 뒤의 <code>10</code>을 16진수로 읽는다 → 16</li>
<li><code>%d</code>로 출력하므로 둘 다 10진수로 바뀌어 <code>8 16</code>이 찍힌다</li>
</ol>
즉, 읽을 때의 진법과 쓸 때의 진법이 다르면 값이 그대로 유지되지 않는다.`
  },
  {
    id: "311-java-1",
    unit: "311 데이터 입출력",
    lang: "Java",
    prompt: "다음 Java 코드에 <code>3</code>과 <code>5</code>를 입력했을 때 출력 결과를 쓰시오.",
    stdin: "3 5",
    code:
`import java.util.Scanner;

public class Test {
	public static void main(String args[]) {
		Scanner scan = new Scanner(System.in);
		int a = scan.nextInt();
		int b = scan.nextInt();
		System.out.printf("%d", a + b);
		scan.close();
	}
}`,
    answers: ["8"],
    hint: "nextInt()는 공백과 개행을 구분자로 보고 정수 하나씩만 끊어 읽는다.",
    explain:
`<code>nextInt()</code>가 두 번 호출되면서 3과 5를 차례로 읽는다. <code>printf("%d", a + b)</code>는 개행 없이 8만 출력한다.
<code>scan.close()</code>는 자원을 닫는 코드라 출력에는 영향이 없다.`
  },
  {
    id: "311-java-2",
    unit: "311 데이터 입출력",
    lang: "Java",
    prompt: "다음 Java 코드에 <code>10</code>을 입력했을 때 출력 결과를 쓰시오.",
    stdin: "10",
    code:
`import java.util.Scanner;
public class Test
{
	public static void main(String[] args)
	{
		Scanner scan = new Scanner(System.in);
		int a = scan.nextInt();
		System.out.printf("a * 3 = %d\\n", a * 3);
		System.out.println("a / 2 = " + (a / 2));
		System.out.print("a - 1 = " + (a - 1));
		scan.close();
	}
}`,
    answers: ["a * 3 = 30\na / 2 = 5\na - 1 = 9"],
    hint: "정수끼리의 나눗셈에서 소수점 아래가 어떻게 되는지 확인한다.",
    explain:
`<ol>
<li><code>a * 3</code> → 30</li>
<li><code>a / 2</code>는 int끼리의 연산이라 결과도 int다. 5.0이 아니라 <b>5</b>다</li>
<li><code>a - 1</code> → 9</li>
</ol>
<code>printf</code>의 <code>\\n</code>과 <code>println</code>이 각각 줄을 바꾸므로 세 줄로 출력된다. 마지막은 <code>print</code>라 줄바꿈이 없다.`
  },
  {
    id: "316-c-1",
    unit: "316 연산자 우선순위",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
int main() {
	int x = 7, y = 4, z;
	z = y % 3 < 3 ? 2 : 1;
	z = z & z >> 1;
	z = x > 5 && z <= 3 ? z * x : z / x;
	printf("%d", z);
	return 0;
}`,
    answers: ["0"],
    hint: "시프트 연산자와 비트 AND 중 어느 쪽이 먼저 계산되는지가 갈림길이다.",
    explain:
`<ol>
<li><code>y % 3</code>은 1이고 <code>1 &lt; 3</code>은 참이므로 z는 2가 된다</li>
<li><code>z &amp; z &gt;&gt; 1</code>에서 시프트가 비트 AND보다 우선순위가 높다. 즉 <code>z &amp; (z &gt;&gt; 1)</code>이므로 <code>2 &amp; 1</code> = <code>10₂ &amp; 01₂</code> = 0</li>
<li><code>x &gt; 5</code>도 참, <code>z &lt;= 3</code>도 참이라 <code>z * x</code>가 선택되어 <code>0 * 7</code> = 0</li>
</ol>
물론 <code>(z &amp; z) &gt;&gt; 1</code>로 읽고 싶어질 수 있다. 하지만 그렇게 계산하면 z가 1이 되어 최종 결과가 7로 어긋난다. 이런 문제는 손으로 괄호를 먼저 쳐 놓고 푸는 것이 좋다.`
  },
  {
    id: "317-c-1",
    unit: "317 제어문",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
main() {
	int c = 1;
	switch (3) {
	case 1: c += 3;
	case 2: c++;
	case 3: c = 0;
	case 4: c += 3;
	case 5: c -= 10;
	default: c--;
	}
	printf("%d", c);
}`,
    answers: ["-8"],
    hint: "break가 하나도 없다는 점에 주목한다.",
    explain:
`<code>switch (3)</code>이므로 <code>case 3</code>에서 시작한다. break가 없어 아래 case들이 조건 검사 없이 줄줄이 실행된다. 이걸 폴스루(fall-through)라고 한다.
<ol>
<li><code>case 3</code> → c = 0</li>
<li><code>case 4</code> → c = 3</li>
<li><code>case 5</code> → c = -7</li>
<li><code>default</code> → c = -8</li>
</ol>
초기값 1은 <code>case 3</code>에서 덮어써지므로 아무 영향이 없다.`
  },
  {
    id: "317-c-2",
    unit: "317 제어문",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
int main(void) {
	char str[] = "REPUBLICOFKOREA";
	int a = 0;
	while (str[a] != '\\0')
		++a;
	putchar(str[a-2]);
	return 0;
}`,
    answers: ["E"],
    hint: "반복이 끝난 시점에 a가 가리키는 곳은 마지막 글자가 아니다.",
    explain:
`while문은 널 문자를 만날 때까지 a를 늘리므로, 끝나고 나면 a는 문자열 길이인 15가 된다. 즉 a는 마지막 글자 다음 칸을 가리킨다.
<code>str[14]</code>가 'A', <code>str[13]</code>이 'E'이므로 <code>str[a-2]</code>는 <b>E</b>다.
길이를 세는 반복문 뒤에서 인덱스를 쓸 때는 한 칸 밀린다는 점을 항상 확인하는 것이 좋다.`
  },
  {
    id: "317-c-3",
    unit: "317 제어문",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
main() {
	int score[] = { 86, 53, 95, 76, 61 };
	char grade;
	char str[] = "Rank";
	for (int i = 0; i < 5; i++) {
		switch (score[i] / 10) {
		case 10:
		case 9:
			grade = 'A';
			break;
		case 8:
			grade = 'B';
			break;
		case 7:
			grade = 'C';
			break;
		default: grade = 'F';
		}
		if (grade != 'F')
			printf("%d is %c %s\\n", i + 1, grade, str);
	}
}`,
    answers: ["1 is B Rank\n3 is A Rank\n4 is C Rank"],
    hint: "F 등급은 출력되지 않는다. 그리고 출력되는 번호는 인덱스가 아니라 i+1이다.",
    explain:
`점수를 10으로 나눈 몫으로 등급을 정한다. 86→8(B), 53→5(default F), 95→9(A), 76→7(C), 61→6(default F)이다.
<code>if (grade != 'F')</code> 때문에 두 번째와 다섯 번째는 걸러지고, 출력 번호는 <code>i + 1</code>이므로 1, 3, 4가 찍힌다.`
  },
  {
    id: "318-java-1",
    unit: "318 제어문",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`public class Test {
	public static void main(String[] args) {
		int j, i;
		for (j = 0, i = 0; i <= 5; i++) {
			j += i;
			System.out.print(i);
			if (i == 5) {
				System.out.print("=");
				System.out.print(j);
			}
			else
				System.out.print("+");
		}
	}
}`,
    answers: ["0+1+2+3+4+5=15"],
    hint: "print는 줄을 바꾸지 않으므로 모든 출력이 한 줄로 이어 붙는다.",
    explain:
`i가 0부터 5까지 돌면서 자기 값을 찍고, 마지막 회차가 아니면 <code>+</code>를 덧붙인다. i가 5일 때는 <code>=</code>와 누적합 j를 찍는다.
j는 0+1+2+3+4+5 = 15이므로 최종 출력은 한 줄짜리 수식이 된다.`
  },
  {
    id: "318-java-2",
    unit: "318 제어문",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`public class Test {
	public static void main(String[] args) {
		int r = 0;
		for (int i = 1; i < 999; i++) {
			if (i % 3 == 0 && i % 2 == 0)
				r = i;
		}
		System.out.print(r);
	}
}`,
    answers: ["996"],
    hint: "r에는 조건을 만족한 값이 계속 덮어써진다. 결국 남는 건 마지막 값 하나다.",
    explain:
`3으로도 나누어떨어지고 2로도 나누어떨어진다는 건 6의 배수라는 뜻이다. r은 break 없이 계속 덮어써지므로 마지막으로 조건을 통과한 값만 남는다.
i는 998까지 도는데 그 이하의 가장 큰 6의 배수는 <b>996</b>이다.`
  },
  {
    id: "318-java-3",
    unit: "318 제어문",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`public class Test {
	public static void main(String[] args) {
		String str = "agile";
		int x[] = { 1, 2, 3, 4, 5 };
		char y[] = new char[5];
		int i = 0;
		while (i < str.length()) {
			y[i] = str.charAt(i);
			i++;
		}
		for (int p : x) {
			i--;
			System.out.print(y[i]);
			System.out.print(p + " ");
		}
	}
}`,
    answers: ["e1 l2 i3 g4 a5"],
    hint: "while문이 끝난 뒤 i의 값이 얼마인지부터 확인한다. 그 값이 두 번째 반복문의 시작점이 된다.",
    explain:
`while문이 끝나면 y에는 'a','g','i','l','e'가 담기고 i는 5가 된다. 향상된 for문은 x의 값을 1부터 꺼내지만, 그때마다 <code>i--</code>가 먼저 실행되므로 y는 뒤에서부터 읽힌다.
<ol>
<li>p=1일 때 i는 4 → <code>y[4]</code>는 'e' → <code>e1&nbsp;</code></li>
<li>p=2일 때 i는 3 → 'l' → <code>l2&nbsp;</code></li>
<li>이런 식으로 이어져 <code>i3&nbsp;</code>, <code>g4&nbsp;</code>, <code>a5&nbsp;</code></li>
</ol>
즉, 문자는 역순으로 숫자는 정순으로 짝지어져 출력된다.`
  },
  {
    id: "319-java-1",
    unit: "319 break와 continue",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`public class Test{
	public static void main(String[] args){
		int a = 0, sum = 0;
		while (a < 10) {
			a++;
			if (a % 2 == 1)
				continue;
			sum += a;
		}
		System.out.println(sum);
	}
}`,
    answers: ["30"],
    hint: "continue를 만나면 그 아래 문장은 건너뛰고 조건 검사로 돌아간다.",
    explain:
`<code>a++</code>가 조건 검사보다 먼저 오므로 a는 1부터 10까지 값을 갖는다. 홀수일 때는 <code>continue</code>가 <code>sum += a</code>를 건너뛰므로 짝수만 더해진다.
2+4+6+8+10 = <b>30</b>이다. a가 10이 된 회차까지 더해진다는 점을 놓치기 쉽다.`
  },
  {
    id: "319-c-1",
    unit: "319 break와 continue",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
main() {
	int input = 101110;
	int di = 1;
	int sum = 0;
	while (1) {
		if (input == 0) break;
		sum = sum + (input % 10) * di;
		di = di * 2;
		input = input / 10;
	}
	printf("%d", sum);
}`,
    answers: ["46"],
    hint: "di가 1, 2, 4, 8...로 커진다. 자릿수마다 곱해지는 값이 무엇을 뜻하는지 생각해 본다.",
    explain:
`<code>input % 10</code>으로 끝자리를 떼어내고 <code>input / 10</code>으로 한 칸씩 밀어낸다. 이때 곱해지는 di가 2의 거듭제곱이므로, 결국 101110을 2진수로 읽어 10진수로 바꾸는 코드다.
오른쪽 자리부터 0×1 + 1×2 + 1×4 + 1×8 + 0×16 + 1×32 = <b>46</b>이다.
<code>while (1)</code>은 그 자체로는 끝나지 않는 반복이고, 탈출은 오직 <code>break</code>가 담당한다.`
  },
  {
    id: "320-c-1",
    unit: "320 포인터",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
int main() {
	int a = 50;
	int *b = &a;
	*b = *b + 20;
	printf("%d, %d\\n", a, *b);
	char *s;
	s = "gilbut";
	for (int i = 0; i < 6; i += 2) {
		printf("%c, ", s[i]);
		printf("%c, ", *(s + i));
		printf("%s\\n", s + i);
	}
}`,
    answers: ["70, 70\ng, g, gilbut\nl, l, lbut\nu, u, ut"],
    hint: "%c는 글자 하나, %s는 그 위치부터 끝까지의 문자열이다.",
    explain:
`b가 a를 가리키므로 <code>*b</code>를 바꾸면 a도 같이 바뀐다. 그래서 첫 줄은 <code>70, 70</code>이다.
<code>s[i]</code>와 <code>*(s + i)</code>는 표기만 다를 뿐 같은 뜻이라 늘 같은 글자가 나온다. 반면 <code>%s</code>에 <code>s + i</code>를 넘기면 그 위치부터 널 문자까지를 통째로 출력한다.
<ol>
<li>i=0 → g, g, gilbut</li>
<li>i=2 → l, l, lbut</li>
<li>i=4 → u, u, ut</li>
</ol>`
  },
  {
    id: "320-c-2",
    unit: "320 포인터",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
int main() {
	int ary[3];
	int s = 0;
	*(ary + 0) = 1;
	ary[1] = *(ary + 0) + 2;
	ary[2] = *ary + 3;
	for (int i = 0; i < 3; i++)
		s = s + ary[i];
	printf("%d", s);
}`,
    answers: ["8"],
    hint: "<code>*ary</code>는 <code>ary[0]</code>과 같은 곳을 가리킨다.",
    explain:
`<code>*(ary + 0)</code>, <code>*ary</code>, <code>ary[0]</code>은 모두 같은 칸이다. 표기가 셋으로 갈려 있을 뿐이다.
<ol>
<li>ary[0] = 1</li>
<li>ary[1] = 1 + 2 = 3</li>
<li>ary[2] = 1 + 3 = 4</li>
</ol>
합은 1 + 3 + 4 = <b>8</b>이다. ary[2]를 계산할 때 ary[1]이 아니라 ary[0]을 쓴다는 점이 함정이다.`
  },
  {
    id: "320-c-3",
    unit: "320 포인터",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
main() {
	char* a = "qwer";
	char* b = "qwtety";
	for (int i = 0; a[i] != '\\0'; i++)
		for (int j = 0; b[j] != '\\0'; j++)
			if (a[i] == b[j])
				printf("%c", a[i]);
}`,
    answers: ["qwe"],
    hint: "안쪽 반복문은 일치하는 글자를 찾아도 멈추지 않는다. b에 같은 글자가 두 번 있으면 어떻게 될지 확인한다.",
    explain:
`a의 글자를 하나씩 꺼내 b 전체와 대조하고, 일치할 때마다 출력한다.
<ol>
<li>q → b의 첫 글자와 일치 → q</li>
<li>w → 일치 → w</li>
<li>e → 일치 → e</li>
<li>r → b에 없으므로 아무것도 출력하지 않는다</li>
</ol>
b에 t가 두 번 있지만 a에는 t가 없어 중복 출력은 일어나지 않는다. 즉 결과는 <b>qwe</b>다.`
  },
  {
    id: "321-c-1",
    unit: "321 구조체",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
main() {
	struct insa {
		char name[10];
		int age;
	} a[] = { "Kim", 28, "Lee", 38, "Park", 42, "Choi", 31 };
	struct insa* p;
	p = a;
	p++;
	printf("%s\\n", p->name);
	printf("%d\\n", p->age);
}`,
    answers: ["Lee\n38"],
    hint: "구조체 포인터의 ++는 1바이트가 아니라 구조체 하나만큼 건너뛴다.",
    explain:
`초기화 값이 두 개씩 짝지어져 a[0]은 Kim/28, a[1]은 Lee/38이 된다.
<code>p = a</code>는 a[0]을 가리키고, <code>p++</code>는 구조체 크기만큼 주소를 옮겨 a[1]을 가리킨다. 따라서 <code>p-&gt;name</code>은 Lee, <code>p-&gt;age</code>는 38이다.`
  },
  {
    id: "321-c-2",
    unit: "321 구조체",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
struct A {
	int n;
	int g;
};
main() {
	struct A st[2];
	for (int i = 0; i < 2; i++) {
		st[i].n = i;
		st[i].g = i + 1;
	}
	printf("%d", st[0].n + st[1].g);
}`,
    answers: ["2"],
    hint: "반복문이 채운 값을 표로 적어 놓고 필요한 두 칸만 꺼내면 된다.",
    explain:
`반복문이 st[0]에는 n=0, g=1을, st[1]에는 n=1, g=2를 넣는다.
출력하는 값은 <code>st[0].n + st[1].g</code>이므로 0 + 2 = <b>2</b>다. 인덱스와 멤버 이름을 헷갈리지 않도록 값을 먼저 적어 두는 것이 좋다.`
  },
  {
    id: "321-c-3",
    unit: "321 구조체",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
struct jsu {
	char nae[12];
	int os, db, hab, hhab;
};
int main() {
	struct jsu st[3] = { {"데이터1", 95, 88}, {"데이터2", 84, 91},
						{"데이터3", 86, 75} };
	struct jsu* p;
	p = &st[0];
	(p + 1)->hab = (p + 1)->os + (p + 2)->db;
	(p + 1)->hhab = (p + 1)->hab + p->os + p->db;
	printf("%d", (p + 1)->hab + (p + 1)->hhab);
}`,
    answers: ["501"],
    hint: "초기화 값이 os와 db까지만 주어졌다. 나머지 멤버의 초기값이 무엇인지 생각해 본다.",
    explain:
`p는 st[0]을 가리키므로 <code>p + 1</code>은 st[1], <code>p + 2</code>는 st[2]다.
<ol>
<li>st[1].hab = st[1].os + st[2].db = 84 + 75 = 159</li>
<li>st[1].hhab = 159 + st[0].os + st[0].db = 159 + 95 + 88 = 342</li>
<li>출력은 159 + 342 = <b>501</b></li>
</ol>
물론 hab과 hhab에 초기값이 없어 보여 불안할 수 있다. 하지만 일부만 초기화된 배열의 나머지 멤버는 0으로 채워지고, 여기서는 계산 전에 값을 덮어쓰므로 결과에 영향이 없다.`
  },
  {
    id: "322-c-1",
    unit: "322 사용자 정의 함수",
    lang: "C",
    prompt: "다음 C 코드에서 <code>Usort()</code> 실행이 끝난 뒤 배열 a의 내용을 순서대로 쓰시오.",
    code:
`#include <stdio.h>
void swap(int* a, int idx1, int idx2) {
	int t = a[idx1];
	a[idx1] = a[idx2];
	a[idx2] = t;
}

void Usort(int* a, int len) {
	for (int i = 0; i < len - 1; i++)
		for (int j = 0; j < len - 1 - i; j++)
			if (a[j] > a[j + 1])
				swap(a, j, j + 1);
}

main() {
	int a[] = { 85, 75, 50, 100, 95 };
	int nx = 5;
	Usort(a, nx);
}`,
    answers: ["50, 75, 85, 95, 100", "50 75 85 95 100"],
    hint: "이웃한 두 값을 비교해 큰 쪽을 뒤로 넘긴다. 어떤 정렬 알고리즘인지 떠올리면 결과는 바로 나온다.",
    explain:
`이웃한 두 원소를 비교해 순서가 어긋나면 자리를 바꾸고, 한 회전이 끝날 때마다 가장 큰 값이 맨 뒤에 고정된다. 버블 정렬이다.
안쪽 조건이 <code>len - 1 - i</code>인 이유도 이미 확정된 뒤쪽을 다시 비교하지 않기 위해서다. 결과는 오름차순인 <b>50, 75, 85, 95, 100</b>이다.
배열은 포인터로 넘어가므로 swap이 바꾼 값이 main의 a에 그대로 반영된다는 점이 이 문제의 핵심이다.`
  },
  {
    id: "322-c-2",
    unit: "322 사용자 정의 함수",
    lang: "C",
    prompt: "다음 C 코드의 출력 결과를 쓰시오.",
    code:
`#include <stdio.h>
int factorial(int n);
main() {
	int (*pf)(int);
	pf = factorial;
	printf("%d", pf(3));
}
int factorial(int n) {
	if (n <= 1)
		return 1;
	else
		return n * factorial(n - 1);
}`,
    answers: ["6"],
    hint: "<code>pf</code>는 값을 담는 변수가 아니라 함수를 가리키는 변수다.",
    explain:
`<code>int (*pf)(int)</code>는 정수를 받아 정수를 돌려주는 함수를 가리키는 포인터다. <code>pf = factorial</code>로 주소를 담았으니 <code>pf(3)</code>은 <code>factorial(3)</code>과 완전히 같다.
재귀는 3 × 2 × 1 순서로 풀려 <b>6</b>이 된다. 괄호 위치가 <code>int *pf(int)</code>였다면 포인터를 반환하는 함수 선언이 되어 뜻이 달라지므로, 괄호를 먼저 확인하는 것이 좋다.`
  },
  {
    id: "322-c-3",
    unit: "322 사용자 정의 함수",
    lang: "C",
    prompt: "다음 C 코드에 <code>5</code>를 입력했을 때 출력 결과를 쓰시오.",
    stdin: "5",
    code:
`#include <stdio.h>
int func(int a) {
	if (a <= 1) return 1;
	return a * func(a - 1);
}

int main() {
	int a;
	scanf("%d", &a);
	printf("%d", func(a));
}`,
    answers: ["120"],
    hint: "재귀 함수는 종료 조건부터 확인하고, 거꾸로 되짚어 올라오며 곱한다.",
    explain:
`<code>a &lt;= 1</code>일 때 1을 돌려주는 것이 종료 조건이다. func(5)는 5 × func(4)로 넘어가고, 이 과정이 func(1)까지 내려간 뒤 되짚어 올라오며 곱해진다.
5 × 4 × 3 × 2 × 1 = <b>120</b>이다. 즉 팩토리얼을 재귀로 구현한 전형적인 형태다.`
  },
  {
    id: "323-java-1",
    unit: "323 Java의 클래스",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`class ClassA {
	int a = 10;
	int funcAdd(int x, int y) {
		return x + y + a;
	}
}
public class Test {
	public static void main(String[] args) {
		int x = 3, y = 6, r;
		ClassA cal = new ClassA();
		r = cal.funcAdd(x, y);
		System.out.print(r);
	}
}`,
    answers: ["19"],
    hint: "메소드가 더하는 값은 두 개가 아니라 세 개다.",
    explain:
`<code>funcAdd</code>는 매개변수 x, y에 클래스의 멤버 변수 a까지 더한다. a는 객체가 만들어질 때 10으로 초기화되어 있다.
3 + 6 + 10 = <b>19</b>다.`
  },
  {
    id: "323-java-2",
    unit: "323 Java의 클래스",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`class A {
	int a;
	int b;
}
public class Test {
	static void func1(A m) {
		m.a *= 10;
	}
	static void func2(A m) {
		m.a += m.b;
	}
	public static void main(String args[]) {
		A m = new A();
		m.a = 100;
		func1(m);
		m.b = m.a;
		func2(m);
		System.out.printf("%d", m.a);
	}
}`,
    answers: ["2000"],
    hint: "객체를 넘기면 주소가 넘어간다. 메소드 안에서 바꾼 값이 밖에도 남는지 확인한다.",
    explain:
`객체는 참조로 전달되므로 메소드가 바꾼 값이 호출한 쪽에도 그대로 남는다.
<ol>
<li>m.a = 100</li>
<li>func1 → m.a = 1000</li>
<li>m.b = m.a → 1000</li>
<li>func2 → m.a = 1000 + 1000 = 2000</li>
</ol>
물론 기본형 변수였다면 값만 복사되어 원본이 그대로였을 것이다. 하지만 여기서는 참조가 넘어가므로 결과가 <b>2000</b>이 된다.`
  },
  {
    id: "323-java-3",
    unit: "323 Java의 클래스",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`class Static {
	public int a = 20;
	static int b = 0;
}

public class Test {
	public static void main(String[] args) {
		int a = 10;
		Static.b = a;
		Static st = new Static();
		System.out.println(Static.b++);
		System.out.println(st.b);
		System.out.println(a);
		System.out.print(st.a);
	}
}`,
    answers: ["10\n11\n10\n20"],
    hint: "후위 증가 연산자는 출력한 다음에 값을 올린다. 그리고 static 변수는 객체를 거쳐도 같은 저장 공간이다.",
    explain:
`<ol>
<li><code>Static.b</code>에 10이 들어간다</li>
<li><code>b++</code>는 후위 증가라 <b>10</b>을 먼저 출력하고 나서 11이 된다</li>
<li><code>st.b</code>는 객체를 통해 접근했을 뿐 같은 static 변수이므로 <b>11</b></li>
<li>main의 지역 변수 a는 영향을 받지 않아 <b>10</b></li>
<li>인스턴스 변수 <code>st.a</code>는 <b>20</b></li>
</ol>
즉, static 변수는 클래스마다 하나만 존재하고 지역 변수와는 아무 관계가 없다.`
  },
  {
    id: "324-java-1",
    unit: "324 상속과 오버라이딩",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`class A {
	int a;
	public A(int a) { this.a = a; }
	void display() { System.out.println("a=" + a); }
}
class B extends A {
	public B(int a) {
		super(a);
		super.display();
	}
}
public class Test {
	public static void main(String[] args) {
		B obj = new B(10);
	}
}`,
    answers: ["a=10"],
    hint: "main에는 출력문이 없다. 그렇다면 출력은 어디서 일어나는지 찾아본다.",
    explain:
`<code>new B(10)</code>이 B의 생성자를 부르고, 생성자 안의 <code>super(a)</code>가 부모 생성자를 호출해 a에 10을 넣는다. 이어서 <code>super.display()</code>가 부모의 메소드를 실행한다.
따라서 객체를 만드는 것만으로 <b>a=10</b>이 출력된다.`
  },
  {
    id: "324-java-2",
    unit: "324 상속과 오버라이딩",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`public class Main {
	public static class Parent {
		public int x(int i) { return i + 2; }
		public static String id() { return "P"; }
	}
	public static class Child extends Parent {
		public int x(int i) { return i + 3; }
		public String x(String s) { return s + "R"; }
		public static String id() { return "C"; }
	}
	public static void main(String[] args) {
		Parent ref = new Child();
		System.out.println(ref.x(2) + ref.id());
	}
}`,
    answers: ["5P"],
    hint: "인스턴스 메소드와 static 메소드는 어느 쪽을 기준으로 호출 대상이 정해지는지가 서로 다르다.",
    explain:
`인스턴스 메소드는 실제 객체의 것이 불린다. 참조 변수는 Parent 타입이지만 객체는 Child이므로 <code>ref.x(2)</code>는 Child의 것을 타고 2 + 3 = 5가 된다.
반면 static 메소드는 오버라이딩 대상이 아니라 참조 변수의 타입으로 결정된다. 그래서 <code>ref.id()</code>는 Parent의 <b>P</b>다.
정수 5와 문자열 "P"를 <code>+</code>로 이으면 문자열이 되므로 결과는 <b>5P</b>다.`
  },
  {
    id: "326-java-1",
    unit: "326 추상 클래스",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`abstract class Animal {
	String a = " is animal";
	abstract void look();
	void show() {
		System.out.println("Zoo");
	}
}
class Chicken extends Animal {
	Chicken() {
		look();
	}
	void look() {
		System.out.println("Chicken" + a);
	}
	void display() {
		System.out.println("two wings");
	}
}
public class Test {
	public static void main(String[] args) {
		Animal a = new Chicken();
		a.show();
	}
}`,
    answers: ["Chicken is animal\nZoo"],
    hint: "출력은 두 줄이다. 생성자에서 부르는 메소드도 출력에 포함된다.",
    explain:
`<code>new Chicken()</code>이 생성자를 실행하고, 생성자가 <code>look()</code>을 불러 첫 줄이 찍힌다. a에 담긴 문자열이 공백으로 시작하므로 <code>Chicken is animal</code>로 붙는다.
그다음 <code>a.show()</code>가 부모에게서 물려받은 메소드를 실행해 <code>Zoo</code>가 찍힌다.
<code>display()</code>는 Animal에 없는 메소드라 Animal 타입 참조로는 부를 수 없고, 여기서는 호출도 되지 않는다.`
  },
  {
    id: "326-java-2",
    unit: "326 추상 클래스",
    lang: "Java",
    prompt: "다음 Java 코드의 출력 결과를 쓰시오.",
    code:
`abstract class Vehicle {
	String name;
	abstract public String getName(String val);
	public String getName() {
		return "Vehicle name : " + name;
	}
}
class Car extends Vehicle {
	private String name;
	public Car(String val) {
		name = super.name = val;
	}
	public String getName(String val) {
		return "Car name : " + val;
	}
	public String getName(byte[] val) {
		return "Car name : " + val;
	}
}
public class Test {
	public static void main(String[] args) {
		Vehicle obj = new Car("Spark");
		System.out.print(obj.getName());
	}
}`,
    answers: ["Vehicle name : Spark"],
    hint: "호출한 쪽은 인수를 넘기지 않았다. 같은 이름의 메소드가 셋이나 있으니 매개변수부터 맞춰 본다.",
    explain:
`<code>obj.getName()</code>은 인수가 없으므로 Vehicle의 <code>getName()</code>이 불린다. Car의 두 메소드는 각각 String과 byte 배열을 받는 오버로딩이라 대상이 아니다.
생성자의 <code>name = super.name = val</code>은 부모의 name과 자식의 name 양쪽에 "Spark"를 넣는다. Vehicle의 메소드가 읽는 것은 부모 쪽 name이므로 <b>Vehicle name : Spark</b>가 출력된다.
물론 Car에도 같은 이름의 필드가 있어 헷갈리기 쉽다. 하지만 필드는 오버라이딩되지 않고 각자 따로 존재한다는 점을 기억하는 것이 좋다.`
  },
  {
    id: "327-py-1",
    unit: "327 Python의 활용",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`a = ['Seoul', 'Kyeonggi', 'Incheon', 'Daejeon', 'Daegu', 'Pusan']
str01 = 'S'
for i in a:
	str01 = str01 + i[1]
print(str01)`,
    answers: ["Seynaau"],
    hint: "<code>i[1]</code>은 첫 글자가 아니라 두 번째 글자다.",
    explain:
`반복 변수 i에는 문자열이 통째로 들어오고, <code>i[1]</code>은 인덱스 1의 글자, 즉 두 번째 글자다.
Seoul→e, Kyeonggi→y, Incheon→n, Daejeon→a, Daegu→a, Pusan→u가 차례로 붙는다.
시작값 'S'에 이어 붙여 <b>Seynaau</b>가 된다. 인덱스가 0부터 시작한다는 점만 놓치지 않으면 되는 문제다.`
  },
  {
    id: "327-py-2",
    unit: "327 Python의 활용",
    lang: "Python",
    prompt: "다음 Python 코드에 <code>python-java</code>를 입력했을 때 출력 결과를 쓰시오.",
    stdin: "python-java",
    code:
`x, y = input('입력 :').split('-')
a = [ 'abc123', 'def456', 'ghi789' ]
a.append(x)
a.append(y)
a.remove('def456')
print(a[1][-3:], a[2][:-3], sep = ',')
for i in range(3, 6):
	print(i, end = ' ')`,
    answers: ["789,pyt\n3 4 5"],
    hint: "remove가 실행된 뒤 리스트의 인덱스가 한 칸씩 당겨진다는 점부터 확인한다.",
    explain:
`<code>split('-')</code>이 입력을 나눠 x는 python, y는 java가 된다. 두 값을 덧붙인 뒤 def456을 지우면 리스트는 <code>['abc123', 'ghi789', 'python', 'java']</code>가 된다.
<ol>
<li><code>a[1][-3:]</code> → ghi789의 뒤 세 글자 → 789</li>
<li><code>a[2][:-3]</code> → python에서 뒤 세 글자를 뺀 것 → pyt</li>
<li><code>sep = ','</code>이므로 두 값이 쉼표로 이어진다</li>
</ol>
마지막 반복문은 <code>end = ' '</code> 때문에 줄바꿈 없이 <code>3 4 5&nbsp;</code>로 이어 출력된다.`
  },
  {
    id: "328-py-1",
    unit: "328 Python의 활용2",
    lang: "Python",
    prompt: "다음 Python 코드가 출력하는 세 줄을 과일명 알파벳순으로 정렬해 쓰시오.",
    code:
`a = {'apple', 'lemon', 'banana'}
a.update( {'kiwi', 'banana'} )
a.remove('lemon')
a.add('apple')
for i in a:
	print("과일명 : %s" % i)`,
    answers: ["과일명 : apple\n과일명 : banana\n과일명 : kiwi"],
    hint: "집합에는 같은 값이 두 번 들어가지 않는다.",
    explain:
`집합은 중복을 허용하지 않는다. update로 kiwi와 banana를 더해도 banana는 이미 있으므로 늘지 않고, 마지막 <code>add('apple')</code>도 아무 변화를 주지 않는다.
lemon만 빠져 남는 원소는 apple, banana, kiwi 세 개다.
물론 집합은 순서를 보장하지 않아 실제 출력 순서는 실행할 때마다 달라질 수 있다. 하지만 시험에서는 원소 구성이 답이므로 순서를 정해 적으면 된다.`
  },
  {
    id: "328-py-2",
    unit: "328 Python의 활용2",
    lang: "Python",
    prompt: "다음 Python 코드 실행 후 집합 asia의 원소를 가나다순으로 쉼표로 구분해 쓰시오.",
    code:
`asia = {'한국', '중국', '일본'}
asia.add('베트남')
asia.add('중국')
asia.remove('일본')
asia.update({'한국', '홍콩', '태국'})
print(asia)`,
    answers: ["베트남, 중국, 태국, 한국, 홍콩", "베트남,중국,태국,한국,홍콩"],
    hint: "add는 하나씩, update는 여러 개를 한 번에 넣는다. 둘 다 중복은 무시된다.",
    explain:
`<ol>
<li>베트남 추가 → 한국, 중국, 일본, 베트남</li>
<li>중국은 이미 있어 변화 없음</li>
<li>일본 제거</li>
<li>update로 한국, 홍콩, 태국을 한꺼번에 추가 → 한국은 중복이라 무시</li>
</ol>
남는 원소는 <b>베트남, 중국, 태국, 한국, 홍콩</b> 다섯 개다. add는 원소 하나를, update는 다른 집합을 통째로 합친다는 차이를 기억하는 것이 좋다.`
  },
  {
    id: "328-py-3",
    unit: "328 Python의 활용2",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`a = "REMEMBER NOVEMBER"
b = a[0:3] + a[12:16]
c = "R AND %s" % "STR"
print(b + c)`,
    answers: ["REMEMBER AND STR"],
    hint: "슬라이싱의 끝 인덱스는 포함되지 않는다. 공백도 한 글자로 센다.",
    explain:
`문자열을 인덱스로 적어 보면 공백이 8번, N이 9번 자리다.
<ol>
<li><code>a[0:3]</code> → REM (3번은 제외)</li>
<li><code>a[12:16]</code> → 12번부터 15번까지 → EMBE</li>
<li><code>%s</code> 자리에 STR이 들어가 c는 <code>R AND STR</code></li>
</ol>
이어 붙이면 <b>REMEMBER AND STR</b>이 된다. 앞의 REMEMBE와 c의 첫 글자 R이 만나 단어가 완성되는 것이 이 문제의 노림수다.`
  },
  {
    id: "329-py-1",
    unit: "329 람다 식",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`a = [1, 2, 3, 4, 5]
a = list(map(lambda num : num + 100, a))
print(a)`,
    answers: ["[101, 102, 103, 104, 105]"],
    hint: "리스트를 그대로 출력하면 대괄호와 쉼표까지 함께 찍힌다.",
    explain:
`<code>map</code>은 리스트의 원소를 하나씩 람다에 넣어 결과를 모은다. 여기서는 각 값에 100을 더한다.
<code>print</code>에 리스트를 그대로 넘겼으므로 대괄호와 쉼표가 포함된 <b>[101, 102, 103, 104, 105]</b> 형태로 출력된다. 쉼표 뒤 공백까지 답에 포함된다는 점을 놓치기 쉽다.`
  },
  {
    id: "330-py-1",
    unit: "330 Python의 클래스",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`class Cls:
	x, y = 10, 20
	def chg(self):
		temp = self.x
		self.x = self.y
		self.y = temp
a = Cls()
print(a.x, a.y)
a.chg()
print(a.x, a.y)`,
    answers: ["10 20\n20 10"],
    hint: "print에 값을 쉼표로 나열하면 사이에 공백이 하나 들어간다.",
    explain:
`첫 출력은 클래스에 정의된 초기값 그대로 <code>10 20</code>이다.
<code>chg()</code>는 temp를 거쳐 두 값을 맞바꾸는 전형적인 교환 코드이므로 두 번째 출력은 <code>20 10</code>이다.
temp 없이 <code>self.x = self.y</code>부터 실행했다면 원래 x 값이 사라져 둘 다 20이 됐을 것이다.`
  },
  {
    id: "330-py-2",
    unit: "330 Python의 클래스",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`class FourCal:
	def setdata(sel, fir, sec):
		sel.fir = fir
		sel.sec = sec
	def add(sel):
		result = sel.fir + sel.sec
		return result
a = FourCal()
a.setdata(4, 2)
print(a.add())`,
    answers: ["6"],
    hint: "메소드의 첫 매개변수는 호출할 때 넘기지 않아도 자동으로 채워진다.",
    explain:
`첫 매개변수 이름이 self가 아니라 sel이지만 역할은 같다. 이름이 무엇이든 첫 자리에는 객체 자신이 들어간다.
따라서 <code>a.setdata(4, 2)</code>는 fir에 4, sec에 2를 넣고, <code>add()</code>는 둘을 더해 <b>6</b>을 돌려준다.`
  },
  {
    id: "331-py-1",
    unit: "331 클래스 없는 메소드",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`def calc(x, y):
	x *= 3
	y /= 3
	print(x, y)
	return x

a, b = 3, 12
a = calc(a, b)
print(a, b)`,
    answers: ["9 4.0\n9 12"],
    hint: "<code>/</code> 연산의 결과 자료형이 무엇인지 확인한다. 그리고 함수 안에서 바꾼 값이 밖에도 남는지 생각해 본다.",
    explain:
`<code>x *= 3</code>으로 9, <code>y /= 3</code>으로 4.0이 된다. 파이썬에서 <code>/</code>는 나누어떨어져도 실수를 돌려주므로 4가 아니라 <b>4.0</b>이다.
함수 안에서 바뀐 값은 밖의 a, b에 영향을 주지 않는다. 다만 a는 반환값을 다시 대입받아 9가 되고, b는 12 그대로다.`
  },
  {
    id: "331-py-2",
    unit: "331 클래스 없는 메소드",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`def func(num1, num2 = 2):
	print('a =', num1, 'b =', num2)
func(20)`,
    answers: ["a = 20 b = 2"],
    hint: "인수를 하나만 넘겼는데 매개변수는 둘이다. 나머지 하나는 어디서 오는지 본다.",
    explain:
`<code>num2 = 2</code>는 기본값이다. 호출할 때 값을 넘기지 않으면 이 값이 쓰인다.
<code>print</code>에 쉼표로 나열된 항목 사이에는 공백이 하나씩 들어가므로 <code>a = 20 b = 2</code>가 된다. 문자열 안의 <code>=</code> 뒤 공백과 print가 넣는 공백을 헷갈리지 않는 것이 좋다.`
  },
  {
    id: "332-py-1",
    unit: "332 Python Range",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`a = 100
result = 0
for i in range(1,3):
	result = a >> i
	result = result + 1
print(result)`,
    answers: ["26"],
    hint: "result에 누적되는 것이 아니라 매번 새로 대입된다. 그리고 range(1,3)은 3을 포함하지 않는다.",
    explain:
`<code>range(1, 3)</code>은 1과 2만 돌린다. 그리고 <code>result = a >> i</code>가 누적이 아니라 대입이므로 앞 회차의 값은 남지 않는다.
<ol>
<li>i=1 → 100을 오른쪽으로 1비트 이동 → 50, 여기에 1을 더해 51</li>
<li>i=2 → 100을 2비트 이동 → 25, 여기에 1을 더해 26</li>
</ol>
마지막 값만 남으므로 답은 <b>26</b>이다. 오른쪽 시프트는 2로 나눈 몫과 같다고 보면 계산이 빠르다.`
  },
  {
    id: "333-py-1",
    unit: "333 Python 슬라이스",
    lang: "Python",
    prompt: "다음 Python 코드에 <code>Alphabet</code>을 입력했을 때 출력 결과를 쓰시오.",
    stdin: "Alphabet",
    code:
`String = input("7문자 이상 문자열을 입력하시오 :")
m = String[0:3]+String[-3:]
print(m)`,
    answers: ["Alpbet"],
    hint: "음수 인덱스는 뒤에서부터 센다. <code>[-3:]</code>은 마지막 세 글자다.",
    explain:
`<code>String[0:3]</code>은 앞에서 세 글자인 Alp다. 끝 인덱스 3은 포함되지 않는다.
<code>String[-3:]</code>은 뒤에서 세 번째부터 끝까지이므로 bet다.
이어 붙여 <b>Alpbet</b>이 된다. 앞뒤 세 글자만 남기고 가운데를 잘라내는 전형적인 슬라이싱 문제다.`
  },
  {
    id: "335-py-1",
    unit: "335 세트·딕셔너리 메소드",
    lang: "Python",
    prompt: "다음 Python 코드의 출력 결과를 쓰시오.",
    code:
`lst = [1,2,3]
dst = {i : i* 2 for i in lst}
s = set(dst.values())
lst[0] = 99
dst[2] = 7
s.add(99)
print(len(s & set(dst.values())))`,
    answers: ["2"],
    hint: "<code>&</code>는 두 집합에 모두 들어 있는 원소만 남긴다. 그리고 s는 dst를 계속 따라다니지 않는다.",
    explain:
`딕셔너리 컴프리헨션이 <code>{1:2, 2:4, 3:6}</code>을 만들고, s는 그 시점의 값들을 복사해 <code>{2, 4, 6}</code>이 된다. 이후 <code>lst[0] = 99</code>로 리스트를 고쳐도 이미 만들어진 dst는 바뀌지 않는다.
<ol>
<li>dst[2] = 7 → dst의 값들은 {2, 7, 6}</li>
<li>s.add(99) → s는 {2, 4, 6, 99}</li>
<li>교집합은 {2, 6} → 원소가 두 개</li>
</ol>
즉, s는 값을 복사한 별개의 집합이라 dst의 변경이 반영되지 않는다는 점이 답을 가른다.`
  }
];

/* ─────────────────────────────────────────────
   1-2) 내 메모 — 공부하다 얻은 내용을 문항 id로 붙인다
        브라우저에서 적은 뒤 "메모 내보내기"로 뽑아
        아래 객체에 붙여넣으면 다음에 열 때도 남는다
   ───────────────────────────────────────────── */
const NOTES = {
  // "316-c-1": "시프트가 & 보다 먼저. 시험장에서 괄호부터 치자.",
};

/* ─────────────────────────────────────────────
   2) 채점 엔진 — 정답 비교 규칙만 담당
   ───────────────────────────────────────────── */
function normalize(text){
  const lines = String(text).replace(/\r/g, "").split("\n")
    .map(l => l.trim().replace(/\s+/g, " "));
  while (lines.length && lines[0] === "") lines.shift();
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  return lines.join("\n");
}
function grade(input, answers){
  const mine = normalize(input);
  if (mine === "") return null;                 // 빈 답안은 채점하지 않는다
  return answers.some(a => normalize(a) === mine);
}

/* ─────────────────────────────────────────────
   3) 화면 렌더 — 데이터를 받아 DOM만 그린다
   ───────────────────────────────────────────── */
const state = new Map();   // id -> true(정답) | false(오답)
const notes = new Map();   // id -> 내 메모 문자열

function escapeHtml(s){
  return s.replace(/[&<>]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;" }[c]));
}
function renderCode(src){
  return src.split("\n")
    .map((line, i) => `<span class="ln">${i + 1}</span>${escapeHtml(line)}`)
    .join("\n");
}

const list = document.getElementById("list");

PROBLEMS.forEach((p, idx) => {
  const sec = document.createElement("section");
  sec.className = "q";
  sec.dataset.unit = p.unit;
  sec.dataset.lang = p.lang;
  sec.innerHTML = `
    <div class="qhead">
      <span class="qno">${String(idx + 1).padStart(2, "0")}</span>
      <span class="qtag"><span>${p.lang}</span> · ${p.unit}</span>
    </div>
    <p class="qtext">${p.prompt}</p>
    <pre class="code">${renderCode(p.code)}</pre>
    ${p.stdin ? `<p class="stdin">입력값 <code>${escapeHtml(p.stdin)}</code></p>` : ""}
    <div class="answer">
      <label for="ta-${p.id}">답안 (줄바꿈이 있으면 그대로 여러 줄로 적는다)</label>
      <textarea id="ta-${p.id}" spellcheck="false" autocomplete="off"></textarea>
      <p class="hintline" data-role="hint"></p>
    </div>
    <div class="btns">
      <button data-act="check">채점</button>
      <button class="ghost" data-act="hint">힌트</button>
      <button class="ghost" data-act="memo">메모</button>
      <button class="ghost" data-act="retry" disabled>다시 풀기</button>
    </div>
    <div class="memo" data-role="memo" hidden>
      <label for="me-${p.id}">내 메모 — 깨달은 점, 헷갈린 이유, 다음에 볼 것</label>
      <textarea id="me-${p.id}" data-role="memo-input" spellcheck="false"></textarea>
    </div>
    <div class="verdict" data-role="verdict"></div>
  `;
  list.appendChild(sec);
  sec.dataset.id = p.id;

  const ta      = sec.querySelector("textarea");
  const verdict = sec.querySelector('[data-role="verdict"]');
  const hintEl  = sec.querySelector('[data-role="hint"]');
  const btnCheck= sec.querySelector('[data-act="check"]');
  const btnHint = sec.querySelector('[data-act="hint"]');
  const btnMemo = sec.querySelector('[data-act="memo"]');
  const btnRetry= sec.querySelector('[data-act="retry"]');
  const memoBox = sec.querySelector('[data-role="memo"]');
  const memoTa  = sec.querySelector('[data-role="memo-input"]');

  notes.set(p.id, NOTES[p.id] || "");
  memoTa.value = notes.get(p.id);
  function markMemo(){
    const has = notes.get(p.id).trim() !== "";
    btnMemo.textContent = has ? "메모 ●" : "메모";
    btnMemo.classList.toggle("has", has);
  }
  markMemo();
  if (notes.get(p.id)) memoBox.hidden = false;

  memoTa.addEventListener("input", () => {
    notes.set(p.id, memoTa.value);
    markMemo();
  });
  btnMemo.addEventListener("click", () => {
    memoBox.hidden = !memoBox.hidden;
    if (!memoBox.hidden) memoTa.focus();
  });

  function check(){
    const result = grade(ta.value, p.answers);
    if (result === null){
      verdict.className = "verdict show bad";
      verdict.innerHTML = `<span class="mark">미입력</span>답안을 적은 뒤 채점한다.`;
      return;
    }
    state.set(p.id, result);
    ta.disabled = true;
    btnCheck.disabled = true;
    btnHint.disabled = true;
    btnRetry.disabled = false;
    verdict.className = "verdict show " + (result ? "ok" : "bad");
    verdict.innerHTML =
      `<span class="mark">${result ? "정답" : "오답"}</span>` +
      (result ? "" : "정답은 아래와 같다.") +
      `<div class="correct">${escapeHtml(p.answers[0])}</div>` +
      `<div class="explain">${p.explain}</div>`;
    updateScore();
  }
  function retry(){
    state.delete(p.id);
    ta.value = ""; ta.disabled = false;
    btnCheck.disabled = false; btnHint.disabled = false; btnRetry.disabled = true;
    verdict.className = "verdict"; verdict.innerHTML = "";
    hintEl.textContent = "";
    updateScore();
    ta.focus();
  }

  btnCheck.addEventListener("click", check);
  btnRetry.addEventListener("click", retry);
  btnHint.addEventListener("click", () => { hintEl.textContent = p.hint; });
  ta.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") check();
  });
});

function updateScore(){
  const done = state.size;
  const hit  = [...state.values()].filter(Boolean).length;
  document.getElementById("done").textContent = done;
  document.getElementById("hit").textContent  = hit;
  document.getElementById("bar").style.width  = (done / PROBLEMS.length * 100) + "%";

  const line = document.getElementById("scoreline");
  if (done === 0){
    line.textContent = "아직 채점한 문항이 없다";
  } else {
    const rate = Math.round(hit / done * 100);
    line.innerHTML = `${PROBLEMS.length}문항 중 <b>${done}</b>문항 채점 · `
      + `정답 <b>${hit}</b> · 오답 <b>${done - hit}</b> · 정답률 <b>${rate}</b>%`;
  }
}
document.getElementById("total").textContent = PROBLEMS.length;
updateScore();

/* ─────────────────────────────────────────────
   5) 오답 관리와 메모 내보내기
   ───────────────────────────────────────────── */
const wrongSet = new Set();   // "오답만 보기"를 켠 시점의 오답 목록

const btnWrong = document.getElementById("wrongonly");
btnWrong.addEventListener("click", () => {
  const on = btnWrong.getAttribute("aria-pressed") !== "true";
  wrongSet.clear();
  if (on) state.forEach((ok, id) => { if (!ok) wrongSet.add(id); });
  btnWrong.setAttribute("aria-pressed", String(on));
  pick.wrong = on;
  applyFilter();
  if (on && wrongSet.size === 0) alert("아직 오답으로 기록된 문항이 없다.");
});

document.getElementById("retrywrong").addEventListener("click", () => {
  const ids = [...state.entries()].filter(([, ok]) => !ok).map(([id]) => id);
  if (ids.length === 0){ alert("다시 풀 오답이 없다."); return; }
  ids.forEach(id => wrongSet.add(id));
  ids.forEach(id => {
    const sec = document.querySelector(`.q[data-id="${id}"]`);
    const btn = sec && sec.querySelector('[data-act="retry"]');
    if (btn && !btn.disabled) btn.click();
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("export").addEventListener("click", () => {
  const box  = document.getElementById("exportbox");
  const code = document.getElementById("exportcode");
  const lines = [];
  PROBLEMS.forEach(p => {
    const v = (notes.get(p.id) || "").trim();
    if (v) lines.push(`  ${JSON.stringify(p.id)}: ${JSON.stringify(v)},`);
  });
  code.textContent = lines.length
    ? "const NOTES = {\n" + lines.join("\n") + "\n};"
    : "적어 둔 메모가 없다. 문항의 [메모] 버튼을 눌러 먼저 작성한다.";
  box.hidden = false;
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.getElementById("copy").addEventListener("click", async () => {
  const text = document.getElementById("exportcode").textContent;
  try {
    await navigator.clipboard.writeText(text);
    alert("복사했다. 파일의 NOTES 자리에 붙여넣으면 된다.");
  } catch {
    alert("자동 복사가 막혀 있다. 블록을 직접 선택해 복사한다.");
  }
});

/* ─────────────────────────────────────────────
   4) 필터 — 언어와 단원을 함께 건다
   ───────────────────────────────────────────── */
const pick = { lang: "전체", unit: "전체", wrong: false };

function makeChips(box, values, key){
  box.innerHTML = "";
  values.forEach(v => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.type = "button";
    chip.textContent = v;
    chip.dataset.value = v;
    chip.setAttribute("aria-pressed", String(pick[key] === v));
    chip.addEventListener("click", () => { pick[key] = v; applyFilter(); });
    box.appendChild(chip);
  });
}

const langBox = document.getElementById("filters-lang");
const unitBox = document.getElementById("filters-unit");
const ALL_LANGS = ["전체", ...new Set(PROBLEMS.map(p => p.lang))];
const ALL_UNITS = ["전체", ...new Set(PROBLEMS.map(p => p.unit))];

function applyFilter(){
  // 선택한 언어에 문항이 없는 단원은 칩에서 감춘다
  const units = ["전체", ...new Set(PROBLEMS
    .filter(p => pick.lang === "전체" || p.lang === pick.lang)
    .map(p => p.unit))];
  if (!units.includes(pick.unit)) pick.unit = "전체";

  makeChips(langBox, ALL_LANGS, "lang");
  makeChips(unitBox, units, "unit");

  document.querySelectorAll(".q").forEach(sec => {
    const ok = (pick.lang === "전체" || sec.dataset.lang === pick.lang)
            && (pick.unit === "전체" || sec.dataset.unit === pick.unit)
            && (!pick.wrong || wrongSet.has(sec.dataset.id));
    sec.style.display = ok ? "" : "none";
  });
}
applyFilter();

document.getElementById("reset").addEventListener("click", () => {
  state.clear();
  wrongSet.clear();
  pick.wrong = false;
  btnWrong.setAttribute("aria-pressed", "false");
  applyFilter();
  document.querySelectorAll('[data-act="retry"]').forEach(b => {
    if (!b.disabled) b.click();
  });
  updateScore();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>
</body>
</html>


  
</iframe>
