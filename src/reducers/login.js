import * as LoginActionTypes from '../actiontypes/login'
import {AUTH_TOKEN} from "../utilities/Constants";

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem(AUTH_TOKEN) ? true : false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LoginActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                idToken:action.idToken
            };

        case LoginActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                credentials:action.credentials
            };

        case LoginActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                errorMessage: action.message
            };

        default:
            return state;
    }
}