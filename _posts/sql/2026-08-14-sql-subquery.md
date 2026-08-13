---
title: " [SQLD 특별편] SQL 서브쿼리 정리"
excerpt: "위치, 상관관계, NULL 함정, 그리고 성능까지"
categories: [sql]
order: 13
tags:
  - subquery
  - 서브쿼리
  - EXISTS
  - CTE
  - correlated-subquery
  - SQL-tuning
toc: true
toc_sticky: true
published: false
---


# SQL로 계층 질의 다루기: 나무를 테이블에 심는 법

댓글에 대댓글이 줄줄이 달리는 구조, 회사 조직도에서 팀장 밑에 팀원이 있는 구조. 이런 데이터는 어디에나 있다. 그런데 막상 테이블에 저장하려고 하면 막막해진다. 행과 열만 있는 밋밋한 테이블에 이 위아래 관계를 어떻게 담아야 할까?

## 계층 구조가 테이블과 안 맞는 이유

관계형 테이블은 원래 평평하다. 각 행은 독립적이고, 행끼리 위아래 관계 같은 건 기본적으로 표현할 방법이 없다. 하지만 조직도, 게시판 댓글, 상품 카테고리처럼 계층을 이루는 데이터는 실무에서 수도 없이 마주친다. 그래서 이 나무 모양의 데이터를 평평한 테이블에 심는 방법이 몇 가지 정리되어 있다. 가장 쉬운 것부터 하나씩 보자.

## 방법 1: 부모의 id만 기억하기 — 인접 리스트

가장 단순한 방법은 각 행이 자기 부모의 id 하나만 들고 있게 하는 것이다. 회사 명찰에 자기 이름과 직속 상사 이름만 적어두는 것과 비슷하다. 내 상사가 누군지는 알지만, 상사의 상사까지는 명찰만 봐서는 알 수 없다. 이 방식을 인접 리스트(adjacency list) 모델이라고 부른다.

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    parent_id INT REFERENCES employees(id)
);

INSERT INTO employees (id, name, parent_id) VALUES
    (1, '대표', NULL),
    (2, '개발팀장', 1),
    (3, '영업팀장', 1),
    (4, '백엔드', 2),
    (5, '프론트', 2),
    (6, '영업사원', 3);
```

컬럼 하나(parent_id)만 추가하면 조직도 전체가 테이블 하나에 들어간다. 그림으로 보면 이렇다.

```text
<svg viewBox="0 0 680 300" width="100%" xmlns="http://www.w3.org/2000/svg">
<style>
:root{
  --bg:#ffffff;
  --fg:#262626;
  --muted:#8a8a8a;
  --box-fill:#f2f2f2;
  --box-stroke:#b0b0b0;
  --green:#3f7d58;
  --green-fill:#e3efe8;
  --coral:#b0503a;
  --coral-fill:#f5e4de;
  --line:#b0b0b0;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#1c1c1c;
    --fg:#e6e6e6;
    --muted:#9a9a9a;
    --box-fill:#2b2b2b;
    --box-stroke:#5a5a5a;
    --green:#6fbf94;
    --green-fill:#24352c;
    --coral:#e0876c;
    --coral-fill:#3a2723;
    --line:#5a5a5a;
  }
}
text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif;fill:var(--fg);}
.title{font-size:13.5px;font-weight:600;}
.body{font-size:12px;}
.muted{fill:var(--muted);}
.accent-green{fill:var(--green);font-weight:600;}
.box{fill:var(--box-fill);stroke:var(--box-stroke);stroke-width:1;}
.box-green{fill:var(--green-fill);stroke:var(--green);stroke-width:1.2;}
.box-coral{fill:var(--coral-fill);stroke:var(--coral);stroke-width:1.2;}
.line{stroke:var(--line);stroke-width:1;}
</style>
<rect x="1" y="1" width="678" height="298" rx="10" fill="var(--bg)" stroke="var(--box-stroke)"/>
<text x="340" y="24" text-anchor="middle" class="title">조직도 → 인접 리스트(parent_id) 매핑</text>
<line x1="345" y1="34" x2="345" y2="284" class="line" stroke-dasharray="3,4"/>

