import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SectionItem from '../containers/SectionItem';
import AddNewSection from '../containers/AddNewSection';

export default class Sections extends Component {

  static propTypes = {
    sections: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    selected: PropTypes.number,
    totalBookmarks: PropTypes.number
  };

  renderSections() {
    const { sections, actions, selected = null, totalBookmarks } = this.props;
    if (!sections.length) return null;
    return (
      <nav>
        <StyledSectionItem
          key={-2}
          section={{
            title: 'All',
            count: totalBookmarks,
            selected: selected === null
          }}
          selected
          onItemClick={actions.viewAll}
          accepts={['bookmark']}
        />
        { sections.map((section, index) =>
          <SectionItem
            section={section}
            key={index}
            onItemClick={
              section.selected ?
              actions.viewAll :
              actions.selectSection.bind(this, section.id)
          }
            accepts={['bookmark']}
          />
        ) }
      </nav>
    );
  }

  render() {
    return (
      <StyledSidebar>
        {this.renderSections()}
        <AddNewSection />
      </StyledSidebar>
    );
  }
}

const StyledSectionItem = styled(SectionItem)`
  cursor: pointer;
  margin: 5px 10px;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
`;

const StyledSidebar = styled.aside`
  min-width: 200px;
  position: fixed;
  height: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;
