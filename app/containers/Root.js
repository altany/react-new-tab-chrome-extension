import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import App from './App';
import BookmarkApp from './BookmarkApp';
import style from './App.css';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div className={style.container}>
          <App />
          <DragDropContextProvider backend={HTML5Backend}>
            <BookmarkApp />
          </DragDropContextProvider>
        </div>
      </Provider>
    );
  }
}
