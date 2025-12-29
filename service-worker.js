import blockList from "./block-list.js";

let state = false;

// function to block existing tabs.

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type == "GET_STATE") {
        sendResponse({value: state});
    }
    if (msg.type == "SET_STATE") {
        state = msg.value;
        // this is where i block existing tabs
    }
    // popup will send updated list here, which replaces old. currently not implemented by popup so will never be called.
    if (msg.type == "UPDATE_BLOCKLIST" && msg.value) {
        console.log("here is where i would update blocklist");
        blockList = msg.value;  // this is not preserved between browser loads. only the initial list hardcoded in block-list.js is. 
    }
});

// this will have to change. currently its onUpdated delete (for new tabs)
// i would have it be onCreated -> onUpdated delete
// another listener would be onUpdated (or something to do with background tabs) redirect to block page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (state && changeInfo.status === "complete") {
        for (const elem of blockList) {
            if (tab.url.includes(elem)) {
                chrome.tabs.remove(tab.id);
            }S
        }
    }
});