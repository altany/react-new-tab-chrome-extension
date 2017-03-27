import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import style from './../components/Sections.css';

const SectionTarget = {
  drop(props, monitor) {
    //props.onDrop(monitor.getItem());
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
    //onDrop: PropTypes.func.isRequired,
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

  onClick() {
    this.props.onItemClick(this.props.section.id);
  }

  render() {
    const { section, accepts, canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = 'white';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div
        style={{ backgroundColor }}
        className={section.selected ? style.selected : style.section}
        onClick={this.onClick}
      >
        {section.title} ({section.count})
      </div>
    );
  }
}
