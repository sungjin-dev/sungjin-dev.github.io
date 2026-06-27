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
// GoatCounter (API fallback)
// =======================

<div class="visitor-badge" style="text-align: center; margin-top: 10px;">
  <div class="visitor-title" style="color: #c0caf5; font-size: 0.85rem; margin-bottom: 6px;">
    방문자 통계
  </div>
  <a href="https://tjdwlsl888.goatcounter.com" target="_blank">
    <img
      src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fsungjin-dev.github.io&amp;count_bg=%237aa2f7&amp;title_bg=%23555555&amp;title=Views&amp;edge_flat=true"
      alt="visitor badge"
      style="height: 24px; display: inline-block;">
  </a>
</div>

