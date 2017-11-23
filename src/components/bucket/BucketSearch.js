import React from 'react';
import PropTypes from 'prop-types';
import {searchForBucket} from "../../actions/buckets";

class BucketSearch extends React.Component {

  onSubmit = event => {
    event.preventDefault();
    const query = this.search.value;
    const {dispatch, isAuthenticated} = this.props;
    dispatch(searchForBucket(query, isAuthenticated));
  };

  render() {
    return (
        <div className="col-sm-5 mx-sm-auto">
          <form className="form-inline" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineSearchFormInput"
                     placeholder="Search" ref={input => this.search = input} required/>
              <input type="submit" className="btn btn-secondary" value="Search"/>
            </div>
          </form>
        </div>
    );
  }
}

BucketSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default BucketSearch