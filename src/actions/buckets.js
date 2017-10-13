import * as BucketActionTypes from '../actiontypes/bucket';
import {AUTH_TOKEN, BUCKETLIST_POST_URL, BUCKETLIST_URL, LOCAL_BUCKET_URL, RESPONSE_OK} from "../utilities/Constants";
import axios from 'axios';

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

export const createBucket = bucket => {
  return {
    type: BucketActionTypes.BUCKET_CREATION,
    name: bucket.name,
    createdAt: bucket.createdAt,
    modifiedAt: bucket.modifiedAt,
    id: bucket.id
  }
};

/**
 * Make an Http request to fetch the user Buckets from the API.
 * @param url Bucket Url
 * @param isAuthenticated Boolean
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

export const createBucketOnServer = (name, isAuthenticated) => {
  const token = localStorage.getItem(AUTH_TOKEN) || null;
  let config = {};

  if (isAuthenticated) {
    if (token) {
      config = {
        method: 'POST',
        url: "http://kbucket-api.herokuapp.com/bucketlists/",
        data: {name: name},
        headers: {
          'Authorization': `Bearer ${token}`,
          "content-type": "application/json"
        }
      };
    } else {
      throw "No token saved!!!"
    }
  }

  console.log('config ', config)

  return dispatch => {
    return axios(config)
        .then(response => {
          console.log('response ', response.data);
          dispatch(createBucket(response.data))
        })
        .catch(error => console.log(error.response))
  }
};