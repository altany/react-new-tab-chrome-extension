import { combineReducers } from 'redux';
import todos from './todos';
import bookmarks from './bookmarks';
import sections from './sections';
import popup from './popup';

export default combineReducers({
  todos,
  bookmarks,
  sections,
  popup
});
