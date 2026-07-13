---
title: "SQL 공부 기록"
layout: archive
permalink: /sql/
sidebar:
  nav: "sidebar_category"
---
{% assign posts = site.categories.sql | sort: "order" %}
<div class="entries-list">
{% for post in posts %}
  <article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">
    <h2 class="archive__item-title no-anchor" itemprop="headline">
      <a href="{{ post.url | relative_url }}" rel="permalink">{{ post.title }}</a>
    </h2>
    {% if post.excerpt %}
      <p class="archive__item-excerpt" itemprop="description">{{ post.excerpt | markdownify | strip_html | truncate: 160 }}</p>
    {% endif %}
  </article>
{% endfor %}
</div>