<rect x="140" y="42" width="90" height="32" rx="6" class="box"/>
<text x="185" y="63" text-anchor="middle" class="body">대표</text>

<rect x="45" y="106" width="100" height="32" rx="6" class="box-green"/>
<text x="95" y="127" text-anchor="middle" class="body">개발팀장</text>

<rect x="225" y="106" width="100" height="32" rx="6" class="box"/>
<text x="275" y="127" text-anchor="middle" class="body">영업팀장</text>

<rect x="8" y="170" width="80" height="32" rx="6" class="box-coral"/>
<text x="48" y="191" text-anchor="middle" class="body">백엔드</text>

<rect x="98" y="170" width="80" height="32" rx="6" class="box"/>
<text x="138" y="191" text-anchor="middle" class="body">프론트</text>

<rect x="225" y="170" width="100" height="32" rx="6" class="box"/>
<text x="275" y="191" text-anchor="middle" class="body">영업사원</text>

<line x1="185" y1="74" x2="95" y2="106" class="line"/>
<line x1="185" y1="74" x2="275" y2="106" class="line"/>
<line x1="95" y1="138" x2="48" y2="170" stroke="var(--coral)" stroke-width="1.5"/>
<line x1="95" y1="138" x2="138" y2="170" class="line"/>
<line x1="275" y1="138" x2="275" y2="170" class="line"/>

<text x="185" y="222" text-anchor="middle" class="body muted">각 행은 자기 부모의 id만 안다</text>

<text x="375" y="52" class="body" font-weight="600">id</text>
<text x="415" y="52" class="body" font-weight="600">name</text>
<text x="555" y="52" class="body" font-weight="600">parent_id</text>
<line x1="365" y1="60" x2="665" y2="60" class="line"/>

<text x="375" y="80" class="body">1</text>
<text x="415" y="80" class="body">대표</text>
<text x="555" y="80" class="body muted">NULL</text>

<text x="375" y="108" class="body accent-green">2</text>
<text x="415" y="108" class="body">개발팀장</text>
<text x="555" y="108" class="body">1</text>

<text x="375" y="136" class="body">3</text>
<text x="415" y="136" class="body">영업팀장</text>
<text x="555" y="136" class="body">1</text>

<rect x="363" y="150" width="300" height="26" rx="4" fill="var(--coral-fill)"/>
<text x="375" y="168" class="body">4</text>
<text x="415" y="168" class="body">백엔드</text>
<text x="555" y="168" class="body accent-green">2</text>

<text x="375" y="196" class="body">5</text>
<text x="415" y="196" class="body">프론트</text>
<text x="555" y="196" class="body accent-green">2</text>

<text x="375" y="224" class="body">6</text>
<text x="415" y="224" class="body">영업사원</text>
<text x="555" y="224" class="body">3</text>

