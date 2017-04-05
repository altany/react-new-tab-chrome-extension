import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import {deleteSection} from '../actions/sections';
import {openPopup} from '../actions/popup';
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
    connectDropTarget: PropTypes.func.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
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
        onContextMenu={this.onMenu}
        id={section.id}
      >
        <a href="#">
          {section.title} ({section.count})
        </a>
        <span className={style.deleteSection} onClick={this.onDelete}>x</span>
      </div>
    );
  }
}
