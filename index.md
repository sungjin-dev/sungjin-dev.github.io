---
layout: splash
classes: home
permalink: /
title: "SungJin의 개발 공부 기록"
excerpt: '선명한 기억보다 희미한 기록이 낫다.<br>구조부터 이해하는 학습 노트. <span class="hero-terminal"><span class="hero-terminal__bar"><span></span><span></span><span></span></span><span class="hero-terminal__body"><span class="prompt">$</span> whoami<br><span class="out">sungjin — 기록하는 개발자</span><br><span class="prompt">$</span> ls series/<br><span class="out">python-regex/  java-jvm/</span></span></span>'
header:
  overlay_color: "#1a1b26"
  
---

## Projects

{% include project-cards.html %}

## Series

{% include series-list.html %}

## 다른 주제들
<div class="topic-chips">
{% for chip in site.data.series.chips %}<a href="{{ chip.url | relative_url }}">{{ chip.label }}</a>{% endfor %}
</div>

## 최근 글
{% for post in site.posts limit:5 %}
  {% include archive-single.html post=post %}
{% endfor %}
