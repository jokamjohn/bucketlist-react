import * as LoginActionTypes from '../actiontypes/login'
import initialState from "./initialState";

export default function (state = initialState.passwordReset, action) {
  switch (action.type) {
    case LoginActionTypes.PASSWORD_RESET:
      return {
        ...state,
        message: action.message
      };

    default:
      return state;
  }
}