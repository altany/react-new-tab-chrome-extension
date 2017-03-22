import React, { Component, PropTypes } from 'react';


export default class Sections extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  renderSections(sections) {
    if (sections.length) {
      return (
        <nav>
          { sections.map((section, index) => <div key={index}>Section {index}: {section.title}</div>) } 
        </nav>
      );
    }
  }

  render() {
    const { sections } = this.props;
    return ( 
      <section className='sidebar'>
        {this.renderSections(sections)}
      </section>
    );
  }
}
