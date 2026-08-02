"""
프로젝트 전역 설정: 지역 코드, 지표 정의, API 키.

핵심 설계 원칙
  - 지역을 "파라미터"로 다룬다. 지역을 추가할 때 이 파일만 수정하면
    수집/분석/적재 전체가 그대로 확장되도록 한다. (패널 확장 대비)
  - ECOS/KOSIS의 통계표코드·항목코드는 개편으로 바뀔 수 있으므로
    반드시 explore.py 로 실제 코드를 확인한 뒤 아래 TODO 를 채운다.
"""

import os

from dotenv import load_dotenv

# 1. 현재 파일(config.py)이 있는 폴더의 절대 경로
current_dir = os.path.dirname(os.path.abspath(__file__))

# 2. 그 폴더 안에 있는 .env 파일의 정확한 경로
env_path = os.path.join(current_dir, ".env")

# 3. 경로를 명시하여 강제로 읽기.
load_dotenv(dotenv_path=env_path)
# ---------------------------------------------------------------------------
# API 키 (환경변수로 관리, 코드에 하드코딩 금지)
#   export ECOS_API_KEY="..."   https://ecos.bok.or.kr/api/ 회원가입 후 발급
#   export KOSIS_API_KEY="..."  https://kosis.kr/openapi/ 발급
# ---------------------------------------------------------------------------
ECOS_API_KEY = os.environ.get("ECOS_API_KEY", "")
KOSIS_API_KEY = os.environ.get("KOSIS_API_KEY", "")

ECOS_BASE_URL = "https://ecos.bok.or.kr/api"

# ---------------------------------------------------------------------------
# 분석 대상 지역
#   ecos_item : ECOS 지역별 통계표 안에서 지역을 구분하는 항목코드 (표마다 상이)
#   kosis_c1  : KOSIS 시도 분류코드 (행정표준코드, 표마다 objL1 형식 확인 필요)
#   표별 지역 항목코드는 explore.py 의 item_list() 로 확인해서 채울 것.
# ---------------------------------------------------------------------------
REGIONS = {
    "DJ": {"name": "대전", "kosis_c1": "30"},
    "DG": {"name": "대구", "kosis_c1": "27"},
    "US": {"name": "울산", "kosis_c1": "31"},   # 대비 극명한 비교군 (선택)
}

# ---------------------------------------------------------------------------
# 수집 지표 정의
#   source   : "ecos" | "kosis"
#   freq     : "M" 월 | "Q" 분기
#   agg      : 월→분기 변환 규칙. "mean"(지수/율), "last"(잔액), "sum"(유량)
#   transform: "yoy"(전년동기비 %), "level"(그대로), "diff"(차분)
#   stat_code / item_codes 는 탐색 후 확정. None 인 지표는 수집 시 스킵
# ---------------------------------------------------------------------------
INDICATORS = {
    # ---- 종속변수 후보 (KOSIS) ----
    "svc_prod": {
        "desc": "서비스업생산지수(시도)", "source": "kosis", "freq": "Q",
        "agg": None, "transform": "yoy",
        "kosis": {"orgId": "101", "tblId": None},  # TODO: KOSIS에서 확인
    },
    "ind_prod": {
        "desc": "광공업생산지수(시도)", "source": "kosis", "freq": "M",
        "agg": "mean", "transform": "yoy",
        "kosis": {"orgId": "101", "tblId": None},  # TODO
    },
    # ---- 지역 설명변수 (ECOS) ----
    "card": {
        "desc": "지역별 개인 신용카드 사용액", "source": "ecos", "freq": "M",
        "agg": "sum", "transform": "yoy",
        "ecos": {"stat_code": "601Y002",           # 7.5.2 지역별 소비유형별 개인 신용카드
                 "item_codes": {}},                 # TODO: 지역별 항목코드 {region: code}
    },
    "loan": {
        "desc": "예금은행 지역별 대출금 잔액", "source": "ecos", "freq": "M",
        "agg": "last", "transform": "yoy",
        "ecos": {"stat_code": None, "item_codes": {}},  # TODO: explore.py 로 확인
    },
    "bsi": {
        "desc": "제조업 업황BSI(지역본부별)", "source": "ecos", "freq": "M",
        "agg": "mean", "transform": "level",
        "ecos": {"stat_code": None, "item_codes": {}},  # TODO
    },
    "cpi_region": {
        "desc": "소비자물가지수(지역별)", "source": "ecos", "freq": "M",
        "agg": "mean", "transform": "yoy",
        "ecos": {"stat_code": "901Y009", "item_codes": {}},  # TODO: 지역 항목 확인
    },
    # ---- 지역 설명변수 (KOSIS) ----
    "emp": {
        "desc": "취업자수(시도, 경활)", "source": "kosis", "freq": "M",
        "agg": "mean", "transform": "yoy",
        "kosis": {"orgId": "101", "tblId": None},  # TODO
    },
    "permit": {
        "desc": "건축허가면적(시도)", "source": "kosis", "freq": "M",
        "agg": "sum", "transform": "yoy",
        "kosis": {"orgId": None, "tblId": None},   # TODO (국토부 orgId=116 계열 확인)
    },
    # ---- 전국 공통 통제변수 (ECOS, 지역 구분 없음 → region="KR") ----
    "base_rate": {
        "desc": "한국은행 기준금리", "source": "ecos", "freq": "M",
        "agg": "last", "transform": "diff", "national": True,
        "ecos": {"stat_code": "722Y001", "item_codes": {"KR": "0101000"}},
    },
    "fx": {
        "desc": "원/달러 환율(월평균)", "source": "ecos", "freq": "M",
        "agg": "mean", "transform": "yoy", "national": True,
        "ecos": {"stat_code": "731Y004", "item_codes": {"KR": None}},  # TODO 항목 확인
    },
    "export": {
        "desc": "전국 수출금액", "source": "ecos", "freq": "M",
        "agg": "sum", "transform": "yoy", "national": True,
        "ecos": {"stat_code": None, "item_codes": {}},  # TODO
    },
}

# 수집 기간
START = "200901"   # YYYYMM
END = "202606"

# 산출물 경로
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
RAW_DIR = os.path.join(DATA_DIR, "raw")
PANEL_CSV = os.path.join(DATA_DIR, "panel_quarterly.csv")

# COVID 더미 구간 (분기 문자열)
COVID_QUARTERS = ["2020Q1", "2020Q2", "2020Q3", "2020Q4", "2021Q1", "2021Q2"]
