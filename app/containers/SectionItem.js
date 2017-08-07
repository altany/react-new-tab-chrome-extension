import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import {deleteSection} from '../actions/sections';
import {openPopup} from '../actions/popup';

const SectionTarget = {
  drop(props, monitor) {
    return {
      section: props.section
    };
  }
};

@DropTarget(props => props.accepts, SectionTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))

@connect(
  null,
  dispatch => ({
    deleteSection: bindActionCreators(deleteSection, dispatch),
    openPopup: bindActionCreators(openPopup, dispatch)
  })
)

export default class SectionItem extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired,
    connectDropTarget: PropTypes.func,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    deleteSection: PropTypes.func.isRequired,
    openPopup: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onMenu = this.onMenu.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.onItemClick(this.props.section.id);
  }
  onMenu(e) {
    console.log(this.node.getBoundingClientRect());
    e.preventDefault();
    if (typeof this.props.section.id !== 'undefined') {
      this.props.openPopup(this.props.section.id, 'section');
    }
  }
  onDelete() {
    this.props.deleteSection(this.props.section.id);
  }

  render() {
    const { section, accepts, canDrop, isOver, connectDropTarget } = this.props;

    return connectDropTarget(
      <div ref={node => this.node = node}>
        <StyledSectionItem
          isActive={canDrop && isOver}
          canDrop={canDrop}
          isSelected={section.selected}
          onClick={this.onClick}
          onContextMenu={this.onMenu}
          id={section.id}
        >
          <a href="#">
            {section.title} ({section.count})
          </a>
          <StyledDeleteButton onClick={this.onDelete}>x</StyledDeleteButton>
        </StyledSectionItem>
      </div>
    );
  }
}

const StyledSectionItem = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  background-color: ${props => {
    if (props.isActive) return '#edc2ee';
    else if (props.canDrop) return '#d5ccde';
    else return '#f5f5f5';
  }};
  font-weight: ${props => props.isSelected?'bold':'normal'};
`;

const StyledDeleteButton = styled.span`
  float: right;
  clear: right;
`;