import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Sections from '../components/Sections';
import Bookmarks from '../components/Bookmarks';
import * as TodoActions from '../actions/todos';
import * as sectionActions from '../actions/sections';
import * as bookmarksActions from '../actions/bookmarks';
import style from './App.css';

@connect(
  state => ({
    bookmarks: state.bookmarks,
    sections: state.sections,
    todos: state.todos
  }),
  dispatch => ({
    todoActions: bindActionCreators(TodoActions, dispatch),
    sectionActions: bindActionCreators(sectionActions, dispatch),
    bookmarksActions: bindActionCreators(bookmarksActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    todos: PropTypes.array.isRequired,
    todoActions: PropTypes.object.isRequired,
    sectionActions: PropTypes.object.isRequired,
    bookmarksActions: PropTypes.object.isRequired
  };

  render() {
    const {
      bookmarks, sections, todos,
      todoActions, sectionActions, bookmarksActions
    } = this.props;

    return (
      <div>
        <Sections sections={sections} actions={sectionActions} />
        <Bookmarks bookmarks={bookmarks} />
        <div className={style.normal}>
          <Header addTodo={todoActions.addTodo} />
          <MainSection todos={todos} actions={todoActions} />
        </div>
      </div>
    );
  }
}
