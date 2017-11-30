import *  as RegisterActionTypes from '../actiontypes/register';
import axios from 'axios';
import {REGISTER_URL} from "../utilities/Constants";

export const registerRequest = () => {
  return {
    type: RegisterActionTypes.REGISTER_REQUEST,
    isRegistered: false
  }
};

export const registerSuccess = () => {
  return {
    type: RegisterActionTypes.REGISTER_SUCCESS,
    isRegistered: true,
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
    dispatch(registerRequest());
    return axios(config)
        .then(response => dispatch(registerSuccess()));
  }
};