<text x="515" y="256" text-anchor="middle" class="body muted">parent_id는 자신을 낳은 행의 id를 가리킨다</text>
</svg>
```

물론 이 방식은 구조가 단순해서 이해하기 쉽다. 팀장이 바뀌면 parent_id 하나만 고치면 되고, 새 팀원이 들어오면 행 하나만 추가하면 된다. 하지만 문제는 여러 단계를 한 번에 조회할 때 생긴다.

```sql
-- 개발팀장(id=2) 밑에 있는 '직속' 팀원만 조회
SELECT * FROM employees WHERE parent_id = 2;
```

이 쿼리는 프론트와 백엔드만 찾아온다. 그런데 개발팀장 밑에 파트장이 하나 더 있다고 해보자. 그 파트장 밑의 팀원은 이 쿼리로 잡히지 않는다. JOIN을 한 번 더 걸어야 한다. 하지만 조직이 몇 단계까지 뻗어 있을지는 미리 알 수 없다. 결국 인접 리스트만으로는 '이 사람 밑의 모든 자손'을 한 번에 구할 수 없는 것이다.

그러면 몇 단계인지 모르는 채로 끝까지 내려가려면 어떻게 해야 할까?

## 방법 2: 재귀 CTE로 끝까지 내려가기

정답은 재귀 쿼리다. SQL에게 "자식이 있으면 계속 내려가라"고 시키는 방법이 있는데, 바로 WITH RECURSIVE 구문이다. 계단을 오르면서 매 칸마다 "다음 칸이 있는가?"를 스스로에게 묻는 것과 비슷하다. 있으면 한 칸 더 오르고, 없으면 멈춘다.

재귀 쿼리는 두 부분으로 나뉜다. 먼저 시작점이 되는 행 하나를 고른다. 이 부분을 앵커 멤버(anchor member)라고 한다. 그다음 방금 찾은 행들의 자식을 계속 찾아서 결과에 이어붙인다. 이 부분이 재귀 멤버(recursive member)다. 자식을 더 찾을 수 없을 때까지 이 과정이 반복된다.

```sql
WITH RECURSIVE org_tree AS (
    -- 앵커 멤버: 시작 행 하나
    SELECT id, name, parent_id, 0 AS depth
    FROM employees
    WHERE id = 2  -- 개발팀장부터 시작

    UNION ALL

    -- 재귀 멤버: 방금 찾은 행의 자식을 계속 찾는다
    SELECT e.id, e.name, e.parent_id, t.depth + 1
    FROM employees e
    JOIN org_tree t ON e.parent_id = t.id
)
SELECT * FROM org_tree ORDER BY depth;
```

이 과정을 순서대로 그리면 이렇다.

```text
<svg viewBox="0 0 680 220" width="100%" xmlns="http://www.w3.org/2000/svg">
<style>
:root{
  --bg:#ffffff;
  --fg:#262626;
  --muted:#8a8a8a;
  --box-fill:#f2f2f2;
  --box-stroke:#b0b0b0;
  --green:#3f7d58;
  --green-fill:#e3efe8;
  --coral:#b0503a;
  --coral-fill:#f5e4de;
  --line:#b0b0b0;
}
@media (prefers-color-scheme: dark){
  :root{
    --bg:#1c1c1c;
    --fg:#e6e6e6;
    --muted:#9a9a9a;
    --box-fill:#2b2b2b;
    --box-stroke:#5a5a5a;
    --green:#6fbf94;
    --green-fill:#24352c;
    --coral:#e0876c;
    --coral-fill:#3a2723;
    --line:#5a5a5a;
  }
}
text{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif;fill:var(--fg);}
.title{font-size:13.5px;font-weight:600;}
.body{font-size:12px;}
.muted{fill:var(--muted);}
.box{fill:var(--box-fill);stroke:var(--box-stroke);stroke-width:1;}
.box-coral{fill:var(--coral-fill);stroke:var(--coral);stroke-width:1.2;}
.box-green{fill:var(--green-fill);stroke:var(--green);stroke-width:1.2;}
.line{stroke:var(--line);stroke-width:1;}
</style>
<defs>
<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/>
</marker>
</defs>
<rect x="1" y="1" width="678" height="218" rx="10" fill="var(--bg)" stroke="var(--box-stroke)"/>
<text x="340" y="24" text-anchor="middle" class="title">재귀 CTE 동작 순서</text>

<rect x="20" y="54" width="190" height="92" rx="8" class="box"/>
<text x="115" y="76" text-anchor="middle" class="title">① 앵커 멤버</text>
<text x="115" y="98" text-anchor="middle" class="body">WHERE id = 2</text>
<text x="115" y="118" text-anchor="middle" class="body muted">시작 행 하나 고르기</text>

<rect x="245" y="54" width="190" height="92" rx="8" class="box-coral"/>
<text x="340" y="76" text-anchor="middle" class="title">② 재귀 멤버 ↻</text>
<text x="340" y="98" text-anchor="middle" class="body">JOIN으로 자식 찾기</text>
<text x="340" y="118" text-anchor="middle" class="body muted">결과에 계속 이어붙이기</text>

