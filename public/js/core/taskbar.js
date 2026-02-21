/* Start Menu */

const startBtn = document.querySelector("#win-startmenu .taskbar-btn");
const startMenu = document.getElementById("win-start-menu");
const shutdown = document.getElementById("shutdown");

export function toggleStartMenu() {
    // Open / close Start
    startBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!startMenu) return;

        startMenu.hidden = !startMenu.hidden;
        const expanded = !startMenu.hidden;
        startBtn.setAttribute("aria-expanded", String(expanded));
    });
    shutdown?.addEventListener("click", () => location.reload());
}

export function closeOnOutsideClick() {
    // Outside click closes menu
    document.addEventListener("click", (e) => {
        if (!startMenu || startMenu.hidden) return;
        const target = e.target;
        if (startBtn?.contains(target) || startMenu.contains(target)) return;
        startMenu.hidden = true;
        startBtn?.setAttribute("aria-expanded", "false");
    });
}

export function closeOnEscKey() {
    // Esc closes menu
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (!startMenu || startMenu.hidden) return;
        startMenu.hidden = true;
        startBtn?.setAttribute("aria-expanded", "false");
    });
}

export function itemStartMenu() {
    // Click on item
    document.querySelectorAll("#win-start-menu .start-menu-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            // Closes menu
            if (startMenu) startMenu.hidden = true;
            startBtn?.setAttribute("aria-expanded", "false");

            // Item opens window
            const id = item.dataset.open;
            if (!id) return;
            const win = document.getElementById(id);
            if (!win) return;

            win.hidden = false;
            win.classList.remove("is-closed");
        });
    });
}

/* Local time */

export function localTime() {
    const getLocale = () => {
        const lang = document.documentElement.lang || "en";
        if (lang.startsWith("fr")) return "fr-FR";
        if (lang.startsWith("ja")) return "ja-JP";
        return "en-US";
    }

    const localTimeBox = document.getElementById("local-time");
    const span = document.querySelector("#local-time span");
    if (localTimeBox && span) {
        const timeUpdate = () => {
            const now = new Date();
            const locale = getLocale();

            span.textContent = now.toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
            });

            localTimeBox.setAttribute("data-tooltip", now.toLocaleDateString(locale, {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }));
        };

        timeUpdate();
        setInterval(timeUpdate, 60_000);
    }
}