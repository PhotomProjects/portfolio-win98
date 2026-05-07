/* Tablet mode */

export const tabletMQ = window.matchMedia("(min-width: 540px) and (max-width: 991px) and (min-height: 540px)");
export const mobileMQ = window.matchMedia("(max-width: 539px), (max-height: 539px) and (orientation: landscape) and (hover: none) and (pointer: coarse)");

export function initTabletModeClass() {
    const applyTabletMode = () =>
        document.documentElement.classList.toggle("tablet-mode", tabletMQ.matches);
    applyTabletMode();
    tabletMQ.addEventListener("change", applyTabletMode);
}

/* Mobile mode */

/* Disable close button */

export function initMobileCloseButtonState() {
    const syncMobileCloseButton = () => {
        const mobileCloseBtn = document.querySelector('#win-mobile [data-action="close"]');
        if (mobileCloseBtn) mobileCloseBtn.disabled = mobileMQ.matches;
    };

    syncMobileCloseButton();
    mobileMQ.addEventListener("change", syncMobileCloseButton);
}