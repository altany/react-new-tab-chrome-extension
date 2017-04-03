import React, { Component, PropTypes } from 'react';
import Img from "react-image-fallback";
import style from '../components/Bookmarks.css';

export default class Favicon extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render () {
    const url = document.createElement('a'); // for the favicon
    url.setAttribute('href', this.props.url);

    return (
      <Img className={style.favicon}
        alt='ico'
        src={`${url.protocol}//${url.host}/favicon.ico`}
        fallbackImage={'img/icon-16.png'}
      />
    );
  }
}