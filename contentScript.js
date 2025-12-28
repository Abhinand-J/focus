const observer = new MutationObserver((mutations) => {
  console.log("DOM changed!");
});

observer.observe(document.body, { childList: true, subtree: true });