import * as BucketActionTypes from '../actiontypes/bucket';
import {
  AUTH_TOKEN, BUCKETLIST_POST_URL, BUCKETLIST_SEARCH_URL, BUCKETLIST_URL, LOCAL_BUCKET_URL,
  RESPONSE_OK
} from "../utilities/Constants";
import axios from 'axios';
import {logoutUser} from "./logout";
import {TokenException} from "../utilities/Utils";

/**
 * Action to add the user Buckets to state.
 * @param data
 * @returns {{type, data: *, isFetching: boolean}}
 */
export const receiveBuckets = data => {
  return {
    type: BucketActionTypes.BUCKET_SUCCESS,
    data,
    isFetching: false
  }
};

/**
 * Action to remove a Bucket from state after it has been
 * deleted form the server.
 * @param index
 * @returns {{type, index: *}}
 */
export const deleteBucket = index => {
  return {
    type: BucketActionTypes.BUCKET_DELETE,
    index
  }
};

/**
 * Action to add a newly created Bucket to state after it has been
 * saved in the database.
 * @param bucket Bucket
 * @returns {{type, name, createdAt: *, modifiedAt: *, id}}
 */
export const createBucket = bucket => {
  return {
    type: BucketActionTypes.BUCKET_CREATION,
    bucket
  }
};

/**
 * Get the Buckets a user has searched for and store them in the data
 * parameter. Also add the name of the Bucket as the search query
 * in state and set the isSearch to true to indicate that a
 * user is currently searching for a bucket.
 * The isSearch is used in the Pagination component to construct
 * the urls.
 * @param data Buckets returned from the API
 * @param query Search query
 * @param isSearch Search mode Boolean
 * @returns {{type, data: *, isSearch: *, query: *, isFetching: boolean}}
 */
export const searchBucket = (data, query, isSearch) => {
  return {
    type: BucketActionTypes.BUCKET_SEARCH,
    data,
    isSearch,
    query,
    isFetching: false
  }
};

/**
 * This action clears the search query in state and also sets the
 * isSearch variable to false. So that when a page loads
 * initially or refreshed the search values/buckets
 * are not fetched but rather all the buckets.
 * @returns {{type, isSearch: boolean, query: string}}
 */
export const clearSearchMode = () => {
  return {
    type: BucketActionTypes.BUCKET_SEARCH_CLEAR,
    isSearch: false,
    query: '',
  }
};

/**
 * This action provides the Bucket updated attributes.
 * @param bucket Bucket
 * @param index Index of the Bucket
 * @returns {{type, id, name, createdAt: *, modifiedAt: *, index: *}}
 */
export const editBucket = (bucket, index) => {
  return {
    type: BucketActionTypes.BUCKET_EDIT,
    bucket,
    index
  }
};

/**
 * Make an Http request to fetch the user Buckets from the API.
 * Save the current URL in local storage so that when the page is refreshed
 * the URL is got from local storage through the state and the page is populated.
 * If the state is in search mode, do not store the url in local storage since
 * we do not want to get searched data when a page is refreshed.
 * @param url Bucket Url
 * @param isAuthenticated Boolean
 * @param isSearchMode Boolean to check if a Bucket is being searched for or not
 * @returns {function(*)}
 */
export const getBuckets = (url, isAuthenticated, isSearchMode) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'GET',
        url,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    } else {
      throw new TokenException()
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => {
          dispatch(receiveBuckets(response.data));
          if (!isSearchMode) {
            localStorage.setItem(LOCAL_BUCKET_URL, url);
            dispatch(clearSearchMode())
          }
        })
        .catch(error => {
          logoutOnTokenExpired(dispatch, error);
        })
  }
};

/**
 * Delete a Bucket from the API database.
 * @param id Bucket Id
 * @param index Bucket Id in the array
 * @param isAuthenticated Boolean to show if a user is authenticated
 * @returns {function(*)}
 */
export const deleteBucketFromServer = (id, index, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'DELETE',
        url: BUCKETLIST_URL + id,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    } else {
      throw new TokenException()
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => dispatch(deleteBucket(index)))
        .catch(error => logoutOnTokenExpired(dispatch, error))
  }
};

/**
 * Create a Bucket on the server using the name provided in the UI.
 * Then update the state with the Bucket information returned by
 * the API
 * @param name Bucket Name
 * @param isAuthenticated User is signed in/not
 * @returns {function(*)}
 */
export const createBucketOnServer = (name, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'POST',
        url: BUCKETLIST_POST_URL,
        data: {name: name},
        headers: {
          'Authorization': `Bearer ${token}`,
          "content-type": "application/json"
        }
      };
    } else {
      throw new TokenException()
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => dispatch(createBucket(response.data)))
        .catch(error => logoutOnTokenExpired(dispatch, error))
  }
};

/**
 * Search for a Bucket(s) using its name.
 * @param query Search query {Bucket Name}
 * @param isAuthenticated User is signed in/not
 * @returns {function(*)}
 */
export const searchForBucket = (query, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'GET',
        url: BUCKETLIST_SEARCH_URL + query,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    } else {
      throw new TokenException()
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => dispatch(searchBucket(response.data, query, true)))
        .catch(error => logoutOnTokenExpired(dispatch, error))
  }
};

/**
 * Function to Edit the Bucket name and save the changes to both
 * the server and state.
 * @param name Bucket Name
 * @param id Bucket Id
 * @param index Bucket Index in the Buckets state array
 * @param isAuthenticated Boolean to determine whether s user is signed in/not.
 * @returns {function(*=)}
 */
export const editBucketOnServer = (name, id, index, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'PUT',
        url: BUCKETLIST_URL + id,
        data: {name: name},
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json"
        }
      };
    } else {
      throw new TokenException()
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => dispatch(editBucket(response.data, index)))
        .catch(error => logoutOnTokenExpired(dispatch, error))
  }
};

/**
 * Function to logout a user/delete local storage variables when a 401 error occurs
 * @param dispatch
 * @param error Http Error
 */
export function logoutOnTokenExpired(dispatch, error) {
  if (error.response) {
    if (error.response.status === 401) {
      dispatch(logoutUser())
    }
  }
}