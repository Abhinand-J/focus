let state = false;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type == "CLOSE_ME" && sender.tab?.id) {
        chrome.tabs.remove(sender.tab.id);
    }
    if (msg.type == "BLOCK_EXISTING" && msg.tabs) {
        const tabs = msg.tabs;
        console.log(tabs);
    }
    if (msg.type == "UNBLOCK_EXISTING" && msg.tabs) {
        const tabs = msg.tabs;
    }
    if (msg.type == "GET_STATE") {
        sendResponse({value: state});
    }
    if (msg.type == "SET_STATE") {
        state = msg.value;
    }
});