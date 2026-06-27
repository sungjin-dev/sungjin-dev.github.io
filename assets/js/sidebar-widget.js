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

    if (sidebar && widget) {
        sidebar.appendChild(widget);
    }

    function handleResize() {
        if (!details) return;

        // 처음 로딩 기준으로만 반응 (사용자 조작 방해 방지)
        if (!details.dataset.userTouched) {
            details.open = window.innerWidth >= 768;
        }
    }

    if (details) {
        details.addEventListener("toggle", () => {
            details.dataset.userTouched = "true";
        });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
}

// =======================
// CLOCK
// =======================

function initClock() {
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
}

// =======================
// WEATHER
// =======================

async function loadWeather() {
    const API_KEY = "YOUR_API_KEY_HERE"; // ⚠️ 노출 최소화 권장

    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-desc");
    const iconEl = document.getElementById("weather-icon");

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`
        );

        if (!res.ok) throw new Error(`Weather API error: ${res.status}`);

        const data = await res.json();

        if (tempEl) tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        if (descEl) descEl.textContent = data.weather?.[0]?.description ?? "정보 없음";
        if (iconEl) {
            iconEl.src = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`;
        }

    } catch (e) {
        console.error(e);
        if (descEl) descEl.textContent = "날씨 로드 실패";
    }
}

// =======================
// VISITOR COUNT (GoatCounter API)
// =======================

async function loadVisitors() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;

    try {
        const res = await fetch(
            "https://tjdwlsl888.goatcounter.com/counter/TOTAL.json"
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        el.textContent = data.count ?? 0;

    } catch (e) {
        console.error(e);
        el.textContent = "-";
    }
}

// =======================
// INIT ALL
// =======================

document.addEventListener("DOMContentLoaded", () => {
    safe(initSidebar);
    safe(initClock);
    safe(loadWeather);
    safe(loadVisitors);
});

// GoatCounter script (HTML에서 자동 실행됨)
