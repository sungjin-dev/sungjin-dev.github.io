/*
 * Oracle SQL 구문 강조 보정
 * ---------------------------------------------------------------
 * Jekyll의 Rouge `sql` 렉서는 ANSI SQL 기준이라 Oracle 고유 함수/키워드를
 * 인식하지 못하고 전부 일반 이름(.n)으로 내보낸다.
 * 이 스크립트는 렉서 결과를 후처리해 Oracle 기준으로 다시 분류한다.
 *
 * 핵심 규칙
 *   1) 식별자 바로 뒤에 '(' 가 오면 → 함수      (리스트 불필요)
 *   2) 아래 집합에 속하면 → 키워드 / 타입 / 의사컬럼
 *   3) 그 외는 건드리지 않음 (식별자 그대로)
 *
 * 문자열(.s*)·주석(.c*) 안은 애초에 대상이 아니므로 안전하다.
 */
(function () {
  'use strict';

  // 괄호 없이 쓰이는 Oracle 키워드 — Rouge가 놓치는 것 위주
  var KEYWORDS = [
    'SIBLINGS', 'PRIOR', 'NOCYCLE', 'CONNECT_BY_ROOT', 'CONNECT_BY_ISLEAF',
    'CONNECT_BY_ISCYCLE', 'START', 'CONNECT', 'MINUS', 'INTERSECT',
    'OVER', 'PARTITION', 'KEEP', 'WITHIN', 'RANGE', 'ROWS', 'UNBOUNDED',
    'PRECEDING', 'FOLLOWING', 'CURRENT', 'NULLS', 'FIRST', 'LAST',
    'PIVOT', 'UNPIVOT', 'MERGE', 'MATCHED', 'USING', 'RETURNING', 'MODEL',
    'BULK', 'COLLECT', 'FORALL', 'PRAGMA', 'EXCEPTION', 'CURSOR', 'RECORD',
    'DECLARE', 'BEGIN', 'END', 'ELSIF', 'LOOP', 'EXIT', 'RAISE', 'GOTO',
    'PACKAGE', 'BODY', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'SEQUENCE',
    'MATERIALIZED', 'DETERMINISTIC', 'PIPELINED', 'AUTHID', 'DEFINER',
    'CURRENT_USER', 'ROWTYPE', 'NOCOPY', 'CONSTANT', 'OUT', 'REPLACE',
    'COMMIT', 'ROLLBACK', 'SAVEPOINT', 'TRUNCATE', 'PURGE', 'NOWAIT',
    'TABLESPACE', 'STORAGE', 'NOLOGGING', 'PARALLEL', 'COMPRESS',
    'PRESERVE', 'IDENTITY', 'GENERATED', 'VIRTUAL', 'INVISIBLE',
    'PIPE', 'ROW', 'EXCEPTIONS', 'PERCENT', 'TIES', 'OFFSET', 'FETCH', 'ONLY'
  ];

  // Oracle 데이터 타입
  var TYPES = [
    'VARCHAR2', 'NVARCHAR2', 'NUMBER', 'BINARY_FLOAT', 'BINARY_DOUBLE',
    'PLS_INTEGER', 'BINARY_INTEGER', 'SIMPLE_INTEGER', 'CLOB', 'NCLOB',
    'BLOB', 'BFILE', 'RAW', 'LONG', 'ROWID', 'UROWID', 'XMLTYPE',
    'TIMESTAMP', 'INTERVAL', 'BOOLEAN', 'SYS_REFCURSOR', 'ANYDATA'
  ];

  // 괄호 없이 쓰는 의사컬럼·상수 — 키워드 색으로 처리
  var PSEUDO = [
    'ROWNUM', 'ROWID', 'LEVEL', 'USER', 'UID',
    'CURRVAL', 'NEXTVAL', 'DUAL', 'SQLCODE', 'NOTFOUND',
    'FOUND', 'ISOPEN', 'BULK_ROWCOUNT'
  ];

  // 괄호 없이도 함수로 쓰이는 소수의 예외
  var BARE_FUNCS = [
    'SYSDATE', 'SYSTIMESTAMP', 'CURRENT_DATE', 'CURRENT_TIMESTAMP',
    'SQLERRM', 'SESSIONTIMEZONE', 'DBTIMEZONE'
  ];

  // 뒤에 '(' 가 와도 함수가 아닌 것들
  // 예) OVER (PARTITION BY ...), IN (...), VALUES (...)
  var PAREN_EXEMPT = [
    'OVER', 'IN', 'EXISTS', 'VALUES', 'USING', 'ON', 'AND', 'OR', 'NOT',
    'WHEN', 'THEN', 'ELSE', 'CASE', 'WHERE', 'SELECT', 'FROM', 'GROUP',
    'ORDER', 'BY', 'HAVING', 'UNION', 'MINUS', 'INTERSECT', 'CONNECT',
    'START', 'WITH', 'INTO', 'PARTITION', 'TABLE', 'RETURNING', 'FORALL',
    'LOOP', 'IF', 'ELSIF', 'RANGE', 'ROWS', 'KEEP', 'WITHIN', 'PIVOT',
    'UNPIVOT', 'CHECK', 'PRIMARY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT'
  ];

  function toSet(list) {
    var s = Object.create(null);
    for (var i = 0; i < list.length; i++) s[list[i]] = true;
    return s;
  }

  var KW = toSet(KEYWORDS),
      TY = toSet(TYPES),
      PS = toSet(PSEUDO),
      BF = toSet(BARE_FUNCS),
      PX = toSet(PAREN_EXEMPT);

  // 재분류 대상이 되는 Rouge 클래스 (이름 계열만)
  var TARGET = /(^|\s)(n|na|nb|nc|nd|ne|nf|ni|nl|nn|no|nx|nv|py|bp|fm|err)(\s|$)/;

  /* 해당 노드 다음에 실제로 '(' 가 오는지 검사 */
  function followedByParen(node) {
    var cur = node.nextSibling;
    while (cur) {
      var text;
      if (cur.nodeType === 3) {
        text = cur.nodeValue;
      } else if (cur.nodeType === 1) {
        text = cur.textContent;
      } else {
        cur = cur.nextSibling;
        continue;
      }
      var trimmed = text.replace(/^[ \t]+/, '');
      if (trimmed === '') { cur = cur.nextSibling; continue; }
      return trimmed.charAt(0) === '(';
    }
    return false;
  }

  function classify(block) {
    var spans = block.querySelectorAll('span');

    for (var i = 0; i < spans.length; i++) {
      var el = spans[i];
      if (!TARGET.test(el.className)) continue;

      var word = el.textContent.trim();
      if (!word || !/^[A-Za-z_][A-Za-z0-9_$#]*$/.test(word)) continue;

      var up = word.toUpperCase();

      // 순서 주의: 타입 → 함수 → 키워드
      // REPLACE 처럼 문맥에 따라 달라지는 단어는 괄호 유무로 갈린다.
      //   CREATE OR REPLACE PACKAGE  → 키워드
      //   REPLACE(col, 'a', 'b')     → 함수
      if (TY[up]) {
        el.classList.add('ora-type');
      } else if (BF[up] || (!PX[up] && followedByParen(el))) {
        el.classList.add('ora-fn');
      } else if (KW[up] || PS[up] || PX[up]) {
        el.classList.add('ora-kw');
      }
    }
  }

  function run() {
    var blocks = document.querySelectorAll(
      'div.language-sql .highlight, div.language-plsql .highlight'
    );
    for (var i = 0; i < blocks.length; i++) classify(blocks[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
