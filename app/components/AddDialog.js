import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddDialog extends Component {
  static propTypes = {
    addBookmark: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.addBookmark('test', 'www.test.com');
  }

  render() {
    return (
      <div>
        <input />
        <input />
        <button onClick={this.onClick} >+</button>
      </div>
    );
  }
}
