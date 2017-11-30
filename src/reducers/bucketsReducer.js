import * as BucketActionTypes from "../actiontypes/bucket";
import initialState from "./initialState";

export default (state = initialState.buckets, action) => {
  switch (action.type) {
    case BucketActionTypes.BUCKET_SUCCESS:
      return {
        ...state,
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
          Object.assign({}, action.bucket)
        ]
      };

    case BucketActionTypes.BUCKET_SEARCH:
      return {
        ...state,
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
        search: {
          isSearch: action.isSearch,
          query: action.query
        }
      };

    case BucketActionTypes.BUCKET_EDIT:
      return {
        ...state,
        buckets: [
          ...state.buckets.filter(bucket => bucket.id !== action.bucket.id),
          Object.assign({}, action.bucket)
        ]
      };

    default:
      return state;
  }
};
