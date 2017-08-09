import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { closePopup } from '../actions/popup';

@connect(
  null,
  dispatch => ({
    closePopup: bindActionCreators(closePopup, dispatch)
  })
)

export default class PopupWrapper extends Component {

  static propTypes = {
    className: PropTypes.string,
    closePopup: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside);
  }

  onClickOutside(e) {
    if (this.node && !this.node.contains(e.target)) {
      this.props.closePopup();
    }
  }
  render() {
    return (
      <StyledPopup
        className={this.props.className}
        innerRef={(node) => { this.node = node; }} // innerRef for styled-component
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
