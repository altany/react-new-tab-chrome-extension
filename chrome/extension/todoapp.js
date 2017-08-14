import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import PopupRoot from '../../app/containers/PopupRoot';
import './todoapp.css';

chrome.storage.sync.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');

  const store = createStore(initialState);

  if (document.querySelector('#root')) {
    ReactDOM.render(
      <Root store={store} />,
      document.querySelector('#root')
    );
  }
  if (document.querySelector('#popupRoot')) {
    ReactDOM.render(
      <PopupRoot store={store} />,
      document.querySelector('#popupRoot')
    );
  }

  window.addEventListener('load', () => {
    const links = document.querySelectorAll('aside nav div, main div a');
    Array.from(links).forEach((link) => {
      link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      }, false);
    });
  });
});
