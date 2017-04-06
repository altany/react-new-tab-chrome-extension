import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
  }
)

export default class Popup extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['section', 'bookmark']),
    selected: PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ])
  };

  constructor(props) {
    super(props);
  }

  renderSection() {
    return(
      <div className={style.popup}>
        {this.props.mode} id:{this.props.selected.id}
      </div>
    );
  }

  renderBookmark() {
    return(
      <div className={style.popup}>
        {this.props.mode} id:{this.props.selected.id}
      </div>
    );
  }

  render() {
    console.log(this.props)
    if (!this.props.selected) return null;
    if (this.props.mode==='section') {
      return this.renderSection()
    }
    else if (this.props.mode==='bookmark') {
      return this.renderBookmark()
    }
    return null;
  }
}
