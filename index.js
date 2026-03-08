const EXT_ID = 'welcome-panel-tools';

/**
 * Applies UI tweaks to the welcome panel when it appears in DOM.
 * This extension only touches DOM/CSS classes and keeps core logic intact.
 * It is designed so you can publish just this folder.
 */
function patchWelcomePanel(panel) {
    if (!(panel instanceof HTMLElement)) {
        return;
    }

    // Remove legacy expand/collapse header buttons if present.
    panel.querySelectorAll('.showRecentChats, .hideRecentChats').forEach((el) => el.remove());

    // Keep tabs visible at all times.
    panel.classList.remove('recentHidden');

    // Unify the "recent chats" tab label and style.
    const recentTab = panel.querySelector('.welcomeTab[data-tab="recent"]');
    if (recentTab instanceof HTMLButtonElement) {
        recentTab.textContent = 'recent chats';
        recentTab.classList.remove('active');
    }
}

function patchAllPanels() {
    document.querySelectorAll('.welcomePanel').forEach((panel) => patchWelcomePanel(panel));
}

function initObserver() {
    patchAllPanels();

    const observer = new MutationObserver(() => patchAllPanels());
    observer.observe(document.body, { childList: true, subtree: true });
}

jQuery(() => {
    try {
        initObserver();
        console.debug(`[${EXT_ID}] initialized`);
    } catch (error) {
        console.error(`[${EXT_ID}] initialization error`, error);
    }
});
// @ts-ignore
function jQuery(arg0) {
    throw new Error("Function not implemented.");
}

