import React, { Component, PropTypes } from 'react';
import style from './Sections.css';

export default class SectionItem extends Component {
  static propTypes = {
    onItemClick: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onItemClick(this.props.section.id);
  }

  render() {
    const { section } = this.props;
    return (
      <div
        className={section.selected ? style.selected : style.section}
        onClick={this.onClick}
      >
        {section.title} ({section.count})
      </div>
    );
  }
}
