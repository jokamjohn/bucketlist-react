import * as RegisterActionTypes from '../actiontypes/register';
import * as LoginActionTypes from '../actiontypes/login'
import * as LogoutActionTypes from '../actiontypes/logout';
import {AUTH_TOKEN} from "../utilities/Constants";

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem(AUTH_TOKEN) ? true : false,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistered: action.isRegistered,
        message: action.message
      };

    case RegisterActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistered: action.isRegistered,
      };

    case RegisterActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistered: action.isRegistered,
        message: action.message
      };

    case RegisterActionTypes.REGISTER_PASSWORD_CONFIRMATION:
      return {
        ...state,
        isFetching: action.isFetching,
        isRegistered: action.isRegistered,
        message: action.message
      };

    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        idToken: action.idToken
      };

    case LoginActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      };

    case LoginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    case LogoutActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    case LogoutActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated
      };

    case LogoutActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    default:
      return state;
  }
}