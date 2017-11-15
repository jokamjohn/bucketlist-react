export const BASE_URL = "http://kbucket-api.herokuapp.com/";
export const LOGIN_URL = BASE_URL + "auth/login";
export const LOGOUT_URL = BASE_URL + "auth/logout";
export const REGISTER_URL = BASE_URL + "auth/register";
export const AUTH_TOKEN = "auth_token";
export const USER_EMAIL = "user_email";
export const LOCAL_BUCKET_URL = "bucket_url";

export const BUCKETLIST_URL = BASE_URL + "bucketlists/";
export const BUCKETLIST_SEARCH_URL = BASE_URL + "bucketlists/?q=";
export const BUCKETLIST_POST_URL = BASE_URL + "bucketlists/";
export const NUMBER_OF_ITEMS_PER_PAGE_FROM_API = 4;

export const PASSWORD_RESET_URL = "http://kbucket-api.herokuapp.com/auth/reset/password";

export const MINIMUM_PASSWORD_LENGTH = 4;

export const RESPONSE_OK = 200;