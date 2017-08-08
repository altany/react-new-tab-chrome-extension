import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

export default class PopupWrapper extends Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
  };

  render() {
    return (
      <StyledPopup
        className={this.props.className}
        onClick={console.log('TODO: prevent close popup')}
      >
        <div>{this.props.children}</div>
      </StyledPopup>
    );
  }
}

const StyledPopup = styled.div`
  display: block;
  background-color: white;
  position: absolute;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
