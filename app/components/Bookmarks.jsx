import React, { Component, PropTypes } from 'react';
import Bookmark from '../containers/Bookmark';
import style from './Bookmarks.css';

export default class Bookmarks extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired
};

  renderBookmarks() {
    const { bookmarks } = this.props;

    if (bookmarks.length) {
      return (
        <nav>
          { bookmarks.map((bookmark, index) =>
            <Bookmark key={index} bookmark={bookmark} />
          )}
        </nav>
      );
    }
  }

  render() {
    return (
      <main className={style.main}>
        {this.renderBookmarks()}
      </main>
    );
  }
}
