import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addSection } from '../actions/sections';
import { StyledInput, StyledButton } from '../components/Styled';

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
    if (this.node) {
      this.node.focus();
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
          <StyledInput
            name='section'
            value={this.state.section}
            onChange={this.handleChange}
            placeholder='Type a section name'
            innerRef={(node) => { this.node = node; }}
          />
          <StyledButton type='submit' onClick={addSection}>Add</StyledButton>
          <StyledButton onClick={this.onClose}>Cancel</StyledButton>
        </form>
      );
    }
    return (
      <StyledButton onClick={this.onOpen}>+ New</StyledButton>
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
