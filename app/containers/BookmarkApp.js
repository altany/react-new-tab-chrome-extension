import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sections from '../components/Sections';
import Bookmarks from '../components/Bookmarks';
import Popup from '../containers/Popup';
import * as sectionActions from '../actions/sections';
import * as bookmarksActions from '../actions/bookmarks';

@connect(
  (state) => {
    let selectedSection = state.sections.filter(section => section.selected === true);
    selectedSection = selectedSection.length ? selectedSection[0].id : null;

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
    sectionActions: bindActionCreators(sectionActions, dispatch),
    bookmarksActions: bindActionCreators(bookmarksActions, dispatch)
  })
)
export default class BookmarkApp extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    bookmarks: PropTypes.array.isRequired,
    selectedSection: PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
    ]),
    totalBookmarks: PropTypes.number.isRequired,
    sectionActions: PropTypes.object.isRequired,
    //bookmarksActions: PropTypes.object.isRequired
  };

  render() {
    const {
      bookmarks, sections, selectedSection,
      sectionActions,
      totalBookmarks
    } = this.props;

    return (
      <div>
          <Sections
            sections={sections}
            selected={selectedSection}
            actions={sectionActions}
            totalBookmarks={totalBookmarks}
          />
          <Bookmarks bookmarks={bookmarks} />
          <Popup />
        </div>
    );
  }
}
