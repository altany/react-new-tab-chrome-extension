import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/sections';

describe('section actions', () => {
  it('addSection should create ADD_SECTION action', () => {
    expect(actions.addSection('Work')).to.eql({
      type: types.ADD_SECTION,
      title: 'Work'
    });
  });

  it('deleteSection should create DELETE_SECTION action', () => {
    expect(actions.deleteSection(0)).to.eql({
      type: types.DELETE_SECTION,
      id: 0
    });
  });

  it('editSection should create EDIT_SECTION action', () => {
    expect(actions.editSection(0, 'Updated section')).to.eql({
      type: types.EDIT_SECTION,
      id: 0,
      title: 'Updated section'
    });
  });

  it('selectSection should create SELECT_SECTION action', () => {
    expect(actions.selectSection(0)).to.eql({
      type: types.SELECT_SECTION,
      id: 0
    });
  });

  it('viewAll should create VIEW_ALL_SECTION action', () => {
    expect(actions.viewAll()).to.eql({
      type: types.VIEW_ALL_SECTION
    });
  });
});
