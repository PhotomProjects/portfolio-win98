/* Boot system */

export function bootStart() {
    const boot = document.getElementById("boot-screen");
    const home = document.getElementById("home-content");
    if (boot && home) {
        const BOOT_TIME = 3000;
        home.hidden = true;
        setTimeout(() => {
            boot.classList.add("booted");
            home.hidden = false;
        }, BOOT_TIME);
    }
}