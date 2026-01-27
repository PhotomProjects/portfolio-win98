document.addEventListener("DOMContentLoaded", () => {
    const boot = document.getElementById("boot-screen");
    const home = document.getElementById("home-content");

    if (!boot || !home) return;

    home.hidden = true;

    const BOOT_TIME = 3000;

    setTimeout(() => {
        boot.classList.add("booted");
        home.hidden = false;
    },  BOOT_TIME);
});