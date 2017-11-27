import React from 'react';
import PropTypes from 'prop-types';
import {createBucketOnServer} from "../../actions/buckets";
import {handleError, showToast} from "../../utilities/Utils";
import {BucketForm} from "./BucketForm";


class CreateBucket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      name: ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    event.persist();
    this.setState({saving: true});
    const name = this.state.name;
    const {isAuthenticated, dispatch} = this.props;
    dispatch(createBucketOnServer(name, isAuthenticated))
        .then(() => this.onCreationSuccess(event))
        .catch(error => this.onHandleError(error));
  };

  onCreationSuccess = event => {
    showToast("Bucket added successfully");
    event.target.reset();
    this.setState({saving: false});
    this.setState({name: ''});
  };

  onHandleError = error => {
    handleError(error);
    this.setState({saving: false})
  };

  onChange = event => this.setState({name: event.target.value});

  render() {
    const {saving} = this.state;
    return <BucketForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        saving={saving}
    />
  }
}

CreateBucket.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default CreateBucket
