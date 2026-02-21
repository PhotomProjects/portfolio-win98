/* Help */

const helpBtn = document.querySelector("#taskbar .help-area .taskbar-btn");
const helpWin = document.getElementById("win-help-menu");

export function initHelp({tabletMQ}) {

    document.addEventListener("DOMContentLoaded", () => {
        if (!helpWin) return;

        if (tabletMQ.matches) {
            helpWin.hidden = true;
            helpWin.classList.add("is-closed");
            return;
        }

        const BOOT_TIME = 3100;
        const SHOW_DELAY = BOOT_TIME + 200;
        const AUTO_CLOSE_AFTER = 15000;

        // Open help
        setTimeout(() => {
            helpWin.hidden = false;
            helpWin.classList.remove("is-closed");
        }, SHOW_DELAY);

        // Close help
        setTimeout(() => {
            helpWin.classList.add("is-closed");

            setTimeout(() => {
                helpWin.hidden = true;
            }, 300);
        }, SHOW_DELAY + AUTO_CLOSE_AFTER);
    });
}

export function toggleHelpMenu() {
    helpBtn?.addEventListener("click", () => {
        const isHidden = helpWin.hidden;
        const isClosed = helpWin.classList.contains("is-closed");

        if (isHidden || isClosed) {
            helpWin.hidden = false;
            helpWin.classList.remove("is-closed");
        } else {
            helpWin.hidden = true;
            helpWin.classList.add("is-closed");
        }
    });
}