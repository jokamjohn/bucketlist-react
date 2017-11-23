import * as LoginActionTypes from '../actiontypes/login'

const initialState = {
  isFetching: false,
  message: ''
};


export default function (state = initialState, action) {
  switch (action.type) {
    case LoginActionTypes.PASSWORD_RESET:
      return {
        ...state,
        isFetching: false,
        message: action.message
      };

    default:
      return state;
  }
}