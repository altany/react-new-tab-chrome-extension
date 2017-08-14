import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    todoActions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    todoActions: PropTypes.object.isRequired
  };

  render() {
    const {
      todos,
      todoActions
    } = this.props;

    return (
      <div className={style.normal}>
        <div>
          <Header addTodo={todoActions.addTodo} />
          <MainSection todos={todos} actions={todoActions} />
        </div>
      </div>
    );
  }
}
