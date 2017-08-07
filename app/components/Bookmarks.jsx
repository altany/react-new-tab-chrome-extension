import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Bookmark from '../containers/Bookmark';

export default class Bookmarks extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired
};

  renderBookmarks() {
    const { bookmarks } = this.props;

    if (bookmarks.length) {
      return (
        <div>
          { bookmarks.map((bookmark, index) =>
            <Bookmark key={index} bookmark={bookmark} />
          )}
        </div>
      );
    }
  }

  render() {
    return (
      <StyledBookmark>
        {this.renderBookmarks()}
      </StyledBookmark>
    );
  }
}

const StyledBookmark = styled.main`
  margin-left: 200px;
  display: inline-block;
`;