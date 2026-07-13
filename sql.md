---
title: "SQL 공부 기록"
layout: archive
permalink: /sql/
sidebar:
  nav: "sidebar_category"
---
{% assign posts = site.categories.sql | sort: "order" %}
{% for post in posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
