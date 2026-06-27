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
// 방문자 수 뱃지에 데이터 넣기 (네이티브 UI)
// =======================
async function loadVisitors() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;

    try {
        const res = await fetch("https://tjdwlsl888.goatcounter.com/counter/TOTAL.json");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        // 뱃지 안에 숫자만 깔끔하게 삽입
        el.textContent = data.count || 0;

    } catch (e) {
        el.textContent = "Error";
        console.error("GoatCounter API Error:", e);
    }
}

// 화면 로딩이 끝난 후 안전하게 실행
document.addEventListener("DOMContentLoaded", loadVisitors);
