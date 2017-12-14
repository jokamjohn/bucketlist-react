import {createStore} from 'redux';
import * as ItemActions from '../../actions/items';
import * as BucketActions from '../../actions/buckets';
import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';
import * as LoginActionTypes from "../../actiontypes/login";

describe('Test item section of the Store', () => {
  const store = createStore(rootReducer, initialState.items);
  it('items fetching', () => {
    const items = {
      "count": 9,
      "items": [
        {
          "bucketId": 3,
          "createdAt": "2017-09-05T17:55:34.814267",
          "description": "sed",
          "id": 88,
          "modifiedAt": "2017-09-05T17:55:34.814267",
          "name": "Tambee"
        },
        {
          "bucketId": 3,
          "createdAt": "2017-09-05T17:55:35.768740",
          "description": "maecenas",
          "id": 166,
          "modifiedAt": "2017-09-05T17:55:35.768740",
          "name": "Cogilith"
        }
      ],
      "next": "http://127.0.0.1:5000/bucketlists/3/items/?page=2",
      "previous": null,
      "status": "success",
    };

    store.dispatch(ItemActions.receiveItems(3, items));

    const actual = store.getState().items;

    const expected = {
      items: [
        {
          "bucketId": 3,
          "createdAt": "2017-09-05T17:55:34.814267",
          "description": "sed",
          "id": 88,
          "modifiedAt": "2017-09-05T17:55:34.814267",
          "name": "Tambee"
        },
        {
          "bucketId": 3,
          "createdAt": "2017-09-05T17:55:35.768740",
          "description": "maecenas",
          "id": 166,
          "modifiedAt": "2017-09-05T17:55:35.768740",
          "name": "Cogilith"
        }
      ],
      count: 9,
      next: "http://127.0.0.1:5000/bucketlists/3/items/?page=2",
      previous: null
    };
    expect(actual).toEqual(expected);
  });

  it('item update', () => {
    const itemToUpdate = {
      "bucketId": 3,
      "createdAt": "2017-09-05T17:55:35.768740",
      "description": "Lorem ipsum",
      "id": 166,
      "modifiedAt": "2017-09-05T17:55:35.768740",
      "name": "mangoes"
    };

    store.dispatch(ItemActions.updateItem(itemToUpdate));

    const actual = store.getState().items;

    const expected = {
      items: [
        {
          "bucketId": 3,
          "createdAt": "2017-09-05T17:55:34.814267",
          "description": "sed",
          "id": 88,
          "modifiedAt": "2017-09-05T17:55:34.814267",
          "name": "Tambee"
        },
        {
          "bucketId": 3,
          "createdAt": "2017-09-05T17:55:35.768740",
          "description": "Lorem ipsum",
          "id": 166,
          "modifiedAt": "2017-09-05T17:55:35.768740",
          "name": "mangoes"
        }
      ],
      count: 9,
      next: "http://127.0.0.1:5000/bucketlists/3/items/?page=2",
      previous: null
    };
    expect(actual).toEqual(expected);
  });

  it('item deletion', () => {
    store.dispatch(ItemActions.removeItem(0));

    const actual = store.getState().items;

    const expected = {
      items: [
        {
          "bucketId": 3,
          "createdAt": "2017-09-05T17:55:35.768740",
          "description": "Lorem ipsum",
          "id": 166,
          "modifiedAt": "2017-09-05T17:55:35.768740",
          "name": "mangoes"
        }
      ],
      count: 9,
      next: "http://127.0.0.1:5000/bucketlists/3/items/?page=2",
      previous: null
    };
    expect(actual).toEqual(expected);
  });
  //TODO Add a test for search
});

