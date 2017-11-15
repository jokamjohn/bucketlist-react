import {AUTH_TOKEN, PASSWORD_RESET_URL} from "../utilities/Constants";
import {clearLocalStorage} from "./logout";
import {TokenException} from "../utilities/Utils";
import axios from 'axios';
import {PASSWORD_RESET} from "../actiontypes/login";

/**
 * Action to change state after a password reset.
 * @param message
 * @returns {{type, message: *}}
 */
export const passwordReset = message => {
  return {
    type: PASSWORD_RESET,
    message
  }
};

/**
 * Reset the user password.
 * @param oldPassword Old Password
 * @param newPassword New Password
 * @param passwordConfirmation New Password
 * @param isAuthenticated
 * @returns {*}
 */
export const resetPassword = (oldPassword, newPassword, passwordConfirmation, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (!isAuthenticated) {
    return clearLocalStorage();
  }

  if (token) {
    config = {
      method: 'POST',
      url: PASSWORD_RESET_URL,
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
        passwordConfirmation: passwordConfirmation
      },
      headers: {
        'Authorization': `Bearer ${token}`,
        "content-type": "application/json"
      }
    };
  } else {
    throw new TokenException()
  }

  return dispatch => {
    return axios(config)
        .then(response => dispatch(passwordReset(response.data.message)))
        .catch(error => {
          if (error.response) return dispatch(passwordReset(error.response.data.message))
        });
  }
};