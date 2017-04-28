import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PopupWrapper from '../components/PopupWrapper';
import Input from '../components/Input';
import { editBookmark } from '../actions/bookmarks';
import { editSection } from '../actions/sections';
import { closePopup } from '../actions/popup';
//import style from './App.css';

@connect(
  (state) => {
    let selected;
    if (!state.popup.open) selected = false;
    if (state.popup.mode === 'section') {
      selected = state.sections.filter(section =>
        section.id === state.popup.id
      )[0];
    } else if (state.popup.mode === 'bookmark') {
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {};
    if (props.selected) {
      console.log(props.selected);
      this.state.title = props.selected.title;
      if (props.mode === 'bookmark') {
        this.state.url = props.selected.url;
      }
    }

  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.closePopup();
  }

  render() {
    const { mode, selected } = this.props;
    if (!selected) return null;
    return (
      <PopupWrapper>
        {selected.id}
        <form onSubmit={this.handleSubmit}>
          { mode === 'section' &&
            <div>
              <h3>Edit Section</h3>
              <Input
                name='title'
                placeholder='Title'
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </div>
          }
          {mode === 'bookmark' &&
            <div>
              <h3>Edit Bookmark</h3>
              <Input
                name='title'
                placeholder='Title'
                value={this.state.title}
                onChange={this.handleInputChange}
              />
              <Input
                name='url'
                placeholder='url'
                value={this.state.url}
                onChange={this.handleInputChange}
              />
            </div>
          }
          <div>
            <button type='submit' onClick={this.handleSubmit}>Save {mode}</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </form>
      </PopupWrapper>
    );
  }
}
