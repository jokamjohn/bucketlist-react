import React from 'react'
import Breadcrumb from './Breadcrumb'
import Bucket from './Bucket'
import PropTypes from 'prop-types';
import {getBuckets} from "../../actions/buckets";
import {parseISOString} from "../../utilities/Utils";

class Buckets extends React.Component {

  componentDidMount() {
    this.props.dispatch(getBuckets(this.props.isAuthenticated))
  }

  render() {
    return (
        <div className="container main-content">

          <Breadcrumb/>

          {/*Create Bucket */}
          <div className="row">
            <div className="col-sm-5 mx-sm-auto">
              <form className="form-inline">
                <div className="form-group">
                  <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineCreateBucketFormInput"
                         placeholder="Travel" required/>
                  <input type="submit" className="btn btn-primary" value="Create Bucket"/>
                </div>
              </form>
            </div>

            {/*Search for a Bucket*/}
            <div className="col-sm-5 mx-sm-auto">
              <form className="form-inline">
                <div className="form-group">
                  <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineSearchFormInput"
                         placeholder="Search" required/>
                  <input type="submit" className="btn btn-secondary" value="Search"/>
                </div>
              </form>
            </div>
          </div>
          <hr></hr>

          {this.props.buckets
              ?
              <div className="row">
                {this.props.buckets.buckets.map(bucket =>
                    <Bucket key={bucket.id} name={bucket.name} modifiedAt={parseISOString(bucket.modifiedAt)}/>
                )}
              </div>
              :
              ''
          }
        </div>
    );
  }
}

Buckets.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  buckets: PropTypes.object
};


export default Buckets