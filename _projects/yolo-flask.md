---
title: "YOLO + Flask 실시간 객체 탐지 파이프라인"
excerpt: "YOLOv8 모델 학습부터 Flask 서빙까지. 학습 결과와 성능 지표 정리."
---

## 개요

YOLOv8을 직접 학습시키고 Flask로 서빙하는 파이프라인을 만들면서 배운 것들의 기록입니다.
데이터 준비부터 학습 결과 해석, 성능 지표(mAP, Precision/Recall)까지 과정 그대로 남겼습니다.

## 기술 스택

Python, YOLOv8, Flask

## 관련 글

<ul class="post-timeline">
{% assign yolo_posts = site.categories.yolo | reverse %}
{% for post in yolo_posts %}
  <li class="cat-yolo">
    <span class="post-timeline__date">{{ post.date | date: "%Y-%m-%d" }}</span>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
