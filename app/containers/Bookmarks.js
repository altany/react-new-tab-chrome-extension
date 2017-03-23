import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sections from '../components/Sections';
import Bookmarks from '../components/Bookmarks';
import * as sectionActions from '../actions/sections';
import * as bookmarksActions from '../actions/bookmarks';

@connect(
  (state) => {
    let selectedSection = state.sections.filter(section => section.selected === true);
    selectedSection = selectedSection.length ? selectedSection[0].id : null;
    const bookmarks = selectedSection ?
        state.bookmarks.filter(bookmark => bookmark.sectionId === selectedSection) :
        state.bookmarks;
    return {
      selectedSection,
      bookmarks,
      sections: state.sections
    };
  },
  dispatch => ({
    sectionActions: bindActionCreators(sectionActions, dispatch),
    bookmarksActions: bindActionCreators(bookmarksActions, dispatch)
  })
)
export default class BookmarksComponent extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    bookmarks: PropTypes.array.isRequired,
    selectedSection: PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
    ]),
    sectionActions: PropTypes.object.isRequired,
    bookmarksActions: PropTypes.object.isRequired
  };

  render() {
    const {
      bookmarks, sections, selectedSection,
      sectionActions, bookmarksActions
    } = this.props;

    return (
      <div>
        <Sections sections={sections} selected={selectedSection} actions={sectionActions} />
        <Bookmarks bookmarks={bookmarks} />
      </div>
    );
  }
}
