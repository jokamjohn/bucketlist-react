import * as BucketActionTypes from '../actiontypes/bucket';
import {AUTH_TOKEN, BASE_URL, BUCKETLIST_URL, LOCAL_BUCKET_URL, RESPONSE_OK} from "../utilities/Constants";
import axios from 'axios';
import {BUCKETS_REQUEST_URL} from "../actiontypes/bucket";

export const receiveBuckets = data => {
  return {
    type: BucketActionTypes.BUCKET_SUCCESS,
    data: data,
    isFetching: false
  }
};

export const changeBucketUrl = url => {
  return {
    type: BucketActionTypes.BUCKET_CHANGE_URL,
    url: url
  }
};

export const deleteBucket = index => {
  return {
    type: BucketActionTypes.BUCKET_DELETE,
    index: index
  }
};

/**
 * Make an Http request to fetch the user Buckets from the API.
 * @param url Bucket Url
 * @param isAuthenticated
 * @returns {function(*)}
 */
export const getBuckets = (url, isAuthenticated) => {
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
          localStorage.setItem(LOCAL_BUCKET_URL, url);
          dispatch(receiveBuckets(data))
        })
        .catch(error => console.log(error))
  }
};

export const deleteBucketFromServer = (id, index, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'DELETE',
        url: BUCKETLIST_URL + id,
        headers: {'Authorization': `Bearer ${token}`}
      };
    } else {
      throw "No token saved!!!"
    }
  }

  return dispatch => {
    return axios(config)
        .then(response => {
          if (response.status === RESPONSE_OK) {
            dispatch(deleteBucket(index))
          }
        })
        .catch(error => console.log(error))
  }
};