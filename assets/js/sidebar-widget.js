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

        const count = data?.record?.count;

        el.textContent = (typeof count === "number" ? count : 0) + 1;

    } catch (e) {
        console.error(e);
        el.textContent = "0";
    }
}
