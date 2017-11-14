import * as ItemActionTypes from '../actiontypes/items';
import {AUTH_TOKEN, BUCKETLIST_URL} from "../utilities/Constants";
import axios from "axios";
import {logoutOnTokenExpired} from "./buckets";
import {logoutUser} from "./logout";

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

/**
 * Action to remove a deleted item from the Redux store.
 * @param itemIndex Item index
 * @returns {{type, itemIndex: *}}
 */
export const removeItem = itemIndex => {
  return {
    type: ItemActionTypes.ITEMS_DELETION,
    itemIndex
  }
};

/**
 * Action to update the updated item in the redux store.
 * @param index
 * @param data
 * @returns {{type, index: *, data: *}}
 */
export const updateItem = (index, data) => {
  return {
    type: ItemActionTypes.ITEMS_EDIT,
    index,
    data
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

/**
 * Add an item to a Bucket.
 * @param bucketId Bucket Id
 * @param name Item name
 * @param description Item Description
 * @param isAuthenticated
 * @param callback Function to refresh the items page after successful addition of the item.
 * @returns {function(*=)}
 */
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

/**
 * Delete an Item from the Bucket using an API call to the Backend
 * @param bucketId Bucket Id
 * @param itemId Item Id
 * @param itemIndex Item Index in the state items array.
 * @param isAuthenticated
 * @returns {*}
 */
export const deleteItem = (bucketId, itemId, itemIndex, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (!isAuthenticated) {
    return dispatch => dispatch(logoutUser())
  }

  if (token) {
    config = {
      method: 'DELETE',
      url: `${BUCKETLIST_URL}${bucketId}/items/${itemId}/`,
      headers: {'Authorization': `Bearer ${token}`}
    };
  } else {
    throw "No token saved!!!"
  }

  return dispatch => {
    return axios(config)
        .then(response => dispatch(removeItem(itemIndex)))
        .catch(error => logoutOnTokenExpired(dispatch, error))
  }
};

/**
 * Edit an item in the bucket using the API.
 * @param bucketId Bucket Id
 * @param itemId Item Id
 * @param itemIndex Item index
 * @param name Item name
 * @param description Item description
 * @param isAuthenticated
 * @returns {*}
 */
export const editItem = (bucketId, itemId, itemIndex, name, description = null, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (!isAuthenticated) {
    return dispatch => dispatch(logoutUser())
  }

  if (token) {
    config = {
      method: 'PUT',
      url: `${BUCKETLIST_URL}${bucketId}/items/${itemId}/`,
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

  return dispatch => {
    return axios(config)
        .then(response => dispatch(updateItem(itemIndex, response.data.item)))
        .catch(error => logoutOnTokenExpired(dispatch, error))
  }
};

