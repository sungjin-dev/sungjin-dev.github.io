---
title: "정보처리기사 공부 기록"
layout: archive
permalink: /정처기/
sidebar:
  nav: "sidebar_category"
---

{% assign posts = site.categories["정처기"] %}

{% comment %}
  series 필드로 그룹핑. series가 없는 글은 "기타"로 묶임.
{% endcomment %}
{% assign grouped = posts | group_by_exp: "post", "post.series | default: '기타'" %}

{% comment %} ── 1) 이름 있는 시리즈들 먼저 (기타 제외) ── {% endcomment %}
{% for group in grouped %}
  {% unless group.name == "기타" %}

    {% assign missing_order = group.items | where_exp: "p", "p.order == nil" %}
    {% if missing_order.size == 0 %}
      {% assign sorted_items = group.items | sort: "order" %}
    {% else %}
      {% assign sorted_items = group.items | sort: "date" %}
    {% endif %}

    <h2>{{ group.name }}</h2>
    <div class="entries-list">
      {% for post in sorted_items %}
        {% include archive-single.html %}
      {% endfor %}
    </div>

  {% endunless %}
{% endfor %}

{% comment %} ── 2) 시리즈에 안 묶인 낱개 글들 — 날짜 최신순 ── {% endcomment %}
{% for group in grouped %}
  {% if group.name == "기타" %}

    {% assign etc_items = group.items | sort: "date" | reverse %}

    <h2>기타 글</h2>
    <div class="entries-list">
      {% for post in etc_items %}
        {% include archive-single.html %}
      {% endfor %}
    </div>

  {% endif %}
{% endfor %}
