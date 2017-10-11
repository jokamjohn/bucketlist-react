import * as LogoutActionTypes from '../actiontypes/logout';
import {AUTH_TOKEN, LOCAL_BUCKET_URL, LOGOUT_URL, USER_EMAIL} from "../utilities/Constants";
import axios from 'axios';

export const requestLogout = () => {
  return {
    type: LogoutActionTypes.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
};

export const receiveLogout = (message) => {
  return {
    type: LogoutActionTypes.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    message
  }
};

export const logoutError = (message) => {
  return {
    type: LogoutActionTypes.LOGOUT_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
};

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
          console.log('response ', response);
          return response.data
        })
        .then(info => {
          dispatch(receiveLogout(info.message));
          localStorage.removeItem(AUTH_TOKEN);
          localStorage.removeItem(USER_EMAIL);
          localStorage.removeItem(LOCAL_BUCKET_URL);
        })
        .catch(error => {
          if (error.response) {
            dispatch(logoutError(error.response.message))
          }
        })
  }

};