<rect x="470" y="54" width="190" height="92" rx="8" class="box-green"/>
<text x="565" y="76" text-anchor="middle" class="title">③ 종료</text>
<text x="565" y="98" text-anchor="middle" class="body">자식이 더 없으면</text>
<text x="565" y="118" text-anchor="middle" class="body muted">UNION ALL 결과 확정</text>

<line x1="210" y1="100" x2="242" y2="100" class="line" marker-end="url(#arrow)"/>
<line x1="435" y1="100" x2="467" y2="100" class="line" marker-end="url(#arrow)"/>

<text x="340" y="180" text-anchor="middle" class="body muted">레벨 0 → 레벨 1 → 레벨 2 ... 자식이 없을 때까지 반복</text>
</svg>
```

즉, 재귀 CTE는 "자식이 있는가?"라는 같은 질문을 결과가 더 안 나올 때까지 스스로에게 반복해서 던지는 쿼리인 셈이다. UNION이 아니라 UNION ALL을 쓰는 것도 눈여겨볼 부분이다. PostgreSQL 공식 문서에서도 재귀 부분은 중복 제거 비용이 드는 UNION 대신 UNION ALL을 쓰라고 권장한다. 재귀는 이미 반복 자체가 비용인데 매번 중복 검사까지 하면 배로 느려지기 때문이다.

물론 재귀 CTE는 코드가 짧고 의도가 분명하게 드러난다. 하지만 트리가 아주 깊어지면 반복 횟수만큼 JOIN이 계속 실행되므로 조회 성능이 떨어질 수 있다. 대부분의 조직도나 댓글 트리는 깊이가 몇 단계 안 된다. 이런 경우라면 크게 문제되지 않는다. 하지만 깊이가 수십 단계를 넘나드는 트리라면 얘기가 다르다.

참고로 PostgreSQL, MySQL 8 이상, SQLite는 WITH RECURSIVE 구문을 그대로 쓸 수 있다. SQL Server는 RECURSIVE라는 키워드 없이 WITH만으로도 같은 방식이 동작한다. Oracle은 전통적으로 CONNECT BY PRIOR라는 별도 구문을 써 왔다.

## 트리가 아주 커지면: 다른 모델들

읽기는 잦고 쓰기는 드문, 아주 큰 트리를 다뤄야 한다면 다른 모델도 검토할 만하다.

| 방법 | 핵심 아이디어 | 장점 | 단점 |
|---|---|---|---|
| Path Enumeration | 루트부터 자신까지의 경로를 문자열로 통째로 저장 | LIKE 검색만으로 자손을 빠르게 찾음 | 경로 문자열을 직접 관리해야 함 |
| Nested Set | 노드마다 왼쪽/오른쪽 숫자 두 개로 자손 범위를 표현 | 자손 전체 조회가 매우 빠름 | 노드 하나만 추가해도 숫자를 다시 매겨야 함 |
| Closure Table | 조상-자손 관계를 전부 별도 테이블에 풀어서 저장 | 조회와 쓰기 둘 다 무난함 | 관계 테이블이 별도로 커짐 |

셋 다 인접 리스트보다 구조가 복잡하다. 트리가 작고 깊이도 얕다면 굳이 손댈 이유가 없다.

## 정리

결국 어떤 방법을 고를지는 트리의 크기와 읽기/쓰기 빈도에 달려 있다. 트리가 얕고 조회 패턴도 단순하다면 인접 리스트에 재귀 CTE를 얹는 정도로 충분하다. 반면 트리가 아주 깊거나 조회가 압도적으로 많다면 그때 가서 nested set이나 closure table을 검토하는 것이 좋다. 처음부터 복잡한 모델을 골라 놓고 고생하기보다는, 인접 리스트로 시작해서 필요할 때 확장하는 편이 낫다.
