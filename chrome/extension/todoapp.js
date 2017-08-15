import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from '../../app/containers/Root';
import createStore from '../../app/store/configureStore';
import './todoapp.css';

chrome.storage.sync.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');
  const store = createStore(initialState);

  if (document.querySelector('#root')) {
    ReactDOM.render(
      <Provider store={store}>
        <Root isPopup={!!(document.querySelector('#root.popup'))} />
      </Provider>,
      document.querySelector('#root')
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
