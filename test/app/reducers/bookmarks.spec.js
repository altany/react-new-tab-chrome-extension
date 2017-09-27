import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import bookmarks from '../../../app/reducers/bookmarks';

describe('bookmarks reducer', () => {
  it('should handle initial state', () => {
    expect(
      bookmarks(undefined, {})
    ).to.eql([]);
  });

  it('should handle ADD_BOOKMARK', () => {
    expect(
      bookmarks([], {
        type: types.ADD_BOOKMARK,
        title: 'Run the tests',
        url: 'www.test.com'
      })
    ).to.eql([{
      title: 'Run the tests',
      url: 'www.test.com',
      sectionId: -1,
      id: 0
    }]);

    expect(
      bookmarks([{
        title: 'Run the tests',
        url: 'www.test.com',
        sectionId: 1,
        id: 0
      }], {
        type: types.ADD_BOOKMARK,
        title: 'One more bookmark',
        url: 'www.test2.com'
      })
    ).to.eql([{
      title: 'One more bookmark',
      url: 'www.test2.com',
      sectionId: -1,
      id: 1
    }, {
      title: 'Run the tests',
      url: 'www.test.com',
      sectionId: 1,
      id: 0
    }]);

    expect(
      bookmarks([{
        title: 'Run the tests',
        url: 'www.test.com',
        sectionId: 1,
        id: 0
      }, {
        title: 'Fix the tests',
        url: 'www.test.com',
        sectionId: -1,
        id: 1
      }], {
        type: types.ADD_BOOKMARK,
        title: 'Re-run the tests',
        url: 'www.test.com',
        sectionId: 3
      })
    ).to.eql([{
      title: 'Re-run the tests',
      url: 'www.test.com',
      sectionId: 3,
      id: 2
    }, {
      title: 'Run the tests',
      url: 'www.test.com',
      sectionId: 1,
      id: 0
    }, {
      title: 'Fix the tests',
      url: 'www.test.com',
      sectionId: -1,
      id: 1
    }]);
  });

  it('should handle DELETE_BOOKMARK', () => {
    expect(
      bookmarks([{
        title: 'Run the tests',
        url: 'www.test.com',
        sectionId: 1,
        id: 0
      }, {
        title: 'Fix the tests',
        url: 'www.test.com',
        sectionId: null,
        id: 1
      }], {
        type: types.DELETE_BOOKMARK,
        id: 1
      })
    ).to.eql([{
      title: 'Run the tests',
      url: 'www.test.com',
      sectionId: 1,
      id: 0
    }]);
  });

  it('should handle EDIT_BOOKMARK', () => {
    expect(
      bookmarks([{
        title: 'Run the tests',
        url: 'www.test.com',
        sectionId: 1,
        id: 0
      }, {
        title: 'Fixt the tests',
        url: 'www.test.com',
        sectionId: null,
        id: 1
      }], {
        type: types.EDIT_BOOKMARK,
        title: 'Fix the tests',
        id: 1
      })
    ).to.eql([{
      title: 'Run the tests',
      url: 'www.test.com',
      sectionId: 1,
      id: 0
    }, {
      title: 'Fix the tests',
      url: 'www.test.com',
      sectionId: null,
      id: 1
    }]);
  });
});
