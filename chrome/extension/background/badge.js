chrome.storage.local.get('state', (obj) => {
  const { stateString } = obj;
  const state = JSON.parse(stateString || '{}');
  chrome.browserAction.setBadgeBackgroundColor({ color: [62, 83, 93, 1] });
  if (state.bookmarks) {
    chrome.browserAction.setBadgeText({ text: state.bookmarks.length.toString() });
  }
});
