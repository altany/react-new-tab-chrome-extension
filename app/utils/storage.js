function saveState(state) {
  chrome.storage.sync.set({ state: JSON.stringify(state) });
}

// count bookmarks
function setBadge(bookmarks) {
  if (chrome.browserAction && bookmarks) {
    chrome.browserAction.setBadgeText({ text: bookmarks.length > 0 ? bookmarks.length.toString() : '' });
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.bookmarks);
      chrome.browserAction.setIcon({ path: `/img/icon-48.png` });
      chrome.tabs.query({
        active: true,               // Select active tabs
        lastFocusedWindow: true     // In the current window
      }, (t) => {
        const tab = t[0];

        chrome.extension.sendMessage({
          cmd: 'updateIcon',
          bookmarks: state.bookmarks,
          url: tab.url,
          id: tab.id
        });
      });
    });
    return store;
  };
}
