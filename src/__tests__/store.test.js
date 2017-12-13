import {createStore} from 'redux';
import * as actions from '../actions/items';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';

const store = createStore(rootReducer, initialState.items);

describe('Test item section of the Store', () => {
  it('items creation', () => {
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
      "status": "success"
    };

    store.dispatch(actions.receiveItems(3, items));

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

    store.dispatch(actions.updateItem(itemToUpdate));

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
    store.dispatch(actions.removeItem(0));

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

// TODO add tests for other store reducers.