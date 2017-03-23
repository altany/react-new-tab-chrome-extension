import React, { Component, PropTypes } from 'react';
import style from './Sections.css';

export default class Sections extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    selected: PropTypes.number
  };

  renderSections() {
    const { sections, actions, selected = null } = this.props;
    if (!sections.length) return null;
    return (
      <nav>
        <div
          className={selected === null ? style.selected : style.section}
          onClick={actions.viewAll}
        >All</div>
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

  render() {
    return (
      <section className={style.sidebar}>
        {this.renderSections()}
      </section>
    );
  }
}
