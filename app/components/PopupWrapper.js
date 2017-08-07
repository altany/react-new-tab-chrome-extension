import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

export default class PopupWrapper extends Component {

  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <StyledPopup className={this.props.className}>
        <div>{this.props.children}</div>
      </StyledPopup>
    );
  }
}

const StyledPopup = styled.div`
  display: block;
  background-color: white;
  position: absolute;
  right: 0;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;