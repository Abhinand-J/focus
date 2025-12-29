const toggleInput = document.getElementById('toggle-input');
const addBtn = document.getElementById('add-btn');

let currentList = []

chrome.runtime.sendMessage({type: "GET_STATE"}, (response) => {
    toggleInput.checked = response?.value === true;
});

chrome.runtime.sendMessage({type: "GET_BLOCKLIST"}, (response) => {
    currentList = response?.value;
    renderBlockList();
});

toggleInput.addEventListener('change', function() {
    chrome.runtime.sendMessage({type: "SET_STATE", value: this.checked});
});

addBtn.addEventListener('click', () => {
    const input = document.getElementById('tag-input');
    const value = input.value.trim();

    if (value) {
        currentList.push(value);
        input.value = '';
        updateBlockList();
        renderBlockList();
    }
})

function renderBlockList() {
    const container = document.getElementById('blocklist-container');
    container.innerHTML = '';

    // important: not an url. is a short tag that should appear in urls.
    // i.e. youtube (inside www.youtube.com/watch?idk), insta (inside instagram.com/reels), etc.
    currentList.forEach((urlTag, index) => {
        const itemDiv = document.createElement('div');
        
        const text = document.createElement('span');
        text.textContent = urlTag;

        const removeBtn = document.createElement('button');
        removeBtn.onclick = () => {
            currentList.splice(index, 1);
            updateBlockList();
            renderBlockList();
        };

        itemDiv.appendChild(text);
        itemDiv.appendChild(removeBtn);

        container.append(itemDiv);
    })
}

function updateBlockList() {
    chrome.runtime.sendMessage({type: "SET_BLOCKLIST", value: currentList});
}