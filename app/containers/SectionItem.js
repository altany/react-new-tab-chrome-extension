import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import style from './../components/Sections.css';

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

export default class SectionItem extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.onItemClick(this.props.section.id);
  }

  render() {
    const { section, accepts, canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = '#f5f5f5';
    if (isActive) {
      backgroundColor = '#edc2ee';
    } else if (canDrop) {
      backgroundColor = '#d5ccde';
    }

    return connectDropTarget(
      <div
        style={{ backgroundColor }}
        className={section.selected ? style.selected : style.section}
        onClick={this.onClick}
      >
        <a href="#">
          {section.title} ({section.count})
        </a>
      </div>
    );
  }
}
