import *  as RegisterActionTypes from '../actiontypes/register';
import axios from 'axios';
import {REGISTER_URL} from "../utilities/Constants";

export const registerRequest = () => {
  return {
    type: RegisterActionTypes.REGISTER_REQUEST,
    isFetching: true,
    isRegistered: false
  }
};

export const registerSuccess = message => {
  return {
    type: RegisterActionTypes.REGISTER_SUCCESS,
    isFetching: false,
    isRegistered: true,
    message
  }
};

export const registerFailure = message => {
  return {
    type: RegisterActionTypes.REGISTER_FAILURE,
    isRegistered: false,
    isFetching: false,
    message
  }
};

export const registerPasswordConfirmation = message => {
  return {
    type: RegisterActionTypes.REGISTER_PASSWORD_CONFIRMATION,
    isFetching: false,
    isRegistered: false,
    message
  }
};


export const registerUser = credentials => {
  const config = {
    method: 'POST',
    url: REGISTER_URL,
    headers: {'content-type': 'application/json'},
    data: {
      email: `${credentials.email}`,
      password: `${credentials.password}`
    }
  };

  return dispatch => {
    if (credentials.password !== credentials.passwordConfirmation) {
      dispatch(registerPasswordConfirmation("Passwords do not match"));
      return
    }
    dispatch(registerRequest());
    return axios(config)
        .then(response => response.data)
        .then(info => dispatch(registerSuccess(info.message)))
        .catch(error => {
          if (error.response) return dispatch(registerFailure(error.response.message))
        })
  }
};