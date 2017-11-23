import React from 'react'
import Breadcrumb from '../components/bucket/Breadcrumb'
import Bucket from '../components/bucket/Bucket'
import PropTypes from 'prop-types';
import {getBuckets} from "../actions/buckets";
import Pagination from "../components/pagination/Pagination";
import CreateBucket from "../components/bucket/CreateBucket";
import BucketSearch from "../components/bucket/BucketSearch";
import {BASE_URL} from "../utilities/Constants";
import {connect} from 'react-redux';

class Buckets extends React.Component {

  componentDidMount() {
    this.props.dispatch(getBuckets(this.props.bucketUrl, this.props.isAuthenticated, this.props.search.isSearch))
  }

  /**
   * Fetch the Buckets at the provided URL when a pagination number is clicked.
   * @param url Buckets URL
   */
  onChangeUrl = url => {
    this.props.dispatch(getBuckets(url, this.props.isAuthenticated, this.props.search.isSearch))
  };

  /**
   * This function constructs an appropriate url to attach to the paginator.
   * The url changes and includes the search query if the search results
   * require pagination
   * @returns {string}
   */
  paginationUrl = () => {
    let url = BASE_URL + "bucketlists/?page=";
    if (this.props.isSearch && this.props.query) {
      url = BASE_URL + `bucketlists/?q=${this.props.query}&page=`;
    }
    return url
  };

  render() {
    const {isAuthenticated: isAuth, buckets, dispatch} = this.props;
    const {count, next, previous} = buckets;

    return (
        <div className="container main-content">

          <Breadcrumb/>

          <div className="row">
            <CreateBucket dispatch={dispatch} isAuthenticated={isAuth}/>

            <BucketSearch dispatch={dispatch} isAuthenticated={isAuth}/>
          </div>

          <hr></hr>

          {this.props.buckets
              ?
              <div>
                <div className="row">
                  {this.props.buckets.buckets.map((bucket, index) =>
                      <Bucket key={bucket.id}
                              index={index}
                              {...bucket}
                              dispatch={dispatch}
                              isAuthenticated={isAuth}
                      />
                  )}
                </div>
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
              <div className="row">
                <p>
                  Looks like you do not have Buckets yet!
                </p>
              </div>
          }
        </div>
    );
  }
}

Buckets.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  buckets: PropTypes.object,
  bucketUrl: PropTypes.string,
  search: PropTypes.object,
  query: PropTypes.string,
};

const mapStateToProps = state => {
  const {auth, buckets} = state;
  return {
    isAuthenticated: auth.isAuthenticated,
    buckets,
    bucketUrl: buckets.bucketUrl,
    search: buckets.search,
  }
};


export default connect(mapStateToProps)(Buckets)