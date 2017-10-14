import React from 'react'
import Breadcrumb from './Breadcrumb'
import Bucket from './Bucket'
import PropTypes from 'prop-types';
import {getBuckets} from "../../actions/buckets";
import {formatDate, parseISOString} from "../../utilities/Utils";
import Pagination from "../pagination/Pagination";
import CreateBucket from "./CreateBucket";
import BucketSearch from "./BucketSearch";

class Buckets extends React.Component {

  componentDidMount() {
    this.props.dispatch(getBuckets(this.props.bucketUrl, this.props.isAuthenticated))
  }

  render() {
    const count = this.props.buckets.count;
    const next = this.props.buckets.next;
    const previous = this.props.buckets.previous;
    const isAuth = this.props.isAuthenticated;
    const dispatch = this.props.dispatch;
    const bucketUrl = this.props.bucketUrl;

    return (
        <div className="container main-content">

          <Breadcrumb/>

          <div className="row">
            <CreateBucket dispatch={this.props.dispatch} isAuthenticated={this.props.isAuthenticated}/>

            <BucketSearch dispatch={this.props.dispatch} isAuthenticated={this.props.isAuthenticated}/>
          </div>

          <hr></hr>

          {this.props.buckets
              ?
              <div className="row">
                {this.props.buckets.buckets.map((bucket, index) =>
                    <Bucket key={bucket.id} index={index} id={bucket.id} name={bucket.name} dispatch={dispatch}
                            isAuthenticated={isAuth} modifiedAt={formatDate(bucket.modifiedAt)}/>
                )}
              </div>
              :
              ''
          }
          <Pagination count={count} next={next} previous={previous} bucketUrl={bucketUrl} dispatch={dispatch}
                      isAuthenticated={isAuth}/>
        </div>
    );
  }
}

Buckets.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  buckets: PropTypes.object,
  bucketUrl: PropTypes.string,
};


export default Buckets