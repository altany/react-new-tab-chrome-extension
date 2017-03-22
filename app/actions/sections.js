import * as types from '../constants/ActionTypes';

export function addSection(title) {
  return { type: types.ADD_SECTION, title };
}

export function deleteSection(id) {
  return { type: types.DELETE_SECTION, id };
}

export function editSection(id, title) {
  return { type: types.EDIT_SECTION, id, title };
}
