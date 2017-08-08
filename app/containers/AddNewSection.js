import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addSection } from '../actions/sections';

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
  componentDidUpdate() {
    if (this.sectionInput) {
      this.sectionInput.focus();
    }
  }
  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
  }

  handleChange(event) {
    this.setState({ section: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.section.length) {
      this.props.addSection(this.state.section);
    }
    this.setState({
      open: false,
      section: ''
    });
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
            ref={(c) => { this.sectionInput = c; }}
          />
          <input type='submit' value='Add' onClick={addSection} />
          <input type='button' value='Cancel' onClick={this.onClose} />
        </form>
      );
    }
    return (
      <a href='#' onClick={this.onOpen}>+ New</a>
    );
  }

  render() {
    return (
      <StyledAddSection>
        {this.renderAddNew()}
      </StyledAddSection>
    );
  }
}

const StyledAddSection = styled.div`
  font-weight: bold;
  position: absolute;
  bottom: 0;
`;
