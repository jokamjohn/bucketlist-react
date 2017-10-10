import * as BucketActionTypes from '../actiontypes/bucket';
import {AUTH_TOKEN, BASE_URL} from "../utilities/Constants";
import axios from 'axios';
import {BUCKETS_REQUEST_URL} from "../actiontypes/bucket";

export const receiveBuckets = data => {
  return {
    type: BucketActionTypes.BUCKET_SUCCESS,
    data: data,
    isFetching: false
  }
};

/**
 * Make an Http request to fetch the user Buckets from the API.
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
        // url: BASE_URL + "bucketlists/",
        url: url,
        headers: {'Authorization': `Bearer ${token}`}
      };
    } else {
      throw "No token saved!!!"
    }
  }

  console.log("config: ", config)

  return dispatch => {
    return axios(config)
        .then(response => response.data)
        .then(data => {
          dispatch(receiveBuckets(data))
        })
        .catch(error => console.log(error))
  }
};