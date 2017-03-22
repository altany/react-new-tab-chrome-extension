import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Sections from '../components/Sections';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
  state => ({
    bookmarks: state.bookmarks,
    sections: state.sections,
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { bookmarks, sections, todos, actions } = this.props;

    return (
      <div>
        <Sections sections={sections} />

        <div className={style.normal}>
          <Header addTodo={actions.addTodo} />
          <MainSection todos={todos} actions={actions} />
        </div>
      </div>
    );
  }
}
