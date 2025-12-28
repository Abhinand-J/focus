chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type == "CLOSE_ME" && sender.tab?.id) {
        chrome.tabs.remove(sender.tab.id);
    }
    if (msg.type == "BLOCK_EXISTING" && msg.tabs) {
        const tabs = msg.tabs;
        console.log(tabs);
    }
});