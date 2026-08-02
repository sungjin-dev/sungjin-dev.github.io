"""
ECOS 및 KOSIS OpenAPI 메타데이터(통계표, 항목 코드) 탐색 유틸리티.

usage:
  python explore.py ecosystem <서비스명> [검색어]
  python explore.py kosis <메뉴> <대상코드>
"""

import sys
import pandas as pd
import requests
import xml.etree.ElementTree as ET

# 우리의 전역 설정 파일을 불러와서 API 키를 사용.
from collector import config

# 표준출력 인코딩을 utf-8로 강제 지정 (Python 3.7+)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Pandas 출력 포맷 설정 
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)
pd.set_option('display.max_colwidth', None)


# ===========================================================================
# [1] ECOS (한국은행) 탐색 파트
# ---------------------------------------------------------------------------
# ECOS는 XML 포맷 응답의 루트 노드가 서비스명에 따라 달라지므로 파싱 함수를 분리함
# ===========================================================================

def parse_ecos_xml(xml_content, list_node_name, item_node_name):
    """ECOS XML 응답을 DataFrame으로 변환하는 공통 함수."""
    try:
        root = ET.fromstring(xml_content)
    except ET.ParseError as e:
        print(f" XML 파싱 에러: {e}")
        return None

    # 에러 메시지 확인 (인증키 오류 등)
    except_node = root.find('Exception')
    if except_node is not None:
        msg_node = except_node.find('Message')
        msg = msg_node.text.strip() if (msg_node is not None and msg_node.text) else "(메시지 없음)"
        print(f"ECOS API 에러: {msg}")
        return None

    rows = []
    # 데이터가 담긴 리스트 노드 찾기 (예: StatisticTableList)
    # → 루트 태그 자체가 서비스명인 경우와, 그 아래 한 단계 더 감싸진 경우를 모두 대응
    list_node = root if root.tag == list_node_name else root.find(list_node_name)
    if list_node is None:
        print(f"데이터를 찾을 수 없습니다. (노드 {list_node_name} 없음)")
        return None

    # 개별 아이템 노드 순회 (예: row)
    for row_node in list_node.findall(item_node_name):
        row_data = {}
        for child in row_node:
            row_data[child.tag] = child.text.strip() if child.text else ""
        rows.append(row_data)
    
    return pd.DataFrame(rows) if rows else None


def explore_ecos_tables(search_word=None):
    """ECOS 전체 통계표 목록(StatisticTableList)을 가져와서 검색합니다."""
    if not config.ECOS_API_KEY:
        print("ECOS_API_KEY가 설정되지 않았습니다.")
        return

    # 서비스명: StatisticTableList (통계표 목록)
    url = f"{config.ECOS_BASE_URL}/StatisticTableList/{config.ECOS_API_KEY}/xml/kr/1/50000/"
    
    print(f"\n ECOS 통계표 목록 불러오는 중...")
    response = requests.get(url)
    
    # StatisticTableList 서비스는 루트가 <StatisticTableList>, 데이터가 <row> 형태임
    df = parse_ecos_xml(response.content, 'StatisticTableList', 'row')
    
    if df is not None:
        cols_to_show = ['STAT_CODE', 'STAT_NAME', 'P_STAT_CODE', 'CYCLE', 'SRCH_YN']
        df_tables = df[df.columns.intersection(cols_to_show)]

        if search_word:
            df_result = df_tables[df_tables['STAT_NAME'].str.contains(search_word, na=False)]
            print(f"\n '{search_word}' 검색 결과 ({len(df_result)}건):")
            # STAT_CODE, STAT_NAME을 보고 config.py의 stat_code에 채워넣습니다.
            print(df_result[['STAT_CODE', 'STAT_NAME']].to_string(index=False))
        else:
            print(f"\n ECOS 통계표 목록 (상위 50건 / 총 {len(df_tables)}건):")
            print(df_tables.head(50).to_string(index=False))


