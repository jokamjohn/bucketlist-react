import React from 'react'
import PropTypes from 'prop-types';
import Breadcrumb from '../components/items/Breadcrumb'
import {getItems, receiveItems} from "../actions/items";
import {BASE_URL, BUCKETLIST_URL, DEFAULT_LOADER_COLOR} from "../utilities/Constants";
import AddItemModal from "../components/items/AddItem";
import {AddItemButton} from "../components/items/AddItemButton";
import {EmptyItemsMessage} from "../components/items/EmptyBucketMessage";
import {ShowItems} from "../components/items/ShowItems";
import Pagination from "../components/pagination/Pagination";
import {Redirect} from 'react-router-dom';
import ItemSearch from "../components/items/ItemSearch";
import {connect} from 'react-redux';
import Loader from "../components/Loader";

class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  /*
   * Dispatch an action to get the current Bucket items.
   */
  componentDidMount() {
    const bucketId = this.props.match.params.bucketId;
    const isSearch = this.props.items.search.isItemSearch;
    const url = `${BUCKETLIST_URL}${bucketId}/items/`;
    this.props.dispatch(getItems(bucketId, url, this.props.isAuthenticated, isSearch))
        .then(() => this.setState({loading: false}))
  }

  /**
   * Remove the Bucket items when the component unmounts.
   */
  componentWillUnmount() {
    const bucketId = this.props.match.params.bucketId;
    this.props.dispatch(receiveItems(bucketId, {items: []}))
  }

  /**
   * Fetch the Bucket Items at the provided URL when a pagination number is clicked.
   * @param url Buckets URL
   */
  onChangeUrl = url => {
    this.setState({loading: true});
    const bucketId = this.props.match.params.bucketId;
    const isSearch = this.props.items.search.isItemSearch;
    this.props.dispatch(getItems(bucketId, url, this.props.isAuthenticated, isSearch))
        .then(() => this.setState({loading: false}))
  };

  /**
   * This function constructs an appropriate url to attach to the paginator.
   * The url changes and includes the search query if the search results
   * require pagination
   * @returns {string}
   */
  paginationUrl = () => {
    const bucketId = this.props.match.params.bucketId;
    const {isItemSearch, query} = this.props.items.search;
    let url = BASE_URL + `bucketlists/${bucketId}/items/?page=`;
    if (isItemSearch && query) {
      url = BASE_URL + `bucketlists/${bucketId}/items/?q=${query}&page=`;
    }
    return url
  };

  render() {
    const {items, isAuthenticated: isAuth, match, dispatch} = this.props;
    const allItems = items.items;
    const bucketId = match.params.bucketId;
    const next = items.next;
    const previous = items.previous;
    const count = items.count;
    const {loading} = this.state;

    if (!isAuth) {
      return <Redirect to="/login"/>
    }

    return (
        <div className="container main-content">
          <Breadcrumb/>
          {loading && <Loader color={DEFAULT_LOADER_COLOR}/>}
          {allItems.length
              ?
              <div>
                <div className="row">
                  <AddItemButton/>
                  <ItemSearch isAuthenticated={isAuth} bucketId={bucketId} dispatch={dispatch}/>
                </div>

                <hr></hr>

                <ShowItems items={allItems}
                           dispatch={dispatch}
                           bucketId={bucketId}
                           isAuthenticated={isAuth}
                />
                <Pagination count={count}
                            next={next}
                            previous={previous}
                            dispatch={dispatch}
                            isAuthenticated={isAuth}
                            onChangeUrl={this.onChangeUrl}
                            paginationUrl={this.paginationUrl}
                />
              </div>
              :
              <div>
                <AddItemButton/>
                <EmptyItemsMessage/>
              </div>
          }
          <AddItemModal bucketId={bucketId} isAuthenticated={isAuth} dispatch={dispatch}/>
        </div>
    );
  }
}

Items.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const {auth, items} = state;
  return {
    isAuthenticated: auth.isAuthenticated,
    items
  }
};


export default connect(mapStateToProps)(Items)