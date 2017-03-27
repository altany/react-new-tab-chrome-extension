import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
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
      console.log( // eslint-disable-line no-alert
        `Dropped ${item.title} (bookmarkId: ${item.id}, sectionId: ${item.sectionId}) into ${dropResult.section.title} (sectionId: ${dropResult.section.id})`
      );
    }
  }
};

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

    return (
      connectDragSource(
        <a
          href={bookmark.url}
          className={style.link}
        >
          <img alt='favicon' src={`${bookmark.url}/favicon.ico`} />
          {bookmark.title}
        </a>
      )
    );
  }
}
