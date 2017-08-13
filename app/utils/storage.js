function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// todos unmarked count
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
    });
    return store;
  };
}
