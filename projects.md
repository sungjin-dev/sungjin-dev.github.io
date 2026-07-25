---
title: "Projects"
layout: archive
permalink: /projects/
---

직접 만들며 배운 것들의 기록. 진행 중인 프로젝트도 과정 그대로 올립니다.

{% include project-cards.html %}

<div class="entries-list">
  {% for project in site.projects %}
    {% include archive-single.html post=project %}
  {% endfor %}
</div>
