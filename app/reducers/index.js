import { combineReducers } from 'redux';
import todos from './todos';
import bookmarks from './bookmarks';
import sections from './sections';

export default combineReducers({
  todos,
  bookmarks,
  sections
});
