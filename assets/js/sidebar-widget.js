// =======================
// UTIL SAFE WRAPPER
// =======================
function safe(fn) {
    try {
        fn();
    } catch (e) {
        console.error("Error in:", fn.name, e);
    }
}

// =======================
// SIDEBAR MOVE + RESPONSIVE TOGGLE
// =======================
function initSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const widget = document.querySelector(".my-custom-sidebar-widget");

    if (sidebar && widget) {
        widget.style.display = "block";
        sidebar.appendChild(widget);
    }
}

// =======================
// CLOCK
// =======================
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

// =======================
// WEATHER & VISITOR (MutationObserver 통합)
// =======================
function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) return callback(el);

    const observer = new MutationObserver((mutations, obs) => {
        const el = document.querySelector(selector);
        if (el) {
            callback(el);
            obs.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// 실행부
document.addEventListener("DOMContentLoaded", () => {
    safe(initSidebar);
    safe(initClock);
    waitForElement("#weather-temp", loadWeather);
    waitForElement("#gc-total-count", updateVisitorCount);
});
