const toggleInput = document.getElementById('toggle-input');

toggleInput.addEventListener('change', function() {
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