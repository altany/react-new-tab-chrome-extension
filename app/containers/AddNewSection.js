import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {addSection} from '../actions/sections';
import style from './../components/Sections.css';


@connect(
  null,
  dispatch => ({
    addSection: bindActionCreators(addSection, dispatch)
  })
)

export default class AddNewSection extends Component {
  static propTypes = {
    addSection: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      open: false,
      section: ''
    };
  }

  renderAddNew() {
    if (this.state.open) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='section'
            value={this.state.section}
            onChange={this.handleChange}
            placeholder='New section name'
          />
          <input type='submit' value='Add' onClick={addSection} />
          <input type='button' value='Cancel' onClick={this.onClose} />
        </form>
      );
    }
    else {
      return (
        <a href='#' onClick={this.onOpen}>+ New</a>
      );
    }

  }

  handleChange(event) {
    this.setState({section: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addSection(this.state.section);
    this.setState({
      open: false,
      section: ''
    })
  }

  onOpen(e) {
    this.setState({open: true});
  }

  onClose(e) {
    this.setState({open: false});
  }

  render() {
    return (
      <div className={style.addNew}>
        {this.renderAddNew()}
      </div>
    );
  }
}
