import * as ItemActionTypes from '../actiontypes/items';
import initialState from "./initialState";

export default (state = initialState.items, action) => {
  switch (action.type) {
    case ItemActionTypes.ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.items,
        count: action.count,
        next: action.next,
        previous: action.previous
      };

    case ItemActionTypes.ITEMS_DELETION:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items.slice(0, action.itemIndex),
          ...state.items.slice(action.itemIndex + 1)
        ]
      };

    case ItemActionTypes.ITEMS_EDIT:
      return {
        ...state,
        isFetching: false,
        items: [
          ...state.items.filter(item => item.id !== action.item.id),
          Object.assign({}, action.item)
        ]
      };

    case ItemActionTypes.ITEMS_SEARCH:
      return {
        ...state,
        isFetching: false,
        items: action.data.items,
        count: action.data.count,
        next: action.data.next,
        previous: action.data.previous,
        search: {
          isItemSearch: action.isSearch,
          query: action.query
        }
      };

    default:
      return state;
  }
}