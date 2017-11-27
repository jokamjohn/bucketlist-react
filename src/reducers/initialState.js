import {AUTH_TOKEN, BUCKETLIST_URL, LOCAL_BUCKET_URL} from "../utilities/Constants";

export default {
  buckets: {
    isFetching: false,
    bucketUrl: localStorage.getItem(LOCAL_BUCKET_URL) || BUCKETLIST_URL,
    buckets: [],
    search: {
      isSearch: false
    }
  },
  items: {
    isFetching: false,
    items: [],
    search: {
      isItemSearch: false
    }
  },
  auth: {
    isFetching: false,
    isAuthenticated: localStorage.getItem(AUTH_TOKEN) ? true : false,
  },
  passwordReset: {
    isFetching: false,
    message: ''
  }
};