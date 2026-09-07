/* Boot system */

export function bootStart(bootTime) {
    const boot = document.getElementById("boot-screen");
    const home = document.getElementById("home-content");
    if (boot && home) {
        home.hidden = true;
        setTimeout(() => {
            boot.classList.add("booted");
            home.hidden = false;
        }, bootTime);
    }
}