import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import styled from 'styled-components';
import Favicon from '../components/Favicon';
import { editBookmarkSection } from '../actions/bookmarks';
import { openPopup } from '../actions/popup';

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

@DragSource('bookmark', bookmarkSource, (connectDnd, monitor) => ({
  connectDragSource: connectDnd.dragSource(),
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
    const { top, right } = this.node.getBoundingClientRect();
    if (typeof this.props.bookmark.id !== 'undefined') {
      this.props.openPopup(this.props.bookmark.id, 'bookmark', top, right + 10);
    }
  }

  render() {
    const { bookmark, isDragging, connectDragSource } = this.props;
    return (
      connectDragSource(
        <div>
          <span ref={(node) => { this.node = node; }}>
            <StyledBookmarkLink>
              <a
                opacity={isDragging ? 0.4 : 1}
                href={bookmark.url}
                onContextMenu={this.onMenu}
              >
                <StyledFavicon url={bookmark.url} />
                <StyledTitle>{bookmark.title}</StyledTitle>
              </a>
            </StyledBookmarkLink>
          </span>
        </div>
      )
    );
  }
}

const StyledBookmarkLink = styled.span`
  opacity: ${props => props.opacity};
`;

const StyledFavicon = styled(Favicon)`
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
`;

const StyledTitle = styled.span`
  display: inline-block;
  vertical-align: middle;
`;
