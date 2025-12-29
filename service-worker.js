import initBlockList from "./block-list.js";

let blockList = initBlockList;

// global state. determines whether to block or not.
let state = false;

// map to store blocked tabids & urls
const map = new Map();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type == "GET_STATE") {
        sendResponse({value: state});
    }
    if (msg.type == "SET_STATE") {
        state = msg.value;
        // this is where i block/unblock existing tabs
        // if block: for each tab: if part of blacklist: add tabid, url to dict; redirect tab to block page
        // if unblock: for each tabid, url in dict: redirect tab to url
        if (state) {
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    if (!tab.id || !tab.url) continue;
                    for (const elem of blockList) {
                        if (tab.url.includes(elem)) {
                            map.set(tab.id, tab.url);
                            chrome.tabs.update(tab.id, {url: chrome.runtime.getURL('blocked.html')});
                            break;
                        }
                    }
                }
            });
        } else {
            for (const [key, val] of map) {
                chrome.tabs.update(key, {url: val});
            }
            map.clear();
        }
    }
    // popup will send updated list here, which replaces old. currently not implemented by popup so will never be called.
    // this is not preserved between browser loads. only the initial list hardcoded in block-list.js is.
    if (msg.type == "UPDATE_BLOCKLIST" && msg.value) {
        console.log("here is where i would update blocklist");
        blockList = msg.value;
    }
});

// handles new tab creation. if tab url contains blacklisted strings, removes tab.
chrome.tabs.onCreated.addListener((tab) => {
    console.log(tab.id);  // somehow fixes issue ?
    if (!state || !tab.id) return;

    const tabId = tab.id;

    if (tab.url) {
        for (const elem of blockList) {
            if (tab.url.includes(elem)) {
                chrome.tabs.remove(tabId);
                return;
            }
        }
    }

    function handleUpdate(updatedTabId, changeInfo) {
        if (updatedTabId !== tabId) return; // ignore other tabs
        if (changeInfo.url) {
            for (const elem of blockList) {
                if (changeInfo.url.includes(elem)) {
                    chrome.tabs.remove(tabId);
                    chrome.tabs.onUpdated.removeListener(handleUpdate); // cleanup
                    return;
                }
            }
        }
    }

    chrome.tabs.onUpdated.addListener(handleUpdate);
});

chrome.tabs.onRemoved.addListener((tabId) => {
    map.delete(tabId);
});