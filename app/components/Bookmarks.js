import React, { Component, PropTypes } from 'react';
import style from './Bookmarks.css';

export default class Bookmarks extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  renderBookmarks(bookmarks) {
    if (bookmarks.length) {
      return (
        <nav>
          { bookmarks.map((bookmark, index) => <div key={index}>Bookmark {index}: {bookmark.title}</div>) } 
        </nav>
      );
    }
  }

  render() {
    const { bookmarks } = this.props;
    return ( 
      <main className={style.main}>
        {this.renderBookmarks(bookmarks)}
      </main>
    );
  }
}
