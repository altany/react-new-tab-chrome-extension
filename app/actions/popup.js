import * as types from '../constants/ActionTypes';

export function openPopup(id, mode, top, left) {
  return { type: types.OPEN_POPUP, id, mode, top, left };
}

export function closePopup() {
  return { type: types.CLOSE_POPUP };
}
