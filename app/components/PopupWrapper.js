import React, { Component, PropTypes } from 'react';
import style from '../containers/App.css';

export default class PopupWrapper extends Component {


  render() {
    return (
      <div className={style.popup}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
