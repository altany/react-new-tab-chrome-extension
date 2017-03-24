import React, { Component, PropTypes } from 'react';
import style from './Sections.css';
import SectionItem from './SectionItem';

export default class Sections extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    selected: PropTypes.number,
    totalBookmarks: PropTypes.number
  };

  renderSections() {
    const { sections, actions, selected = null, totalBookmarks = 0 } = this.props;
    if (!sections.length) return null;
    return (
      <nav>
        <div
          className={selected === null ? style.selected : style.section}
          onClick={actions.viewAll}
        >All ({totalBookmarks})</div>
        { sections.map((section, index) =>
          <SectionItem section={section} key={index} onItemClick={actions.selectSection} />
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
