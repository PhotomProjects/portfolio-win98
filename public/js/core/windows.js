/* Desktop icons */

export function deskIconsWindow({tabletMQ}) {
    document.addEventListener("click", (e) => {
        const openButton = e.target.closest("button[data-open]");
        if (!openButton) return;

        const targetWindowId = openButton.dataset.open;
        if (!targetWindowId) return;

        const targetWindow = document.getElementById(targetWindowId);
        if (!targetWindow) return;

        if (tabletMQ.matches) {
            const allWindows = document.querySelectorAll("#window-frame .window")
            allWindows.forEach((currentWindow) => {
                if (currentWindow.id === "win-start-menu") return;

                const isTargetWindow = currentWindow.id === targetWindowId;
                if (!isTargetWindow) {
                    currentWindow.hidden = true;
                    currentWindow.classList.add("is-closed");
                }
            });
        }
        targetWindow.hidden = false;
        targetWindow.classList.remove("is-closed");
    });
}

/* Close btn */

export function closeBtn() {
    document.querySelectorAll(".window").forEach((win) => {
        const closeBtn = win.querySelector('[data-action="close"]');
        closeBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            win.classList.add("is-closed");
            win.hidden = true;
        });
    });
}