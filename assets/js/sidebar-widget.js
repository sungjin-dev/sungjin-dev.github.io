document.addEventListener("DOMContentLoaded", () => {
    // 이동 로직 삭제: 위젯이 이미 사이드바 안에 있으므로 바로 기능 실행
    initClock();
    loadWeather();
    updateVisitorCount();
});

function initClock() {
    const timeEl = document.getElementById("live-time");
    const dateEl = document.getElementById("live-date");
    function update() {
        const now = new Date();
        if (timeEl) timeEl.textContent = now.toLocaleTimeString("ko-KR", { hour12: false });
        if (dateEl) dateEl.textContent = now.toLocaleDateString("ko-KR");
    }
    update();
    setInterval(update, 1000);
}

async function loadWeather() {
    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-desc");
    const iconEl = document.getElementById("weather-icon");
    if (!tempEl) return;
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=b5b782b414c92d9aae875d5e025317b2&units=metric&lang=kr`);
        const data = await res.json();
        tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        if (descEl) descEl.textContent = data.weather[0].description;
        if (iconEl) iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (e) { console.error(e); }
}

async function updateVisitorCount() {
    const el = document.getElementById("gc-total-count");
    if (!el) return;

    try {
        const res = await fetch(
            "https://api.jsonbin.io/v3/b/6a4007bd79fa234c87d986e4/latest",
            {
                headers: {
                    "X-Master-Key": "$2a$10$c0EVRFLqpSK90EQ3cp0/SuOTsqNX7tu225aPB4hr7dtbli.EhTEnW"
                }
            }
        );

        const data = await res.json();

        console.log("visitor api response:", data);

        const count = data?.record?.count ?? 0;

        el.textContent = count + 1;

    } catch (e) {
        console.error(e);
        el.textContent = "0";
    }
}
