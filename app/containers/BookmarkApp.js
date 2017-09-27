import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sections from '../components/Sections';
import Bookmarks from '../components/Bookmarks';
import Popup from '../containers/Popup';
import * as sectionActions from '../actions/sections';
import * as bookmarkActions from '../actions/bookmarks';
import { closePopup } from '../actions/popup';

@connect(
  (state) => {
    let selectedSection = state.sections.filter(section => section.selected === true);
    selectedSection = selectedSection.length ? selectedSection[0].id : -1;

    const sections = state.sections.map(section =>
      Object.assign({}, section, {
        count: state.bookmarks.filter(bookmark => bookmark.sectionId === section.id).length
      })
    );

    const bookmarks = selectedSection !== null ?
      state.bookmarks.filter(bookmark => bookmark.sectionId === selectedSection) :
      state.bookmarks;

    return {
      selectedSection,
      bookmarks,
      sections,
      totalBookmarks: state.bookmarks.length
    };
  },
  dispatch => ({
    boundSectionActions: bindActionCreators(sectionActions, dispatch),
    boundBookmarksActions: bindActionCreators(bookmarkActions, dispatch),
    closePopup: bindActionCreators(closePopup, dispatch)
  })
)
export default class BookmarkApp extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    bookmarks: PropTypes.array.isRequired,
    selectedSection: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),
    totalBookmarks: PropTypes.number.isRequired,
    boundSectionActions: PropTypes.object.isRequired,
    closePopup: PropTypes.func.isRequired
  };

  static defaultProps ={
    sections: [],
    bookmarks: [],
    selectedSection: false,
    totalBookmarks: 0
  };

  render() {
    const {
      bookmarks, sections, selectedSection,
      boundSectionActions,
      totalBookmarks
    } = this.props;

    return (
      <div>
        <Sections
          sections={sections}
          selected={selectedSection}
          actions={boundSectionActions}
          totalBookmarks={totalBookmarks}
        />
        <Bookmarks bookmarks={bookmarks} />
        <Popup />
      </div>
    );
  }
}

