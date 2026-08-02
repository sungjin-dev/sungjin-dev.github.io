"""
수집 파이프라인 진입점.

  python collector/collect.py

동작:
  1) config.INDICATORS 를 순회하며 지역별 원자료 수집 (코드 미확정 지표는 스킵+경고)
  2) 원자료를 data/raw/{indicator}_{region}.csv 로 저장 (재현성)
  3) 월 → 분기 집계 (agg 규칙) 후 변환(yoy/level/diff) 적용
  4) long 패널로 병합 → data/panel_quarterly.csv
     컬럼: region, quarter, <indicator...>, covid
"""

from __future__ import annotations

import os
import sys
import pandas as pd

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from collector.config import (INDICATORS, REGIONS, START, END,
                              RAW_DIR, PANEL_CSV, COVID_QUARTERS)
from collector.ecos_client import EcosClient
from collector.kosis_client import KosisClient


# --------------------------------------------------------------------- fetch
def fetch_indicator(code: str, spec: dict,
                    ecos: EcosClient, kosis: KosisClient) -> pd.DataFrame | None:
    """지표 하나를 모든 지역에 대해 수집 → long DF(region, date, value)."""
    national = spec.get("national", False)
    targets = {"KR": None} if national else REGIONS
    frames = []

    for region in targets:
        try:
            if spec["source"] == "ecos":
                e = spec["ecos"]
                item = e["item_codes"].get(region)
                if not e.get("stat_code") or not item:
                    print(f"  [skip] {code}/{region}: stat_code/item_code 미확정")
                    continue
                df = ecos.fetch_series(e["stat_code"], spec["freq"],
                                       _fmt(START, spec["freq"]),
                                       _fmt(END, spec["freq"]), item)
            else:
                k = spec["kosis"]
                if not k.get("tblId"):
                    print(f"  [skip] {code}/{region}: KOSIS tblId 미확정")
                    continue
                df = kosis.fetch(k["orgId"], k["tblId"],
                                 itmId=k.get("itmId", "T1"),
                                 objL1=REGIONS[region]["kosis_c1"],
                                 prdSe=spec["freq"],
                                 startPrdDe=_fmt(START, spec["freq"]),
                                 endPrdDe=_fmt(END, spec["freq"]))
        except Exception as exc:  # 수집 실패는 지표 단위로 격리
            print(f"  [error] {code}/{region}: {exc}")
            continue

        if df.empty:
            print(f"  [warn] {code}/{region}: 데이터 없음")
            continue
        df["region"] = region
        frames.append(df)
        df.to_csv(os.path.join(RAW_DIR, f"{code}_{region}.csv"), index=False)

    return pd.concat(frames, ignore_index=True) if frames else None


def _fmt(yyyymm: str, freq: str) -> str:
    if freq == "M":
        return yyyymm
    if freq == "Q":
        q = (int(yyyymm[4:6]) - 1) // 3 + 1
        return f"{yyyymm[:4]}Q{q}"
    return yyyymm[:4]


# ----------------------------------------------------------------- transform
def to_quarterly(df: pd.DataFrame, spec: dict) -> pd.DataFrame:
    """월별 자료를 분기로 집계. 이미 분기면 그대로."""
    if spec["freq"] == "Q":
        df = df.rename(columns={"date": "quarter"})
        return df
    agg = spec.get("agg") or "mean"
    df = df.copy()
    df["quarter"] = df["date"].dt.asfreq("Q")
    out = (df.groupby(["region", "quarter"], as_index=False)["value"]
             .agg(agg))
    return out


def apply_transform(df: pd.DataFrame, how: str) -> pd.DataFrame:
    """지역별로 정렬 후 yoy(전년동기비 %) / diff / level 적용."""
    df = df.sort_values(["region", "quarter"]).copy()
    g = df.groupby("region")["value"]
    if how == "yoy":
        df["value"] = g.pct_change(4) * 100
    elif how == "diff":
        df["value"] = g.diff()
    return df.dropna(subset=["value"])


# ---------------------------------------------------------------------- main
def main() -> None:
    os.makedirs(RAW_DIR, exist_ok=True)
    ecos, kosis = EcosClient(), KosisClient()

    panel: pd.DataFrame | None = None
    for code, spec in INDICATORS.items():
        print(f"[collect] {code} — {spec['desc']}")
        raw = fetch_indicator(code, spec, ecos, kosis)
        if raw is None:
            continue
        q = apply_transform(to_quarterly(raw, spec), spec["transform"])
        q = q.rename(columns={"value": code})[["region", "quarter", code]]

        # 전국 변수는 모든 지역 행에 복제해서 붙인다
        if spec.get("national"):
            kr = q.drop(columns="region")
            frames = [kr.assign(region=r) for r in REGIONS]
            q = pd.concat(frames, ignore_index=True)

        panel = q if panel is None else panel.merge(
            q, on=["region", "quarter"], how="outer")

    if panel is None:
        print("수집된 지표가 없습니다. config 의 TODO 코드를 먼저 채우세요.")
        return

    panel["covid"] = panel["quarter"].astype(str).isin(COVID_QUARTERS).astype(int)
    panel = panel.sort_values(["region", "quarter"])
    panel.to_csv(PANEL_CSV, index=False)
    print(f"\n[done] {PANEL_CSV}  shape={panel.shape}")
    print(panel.groupby("region").size().rename("n_quarters"))


if __name__ == "__main__":
    main()
