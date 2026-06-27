setTimeout(() => {
  goatcounter.count()
}, 1000)

// sidebar 이동

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const widget = document.querySelector(".my-custom-sidebar-widget");
    const details = document.querySelector(".mobile-widget-toggle");

    if (sidebar && widget) {
        sidebar.appendChild(widget);
    }

    function resizeWidget(){

        if(!details) return;

        if(window.innerWidth >= 768){
            details.open = true;
        }else{
            details.open = false;
        }

    }

    resizeWidget();

    window.addEventListener("resize", resizeWidget);

});

// 시계

function updateClock(){

    const now = new Date();

    document.getElementById("live-time").textContent =
        now.toLocaleTimeString("ko-KR",{
            hour12:false,
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"
        });

    document.getElementById("live-date").textContent =
        now.toLocaleDateString("ko-KR",{
            year:"numeric",
            month:"2-digit",
            day:"2-digit",
            weekday:"short"
        });

}

updateClock();

setInterval(updateClock,1000);

// 날씨

async function loadWeather(){

    const API_KEY="75b94b0a271713289690c3adcbefcb3a";

    try{

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`
        );

        const data = await res.json();

        document.getElementById("weather-temp").textContent =
            Math.round(data.main.temp)+"°C";

        document.getElementById("weather-desc").textContent =
            data.weather[0].description;

        document.getElementById("weather-icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    }

    catch(e){

        document.getElementById("weather-desc").textContent =
            "로드 실패";

        console.error(e);

    }

}

loadWeather();

// GoatCounter

async function loadVisitors() {
    const el = document.getElementById("goatcounter-total");

    try {
        const res = await fetch(
            "https://tjdwlsl888.goatcounter.com/counter/%2F.json"
        );

        if (!res.ok) throw new Error("API error");

        const data = await res.json();

        el.innerHTML = `
            <div class="visitor-row">
                <span class="visitor-label">Today</span>
                <span class="visitor-value">${data.count_unique ?? 0}</span>
            </div>
            <div class="visitor-row">
                <span class="visitor-label">Total</span>
                <span class="visitor-value">${data.count ?? 0}</span>
            </div>
        `;

    } catch (e) {
        el.textContent = "불러오기 실패";
        console.error(e);
    }
}

loadVisitors();

if (window.goatcounter && goatcounter.count) {
    goatcounter.count();
}
