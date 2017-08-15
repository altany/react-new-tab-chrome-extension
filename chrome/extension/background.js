import bluebird from 'bluebird';

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'sync'
]);

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');


/*chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, (change) => {
    chrome.storage.sync.get('state', (obj) => {
      const { stateString } = obj;
      const state = JSON.parse(stateString || '{}');
      console.log(state.bookmarks);
      if (state.bookmarks && state.bookmarks.filter(b => b.url === change.url).length) {
        chrome.browserAction.setIcon({ path: '/img/icon-48.png', tabId: info.tabId });
        console.log('matching');
      } else {
        chrome.browserAction.setIcon({ path: '/img/icon-48-plain.png', tabId: info.tabId });
        console.log('not matching');
      }
    });
  });
});*/
