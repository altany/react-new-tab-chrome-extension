import React, { Component, PropTypes } from 'react';
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
            <a
              href={bookmark.url}
              key={index}
              className={style.link}
            >{bookmark.title}</a>
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
