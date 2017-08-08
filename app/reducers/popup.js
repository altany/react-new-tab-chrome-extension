import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  open: false,
  top: 0,
  left: 0
};

const actionsMap = {
  [ActionTypes.OPEN_POPUP](state, action) {
    return {
      open: true,
      mode: action.mode,
      id: action.id,
      top: action.top,
      left: action.left
    };
  },
  [ActionTypes.CLOSE_POPUP]() {
    return {
      open: false
    };
  }
};

export default function popup(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
