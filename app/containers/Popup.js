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
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    if (!this.props.open) return null;
    return <div>test</div>;
  }
}
