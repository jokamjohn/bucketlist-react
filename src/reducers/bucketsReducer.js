import {BUCKETLIST_URL, LOCAL_BUCKET_URL} from "../utilities/Constants";
import * as BucketActionTypes from "../actiontypes/bucket";

const initialState = {
  isFetching: false,
  bucketUrl: localStorage.getItem(LOCAL_BUCKET_URL) || BUCKETLIST_URL,
  buckets: [],
  search: {
    isSearch: false
  }
};


export default (state = initialState, action) => {
  switch (action.type) {
    case BucketActionTypes.BUCKET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        buckets: action.data.buckets,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous
      };

    case BucketActionTypes.BUCKET_DELETE:
      return {
        ...state,
        buckets: [
          ...state.buckets.slice(0, action.index),
          ...state.buckets.slice(action.index + 1)
        ]
      };

    case BucketActionTypes.BUCKET_CREATION:
      return {
        ...state,
        buckets: [
          ...state.buckets,
          {
            name: action.name,
            createdAt: action.createdAt,
            modifiedAt: action.modifiedAt,
            id: action.id
          }
        ]
      };

    case BucketActionTypes.BUCKET_SEARCH:
      return {
        ...state,
        isFetching: false,
        buckets: action.data.buckets,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
        search: {
          isSearch: action.isSearch,
          query: action.query
        }
      };

    case BucketActionTypes.BUCKET_SEARCH_CLEAR:
      return {
        ...state,
        isFetching: false,
        search: {
          isSearch: action.isSearch,
          query: action.query
        }
      };

    case BucketActionTypes.BUCKET_EDIT:
      return {
        ...state,
        isFetching: false,
        buckets: state.buckets.map((bucket, index) => index === action.index
            ?
            {
              ...bucket,
              name: action.name,
              modifiedAt: action.modifiedAt
            }
            :
            bucket
        )
      };

    default:
      return state;
  }
};
