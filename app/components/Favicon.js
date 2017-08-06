import React, { Component, PropTypes } from 'react';
import Img from "react-image-fallback";
import styled from 'styled-components';
export default class Favicon extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render () {
    const url = document.createElement('a'); // for the favicon
    url.setAttribute('href', this.props.url);

    return (
      <StyledImg
        alt='ico'
        src={`${url.protocol}//${url.host}/favicon.ico`}
        fallbackImage={'img/icon-16.png'}
      />
    );
  }
}

const StyledImg = styled(Img)`
  width: 16px;
  height: 16px;
`;