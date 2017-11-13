import * as ItemActionTypes from '../actiontypes/items';
import {AUTH_TOKEN} from "../utilities/Constants";
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
          console.log(data);
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