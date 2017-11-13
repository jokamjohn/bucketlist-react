import * as ItemActionTypes from '../actiontypes/items';
import {AUTH_TOKEN, BUCKETLIST_URL} from "../utilities/Constants";
import axios from "axios";
import {logoutOnTokenExpired} from "./buckets";

/**
 * Action to hold the data successfully returned from the Bucket-Items API
 * @param bucketId Bucket Id
 * @param data Returned Json
 * @returns {{type, bucketId: *, items, count: (int|*), next, previous: *}}
 */
export const receiveItems = (bucketId, data) => {
  return {
    type: ItemActionTypes.ITEMS_SUCCESS,
    bucketId: bucketId,
    items: data.items,
    count: data.count,
    next: data.next,
    previous: data.previous
  }
};

export const clearSearchMode = () => {
  return {
    type: ItemActionTypes.ITEMS_SEARCH_CLEAR,
    isSearch: false,
    query: '',
  }
};

/**
 *
 * @param bucketId Bucket Id
 * @param url Url to fetch Items from.
 * @param isAuthenticated
 * @param isSearchMode Whether its search mode or not.
 * @returns {function(*=)}
 */
export const getItems = (bucketId, url, isAuthenticated, isSearchMode) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'GET',
        url: url,
        headers: {'Authorization': `Bearer ${token}`}
      };
    } else {
      throw "No token saved!!!"
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => response.data)
        .then(data => {
          dispatch(receiveItems(bucketId, data));
          if (!isSearchMode) {
            // localStorage.setItem(, url);
            // dispatch(clearSearchMode())
          }
        })
        .catch(error => {
          logoutOnTokenExpired(dispatch, error);
        })
  }
};

export const createItem = (bucketId, name, description = null, isAuthenticated, callback) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};
  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'POST',
        url: `${BUCKETLIST_URL}${bucketId}/items/`,
        data: {
          name: name,
          description: description
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          "content-type": "application/json"
        }
      };
    } else {
      throw "No token saved!!!"
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => callback())
        .catch(error => {
          logoutOnTokenExpired(dispatch, error);
        })
  }
};

