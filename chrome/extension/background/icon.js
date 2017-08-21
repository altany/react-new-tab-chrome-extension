export function setIcon(bookmarks, url, tabId) {
  if (bookmarks && bookmarks.filter(b => b.url === url).length) {
    chrome.browserAction.setIcon({ path: '/img/icon-48.png', tabId });
  } else {
    chrome.browserAction.setIcon({ path: '/img/icon-48-plain.png', tabId });
  }
}

export default () => {
  chrome.tabs.onActivated.addListener((info) => {
    chrome.tabs.get(info.tabId, (tab) => {
      chrome.storage.sync.get('state', (obj) => {
        let { state } = obj;
        state = JSON.parse(state || '{}');
        setIcon(state.bookmarks, tab.url, info.tabId);
      });
    });
  });
  chrome.extension.onMessage.addListener((request) => {
    if (request.cmd === 'updateIcon') {
      setIcon(request.bookmarks, request.url, request.id);
    }
  });
};

