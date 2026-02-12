/* Lang */

/* i18n */

/* Getting language (localStorage -> <html lang> -> browser -> "en" fallback) */
let languageCode = localStorage.getItem("lang");
if (!languageCode) languageCode = navigator.language;
if (!languageCode) languageCode = document.documentElement.lang;
if (!languageCode) languageCode = "en";

/* Setting language "fr" / "en" / "ja" */
languageCode = String(languageCode).toLowerCase();

if (languageCode.startsWith("fr")) languageCode = "fr";
else if (languageCode.startsWith("ja")) languageCode = "ja";
else languageCode = "en";

/* Applying language to HTML (useful for accessibility and getLocale) */
document.documentElement.lang = languageCode;

/* Loading matching JSON file */
const translationFileUrl = `/i18n/${languageCode}.json`;

fetch(translationFileUrl)
  .then((httpResponse) => {
    if (!httpResponse.ok) {
      throw new Error(`Missing translation file: ${translationFileUrl}`);
    }
    return httpResponse.json(); // transforme JSON into JS object
  })

  .then((translationDictionary) => {
    // translationDictionary =  translation object (key -> value)

    /* Translate all of elements that contains data-i18n */
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const translationKey = element.getAttribute("data-i18n");
      if (!translationKey) return;

      const translatedValue = translationDictionary[translationKey];
      if (translatedValue == null) return;

      const attributeName = element.getAttribute("data-i18n-attr");

      if (attributeName) {
        element.setAttribute(attributeName, translatedValue);
      } else {
        element.textContent = translatedValue;
      }
    });

    /* Title + meta description */
    if (translationDictionary["meta.title"]) {
      document.title = translationDictionary["meta.title"];
    }

    const metaDescriptionElement = document.querySelector('meta[name="description"]');
    if (metaDescriptionElement && translationDictionary["meta.description"]) {
      metaDescriptionElement.setAttribute("content", translationDictionary["meta.description"]);
    }
  })
  .catch((error) => console.warn(error));

/* Language buttons : save + reload */
document.querySelectorAll("#win-language-switcher [data-lang]").forEach((languageButton) => {
  languageButton.addEventListener("click", () => {
    const nextLanguageCode = languageButton.getAttribute("data-lang");
    if (!nextLanguageCode) return;

    localStorage.setItem("lang", nextLanguageCode);
    location.reload();
  });
});


const getLocale = () => {
  const lang = document.documentElement.lang || "en";
  if (lang.startsWith("fr")) return "fr-FR";
  if (lang.startsWith("ja")) return "ja-JP";
  return "en-US";
}

/* Boot system */

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

/* Desktop */

/* Tablet mode */

const tabletMQ = window.matchMedia("(min-width: 540px) and (max-width: 992px)");

document.documentElement.classList.toggle("tablet-mode", tabletMQ.matches);
tabletMQ.addEventListener("change", (e) => {
  document.documentElement.classList.toggle("tablet-mode", e.matches);
});

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

/* Window */

document.querySelectorAll(".window").forEach((win) => {
  const closeBtn = win.querySelector('[data-action="close"]');
  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    win.classList.add("is-closed");
  });
});

/* Start Menu */

const startBtn = document.querySelector("#win-startmenu .taskbar-btn");
const startMenu = document.getElementById("win-start-menu");
const shutdown = document.getElementById("shutdown");

startBtn?.addEventListener("click", () => {
  startMenu.hidden = false;
  startMenu.classList.toggle("masked");
});
shutdown?.addEventListener("click", () => location.reload());

document.querySelectorAll("#win-start-menu .start-menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    const id = item.dataset.open;
    const win = document.getElementById(id);
    if (!win) return;

    win.hidden = false;
    win.classList.remove("is-closed");
    startMenu?.classList.add("masked");
  });
});

/* Help */

const helpBtn = document.querySelector("#taskbar .help-area .taskbar-btn");
const helpWin = document.getElementById("win-help-menu");

document.addEventListener("DOMContentLoaded", () => {
  if (!helpWin) return;

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

helpBtn?.addEventListener("click", () => {
  const isHidden = helpWin.hidden;
  const isClosed = helpWin.classList.contains("is-closed");

  if (isHidden || isClosed) {
    helpWin.hidden = false;
    helpWin.classList.remove("is-closed");
  } else {
    helpWin.classList.add("is-closed");
  }
});

/* Local time */

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
      })
    );
  };

  timeUpdate();
  setInterval(timeUpdate, 60_000);
}