// =======================
// UTIL SAFE WRAPPER
// =======================
function safe(fn) {
    try {
        fn();
    } catch (e) {
        console.error(e);
    }
}

// =======================
// SIDEBAR MOVE + RESPONSIVE TOGGLE
// [수정 1] 사이드바가 없는 페이지(메인 splash 등)에서는
//          위젯을 제거해서 푸터 하단에 노출되지 않게 함
// =======================

function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const widget = document.querySelector(".my-custom-sidebar-widget");
    const details = document.querySelector(".mobile-widget-toggle");

    if (!widget) return;

    // 사이드바가 없는 레이아웃 → 위젯 자체를 제거
    if (!sidebar) {
        widget.remove();
        return;
    }

    sidebar.appendChild(widget);

    if (details) {
        details.addEventListener("toggle", () => {
            details.dataset.userTouched = "true";
        });

        window.addEventListener("resize", () => {
            if (!details.dataset.userTouched) {
                details.open = window.innerWidth >= 768;
            }
        });
    }
}

// =======================
// CLOCK
// [수정 2] 첫 1초간 빈 칸으로 뜨던 것 → 즉시 1회 렌더 후 인터벌
// =======================

function initClock() {
    const timeEl = document.getElementById("live-time");
    const dateEl = document.getElementById("live-date");

    if (!timeEl && !dateEl) return;

    function render() {
        const now = new Date();
        if (timeEl) timeEl.textContent = now.toLocaleTimeString("ko-KR");
        if (dateEl) dateEl.textContent = now.toLocaleDateString("ko-KR");
    }

    render();
    setInterval(render, 1000);
}

// =======================
// WEATHER
// =======================

async function loadWeather() {
    const API_KEY = "b5b782b414c92d9aae875d5e025317b2";

    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-desc");
    const iconEl = document.getElementById("weather-icon");

    if (!tempEl && !descEl && !iconEl) return;

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`
        );

        if (!res.ok) return;

        const data = await res.json();

        if (tempEl) tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        if (descEl) descEl.textContent = data.weather?.[0]?.description ?? "";
        if (iconEl) iconEl.src = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`;

    } catch (e) {
        console.error("[weather] failed", e);
    }
}

// =======================
// VISITOR COUNT
// [수정 3 · 중요] jsonbin 자체 카운터 → GoatCounter 공식 카운터로 교체
//  - 기존 코드는 jsonbin Master Key가 저장소에 그대로 노출되어 있었음 (보안 사고)
//  - 이미 GoatCounter로 집계 중이므로, 공개 카운터 API를 읽기만 하면 됨
//  - 키 불필요 + 새로고침으로 숫자가 뻥튀기되던 문제도 함께 해결
// =======================

async function updateVisitorCount() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;

    try {
        const res = await fetch("https://tjdwlsl888.goatcounter.com/counter/TOTAL.json");
        if (!res.ok) { el.textContent = "-"; return; }

        const data = await res.json();
        el.textContent = data.count ?? "-";
    } catch (e) {
        console.error("[visitor] failed", e);
        el.textContent = "-";
    }
}

// =======================
// [수정 4] waitForElement 무한 폴링 방지
//  - 요소가 없는 페이지에서 0.1초마다 영원히 재시도하던 것 → 최대 3초로 제한
// =======================

function waitForElement(selector, callback, maxTries = 30) {
    const el = document.querySelector(selector);
    if (el) {
        callback(el);
    } else if (maxTries > 0) {
        setTimeout(() => waitForElement(selector, callback, maxTries - 1), 100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    safe(initSidebar);
    safe(initClock);

    waitForElement("#weather-temp", loadWeather);
    waitForElement("#gc-total-count", updateVisitorCount);
});
