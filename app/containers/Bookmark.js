import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import {editBookmarkSection} from '../actions/bookmarks';
import style from '../components/Bookmarks.css';

const bookmarkSource = {
  beginDrag(props) {
    return {
      ...props.bookmark
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // ACTION FOR UPDATING SECTION CAN GO HERE!
    if (dropResult) {
      props.editBookmarkSection(item.id, dropResult.section.id);
      console.log( // eslint-disable-line no-alert
        `Dropped ${item.title} (bookmarkId: ${item.id}, sectionId: ${item.sectionId}) into ${dropResult.section.title} (sectionId: ${dropResult.section.id})`
      );
    }
  }
};

@connect(
  null,
  dispatch => ({
    editBookmarkSection: bindActionCreators(editBookmarkSection, dispatch)
  })
)

@DragSource('bookmark', bookmarkSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class Bookmark extends Component {

  static propTypes = {
    bookmark: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { bookmark, isDragging, connectDragSource  } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const url = document.createElement('a'); // for the favicon
    url.setAttribute('href', bookmark.url);
    return (
      connectDragSource(
        <a
          href={bookmark.url}
          className={style.link}
        >
          <img alt='favicon' src={`${url.protocol}//${url.host}/favicon.ico`} />
          {bookmark.title}
        </a>
      )
    );
  }
}
