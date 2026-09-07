import { initHelp, toggleHelpMenu } from "./apps/help.js";
import { bootStart } from "./apps/home.js";
import "./core/drag.js";
import { setLanguage, resumeURL, translationJSON, languageBtn } from "./core/i18n.js";
import { tabletMQ, initTabletModeClass, initMobileCloseButtonState } from "./core/responsive.js";
import { toggleStartMenu, closeOnOutsideClick, closeOnEscKey, itemStartMenu, localTime } from "./core/taskbar.js";
import { deskIconsWindow, closeBtn } from "./core/windows.js";

/* i18n */

const lang = setLanguage();
resumeURL(lang);
if (lang !== "en") {
    translationJSON(lang);
}
languageBtn();

/* Boot system */

const BOOT_TIME = 1000;
bootStart(BOOT_TIME);

/* Desktop */

deskIconsWindow({ tabletMQ });

/* Tablet mode */

initTabletModeClass();

/* Mobile mode */

initMobileCloseButtonState();

/* Window */

closeBtn();

/* Start Menu */

toggleStartMenu();
closeOnOutsideClick();
closeOnEscKey();
itemStartMenu();

/* Help */

initHelp({ tabletMQ, bootTime: BOOT_TIME });
toggleHelpMenu();

/* Local time */

localTime();