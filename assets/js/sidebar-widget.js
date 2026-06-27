// =======================
// UTIL
// =======================
function safe(fn) {
    try { fn(); } catch (e) { console.error(e); }
}

function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) return callback(el);
    const observer = new MutationObserver((mutations, obs) => {
        const el = document.querySelector(selector);
        if (el) { callback(el); obs.disconnect(); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

// =======================
// 기능 함수들 (모두 최상위 스코프에 정의)
// =======================

function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const widget = document.querySelector(".my-custom-sidebar-widget");
    if (sidebar && widget) {
        widget.style.display = "block";
        sidebar.appendChild(widget);
    }
}

function initClock() {
    const timeEl = document.getElementById("live-time");
    const dateEl = document.getElementById("live-date");
    if (!timeEl && !dateEl) return;
    
    const update = () => {
        const now = new Date();
        if (timeEl) timeEl.textContent = now.toLocaleTimeString("ko-KR");
        if (dateEl) dateEl.textContent = now.toLocaleDateString("ko-KR");
    };
    update();
    setInterval(update, 1000);
}

async function loadWeather() {
    const API_KEY = "b5b782b414c92d9aae875d5e025317b2";
    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-desc");
    const iconEl = document.getElementById("weather-icon");

    if (!tempEl) return;
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`);
        if (!res.ok) throw new Error("Weather API failed");
        const data = await res.json();
        if (tempEl) tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        if (descEl) descEl.textContent = data.weather?.[0]?.description ?? "";
        if (iconEl) iconEl.src = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`;
    } catch (e) { console.error(e); }
}

async function updateVisitorCount() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;
    const BIN_ID = "6a4007edf5f4af5e2939c15b";
    const API_KEY = "$2a$10$c0EVRFLqpSK90EQ3cp0/SuOTsqNX7tu225aPB4hr7dtbli.EhTEnW";

    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, { headers: { "X-Master-Key": API_KEY } });
        const data = await res.json();
        let count = data?.record?.count ?? 0;
        el.textContent = ++count;
        fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
            body: JSON.stringify({ count })
        }).catch(console.error);
    } catch (e) { console.error(e); }
}

// =======================
// 실행
// =======================
document.addEventListener("DOMContentLoaded", () => {
    safe(initSidebar);
    safe(initClock);
    waitForElement("#weather-temp", loadWeather);
    waitForElement("#gc-total-count", updateVisitorCount);
});
