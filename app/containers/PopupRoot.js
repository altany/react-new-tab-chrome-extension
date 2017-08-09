import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBookmark, deleteBookmark } from '../actions/bookmarks';
import { StyledInput, StyledButton } from '../components/Styled';

@connect(
  state => ({
    bookmarks: state.bookmarks
  }),
  dispatch => ({
    addBookmark: bindActionCreators(addBookmark, dispatch),
    deleteBookmark: bindActionCreators(deleteBookmark, dispatch)
  })
)

export default class PopupRoot extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    bookmarks: PropTypes.array,
    section: PropTypes.object,
    onItemClick: PropTypes.func,
    addBookmark: PropTypes.func,
    deleteBookmark: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    const that = this;
    chrome.tabs.getSelected(null, (tab) => { // the current tab info
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
    this.props.addBookmark(this.state.title, this.state.url);
  }

  handleDelete() {
    this.props.deleteBookmark(this.state.savedBookmark[0].id);
  }

  render() {
    const { store } = this.props;
    const { title, url, savedBookmark } = this.state;
    if (savedBookmark && savedBookmark.length) {
      return (
        <div>
          <span>Bookmark already exists</span>
          <StyledButton onClick={this.handleDelete}>Remove</StyledButton>
        </div>
      );
    } else if (title.length && url.length) {
      return (
        <Provider store={store}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <StyledInput
                name='title'
                value={title}
                onChange={this.handleChange}
                innerRef={(node) => { this.inputNode = node; }}
              />
            </label>
            <label>
              Url:
              <StyledInput
                name='url'
                value={url}
                onChange={this.handleChange}
              />
            </label>
            <StyledButton type='submit'>Add Bookmark</StyledButton>
          </form>
        </Provider>
      );
    }
    return null;
  }
}
