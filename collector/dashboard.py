import streamlit as st
import pandas as pd
import plotly.express as px # 화려한 차트를 그리기 위한 라이브러리

# 1. 페이지 기본 설정 (가장 넓은 화면 쓰기)
st.set_page_config(page_title="지역 거시경제 대시보드", page_icon="📊", layout="wide")

st.title("거시경제 지표 및 지역 데이터 대시보드")
st.markdown("매일 자동 수집되는 파이프라인 기반 데이터입니다.")

@st.cache_data
def load_data():
    # 경로와 파일명은 지금 쓰고 계신 그대로 유지하시면 됩니다.
    df = pd.read_csv("collector/data/panel_quarterly.csv") 
    return df

try:
    df = load_data()
    
    # --- 사이드바 (검색 필터 만들기) ---
    st.sidebar.header("검색 필터")
    # 지역을 다중 선택할 수 있는 드롭다운
    selected_region = st.sidebar.multiselect(
        "비교할 지역을 선택하세요", 
        options=df['region'].unique(), 
        default=df['region'].unique()
    )
    
    # 선택된 지역만 필터링
    filtered_df = df[df['region'].isin(selected_region)]

    # --- 핵심 지표 요약 (상단 KPI 카드) ---
    st.subheader("핵심 지표 요약")
    col1, col2, col3 = st.columns(3)
    
    latest_quarter = filtered_df['quarter'].max()
    # 가장 최근 분기의 기준금리 추출
    latest_rate = filtered_df[filtered_df['quarter'] == latest_quarter]['base_rate'].values[0]
    
    with col1:
        st.metric(label=f"최근 기준금리 ({latest_quarter} 기준)", value=f"{latest_rate}%")
    
    st.divider() # 가로선 긋기

    # --- 인터랙티브 차트 그리기 (마우스 오버, 확대/축소 가능) ---
    st.subheader("지역별 기준금리 추이")
    
    # Plotly를 사용해 분기별 선 그래프 생성
    fig = px.line(
        filtered_df, 
        x='quarter', 
        y='base_rate', 
        color='region', 
        markers=True,
        title="분기별 금리 변화 추세"
    )
    # Streamlit 화면에 꽉 차게 그리기
    st.plotly_chart(fig, use_container_width=True)

    # --- 원본 데이터 (토글로 숨겨두기) ---
    with st.expander("원본 데이터 테이블 보기 (클릭하여 펼치기)"):
        st.dataframe(filtered_df, use_container_width=True)
        
except FileNotFoundError:
    st.error("아직 데이터 파일이 생성되지 않았습니다.")
