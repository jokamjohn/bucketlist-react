import React from 'react'
import PropTypes from 'prop-types'
import {deleteBucketFromServer, editBucketOnServer} from "../../actions/buckets";
import {BucketCard} from "./BucketCard";
import {bucketType} from "../../types/index";
import {handleAPIError, showToast} from "../../utilities/Utils";


class Bucket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      isEditing: false,
      deleting: false,
      updating: false,
    }
  }

  onChange = event => this.setState({name: event.target.value});

  onEditing = () => this.setState({isEditing: true});

  onSave = () => {
    this.setState({updating: true});
    const {id, isAuthenticated, dispatch} = this.props;
    dispatch(editBucketOnServer(this.state.name, id, isAuthenticated))
        .then(() => this.onUpdateSuccess())
        .catch(error => handleAPIError(error));
    this.setState({isEditing: false})
  };

  onDelete = () => {
    this.setState({deleting: true});
    const {dispatch, id, index, isAuthenticated} = this.props;
    dispatch(deleteBucketFromServer(id, index, isAuthenticated))
        .then(() => showToast("Bucket Successfully Deleted"))
        .catch(error => this.onHandleError(error))
  };

  onUpdateSuccess = () => {
    showToast("Bucket Updated successfully");
    this.setState({updating: false});
  };

  onHandleError = error => {
    handleAPIError(error);
    this.setState({deleting: false});
    this.setState({updating: false});
  };

  onCancel = () => {
    this.setState({isEditing: false})
  };

  render() {
    return <BucketCard
        {...this.props}
        {...this.state}
        onChange={this.onChange}
        onSave={this.onSave}
        onEditing={this.onEditing}
        onDelete={this.onDelete}
        onCancel={this.onCancel}
    />
  }
}

Bucket.propTypes = {
  ...bucketType,
  index: PropTypes.number,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default Bucket