import React from 'react'
import PropTypes from 'prop-types';
import Breadcrumb from './Breadcrumb'
import {getItems, receiveItems} from "../../actions/items";
import {BASE_URL, BUCKETLIST_URL} from "../../utilities/Constants";
import AddItemModal from "./AddItemModal";
import {AddItemButton} from "./AddItemButton";
import {EmptyBucketMessage} from "./EmptyBucketMessage";
import {ItemSearch} from "./ItemSearch";
import {ShowItems} from "./ShowItems";
import Pagination from "../pagination/Pagination";

class Items extends React.Component {

  /*
   * Dispatch an action to get the current Bucket items.
   */
  componentDidMount() {
    const bucketId = this.props.match.params.bucketId;
    const isSearch = this.props.items.search.isItemSearch;
    const url = `${BUCKETLIST_URL}${bucketId}/items/`;
    this.props.dispatch(getItems(bucketId, url, this.props.isAuthenticated, isSearch))
  }

  /**
   * Remove the Bucket items when the component unmounts.
   */
  componentWillUnmount() {
    const bucketId = this.props.match.params.bucketId;
    this.props.dispatch(receiveItems(bucketId, {items: []}))
  }

  /**
   * Fetch the Buckets at the provided URL when a pagination number is clicked.
   * @param url Buckets URL
   */
  onChangeUrl = url => {
    const bucketId = this.props.match.params.bucketId;
    const isSearch = this.props.items.search.isItemSearch;
    this.props.dispatch(getItems(bucketId, url, this.props.isAuthenticated, isSearch))
  };

  /**
   * This function constructs an appropriate url to attach to the paginator.
   * The url changes and includes the search query if the search results
   * require pagination
   * @returns {string}
   */
  paginationUrl = () => {
    const bucketId = this.props.match.params.bucketId;
    let url = BASE_URL + `bucketlists/${bucketId}/items/?page=`;
    if (this.props.isSearch && this.props.query) {
      url = BASE_URL + `bucketlists/${bucketId}/items/?q=${this.props.query}&page=`;
    }
    return url
  };

  render() {
    const items = this.props.items.items;
    const bucketId = this.props.match.params.bucketId;
    const isAuth = this.props.isAuthenticated;
    const next = this.props.items.next;
    const previous = this.props.items.previous;
    const dispatch = this.props.dispatch;
    const count = this.props.items.count
    return (
        <div className="container main-content">
          <Breadcrumb/>
          {items.length
              ?
              <div>
                <div className="row">
                  <AddItemButton/>
                  <ItemSearch/>
                </div>

                <hr></hr>

                <ShowItems items={items}/>
              </div>
              :
              <div>
                <AddItemButton/>
                <EmptyBucketMessage/>
              </div>
          }
          <AddItemModal bucketId={bucketId} isAuthenticated={isAuth} dispatch={this.props.dispatch}/>
          <Pagination count={count} next={next} previous={previous} dispatch={dispatch} isAuthenticated={isAuth}
                      onChangeUrl={this.onChangeUrl} paginationUrl={this.paginationUrl}/>
        </div>
    );
  }
}

Items.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired,
};


export default Items