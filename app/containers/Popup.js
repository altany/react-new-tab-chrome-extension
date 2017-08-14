import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { StyledInput, StyledButton } from '../components/Styled';
import PopupWrapper from '../components/PopupWrapper';
import { editBookmark, deleteBookmark } from '../actions/bookmarks';
import { editSection, deleteSection } from '../actions/sections';
import { closePopup } from '../actions/popup';
import style from '../constants/style';

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
      top: state.popup.top,
      left: state.popup.left,
      selected
    };
  },
  dispatch => ({
    editBookmark: bindActionCreators(editBookmark, dispatch),
    deleteBookmark: bindActionCreators(deleteBookmark, dispatch),
    editSection: bindActionCreators(editSection, dispatch),
    deleteSection: bindActionCreators(deleteSection, dispatch),
    closePopup: bindActionCreators(closePopup, dispatch)
  })
)

export default class Popup extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['section', 'bookmark']),
    top: PropTypes.number,
    left: PropTypes.number,
    selected: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    editBookmark: PropTypes.func.isRequired,
    deleteBookmark: PropTypes.func.isRequired,
    editSection: PropTypes.func.isRequired,
    deleteSection: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {};
    if (props.selected) {
      this.state.title = props.selected.title;
      if (props.mode === 'bookmark') {
        this.state.url = props.selected.url;
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.selected, nextProps.selected)) {
      this.setState({ title: nextProps.selected.title });
      if (nextProps.mode === 'bookmark') this.setState({ url: nextProps.selected.url });
    }
  }

  componentDidUpdate() {
    if (this.inputNode) {
      this.inputNode.focus();
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id } = this.props.selected;
    const { title, url } = this.state;
    if (this.props.mode === 'bookmark') {
      this.props.editBookmark(id, title, url);
    } else if (this.props.mode === 'section') {
      this.props.editSection(id, title);
    }
    this.props.closePopup();
  }

  deleteEntry() {
    (this.props.mode === 'bookmark')
      ? this.props.deleteBookmark(this.props.selected.id)
      : this.props.deleteSection(this.props.selected.id);
    this.props.closePopup();
  }

  render() {
    const { mode, top, left, selected } = this.props;
    if (!selected) return null;
    return (
      <StyledPopupWrapper
        top={top}
        left={left}
      >
        <form onSubmit={this.handleSubmit}>
          { mode === 'section' &&
            <div>
              <StyledInput
                name='title'
                placeholder='Title'
                value={this.state.title}
                onChange={this.handleInputChange}
                innerRef={(node) => { this.inputNode = node; }}
              />
            </div>
          }
          {mode === 'bookmark' &&
            <div>
              <StyledInput
                name='title'
                placeholder='Title'
                value={this.state.title}
                onChange={this.handleInputChange}
                innerRef={(node) => { this.inputNode = node; }}
              />
              <StyledInput
                name='url'
                placeholder='url'
                value={this.state.url}
                onChange={this.handleInputChange}
              />
            </div>
          }
          <div>
            <StyledButton type='submit'>Save</StyledButton>
            <StyledButton onClick={this.deleteEntry}>Delete</StyledButton>
            <StyledButton onClick={this.props.closePopup}>Cancel</StyledButton>
          </div>
        </form>
      </StyledPopupWrapper>
    );
  }
}

const StyledPopupWrapper = styled(PopupWrapper)`
  border-radius: 5px;
  position: absolute;
  background-color: ${style.popupBackgroundColor};
  top: ${props => props.top}px;  
  left: ${props => props.left}px;  
`;
