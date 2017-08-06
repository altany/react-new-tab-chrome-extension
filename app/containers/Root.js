import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';
import App from './App';
import BookmarkApp from './BookmarkApp';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <StyledContainer>
          {/*<App />*/}
          <DragDropContextProvider backend={HTML5Backend}>
            <BookmarkApp />
          </DragDropContextProvider>
        </StyledContainer>
      </Provider>
    );
  }
}

const StyledContainer = styled.div`
  min-height: 100%;
  width: 100%;
  position: absolute;
`;