import React, { Component, PropTypes } from 'react';
import style from './Sections.css';

export default class Sections extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  renderSections(sections, select) {
    if (sections.length) {
      return (
        <nav>
          { sections.map((section, index) =>
            <div
              className={section.selected ? 'selected' : ''}
              key={index}
              onClick={select}
            >{section.title}</div>
          ) }
        </nav>
      );
    }
  }

  render() {
    const { sections, select } = this.props;
    return (
      <section className={style.sidebar}>
        {this.renderSections(sections, select)}
      </section>
    );
  }
}
