chrome.action.onClicked.addListener(async(tab) => {
    console.log("Current URL:", tab.url);

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: toggleDrawer,
        args: [tab.url]
    });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0]?.url;
    console.log("Active tab URL:", currentUrl);
});

function toggleDrawer() {
    window.dispatchEvent(new CustomEvent('toggle-drawer'));
}