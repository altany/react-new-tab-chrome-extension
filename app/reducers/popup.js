import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  open: false
};

const actionsMap = {
  [ActionTypes.OPEN_POPUP](state, action) {
    return {
      open: true,
      mode: action.mode,
      id: action.id,
      position: action.position
    };
  },
  [ActionTypes.CLOSE_POPUP](state) {
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
