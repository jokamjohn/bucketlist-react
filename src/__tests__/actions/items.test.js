import * as ItemActionTypes from '../../actiontypes/items';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import * as actions from '../../actions/items';
import {AUTH_TOKEN, BASE_URL} from "../../utilities/Constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
localStorage.setItem(AUTH_TOKEN, "dfbsiljkvdfiv");

describe('Async Items Actions', () => {
  beforeEach(() => {
    moxios.install(axios)
  });

  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions()
  });

  it('it creates ITEMS_SUCCESS on successfully fetching bucket items', () => {
    const data = {
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

    mockHttpRequest(200, data);

    const expectedAction = {
      type: ItemActionTypes.ITEMS_SUCCESS,
      bucketId: 3,
      items: data.items,
      count: data.count,
      next: data.next,
      previous: data.previous
    };

    const url = `${BASE_URL}bucketlists/3/items`;

    return store.dispatch(actions.getItems(3, url, true, false))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction)
        });
  });

  it('creates ITEMS_DELETION when an item is successfully deleted from a Bucket', () => {
    const data = {
      "message": "Successfully deleted the item from the bucket",
      "status": "success"
    };

    mockHttpRequest(200, data);

    const expectedAction = {
      type: ItemActionTypes.ITEMS_DELETION,
      itemIndex: 0
    };

    return store.dispatch(actions.deleteItem(3, 88, 0, true))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction)
        });
  });

  it('creates ITEMS_EDIT when an item is successfully updated', () => {
    const data = {
      item: {
        "bucketId": 3,
        "createdAt": "2017-09-05T17:55:34.814267",
        "description": "Lorem ipsum",
        "id": 88,
        "modifiedAt": "2017-09-05T17:55:34.814267",
        "name": "Table"
      }
    };

    mockHttpRequest(200, data);

    const expectedAction = {
      type: ItemActionTypes.ITEMS_EDIT,
      item: data.item
    };

    return store.dispatch(actions.editItem(3, 88, 'Tambee', 'sed', true))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction)
        });
  });
//TODO implement item search and add a test for it.
});

/**
 * Function to mock axios http requests.
 * @param status
 * @param response
 */
const mockHttpRequest = (status, response) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status,
      response
    });
  });
};