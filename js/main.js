/* Lang */

const getLocale = () => {
  const lang = document.documentElement.lang || "en";
  if (lang.startsWith("fr")) return "fr-FR";
  if (lang.startsWith("ja")) return "ja-JP";
  return "en-US";
}

/* Boot system */

document.addEventListener("DOMContentLoaded", () => {
  const boot = document.getElementById("boot-screen");
  const home = document.getElementById("home-content");
  if (!boot || !home) return;

  const BOOT_TIME = 3000;
  
    home.hidden = true;

    setTimeout(() => {
      boot.classList.add("booted");
      home.hidden = false;
    },BOOT_TIME);
});

/* Desktop */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.desktop-icons a[href^="#win-"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const id = link.getAttribute("href").slice(1);
      const win = document.getElementById(id);
      if (!win) return;

      win.hidden = false;

      win.classList.remove("is-closed");
    });
  });
});

/* Window */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".window").forEach((win) => {
    const closeBtn = win.querySelector('[data-action="close"]');
    if (!closeBtn) return;

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      win.classList.add("is-closed");
    });
  });
});

/* Start Menu */

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector("#win-startmenu .taskbar-btn");
    const startMenu = document.getElementById("win-start-menu");
    const shutdown = document.getElementById("shutdown");

  startBtn?.addEventListener("click", () => {
    document.getElementById("win-start-menu").hidden = false;
    startMenu?.classList.toggle("masked");
    });
    shutdown?.addEventListener("click", () => location.reload());    
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#win-start-menu .start-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.open;
      const win = document.getElementById(id);

      win.hidden = false;
      win.classList.remove("is-closed");

      document.getElementById("win-start-menu")?.classList.add("masked");
    });
  });
});

/* Help */

document.addEventListener("DOMContentLoaded", () => {
  const helpBtn = document.querySelector("#taskbar .help-area .taskbar-btn");
  const helpWin = document.getElementById("win-help-menu");

  helpBtn?.addEventListener("click", () => {
    const isHidden = helpWin.hidden;
    const isClosed = helpWin.classList.contains("is-closed");

    if (isHidden || isClosed) {
      helpWin.hidden = false;
      helpWin.classList.remove("is-closed");
      return;
    }

    helpWin.classList.add("is-closed");
  });
});

/* Local time */

document.addEventListener("DOMContentLoaded", () => {
  const localTimeBox = document.getElementById("local-time");
  const span = document.querySelector("#local-time span");
  if (!localTimeBox || !span) return;

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
      })
    );
  };

  timeUpdate();
  setInterval(setClock, 60_000);
});