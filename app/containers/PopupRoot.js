import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBookmark } from '../actions/bookmarks';

@connect(
  state => ({
    bookmarks: state.bookmarks
  }),
  dispatch => ({
    addBookmark: bindActionCreators(addBookmark, dispatch)
  })
)

export default class PopupRoot extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    bookmarks: PropTypes.array,
    section: PropTypes.object,
    onItemClick: PropTypes.func,
    addBookmark: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: ''
    };
    const that = this;
    chrome.tabs.getSelected(null, (tab) => { // the current tab info
      console.log(tab);
      that.setState({
        title: tab.title,
        url: tab.url,
        bookmarkExists: props.bookmarks.filter(b => b.url === tab.url).length
      });
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    const { store } = this.props;
    const { title, url, bookmarkExists } = this.state;
    if (bookmarkExists) {
      return (
        <div>Bookmark already exists</div>
      );
    } else if (title.length && url.length) {
      return (
        <Provider store={store}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input type='text' name='title' value={title} onChange={this.handleChange} />
            </label>
            <label>
              Url:
              <input type='text' name='url' value={url} onChange={this.handleChange} />
            </label>
            <input type='submit' value='Add Bookmark' />
          </form>
        </Provider>
      );
    }
    return null;
  }
}
