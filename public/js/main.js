import { initHelp, toggleHelpMenu } from "./apps/help.js";
import { bootStart } from "./apps/home.js";
import { setLanguage, resumeURL, translationJSON, languageBtn } from "./core/i18n.js";
import { tabletMQ, initTabletModeClass, disabledCloseBtn } from "./core/responsive.js";
import { toggleStartMenu, closeOnOutsideClick, closeOnEscKey, itemStartMenu, localTime } from "./core/taskbar.js";
import { deskIconsWindow, closeBtn } from "./core/windows.js";

/* Lang */

/* i18n */

const lang = setLanguage();
resumeURL(lang);
translationJSON(lang);
languageBtn();

/* Boot system */

bootStart();

/* Desktop */

deskIconsWindow({ tabletMQ });

/* Tablet mode */

initTabletModeClass();

/* Mobile mode */

disabledCloseBtn();

/* Window */

closeBtn();

/* Start Menu */

toggleStartMenu();
closeOnOutsideClick();
closeOnEscKey();
itemStartMenu();

/* Help */

initHelp({ tabletMQ });
toggleHelpMenu();

/* Local time */

localTime()