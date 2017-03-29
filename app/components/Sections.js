import React, { Component, PropTypes } from 'react';
import style from './Sections.css';
import SectionItem from './../containers/SectionItem';

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
        <SectionItem
          key={-1}
          section={{
            title:'All',
            count: totalBookmarks,
            selected: selected === null
          }}
          className={selected === null ? style.selected : style.section}
          onItemClick={actions.viewAll}
          accepts={['bookmark']}
        />
        { sections.map((section, index) =>
          <SectionItem
            section={section}
            key={index}
            onItemClick={actions.selectSection}
            accepts={['bookmark']}
            //onDrop={ actions.selectSection}
          />
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
