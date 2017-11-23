import * as LogoutActionTypes from '../actiontypes/logout';
import {AUTH_TOKEN, LOCAL_BUCKET_URL, LOGOUT_URL, USER_EMAIL} from "../utilities/Constants";
import axios from 'axios';

/**
 * Action to change state during a user Login request
 * @returns {{type, isFetching: boolean, isAuthenticated: boolean}}
 */
export const requestLogout = () => {
  return {
    type: LogoutActionTypes.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
};

/**
 * Action to change state when a user signs In successfully.
 * @param message Login success message
 * @returns {{type, isFetching: boolean, isAuthenticated: boolean, message: *}}
 */
export const receiveLogout = (message) => {
  return {
    type: LogoutActionTypes.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    message
  }
};

/**
 * Action to change state when a user encounters an error when they are trying to
 * login the application.
 * @param message
 * @returns {{type, isFetching: boolean, isAuthenticated: boolean, message: *}}
 */
export const logoutError = (message) => {
  return {
    type: LogoutActionTypes.LOGOUT_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
};

/**
 * Function to clear the Local storage.
 */
export function clearLocalStorage() {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER_EMAIL);
  localStorage.removeItem(LOCAL_BUCKET_URL);
}

/**
 * Function to log out a user from the application.
 * Also clear local storage.
 * @returns {function(*)}
 */
export const logoutUser = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const config = {
    method: 'POST',
    url: LOGOUT_URL,
    headers: {'content-type': 'application/json', 'Authorization': `Bearer ${token}`}
  };

  return dispatch => {
    dispatch(requestLogout());
    return axios(config)
        .then(response => {
          dispatch(receiveLogout(response.data.message));
          clearLocalStorage();
        })
        .catch(error => {
          clearLocalStorage();
          if (error.response) {
            dispatch(logoutError(error.response.message))
          }
        })
  }
};