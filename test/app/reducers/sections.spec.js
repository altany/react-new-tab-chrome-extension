import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import sections from '../../../app/reducers/sections';

describe('sections reducer', () => {
  it('should handle initial state', () => {
    expect(
      sections(undefined, {})
    ).to.eql([{
      title: 'Work',
      id: 0
    }]);
  });

  it('should handle ADD_SECTION', () => {
    expect(
      sections([], {
        type: types.ADD_SECTION,
        title: 'Work'
      })
    ).to.eql([{
      title: 'Work',
      id: 0
    }]);

    expect(
      sections([{
        title: 'Work',
        id: 0
      }], {
        type: types.ADD_SECTION,
        title: 'One more section'
      })
    ).to.eql([{
      title: 'One more section',
      id: 1
    }, {
      title: 'Work',
      id: 0
    }]);
  });

  it('should handle DELETE_SECTION', () => {
    expect(
      sections([{
        title: 'Work',
        id: 0
      }, {
        title: 'One more section',
        id: 1
      }], {
        type: types.DELETE_SECTION,
        id: 1
      })
    ).to.eql([{
      title: 'Work',
      id: 0
    }]);
  });

  it('should handle EDIT_SECTION', () => {
    expect(
      sections([{
        title: 'Work',
        id: 0
      }, {
        title: 'One more section',
        id: 1
      }], {
        type: types.EDIT_SECTION,
        title: 'Edit the section',
        id: 1
      })
    ).to.eql([{
      title: 'Work',
      id: 0
    }, {
      title: 'Edit the section',
      id: 1
    }]);
  });
});
