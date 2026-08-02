import streamlit as st
import pandas as pd

# 1. 페이지 기본 설정
st.set_page_config(page_title="지역 거시경제 대시보드", page_icon="📊", layout="wide")

st.title(" 대전/대구 지역 경제 지표 대시보드")
st.markdown("ECOS 및 KOSIS API를 통해 매일 자동 업데이트되는 데이터입니다.")

# 2. 데이터 불러오기 
# @st.cache_data를 쓰면 데이터를 매번 새로 읽지 않아 속도 개선.
@st.cache_data
def load_data():
    # 예시: GitHub Actions가 수집해서 저장해둔 파일
    df = pd.read_csv("collector/data/regional_data.csv") 
    return df

try:
    df = load_data()
    
    # 3. 화면에 데이터프레임과 기본 차트 그리기
    st.subheader(" 최근 수집된 데이터")
    st.dataframe(df.tail(10)) # 최근 10개 데이터 표출
    
    st.subheader(" 경제 지표 추이")
    # 예: 날짜를 x축으로 하고 특정 지표를 y축으로 하는 선형 차트
    # st.line_chart(df, x='date', y='value')
    
except FileNotFoundError:
    st.error("아직 데이터 파일이 생성되지 않았습니다. GitHub Actions 수집을 먼저 실행해주세요.")
