import initBlockList from "./block-list.js";

let blockList = initBlockList;

// global state. determines whether to block or not.
let state = false;

// map to store blocked tabids & urls
const map = new Map();

const isBlacklisted = (url) => url && blockList.some(elem => url.includes(elem));

function block() {
    chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
            if (tab.id && isBlacklisted(tab.url)) {
                map.set(tab.id, tab.url);
                chrome.tabs.update(tab.id, {url: chrome.runtime.getURL('blocked.html')});                    
            }
        }
    });
}
function unblock() {
    for (const [tabId, val] of map) {
        chrome.tabs.get(tabId, () => {
            if (!chrome.runtime.lastError) {
                chrome.tabs.update(tabId, {url: val});
            }
        });
    }
    map.clear();
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type == "GET_STATE") {
        sendResponse({value: state});
    }
    if (msg.type == "SET_STATE") {
        state = !!msg.value;
        if (state) block();
        else unblock();
    }
    if (msg.type == "GET_BLOCKLIST") {
        sendResponse({value: blockList});
    }
    // this is not preserved between browser loads. only the initial list hardcoded in block-list.js is.
    if (msg.type == "SET_BLOCKLIST" && msg.value) {
        console.log("here is where i would update blocklist");
        blockList = msg.value;
    }
});

// handles new tab creation. if tab url contains blacklisted strings, removes tab.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!state || !changeInfo.url) return;

    if (isBlacklisted(changeInfo.url)) {
        if (map.has(tabId)) {
            chrome.tabs.update(tabId, {url: chrome.runtime.getURL('blocked.html')});
        } else {
        chrome.tabs.remove(tabId);
        }
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    map.delete(tabId);
});