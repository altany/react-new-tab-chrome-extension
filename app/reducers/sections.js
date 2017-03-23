import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
  title: 'Work',
  id: 0,
  selected: false
}, {
  title: 'Fun',
  id: 1,
  selected: false
}];

const actionsMap = {
  [ActionTypes.ADD_SECTION](state, action) {
    return [{
      id: state.reduce((maxId, section) => Math.max(section.id, maxId), -1) + 1,
      title: action.title,
      selected: false
    }, ...state];
  },
  [ActionTypes.DELETE_SECTION](state, action) {
    return state.filter(section =>
      section.id !== action.id
    );
  },
  [ActionTypes.EDIT_SECTION](state, action) {
    return state.map(section =>
      (section.id === action.id ?
        Object.assign({}, section, {
          title: action.title
        }) :
        section)
    );
  },
  [ActionTypes.SELECT_SECTION](state, action) {
    return state.map(section =>
      Object.assign({}, section, { selected: section.id === action.id })
    );
  },
  [ActionTypes.VIEW_ALL_SECTIONS](state) {
    return state.map(section =>
      Object.assign({}, section, { selected: false })
    );
  }
};

export default function sections(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
