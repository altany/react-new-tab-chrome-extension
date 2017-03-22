import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/bookmarks';

describe('bookmark actions', () => {
  it('addBookmark should create ADD_BOOKMARK action', () => {
    expect(actions.addBookmark('Github', 'https://github.com', 0)).to.eql({
      type: types.ADD_BOOKMARK,
      title: 'Github',
      url: 'https://github.com',
      sectionId: 0
    });
  });

  it('deleteBookmark should create DELETE_BOOKMARK action', () => {
    expect(actions.deleteBookmark(0)).to.eql({
      type: types.DELETE_BOOKMARK,
      id: 0
    });
  });

  it('editBookmark should create EDIT_BOOKMARK action', () => {
    expect(actions.editBookmark(0, 'Updated title')).to.eql({
      type: types.EDIT_BOOKMARK,
      id: 0,
      title: 'Updated title',
      sectionId: undefined,
      url: undefined
    });
  });
});
