---
title: "Trouble Shooting"
layout: archive
permalink: /troubleshooting/
sidebar:
  nav: "sidebar_category"
---

{% assign posts = site.categories["TroubleShooting"] %}

{% if posts %}
  {% assign grouped = posts | group_by_exp: "post", "post.series | default: '기타'" %}

  {% comment %} 1) 이름 있는 시리즈 먼저 {% endcomment %}
  {% for group in grouped %}
    {% unless group.name == "기타" %}
      {% assign missing = group.items | where_exp: "p", "p.order == nil" %}
      {% if missing.size == 0 %}
        {% assign items = group.items | sort: "order" %}
      {% else %}
        {% assign items = group.items | sort: "date" | reverse %}
      {% endif %}

## {{ group.name }}

<div class="entries-list" markdown="1">
{% for post in items %}{% include archive-single.html post=post %}{% endfor %}
</div>
    {% endunless %}
  {% endfor %}

  {% comment %} 2) 시리즈 없는 낱개 글 — 최신순 {% endcomment %}
  {% for group in grouped %}
    {% if group.name == "기타" %}
      {% assign items = group.items | sort: "date" | reverse %}

<div class="entries-list" markdown="1">
{% for post in items %}{% include archive-single.html post=post %}{% endfor %}
</div>
    {% endif %}
  {% endfor %}
{% else %}

아직 등록된 글이 없다.

{% endif %}
