import * as LoginActionTypes from '../actiontypes/login';
import {AUTH_TOKEN, LOGIN_URL, USER_EMAIL} from "../utilities/Constants";
import axios from 'axios';

/**
 * Action for when a user is logging In
 * @returns {{type, isAuthenticated: boolean}}
 */
export const requestLogin = () => {
  return {
    type: LoginActionTypes.LOGIN_REQUEST,
    isAuthenticated: false,
  }
};

/**
 * Action for when a user login is successful
 * @param user
 * @returns {{type, isAuthenticated: boolean, idToken: *}}
 */
export const receiveLogin = user => {
  return {
    type: LoginActionTypes.LOGIN_SUCCESS,
    isAuthenticated: true,
    idToken: user.auth_token
  }
};

/**
 * Action for when a login error occurs.
 * @param message
 * @returns {{type, isAuthenticated: boolean, message: *}}
 */
export const loginError = message => {
  return {
    type: LoginActionTypes.LOGIN_FAILURE,
    isAuthenticated: false,
    message
  }
};

/**
 * Logging a user using the K-Bucket API
 * The different actions are dispatched at different points during user login
 * @param credentials
 * @returns {function(*)}
 */
export const loginUser = credentials => {
  const config = {
    method: 'POST',
    url: LOGIN_URL,
    headers: {
      'content-type': 'application/json'
    },
    data: {
      email: `${credentials.email}`,
      password: `${credentials.password}`
    }
  };

  return dispatch => {
    dispatch(requestLogin());
    return axios(config)
        .then(response => {
          const user = response.data;
          localStorage.setItem(AUTH_TOKEN, user.auth_token);
          localStorage.setItem(USER_EMAIL, credentials.email);
          dispatch(receiveLogin(user));
        })
        .catch(error => {
          if (error.response) {
            dispatch(loginError(error.response.data.message))
          }
        })
  }
};

