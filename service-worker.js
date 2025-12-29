import blockList from "./block-list.js";

let state = false;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type == "GET_STATE") {
        sendResponse({value: state});
    }
    if (msg.type == "SET_STATE") {
        state = msg.value;
    }
    if (msg.type == "UPDATE_BLOCKLIST" && msg.value) {
        console.log("here is where i would update blocklist");
    }
});

// call content scripts
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (state && changeInfo.status === "complete") {
        for (const elem of blockList) {
            if (tab.url.includes(elem)) {
                chrome.tabs.remove(tab.id);
            }
        }
    }
});