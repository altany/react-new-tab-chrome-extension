import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PopupWrapper from '../components/PopupWrapper';
import {editBookmark} from '../actions/bookmarks';
import {editSection} from '../actions/sections';
import {closePopup} from '../actions/popup';
import style from './App.css';

@connect(
  (state) => {
    let selected;
    if (!state.popup.open) selected=false;
    if (state.popup.mode==='section') {
      selected = state.sections.filter(section =>
        section.id === state.popup.id
      )[0];
    }
    else if (state.popup.mode==='bookmark') {
      selected = state.bookmarks.filter(bookmark =>
        bookmark.id === state.popup.id
      )[0];
    }
    return {
      mode: state.popup.mode,
      selected
    };
  },
  dispatch => ({
    editBookmark: bindActionCreators(editBookmark, dispatch),
    editSection: bindActionCreators(editSection, dispatch),
    closePopup: bindActionCreators(closePopup, dispatch)
  })
)

export default class Popup extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['section', 'bookmark']),
    selected: PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ]),
    editBookmark: PropTypes.func.isRequired,
    editSection: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.closePopup();
  }

  render() {
    console.log(this.props);
    const { mode, selected, closePopup } = this.props;
    if (!selected) return null;
    return (
      <PopupWrapper>
        <form onSubmit={this.handleSubmit}>
          {mode==='section' &&
            <div>
              <h3>Edit Section '{selected.title}'</h3>
              {mode} id:{selected.id}
            </div>
          }
          {mode==='bookmark' &&
            <div>
              <h3>Edit Bookmark '{selected.title}'</h3>
              {mode} id:{selected.id}
            </div>
          }
          <div>
            <button type='submit'>Save</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </form>
      </PopupWrapper>
    );
  }
}
