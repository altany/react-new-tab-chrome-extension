import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(
  (state) => state.popup
)

export default class Popup extends Component {
  static propTypes = {
    open: PropTypes.bool,
    mode: PropTypes.oneOf(['section', 'bookmark']),
    id: PropTypes.number,
    position: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    if (!this.props.open) return null;
    return <div style={{
      display: 'block',
      width: 400,
      height: 200,
      backgroundColor: 'pink',
      position: 'absolute',
      right: 0
    }}>{this.props.mode} id:{this.props.id} </div>;
  }
}
