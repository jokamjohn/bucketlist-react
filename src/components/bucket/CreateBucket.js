import React from 'react';
import PropTypes from 'prop-types';
import {createBucketOnServer} from "../../actions/buckets";

class CreateBucket extends React.Component {

  onCreate = (event) => {
    event.preventDefault();
    const name = this.name.value;
    const {isAuthenticated, dispatch} = this.props;
    dispatch(createBucketOnServer(name, isAuthenticated));
    this.name.value = ''
  };

  render() {
    return (
        <div className="col-sm-5 mx-sm-auto">
          <form className="form-inline" onSubmit={this.onCreate}>
            <div className="form-group">
              <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineCreateBucketFormInput"
                     placeholder="Travel" ref={input => this.name = input} required/>
              <input type="submit" className="btn btn-primary" value="Create Bucket"/>
            </div>
          </form>
        </div>);
  }
}

CreateBucket.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default CreateBucket
