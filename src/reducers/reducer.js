import * as LoginActionTypes from '../actiontypes/login'
import * as LogoutActionTypes from '../actiontypes/logout';
import * as RegisterActionTypes from '../actiontypes/register';
import {AUTH_TOKEN, BUCKETLIST_URL, LOCAL_BUCKET_URL} from "../utilities/Constants";
import * as BucketActionTypes from "../actiontypes/bucket";
import * as ItemActionTypes from '../actiontypes/items';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem(AUTH_TOKEN) ? true : false,
  bucketUrl: localStorage.getItem(LOCAL_BUCKET_URL) || BUCKETLIST_URL,
  buckets: {
    buckets: [],
    search: {
      isSearch: false
    }
  },
  items: {
    items: [],
    search: {
      isItemSearch: false
    }
  },
  passwordReset: {
    message: ''
  }
};


export default function (state = initialState, action) {
  switch (action.type) {
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
        credentials: action.credentials
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

    case BucketActionTypes.BUCKET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        buckets: {
          ...state.buckets,
          buckets: action.data.buckets,
          count: action.data.count,
          next: action.data.next,
          previous: action.data.previous
        }
      };

    case BucketActionTypes.BUCKET_DELETE:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          buckets: [
            ...state.buckets.buckets.slice(0, action.index),
            ...state.buckets.buckets.slice(action.index + 1)
          ]
        }
      };

    case BucketActionTypes.BUCKET_CREATION:
      return {
        ...state,
        buckets: {
          ...state.buckets,
          buckets: [
            ...state.buckets.buckets,
            {
              name: action.name,
              createdAt: action.createdAt,
              modifiedAt: action.modifiedAt,
              id: action.id
            }
          ]
        }
      };

    case BucketActionTypes.BUCKET_SEARCH:
      return {
        ...state,
        isFetching: false,
        buckets: {
          buckets: action.data.buckets,
          count: action.data.count,
          next: action.data.next,
          previous: action.data.previous,
          search: {
            isSearch: action.isSearch,
            query: action.query
          }
        }
      };

    case BucketActionTypes.BUCKET_SEARCH_CLEAR:
      return {
        ...state,
        isFetching: false,
        buckets: {
          ...state.buckets,
          search: {
            isSearch: action.isSearch,
            query: action.query
          }
        }
      };

    case BucketActionTypes.BUCKET_EDIT:
      return {
        ...state,
        isFetching: false,
        buckets: {
          ...state.buckets,
          buckets: state.buckets.buckets.map((bucket, index) => index === action.index ? {
            ...bucket,
            name: action.name,
            modifiedAt: action.modifiedAt
          } : bucket)
        }
      };

    case ItemActionTypes.ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          items: action.items,
          count: action.count,
          next: action.next,
          previous: action.previous
        }
      };

    case ItemActionTypes.ITEMS_DELETION:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          items: [
            ...state.items.items.slice(0, action.itemIndex),
            ...state.items.items.slice(action.itemIndex + 1)
          ]
        }
      };

    case ItemActionTypes.ITEMS_EDIT:
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.buckets,
          items: state.items.items.map((item, index) => index === action.index ? {
            ...item,
            name: action.data.name,
            description: action.data.description,
            modifiedAt: action.data.modifiedAt
          } : item)
        }
      };

    case ItemActionTypes.ITEMS_SEARCH:
      return {
        ...state,
        isFetching: false,
        items: {
          items: action.data.items,
          count: action.data.count,
          next: action.data.next,
          previous: action.data.previous,
          search: {
            isItemSearch: action.isSearch
          }
        }
      };

    case LoginActionTypes.PASSWORD_RESET:
      return {
        ...state,
        isFetching: false,
        passwordReset: {
          message: action.message
        }
      };

    default:
      return state;
  }
}