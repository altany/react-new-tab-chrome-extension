import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/PopupRoot';
import './todoapp.css';

chrome.storage.sync.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
