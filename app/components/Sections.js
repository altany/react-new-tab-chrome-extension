import React, { Component, PropTypes } from 'react';
import style from './Sections.css';

export default class Sections extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  renderSections(sections, actions) {
    if (sections.length) {
      return (
        <nav>
          { sections.map((section, index) =>
            <div
              className={section.selected ? style.selected : style.section}
              key={index}
              onClick={actions.selectSection.bind(this, section.id)}
            >{section.title}</div>
          ) }
        </nav>
      );
    }
  }

  render() {
    const { sections, actions } = this.props;
    return (
      <section className={style.sidebar}>
        {this.renderSections(sections, actions)}
      </section>
    );
  }
}