def explore_ecos_items(stat_code):
    """특정 통계표(stat_code) 내부의 상세 항목 코드(StatisticItemList)를 탐색합니다."""
    if not config.ECOS_API_KEY:
        return

    # 서비스명: StatisticItemList (통계 상세항목 목록)
    url = f"{config.ECOS_BASE_URL}/StatisticItemList/{config.ECOS_API_KEY}/xml/kr/1/10000/{stat_code}/"
    
    print(f"\n ECOS 통계표 [{stat_code}]의 상세 항목 불러오는 중...")
    response = requests.get(url)
    
    # 이 서비스는 루트가 <StatisticItemList>, 데이터가 <row> 형태임
    df = parse_ecos_xml(response.content, 'StatisticItemList', 'row')
    
    if df is not None:
        print(f"\n 통계표 [{stat_code}] 내부 항목 목록 (총 {len(df)}건):")
        # 분류가 여러 단계일 수 있음 (GRP_CODE_1, 2, 3...)
        cols_to_show = ['ITEM_CODE', 'ITEM_NM', 'GRP_CODE_1', 'GRP_NM_1', 'START_DATE', 'END_DATE']
        # 터미널에서 보기 좋게 필터링
        df_view = df[df.columns.intersection(cols_to_show)]
        
        # 이 출력 결과를 보고 config.py의 INDICATORS -> ecos -> item_codes 내부에
        # {"DJ": "대전코드", "DG": "대구코드"...} 입력.
        print(df_view.to_string(index=False))


# ===========================================================================
# [2] KOSIS (통계청) 탐색 파트
# ---------------------------------------------------------------------------
# KOSIS는 JSON 응답이 표준 리스트 형태라 파싱이 상대적으론 쉬움
# ===========================================================================

KOSIS_BASE_URL = "https://kosis.kr/openapi"

def explore_kosis_menu(parent_id="*"):
    """KOSIS 통계목록(메뉴 트리)을 탐색하여 tblId를 찾습니다."""
    if not config.KOSIS_API_KEY:
        print(" KOSIS_API_KEY가 설정되지 않았습니다.")
        return

    # VW_SN_LIST (통계목록) 서비스
    params = {
        "method": "getList",
        "key": config.KOSIS_API_KEY,
        "format": "json",
        "jsonVD": "Y",
        "user_id": "study", # 임의 아이디
        "pno": "1",
        "pId": parent_id # 상위 메뉴 ID
    }
    
    url = f"{KOSIS_BASE_URL}/statisticsList.do"
    
    print(f"\n KOSIS 메뉴 ID [{parent_id}] 하위 목록 불러오는 중...")
    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        print(f"API 호출 실패 (Status: {response.status_code})")
        return

    try:
        data = response.json()
    except Exception:
        print("JSON 파싱 실패 (응답이 JSON 형식이 아닙니다.)")
        return

    # 에러 응답 확인
    if isinstance(data, dict) and "errMsg" in data:
        print(f"KOSIS API 에러: {data['errMsg']}")
        return

    if not data:
        print("데이터를 찾을 수 없습니다.")
        return

    df = pd.DataFrame(data)
    
    # 통계표(LIST_YN='N')와 폴더(LIST_YN='Y') 구분
    print(f"\n KOSIS 메뉴 [{parent_id}] 하위 목록 (총 {len(df)}건):")
    cols_to_show = ['MENU_ID', 'MENU_NM', 'TBL_ID', 'ORG_ID', 'LIST_YN']
    df_view = df[df.columns.intersection(cols_to_show)]
    
    #  이 결과를 보고 통계표의 TBL_ID를 config.py의 kosis -> tblId에 넣기.
    # 만약 LIST_YN이 'Y'(폴더)라면 그 MENU_ID를 다시 explore_kosis_menu()에 넣어서 하위를 탐색.
    print(df_view.to_string(index=False))


