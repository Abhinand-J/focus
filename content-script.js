chrome.runtime.sendMessage({type: "GET_STATE"}, (response) => {
  if (response.value) {
    chrome.runtime.sendMessage({type: "CLOSE_ME"});
  }
});