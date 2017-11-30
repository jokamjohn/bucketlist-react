import * as RegisterActionTypes from '../actiontypes/register';
import * as LoginActionTypes from '../actiontypes/login'
import * as LogoutActionTypes from '../actiontypes/logout';
import initialState from "./initialState";

export default function (state = initialState.auth, action) {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: action.isRegistered,
      };

    case RegisterActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isRegistered: action.isRegistered,
      };

    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        idToken: action.idToken
      };

    case LoginActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };

    case LoginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    case LogoutActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    case LogoutActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };

    case LogoutActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        message: action.message
      };

    default:
      return state;
  }
}