def explore_kosis_meta(org_id, tbl_id, meta_type="OBJ"):
    """
    KOSIS 통계표의 메타데이터(분류Obj / 통계항목Itm)를 탐색.
    지역 구분 코드(C1, C2...) 사용.
    
    meta_type: "OBJ" (분류목록 - 지역코드는 여기에 있음) | "ITM" (통계항목목록)
    """
    if not config.KOSIS_API_KEY:
        return

    # 서비스명: statisticsMeta.do
    params = {
        "method": "getList",
        "key": config.KOSIS_API_KEY,
        "format": "json",
        "jsonVD": "Y",
        "user_id": "study",
        "orgId": org_id,
        "tblId": tbl_id,
        "type": meta_type # 메타데이터 유형
    }
    
    url = f"{KOSIS_BASE_URL}/statisticsMeta.do"
    
    meta_nm = "분류(Object)" if meta_type == "OBJ" else "통계항목(Item)"
    print(f"\n KOSIS 통계표 [{org_id}/{tbl_id}]의 {meta_nm} 불러오는 중...")
    response = requests.get(url, params=params)
    
    if response.status_code != 200 or not response.text.strip():
        print("API 호출 실패 또는 빈 응답")
        return

    try:
        data = response.json()
    except Exception:
        print("JSON 파싱 실패")
        return

    # KOSIS 메타데이터는 데이터가 없으면 {"errMsg": "데이터가 존재하지 않습니다."} 형태임
    if isinstance(data, dict) and "errMsg" in data:
        print(f"KOSIS 결과: {data['errMsg']}")
        return

    df = pd.DataFrame(data)
    
    print(f"\n📊 통계표 [{tbl_id}] {meta_nm} 목록 (총 {len(df)}건):")
    
    if meta_type == "OBJ":
        # 분류목록(OBJ)인 경우, 지역 구분이 몇 번째 분류(C1? C2? C3?)인지 확인해야 함
        cols_to_show = ['OBJ_ID', 'OBJ_NM', 'SCR_ID', 'SCR_NM'] # SCR_ID가 C1, C2 형태임
        print(df[df.columns.intersection(cols_to_show)].to_string(index=False))
        print("\n 지역구분 항목(예: '시도별', '지역별')의 SCR_ID(예: C1)를 확인하세요.")
        print("   수집 시 'kosis_c1'에 해당하는 데이터가 이 분류 단계에 존재해야 합니다.")
    else:
        # 통계항목(ITM)인 경우
        print(df[['ITM_ID', 'ITM_NM']].to_string(index=False))


def print_usage():
    """사용법 출력"""
    print("\n[사용법]")
    print("1. ECOS 탐색")
    print("   python explore.py ecosystem table [검색어]  # 통계표 목록/검색 (stat_code 탐색)")
    print("   python explore.py ecosystem item <stat_code> # 통계표 내 상세항목 (item_code 탐색)")
    print("\n2. KOSIS 탐색")
    print("   python explore.py kosis menu [parent_id]     # 메뉴 트리 탐색 (tblId 탐색, 루트는 *)")
    print("   python explore.py kosis obj <orgId> <tblId> # 통계표 분류항목 탐색 (C1, C2... 단계 확인)")
    print("   python explore.py kosis itm <orgId> <tblId> # 통계표 통계항목 탐색")


# ===========================================================================
# [3] 메인 실행부 (명령행 인자 처리)
# ===========================================================================

if __name__ == "__main__":
    args = sys.argv[1:]
    
    if not args:
        print_usage()
        sys.exit(0)

    source = args[0].lower()
    
    # --- ECOS 모드 ---
    if source in ["ecosystem", "ecos"]:
        if len(args) < 2:
            print_usage()
            sys.exit(0)
            
        cmd = args[1].lower()
        if cmd == "table":
            # 통계표 목록 검색
            search = args[2] if len(args) > 2 else None
            explore_ecos_tables(search)
        elif cmd == "item":
            # 상세항목 탐색
            if len(args) < 3:
                print("stat_code를 입력하세요.")
            else:
                explore_ecos_items(args[2])
        else:
            print_usage()

    # --- KOSIS 모드 ---
    elif source == "kosis":
        if len(args) < 2:
            print_usage()
            sys.exit(0)

        cmd = args[1].lower()
        if cmd == "menu":
            # 메뉴 트리 탐색
            pid = args[2] if len(args) > 2 else "*"
            explore_kosis_menu(pid)
        elif cmd in ["obj", "itm"]:
            # 메타데이터 탐색
            if len(args) < 4:
                print("orgId와 tblId를 입력하세요.")
            else:
                # obj -> OBJ, itm -> ITM 으로 변환
                explore_kosis_meta(args[2], args[3], cmd.upper())
        else:
            print_usage()
            
    else:
        print(f"알 수 없는 데이터 소스: {source}")
        print_usage()
