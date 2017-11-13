import React from 'react'
import PropTypes from 'prop-types';
import Breadcrumb from './Breadcrumb'
import {getItems, receiveItems} from "../../actions/items";
import {BUCKETLIST_URL} from "../../utilities/Constants";
import AddItemModal from "./AddItemModal";
import {AddItemButton} from "./AddItemButton";
import {EmptyBucketMessage} from "./EmptyBucketMessage";
import {ItemSearch} from "./ItemSearch";
import {ShowItems} from "./ShowItems";

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

  render() {
    const items = this.props.items.items;
    const bucketId = this.props.match.params.bucketId;
    const isAuth = this.props.isAuthenticated;
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