describe('Test buckets section of the store', () => {
  const store = createStore(rootReducer, initialState);
  it('bucket fetching', () => {
    const buckets = {
      "buckets": [
        {
          "createdAt": "2017-09-05T17:55:33.120344",
          "id": 2,
          "modifiedAt": "2017-09-05T17:55:33.120344",
          "name": "Property & Casualty Insurance"
        },
        {
          "createdAt": "2017-09-05T17:55:33.127347",
          "id": 3,
          "modifiedAt": "2017-09-05T17:55:33.127347",
          "name": "Technology"
        }
      ],
      "count": 99,
      "next": "http://127.0.0.1:5000/bucketlists/?page=2",
      "previous": null,
      "status": "success"
    };

    store.dispatch(BucketActions.receiveBuckets(buckets));

    const actual = store.getState().buckets;

    const expected = {
      "bucketUrl": "http://kbucket-api.herokuapp.com/v1/bucketlists/",
      "buckets": [
        {
          "createdAt": "2017-09-05T17:55:33.120344",
          "id": 2,
          "modifiedAt": "2017-09-05T17:55:33.120344",
          "name": "Property & Casualty Insurance"
        },
        {
          "createdAt": "2017-09-05T17:55:33.127347",
          "id": 3,
          "modifiedAt": "2017-09-05T17:55:33.127347",
          "name": "Technology"
        }
      ],
      "count": 99,
      "next": "http://127.0.0.1:5000/bucketlists/?page=2",
      "previous": null,
      "search": {
        "isSearch": false
      }
    };
    expect(actual).toEqual(expected);
  });

  it('bucket creation', () => {
    const bucketToCreate = {
      "createdAt": "2017-10-05T17:55:33.127347",
      "id": 4,
      "modifiedAt": "2017-10-05T17:55:33.127347",
      "name": "Nairobi"
    };

    store.dispatch(BucketActions.createBucket(bucketToCreate));

    const actual = store.getState().buckets;

    const expected = {
      "bucketUrl": "http://kbucket-api.herokuapp.com/v1/bucketlists/",
      "buckets": [
        {
          "createdAt": "2017-09-05T17:55:33.120344",
          "id": 2,
          "modifiedAt": "2017-09-05T17:55:33.120344",
          "name": "Property & Casualty Insurance"
        },
        {
          "createdAt": "2017-09-05T17:55:33.127347",
          "id": 3,
          "modifiedAt": "2017-09-05T17:55:33.127347",
          "name": "Technology"
        },
        {
          "createdAt": "2017-10-05T17:55:33.127347",
          "id": 4,
          "modifiedAt": "2017-10-05T17:55:33.127347",
          "name": "Nairobi"
        }
      ],
      "count": 99,
      "next": "http://127.0.0.1:5000/bucketlists/?page=2",
      "previous": null,
      "search": {
        "isSearch": false
      }
    };
    expect(actual).toEqual(expected);
  });

  it('bucket update', () => {
    const bucketToEdit = {
      "createdAt": "2017-10-05T17:55:33.127347",
      "id": 4,
      "modifiedAt": "2017-10-05T17:55:33.127347",
      "name": "Kampala"
    };

    store.dispatch(BucketActions.editBucket(bucketToEdit));

    const actual = store.getState().buckets;

    const expected = {
      "bucketUrl": "http://kbucket-api.herokuapp.com/v1/bucketlists/",
      "buckets": [
        {
          "createdAt": "2017-09-05T17:55:33.120344",
          "id": 2,
          "modifiedAt": "2017-09-05T17:55:33.120344",
          "name": "Property & Casualty Insurance"
        },
        {
          "createdAt": "2017-09-05T17:55:33.127347",
          "id": 3,
          "modifiedAt": "2017-09-05T17:55:33.127347",
          "name": "Technology"
        },
        {
          "createdAt": "2017-10-05T17:55:33.127347",
          "id": 4,
          "modifiedAt": "2017-10-05T17:55:33.127347",
          "name": "Kampala"
        }
      ],
      "count": 99,
      "next": "http://127.0.0.1:5000/bucketlists/?page=2",
      "previous": null,
      "search": {
        "isSearch": false
      }
    };
    expect(actual).toEqual(expected);
  });

  it('bucket search', () => {
    const data = {
      "buckets": [
        {
          "createdAt": "2017-10-05T17:55:33.127347",
          "id": 4,
          "modifiedAt": "2017-10-05T17:55:33.127347",
          "name": "Kampala"
        }
      ],
      "count": 1,
      "next": null,
      "previous": null
    };
    store.dispatch(BucketActions.searchBucket(data, 'kampala', true));

    const actual = store.getState().buckets;

    const expected = {
      "bucketUrl": "http://kbucket-api.herokuapp.com/v1/bucketlists/",
      "buckets": [
        {
          "createdAt": "2017-10-05T17:55:33.127347",
          "id": 4,
          "modifiedAt": "2017-10-05T17:55:33.127347",
          "name": "Kampala"
        }
      ],
      "count": 1,
      "next": null,
      "previous": null,
      "search": {
        "isSearch": true,
        "query": "kampala"
      }
    };
    expect(actual).toEqual(expected);
  });

  it('clear search mode', () => {
    store.dispatch(BucketActions.clearSearchMode());

    const actual = store.getState().buckets;

    const expected = {
      "bucketUrl": "http://kbucket-api.herokuapp.com/v1/bucketlists/",
      "buckets": [
        {
          "createdAt": "2017-10-05T17:55:33.127347",
          "id": 4,
          "modifiedAt": "2017-10-05T17:55:33.127347",
          "name": "Kampala"
        }
      ],
      "count": 1,
      "next": null,
      "previous": null,
      "search": {
        "isSearch": false,
        "query": ""
      }
    };
    expect(actual).toEqual(expected);
  });

  it('dispatch undefined action', () => {
    const action = {
      type: "ACTION_DOES_NOT_EXIST"
    };
    store.dispatch(action);

    const actual = store.getState().buckets;

    const expected = {
      "bucketUrl": "http://kbucket-api.herokuapp.com/v1/bucketlists/",
      "buckets": [
        {
          "createdAt": "2017-10-05T17:55:33.127347",
          "id": 4,
          "modifiedAt": "2017-10-05T17:55:33.127347",
          "name": "Kampala"
        }
      ],
      "count": 1,
      "next": null,
      "previous": null,
      "search": {
        "isSearch": false,
        "query": ""
      }
    };
    expect(actual).toEqual(expected);
  })
});

describe('Test auth/login section of the store', () => {
  const store = createStore(rootReducer, initialState);
  it('login request', () => {
    const action = {
      type: LoginActionTypes.LOGIN_REQUEST,
      isAuthenticated: false,
    };
    store.dispatch(action);

    const actual = store.getState().auth;

    const expected = {
      isAuthenticated: false,
    };
    expect(actual).toEqual(expected);
  });

  it('login success', () => {
    const action = {
      type: LoginActionTypes.LOGIN_SUCCESS,
      isAuthenticated: true,
      idToken: "xxcfdnbvdkflsdcvn"
    };
    store.dispatch(action);

    const actual = store.getState().auth;

    const expected = {
      isAuthenticated: true,
      idToken: "xxcfdnbvdkflsdcvn"
    };
    expect(actual).toEqual(expected);
  });

  it('login failure', () => {
    const action = {
      type: LoginActionTypes.LOGIN_FAILURE,
      isAuthenticated: false,
      message: 'login failure'
    };
    store.dispatch(action);

    const actual = store.getState().auth;

    const expected = {
      isAuthenticated: false,
      message: 'login failure',
      idToken: "xxcfdnbvdkflsdcvn"
    };
    expect(actual).toEqual(expected);
  })
});