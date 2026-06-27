document.addEventListener("DOMContentLoaded", () => {
    safe(initSidebar);
    safe(initClock);
    safe(loadWeather);
    safe(updateVisitorCount);
});

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
    const API_KEY = "b5b782b414c92d9aae875d5e025317b2"; // 

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

const BIN_ID = "6a4007bd79fa234c87d986e4";
const API_KEY = "$2a$10$c0EVRFLqpSK90EQ3cp0/SuOTsqNX7tu225aPB4hr7dtbli.EhTEnW";

aasync function updateVisitorCount() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;

    // 중복 호출 방지를 위해 세션 스토리지 확인
    if (sessionStorage.getItem("visitor_counted")) return;

    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
            headers: { "X-Master-Key": API_KEY }
        });

        const data = await res.json();
        let count = (data.record.count || 0) + 1;
        
        el.textContent = count;
        sessionStorage.setItem("visitor_counted", "true"); // 중복 카운트 방지

        await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({ count })
        });
    } catch (e) {
        console.error("visitor error:", e);
        el.textContent = "0";
    }
}
