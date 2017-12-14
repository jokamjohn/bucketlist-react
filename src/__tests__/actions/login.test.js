import * as LoginActionTypes from '../../actiontypes/login';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import thunk from 'redux-thunk';
import * as actions from '../../actions/login';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Test Login', () => {
  beforeEach(() => {
    moxios.install(axios)
  });

  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions()
  });

  it('creates LOGIN_REQUEST and LOGIN_SUCCESS', () => {
    const data = {
      "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDM0ODQ5OTYsImlhdCI6MTUwMzM5ODU4Niwic3ViIjo1fQ" +
      ".GC6IEOohdo_xrz9__UeugIlir0qtJdKbEzBtLgqjt5A",
      "message": "Successfully registered",
      "status": "success"
    };

    mockHttpRequest(200, data);

    const expectedActions = [
      {
        type: LoginActionTypes.LOGIN_REQUEST,
        isAuthenticated: false,
      },
      {
        type: LoginActionTypes.LOGIN_SUCCESS,
        isAuthenticated: true,
        idToken: data.auth_token
      }
    ];

    return store.dispatch(actions.loginUser({email: 'hi@gmail.com', password: '123456'}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        });
  });

  it('creates LOGIN_FAILURE', () => {
    const response = {
      data: {
        "message": "User does not exist or password is incorrect",
        "status": "failed"
      }
    };

    mockHttpRequest(401, response);

    const expectedAction = {
      type: LoginActionTypes.LOGIN_REQUEST,
      isAuthenticated: false,
    };
    return store.dispatch(actions.loginUser({email: 'hi@gmail.com', password: '123456'}))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedAction)
        });
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