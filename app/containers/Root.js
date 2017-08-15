import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';
// import App from './App';
import PopupRoot from './PopupRoot';
import BookmarkApp from './BookmarkApp';

export default class Root extends Component {

  static propTypes = {
    isPopup: PropTypes.bool
  };

  static defaultProps = {
    isPopup: false
  }

  render() {
    if (this.props.isPopup) {
      return <PopupRoot />;
    }
    return (
      <StyledContainer>
        {/*<App />*/}
        <DragDropContextProvider backend={HTML5Backend}>
          <BookmarkApp />
        </DragDropContextProvider>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  min-height: 100%;
  width: 100%;
  position: absolute;
`;
