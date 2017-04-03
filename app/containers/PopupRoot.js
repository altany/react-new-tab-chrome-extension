import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addBookmark} from '../actions/bookmarks';

@connect(
  null,
  dispatch => ({
    addBookmark: bindActionCreators(addBookmark, dispatch)
  })
)

export default class PopupRoot extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {title: '', url: ''};
    let _this = this;
    chrome.tabs.getSelected(null, function(tab) { // the current tab info
      console.log(tab);
      _this.setState({title: tab.title, url: tab.url});
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addBookmark(this.state.title, this.state.url);
  }

  onClick() {
    this.props.onItemClick(this.props.section.id);
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            Url:
            <input type='text' name='url' value={this.state.url} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Add Bookmark' onClick={addBookmark} />
        </form>
      </Provider>
    );
  }
}
