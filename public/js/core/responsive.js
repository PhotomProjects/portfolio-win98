/* Tablet mode */

export const tabletMQ = window.matchMedia("(min-width: 540px) and (max-width: 991px)");

export function initTabletModeClass() {
    const apply = () =>
        document.documentElement.classList.toggle("tablet-mode", tabletMQ.matches);
    apply();
    tabletMQ.addEventListener("change", apply);
}

/* Mobile mode */

/* Disable close button */

export function disabledCloseBtn() {
    const mobileMQ = window.matchMedia("(max-width: 539px)");

    const syncMobileClose = () => {
        const mobileCloseBtn = document.querySelector('#win-mobile [data-action="close"]');
        if (mobileCloseBtn) mobileCloseBtn.disabled = mobileMQ.matches;
    };

    syncMobileClose();
    mobileMQ.addEventListener("change", syncMobileClose);
}