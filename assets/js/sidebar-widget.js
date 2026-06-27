// =======================
// 위젯 실행부
// =======================
document.addEventListener("DOMContentLoaded", () => {
    // 1. 위젯이 일단 보이도록 강제 처리 (JS 이동 전에도 표시)
    const widget = document.querySelector(".my-custom-sidebar-widget");
    if (widget) {
        widget.style.display = "block";
        widget.style.visibility = "visible";
    }

    // 2. 사이드바 내부로 이동 (사이드바 클래스가 없을 경우 대비)
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && widget) {
        sidebar.appendChild(widget);
    } else {
        console.warn("사이드바 요소를 찾을 수 없어 위젯을 원래 위치에 둡니다.");
    }

    // 3. 기능 초기화
    initClock();
    loadWeather();
    updateVisitorCount();
});

// 나머지 함수들은 그대로 두셔도 됩니다.
function initClock() {
    const timeEl = document.getElementById("live-time");
    const dateEl = document.getElementById("live-date");
    if (!timeEl && !dateEl) return;
    setInterval(() => {
        const now = new Date();
        if (timeEl) timeEl.textContent = now.toLocaleTimeString("ko-KR");
        if (dateEl) dateEl.textContent = now.toLocaleDateString("ko-KR");
    }, 1000);
}

async function loadWeather() {
    const tempEl = document.getElementById("weather-temp");
    if (!tempEl) return;
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=b5b782b414c92d9aae875d5e025317b2&units=metric&lang=kr`);
        const data = await res.json();
        tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("weather-desc").textContent = data.weather[0].description;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (e) { console.error(e); }
}

async function updateVisitorCount() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;
    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/6a4007edf5f4af5e2939c15b`, { headers: { "X-Master-Key": "$2a$10$c0EVRFLqpSK90EQ3cp0/SuOTsqNX7tu225aPB4hr7dtbli.EhTEnW" } });
        const data = await res.json();
        el.textContent = (data?.record?.count ?? 0) + 1;
    } catch (e) { console.error(e); }
}
