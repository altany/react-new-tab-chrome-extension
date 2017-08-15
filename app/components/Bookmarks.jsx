import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  margin-left: 220px;
  position: absolute;
  width: calc(100% - 220px);
  height: 100%;
`;
