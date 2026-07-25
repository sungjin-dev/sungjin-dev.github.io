---
title: "전체보기"
layout: archive
permalink: /year-archive/
sidebar:
  nav: "sidebar_category"
---

<div class="gitlog-head">
  <span class="gitlog-cmd"><span class="prompt">$</span> git log --all --oneline</span>
  <span class="gitlog-count">{{ site.posts | size }} commits</span>
</div>

{% assign postsByYear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
<div class="timeline">
{% for year in postsByYear %}
  <div class="timeline__year"><span>{{ year.name }}</span></div>
  <ul class="post-timeline">
  {% for post in year.items %}
    {% assign cat = post.categories.first | default: "etc" | downcase %}
    <li class="cat-{{ cat }}">
      <span class="post-timeline__date">{{ post.date | date: "%m.%d" }}</span>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      {% if post.categories.first %}<span class="post-timeline__cat">{{ post.categories.first }}</span>{% endif %}
    </li>
  {% endfor %}
  </ul>
{% endfor %}
</div>
