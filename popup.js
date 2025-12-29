const toggleInput = document.getElementById('toggle-input');

chrome.runtime.sendMessage({type: "GET_STATE"}, (response) => {
    toggleInput.checked = response?.value === true;
});

toggleInput.addEventListener('change', function() {
    chrome.runtime.sendMessage({type: "SET_STATE", value: this.checked});
});