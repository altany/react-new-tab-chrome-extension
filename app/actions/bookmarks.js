import * as types from '../constants/ActionTypes';

export function addBookmark(title, url, sectionId = null) {
  return { type: types.ADD_BOOKMARK, title, url, sectionId };
}

export function deleteBookmark(id) {
  return { type: types.DELETE_BOOKMARK, id };
}

export function editBookmark(id, title, url, sectionId) {
  return { type: types.EDIT_BOOKMARK, id, title, url, sectionId };
}

export function editBookmarkSection(id, sectionId) {
  return { type: types.EDIT_BOOKMARK_SECTION, id, sectionId };
}