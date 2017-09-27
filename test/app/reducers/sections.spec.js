import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import sections from '../../../app/reducers/sections';

describe('sections reducer', () => {
  it('should handle initial state', () => {
    expect(
      sections(undefined, {})
    ).to.eql([{
      title: 'Work',
      id: 0,
      selected: false
    }, {
      title: 'Fun',
      id: 1,
      selected: false
    }, {
      title: 'Shopping',
      id: 2,
      selected: false
    }, {
      title: 'Social',
      id: 3,
      selected: false
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
      selected: false,
      id: 0
    }]);

    expect(
      sections([{
        title: 'Work',
        selected: false,
        id: 0
      }], {
        type: types.ADD_SECTION,
        title: 'One more section'
      })
    ).to.eql([{
      title: 'One more section',
      selected: false,
      id: 1
    }, {
      title: 'Work',
      selected: false,
      id: 0
    }]);
  });

  it('should handle DELETE_SECTION', () => {
    expect(
      sections([{
        title: 'Work',
        selected: true,
        id: 0
      }, {
        title: 'One more section',
        selected: false,
        id: 1
      }], {
        type: types.DELETE_SECTION,
        id: 1
      })
    ).to.eql([{
      title: 'Work',
      selected: true,
      id: 0
    }]);
  });

  it('should handle EDIT_SECTION', () => {
    expect(
      sections([{
        title: 'Work',
        selected: false,
        id: 0
      }, {
        title: 'One more section',
        selected: false,
        id: 1
      }], {
        type: types.EDIT_SECTION,
        title: 'Edit the section',
        id: 1
      })
    ).to.eql([{
      title: 'Work',
      selected: false,
      id: 0
    }, {
      title: 'Edit the section',
      selected: false,
      id: 1
    }]);
  });

  it('should handle SELECT_SECTION', () => {
    expect(
      sections([{
        title: 'Work',
        selected: true,
        id: 0
      }, {
        title: 'One more section',
        selected: false,
        id: 1
      }], {
        type: types.SELECT_SECTION,
        id: 1
      })
    ).to.eql([{
      title: 'Work',
      selected: false,
      id: 0
    }, {
      title: 'One more section',
      selected: true,
      id: 1
    }]);
  });

  it('should handle VIEW_ALL_SECTION', () => {
    expect(
      sections([{
        title: 'Work',
        selected: true,
        id: 0
      }, {
        title: 'One more section',
        selected: false,
        id: 1
      }], {
        type: types.VIEW_ALL_SECTION
      })
    ).to.eql([{
      title: 'Work',
      selected: false,
      id: 0
    }, {
      title: 'One more section',
      selected: false,
      id: 1
    }]);
  });
});
