// =======================
// GoatCounter (SAFE)
// =======================

function safeGoatCounter() {
    try {
        if (window.goatcounter && typeof window.goatcounter.count === "function") {
            window.goatcounter.count();
        }
    } catch (e) {
        console.error("GoatCounter error:", e);
    }
}

// DOM + load 둘 다 안전하게 보장
window.addEventListener("load", () => {
    setTimeout(safeGoatCounter, 1000);
});


// =======================
// sidebar 이동
// =======================

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const widget = document.querySelector(".my-custom-sidebar-widget");
    const details = document.querySelector(".mobile-widget-toggle");

    if (sidebar && widget) {
        sidebar.appendChild(widget);
    }

    function resizeWidget() {
        if (!details) return;

        details.open = window.innerWidth >= 768;
    }

    resizeWidget();
    window.addEventListener("resize", resizeWidget);
});


// =======================
// 시계
// =======================

function updateClock() {

    const now = new Date();

    const timeEl = document.getElementById("live-time");
    const dateEl = document.getElementById("live-date");

    if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString("ko-KR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "short"
        });
    }
}

updateClock();
setInterval(updateClock, 1000);


// =======================
// 날씨
// =======================

async function loadWeather() {

    const API_KEY = "75b94b0a271713289690c3adcbefcb3a";

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`
        );

        const data = await res.json();

        const tempEl = document.getElementById("weather-temp");
        const descEl = document.getElementById("weather-desc");
        const iconEl = document.getElementById("weather-icon");

        if (tempEl) tempEl.textContent = Math.round(data.main.temp) + "°C";
        if (descEl) descEl.textContent = data.weather[0].description;
        if (iconEl) iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (e) {
        const descEl = document.getElementById("weather-desc");
        if (descEl) descEl.textContent = "로드 실패";
        console.error(e);
    }
}

loadWeather();

// =======================
// 방문자 수 뱃지에 데이터 넣기 (수정본)
// =======================
async function loadVisitors() {
    const totalBadge = document.getElementById("badge-total");
    const todayBadge = document.getElementById("badge-today");
    
    // HTML 요소를 못 찾으면 중단 (에러 방지)
    if (!totalBadge || !todayBadge) return;

    try {
        const res = await fetch("https://tjdwlsl888.goatcounter.com/counter/TOTAL.json");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        // Total 뱃지 업데이트 (API에서 받아온 숫자 적용)
        // 쉼표 등이 뱃지 URL을 망가뜨리지 않도록 안전하게 변환(encodeURIComponent)
        const safeCount = encodeURIComponent(data.count || 0);
        totalBadge.src = `https://img.shields.io/badge/Total-${safeCount}-7aa2f7?style=flat-square&logo=github`;
        
        // Today 뱃지는 GoatCounter API 미지원으로 임시 안내 텍스트 처리
        todayBadge.src = `https://img.shields.io/badge/Today-Check_Stats-9ece6a?style=flat-square&logo=github`;

    } catch (e) {
        totalBadge.src = `https://img.shields.io/badge/Total-Error-f7768e?style=flat-square&logo=github`;
        console.error("GoatCounter API Error:", e);
    }
}

// 핵심 해결책: HTML이 화면에 완전히 로드된 직후에 방문자 수를 불러오도록 설정
document.addEventListener("DOMContentLoaded", loadVisitors);
