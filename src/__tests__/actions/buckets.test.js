import * as BucketActionTypes from '../../actiontypes/bucket';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import * as actions from '../../actions/buckets';
import {AUTH_TOKEN, BASE_URL} from "../../utilities/Constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
localStorage.setItem(AUTH_TOKEN, "dfbsiljkvdfiv");

describe("Async  Bucket ItemActions", () => {
  beforeEach(() => {
    moxios.install(axios)
  });

  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions()
  });

  it("creates BUCKET_SUCCESS and BUCKET_SEARCH_CLEAR ItemActions when fetching a user's buckets is done", () => {
    const data = {
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

    mockHttpRequest(200, data);

    const expectedActions = [
      {
        type: BucketActionTypes.BUCKET_SUCCESS,
        data,
      },
      {
        type: BucketActionTypes.BUCKET_SEARCH_CLEAR,
        isSearch: false,
        query: '',
      }
    ];

    const url = `${BASE_URL}bucketlists`;

    // const store = mockStore({});

    return store.dispatch(actions.getBuckets(url, true, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates BUCKET_DELETE when an item is deleted', () => {
    const data = {
      "message": "Bucket Deleted successfully",
      "status": "success"
    };

    mockHttpRequest(200, data);

    const expectedActions = {
      type: BucketActionTypes.BUCKET_DELETE,
      index: 1
    };

    // const store = mockStore({});

    return store.dispatch(actions.deleteBucketFromServer(1, 1, true)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions)
    })
  });

  it('creates BUCKET_SEARCH action when a Bucket is searched for', () => {
    const data = {
      "buckets": [
        {
          "createdAt": "2017-11-27T13:26:46.357643",
          "id": 63,
          "modifiedAt": "2017-11-27T13:26:46.357658",
          "name": "kato"
        },
        {
          "createdAt": "2017-11-27T13:28:08.747087",
          "id": 64,
          "modifiedAt": "2017-11-27T13:28:08.747104",
          "name": "kakakakakak"
        },
        {
          "createdAt": "2017-11-24T07:16:20.893122",
          "id": 51,
          "modifiedAt": "2017-11-24T07:16:20.893139",
          "name": "kagga john"
        }
      ],
      "count": 3,
      "next": null,
      "previous": null,
      "status": "success"
    };

    mockHttpRequest(200, data);

    const expectedActions = {
      type: BucketActionTypes.BUCKET_SEARCH,
      data,
      isSearch: true,
      query: 'a',
    };

    // const store = mockStore({});

    return store.dispatch(actions.searchForBucket('a', true)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions)
    })
  });

  it('creates BUCKET_EDIT when a bucket is edited successfully', () => {
    const bucket = {
      "createdAt": "Tue, 05 Sep 2017 17:55:33 GMT",
      "id": 2,
      "modifiedAt": "Tue, 05 Sep 2017 17:55:33 GMT",
      "name": "Cooking",
      "status": "success"
    };

    mockHttpRequest(201, bucket);

    const expectedAction = {
      type: BucketActionTypes.BUCKET_EDIT,
      bucket
    };

    return store.dispatch(actions.editBucketOnServer('travel', 2, true)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction)
    })
  });
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
