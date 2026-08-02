"""
KOSIS(국가통계포털) Open API 클라이언트.

KOSIS 는 표마다 분류 축(objL1, objL2, ...)의 의미가 달라서,
표를 확정하면 KOSIS 사이트의 'Open API > 자료등록' 화면에서
생성해주는 URL 파라미터를 그대로 옮겨오는 것이 가장 안전하다.
여기서는 파라미터를 dict 로 받아 tidy DataFrame 으로 정리하는
얇은 래퍼만 제공한다.
"""

from __future__ import annotations

import time
import requests
import pandas as pd

import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import KOSIS_API_KEY

BASE = "https://kosis.kr/openapi/Param/statisticsParameterData.do"


class KosisClient:
    def __init__(self, api_key: str | None = None, sleep: float = 0.3):
        self.key = api_key or KOSIS_API_KEY
        if not self.key:
            raise RuntimeError("KOSIS_API_KEY 환경변수를 설정하세요.")
        self.sleep = sleep

    def fetch(self, orgId: str, tblId: str, itmId: str, objL1: str,
              prdSe: str, startPrdDe: str, endPrdDe: str,
              extra: dict | None = None) -> pd.DataFrame:
        """
        prdSe: "M" | "Q" | "Y"
        objL1: 시도 분류코드 (config.REGIONS[*]["kosis_c1"] — 표별 형식 확인!)
        반환: (date, value) tidy DataFrame
        """
        params = {
            "method": "getList", "apiKey": self.key, "format": "json",
            "jsonVD": "Y", "orgId": orgId, "tblId": tblId,
            "itmId": itmId, "objL1": objL1,
            "prdSe": prdSe, "startPrdDe": startPrdDe, "endPrdDe": endPrdDe,
        }
        if extra:
            params.update(extra)
        resp = requests.get(BASE, params=params, timeout=30)
        resp.raise_for_status()
        js = resp.json()
        time.sleep(self.sleep)
        if isinstance(js, dict) and js.get("err"):
            raise RuntimeError(f"KOSIS error: {js}")
        df = pd.DataFrame(js)
        if df.empty:
            return pd.DataFrame(columns=["date", "value"])
        df = df[["PRD_DE", "DT"]].rename(columns={"PRD_DE": "date", "DT": "value"})
        df["value"] = pd.to_numeric(df["value"], errors="coerce")
        df["date"] = df["date"].map(lambda t: _parse_prd(t, prdSe))
        return df.dropna().reset_index(drop=True)


def _parse_prd(t: str, prdSe: str) -> pd.Period:
    if prdSe == "M":
        return pd.Period(f"{t[:4]}-{t[4:6]}", freq="M")
    if prdSe == "Q":
        return pd.Period(f"{t[:4]}Q{t[4:]}", freq="Q")  # KOSIS 분기: YYYY0n → 끝자리
    return pd.Period(t[:4], freq="Y")
