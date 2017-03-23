import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import BookmarkApp from './BookmarkApp';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <App />
          <BookmarkApp />
        </div>
      </Provider>
    );
  }
}
