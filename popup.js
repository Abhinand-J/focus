const toggleInput = document.getElementById('toggle-input');

chrome.runtime.sendMessage({type: "GET_STATE"}, (response) => {
    toggleInput.checked = response?.value === true;
});

toggleInput.addEventListener('change', function() {
    chrome.runtime.sendMessage({type: "SET_STATE", value: this.checked});
    if (this.checked) {
        chrome.tabs.query({}, (tabs) => {
            chrome.runtime.sendMessage({type: "BLOCK_EXISTING", tabs});
        });
    } else {
        chrome.tabs.query({}, (tabs) => {
            chrome.runtime.sendMessage({type: "UNBLOCK_EXISTING", tabs});
        });
    }
});