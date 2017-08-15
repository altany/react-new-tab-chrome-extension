import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { addBookmark, deleteBookmark } from '../actions/bookmarks';
import { StyledInput, StyledButton, StyledSelect } from '../components/Styled';
import style from '../constants/style';

@connect(
  state => ({
    bookmarks: state.bookmarks,
    sections: state.sections
  }),
  dispatch => ({
    addBookmark: bindActionCreators(addBookmark, dispatch),
    deleteBookmark: bindActionCreators(deleteBookmark, dispatch)
  })
)

export default class PopupRoot extends Component {

  static propTypes = {
    bookmarks: PropTypes.array,
    sections: PropTypes.array,
    section: PropTypes.object,
    onItemClick: PropTypes.func,
    addBookmark: PropTypes.func,
    deleteBookmark: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      selectedSection: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    const that = this;
    chrome.tabs.query({
      active: true,               // Select active tabs
      lastFocusedWindow: true     // In the current window
    }, (t) => {
      const tab = t[0];
      that.setState({
        title: tab.title,
        url: tab.url,
        savedBookmark: this.props.bookmarks.filter(b => b.url === tab.url)
      });
    });
  }

  componentDidUpdate() {
    if (this.inputNode) {
      this.inputNode.focus();
    }
  }

  onClick() {
    this.props.onItemClick(this.props.section.id);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, url, selectedSection } = this.state;
    if (selectedSection === -1) {
      this.props.addBookmark(title, url);
    } else {
      this.props.addBookmark(title, url, parseInt(selectedSection, 10));
    }
    window.close();
  }

  handleDelete() {
    this.props.deleteBookmark(this.state.savedBookmark[0].id);
    window.close();
  }

  render() {
    const { sections } = this.props;
    const { title, url, savedBookmark, selectedSection } = this.state;
    if (savedBookmark && savedBookmark.length) {
      return (
        <div>
          <span>Bookmark already exists</span>
          <StyledButton onClick={this.handleDelete}>Remove</StyledButton>
        </div>
      );
    } else if (title.length && url.length) {
      return (
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledInput
            name='title'
            value={title}
            onChange={this.handleChange}
            innerRef={(node) => { this.inputNode = node; }}
          />
          <StyledInput
            name='url'
            value={url}
            onChange={this.handleChange}
            label='url'
          />
          <StyledSelect
            name='selectedSection'
            value={selectedSection}
            onChange={this.handleChange}
          >
            <option value='-1'>Select folder</option>
            {
              sections.map((section, i) =>
                <option value={section.id} key={i}>{section.title}</option>
              )
            }
          </StyledSelect>
          <StyledButton type='submit'>Add</StyledButton>
        </StyledForm>
      );
    }
    return null;
  }
}

const StyledForm = styled.form`
  background-color: ${style.popupBackgroundColor};
  padding: 5px;
`;
