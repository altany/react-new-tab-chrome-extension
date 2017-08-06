import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import styled from 'styled-components';
import Favicon from '../components/Favicon';
import {editBookmarkSection} from '../actions/bookmarks';
import {openPopup} from '../actions/popup';

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
    editBookmarkSection: bindActionCreators(editBookmarkSection, dispatch),
    openPopup: bindActionCreators(openPopup, dispatch)
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
    isDragging: PropTypes.bool.isRequired,
    openPopup: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onMenu = this.onMenu.bind(this);
  }
  onMenu(e) {
    e.preventDefault();
    if (typeof this.props.bookmark.id !== 'undefined') {
      this.props.openPopup(this.props.bookmark.id, 'bookmark');
    }
  }

  render() {
    const { bookmark, isDragging, connectDragSource  } = this.props;
    return (
      connectDragSource(
        <div>
          <StyledBookmarkLink
              opacity = {isDragging ? 0.4 : 1}
              href={bookmark.url}
              onContextMenu={this.onMenu}
          >
            <Favicon url={bookmark.url} />
              {bookmark.title}
          </StyledBookmarkLink>
        </div>
      )
    );
  }
}

const StyledBookmarkLink = styled.a`
  opacity: ${props => props.opacity};
`;