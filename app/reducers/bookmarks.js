import * as ActionTypes from '../constants/ActionTypes';

const actionsMap = {
  [ActionTypes.ADD_BOOKMARK](state, action) {
    return [{
      id: state.reduce((maxId, bookmark) => Math.max(bookmark.id, maxId), -1) + 1,
      title: action.title,
      url: action.url,
      sectionId: action.sectionId || null
    }, ...state];
  },
  [ActionTypes.DELETE_BOOKMARK](state, action) {
    return state.filter(bookmark =>
      bookmark.id !== action.id
    );
  },
  [ActionTypes.EDIT_BOOKMARK](state, action) {
    return state.map(bookmark =>
      (bookmark.id === action.id ?
        Object.assign({}, bookmark, {
          title: action.title || bookmark.title,
          url: action.url || bookmark.url,
          sectionId: action.sectionId || bookmark.sectionId
        }) :
        bookmark)
    );
  },
  [ActionTypes.EDIT_BOOKMARK_SECTION](state, action) {
  return state.map(bookmark =>
    (bookmark.id === action.id ?
      Object.assign({}, bookmark, {
        sectionId: action.sectionId
      }) :
      bookmark)
  );
}
};

export default function bookmarks(state = [], action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
