"""
한국은행 ECOS Open API 클라이언트.

엔드포인트 구조 (path segment 방식):
  {BASE}/{서비스명}/{인증키}/json/kr/{시작건수}/{끝건수}/...

사용하는 서비스:
  StatisticTableList  통계표 목록 (코드 탐색용)
  StatisticItemList   특정 통계표의 항목코드 목록 (지역 코드 탐색용)
  StatisticSearch     실제 시계열 조회
"""

from __future__ import annotations

import time
import requests
import pandas as pd
import config
import sys, os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

if parent_dir not in sys.path:
    sys.path.append(parent_dir)

from config import ECOS_API_KEY, ECOS_BASE_URL




class EcosClient:
    def __init__(self, api_key: str | None = None, sleep: float = 0.3):
        self.key = api_key or config.ECOS_API_KEY
        if not self.key:
            raise RuntimeError("ECOS_API_KEY 환경변수를 설정하세요.")
        self.sleep = sleep  # API 부하 방지용 호출 간격

    # ------------------------------------------------------------------ util
    def _get(self, service: str, *segments: str) -> list[dict]:
        url = "/".join([ECOS_BASE_URL, service, self.key, "json", "kr", *segments])
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        js = resp.json()
        time.sleep(self.sleep)
        if "RESULT" in js:  # 에러 응답
            raise RuntimeError(f"ECOS error: {js['RESULT']}")
        body = js.get(service, {})
        return body.get("row", [])

    # ------------------------------------------------------- exploration API
    def table_list(self, keyword: str | None = None) -> pd.DataFrame:
        """통계표 전체 목록. keyword 로 통계명 필터."""
        rows = self._get("StatisticTableList", "1", "1000")
        df = pd.DataFrame(rows)
        if keyword and not df.empty:
            df = df[df["STAT_NAME"].str.contains(keyword, na=False)]
        return df[["STAT_CODE", "STAT_NAME", "CYCLE", "SRCH_YN"]].reset_index(drop=True)

    def item_list(self, stat_code: str) -> pd.DataFrame:
        """통계표 내 항목코드 목록 → 지역별 항목코드."""
        rows = self._get("StatisticItemList", "1", "1000", stat_code)
        df = pd.DataFrame(rows)
        cols = [c for c in ["STAT_CODE", "GRP_CODE", "GRP_NAME",
                            "ITEM_CODE", "ITEM_NAME", "CYCLE", "START_TIME",
                            "END_TIME"] if c in df.columns]
        return df[cols].reset_index(drop=True)

    # ------------------------------------------------------------ data fetch
    def fetch_series(self, stat_code: str, cycle: str, start: str, end: str,
                     item1: str, item2: str = "?", item3: str = "?") -> pd.DataFrame:
        """
        시계열 조회 → tidy DataFrame(date, value).
        cycle: "M"(YYYYMM) | "Q"(YYYYQn) | "A"(YYYY)
        item2/item3 를 쓰지 않는 표는 "?" 유지.
        """
        rows = self._get("StatisticSearch", "1", "10000",
                         stat_code, cycle, start, end, item1, item2, item3)
        if not rows:
            return pd.DataFrame(columns=["date", "value"])
        df = pd.DataFrame(rows)[["TIME", "DATA_VALUE"]]
        df.columns = ["date", "value"]
        df["value"] = pd.to_numeric(df["value"], errors="coerce")
        df["date"] = df["date"].map(lambda t: _parse_time(t, cycle))
        return df.dropna().reset_index(drop=True)


def _parse_time(t: str, cycle: str) -> pd.Period:
    if cycle == "M":
        return pd.Period(f"{t[:4]}-{t[4:6]}", freq="M")
    if cycle == "Q":
        return pd.Period(f"{t[:4]}Q{t[-1]}", freq="Q")
    return pd.Period(t[:4], freq="Y")


if __name__ == "__main__":
    # 탐색 예시: python collector/ecos_client.py "신용카드"
    import sys
    kw = sys.argv[1] if len(sys.argv) > 1 else "지역"
    c = EcosClient()
    print(c.table_list(kw).to_string(index=False))
