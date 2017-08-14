import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';
import { openPopup } from '../actions/popup';

const SectionTarget = {
  drop(props/*, monitor*/) {
    return {
      section: props.section
    };
  }
};

@DropTarget(props => props.accepts, SectionTarget, (connectDnd, monitor) => ({
  connectDropTarget: connectDnd.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))

@connect(
  null,
  dispatch => ({
    openPopup: bindActionCreators(openPopup, dispatch)
  })
)

export default class SectionItem extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired,
    connectDropTarget: PropTypes.func,
    //accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    openPopup: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onMenu = this.onMenu.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.onItemClick(this.props.section.id);
  }
  onMenu(e) {
    e.preventDefault();
    const { top, right } = this.node.getBoundingClientRect();
    if (typeof this.props.section.id !== 'undefined') {
      this.props.openPopup(this.props.section.id, 'section', top, right + 10);
    }
  }

  render() {
    const { section/*, accepts*/, canDrop, isOver, connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        <StyledSectionItem
          isActive={canDrop && isOver}
          canDrop={canDrop}
          isSelected={section.selected}
        >
          <span ref={(node) => { this.node = node; }}>
            <span
              onClick={this.onClick}
              onContextMenu={this.onMenu}
              id={section.id}
            >
              {section.title} ({section.count})
            </span>
          </span>
        </StyledSectionItem>
      </div>
    );
  }
}
const StyledSectionItem = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  user-select: none;
  background-color: ${(props) => {
    if (props.isActive) return '#edc2ee';
    else if (props.canDrop) return '#d5ccde';
    return '#f5f5f5';
  }};
  font-weight: ${props => (props.isSelected ? 'bold' : 'normal')};
`;
