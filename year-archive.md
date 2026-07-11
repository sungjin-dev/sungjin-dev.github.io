---
title: "전체보기"
layout: archive
permalink: /year-archive/
sidebar:
  nav: "sidebar_category"
---

{% assign postsByYear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in postsByYear %}

## {{ year.name }}

<ul class="post-timeline">
{% for post in year.items %}
  <li>
    <span class="post-timeline__date">{{ post.date | date: "%m.%d" }}</span>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    {% if post.categories.first %}<span class="post-timeline__cat">{{ post.categories.first }}</span>{% endif %}
  </li>
{% endfor %}
</ul>

{% endfor %}

