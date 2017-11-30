import {AUTH_TOKEN, BUCKETLIST_URL, LOCAL_BUCKET_URL} from "../utilities/Constants";

export default {
  buckets: {
    bucketUrl: localStorage.getItem(LOCAL_BUCKET_URL) || BUCKETLIST_URL,
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
  auth: {
    isAuthenticated: localStorage.getItem(AUTH_TOKEN) ? true : false,
  },
  passwordReset: {
    message: ''
  }
};