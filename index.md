---
layout: splash
permalink: /
title: "SungJin의 개발 공부 기록"
excerpt: >-
  선명한 기억보다 희미한 기록이 낫다.<br>구조부터 이해하는 학습 노트.
  <div class="hero-terminal">
    <div class="hero-terminal__bar">
      <span></span><span></span><span></span>
    </div>
    <pre class="hero-terminal__body"><span class="prompt">$</span> whoami
<span class="out">sungjin — 기록하는 개발자</span>
<span class="prompt">$</span> ls series/
<span class="out">python-regex/  java-jvm/</span>
<span class="prompt">$</span> cat motto.txt
<span class="out">"선명한 기억보다 희미한 기록이 낫다"</span></pre>
  </div>
header:
  overlay_color: "#1a1b26"
feature_row:
  - title: "Python 정규표현식 시리즈"
    excerpt: "re.match()부터 패턴 문법까지, 문자열 검사의 모든 것을 다룬 4편 완결 시리즈."
    url: "/python/"
    btn_label: "시리즈 보기"
    btn_class: "btn--primary"
  - title: "Java 메모리 & 참조 타입"
    excerpt: "스택·힙·메타스페이스, JVM 실행 과정까지. 구조부터 이해하는 자바 연재."
    url: "/java/"
    btn_label: "연재 보기"
    btn_class: "btn--primary"
  - title: "필기노트 전체보기"
    excerpt: "모든 글을 시간순으로. 공부하며 남긴 기록 전체 목록."
    url: "/year-archive/"
    btn_label: "전체 글 보기"
    btn_class: "btn--primary"
---

{% include feature_row %}

## 다른 주제들

[C](/C/) [C++](/C++/) [JavaScript](/javascript/) [CSS](/css/) [Flask](/flask/) [SQL](/SQL/) [Git](/git/)
{: .topic-chips}

## 최근 글

{% for post in site.posts limit:5 %}
  {% include archive-single.html %}
{% endfor %}
