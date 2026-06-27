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
// =======================

function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const widget = document.querySelector(".my-custom-sidebar-widget");
    const details = document.querySelector(".mobile-widget-toggle");

    if (!sidebar || !widget) return;

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
// =======================

function initClock() {
    const timeEl = document.getElementById("live-time");
    const dateEl = document.getElementById("live-date");

    if (!timeEl && !dateEl) return;

    setInterval(() => {
        const now = new Date();

        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString("ko-KR");
        }

        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString("ko-KR");
        }
    }, 1000);
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
// VISITOR COUNT (GoatCounter API)
// =======================

const BIN_ID = "6a4007edf5f4af5e2939c15b";
const API_KEY = "$2a$10$c0EVRFLqpSK90EQ3cp0/SuOTsqNX7tu225aPB4hr7dtbli.EhTEnW";

// 추천: 방문자 수를 즉시 보여주기 위한 개선
async function updateVisitorCount() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;

    // 1. 서버 호출 전, 캐시나 로컬 저장소에서 먼저 보여줄 수 있다면 그렇게 하세요.
    // el.textContent = localStorage.getItem("last_count") || "...";

    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            headers: { "X-Master-Key": API_KEY }
        });

        const data = await res.json();
        let count = data?.record?.count ?? 0;
        
        // 2. 숫자가 불러와지는 즉시 UI 반영
        el.textContent = ++count;

        // 3. 업데이트는 나중에(비동기로) 수행하여 UI 차단 방지
        fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
            body: JSON.stringify({ count })
        }).catch(console.error);

    } catch (e) {
        console.error("[visitor] failed", e);
        el.textContent = "0";
    }
}

// 요소가 렌더링될 때까지 기다렸다가 실행하는 함수
function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) {
        callback(el);
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    safe(initSidebar);
    safe(initClock);

    // API 호출을 요소가 준비된 후에 실행하도록 변경
    waitForElement("#weather-temp", loadWeather);
    waitForElement("#gc-total-count", updateVisitorCount);
});
