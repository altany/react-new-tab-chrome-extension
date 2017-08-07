import * as types from '../constants/ActionTypes';

export function openPopup(id, mode, position) {
  return { type: types.OPEN_POPUP, id, mode, position };
}

export function closePopup() {
  return { type: types.CLOSE_POPUP };
}
