import * as types from '../constants/ActionTypes';

export function openPopup(id, mode) {
  return { type: types.OPEN_POPUP, id, mode };
}

export function closePopup() {
  return { type: types.CLOSE_POPUP};
}