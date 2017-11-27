import React from 'react'
import PropTypes from 'prop-types'
import {editBucketOnServer} from "../../actions/buckets";
import {BucketCard} from "./BucketCard";
import {bucketType} from "../../types/index";


class Bucket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      isEditing: false
    }
  }

  onChangeName = (value) => this.setState({name: value});

  onEditing = () => this.setState({isEditing: true});

  onSaving = () => {
    const {id, isAuthenticated, dispatch} = this.props;
    dispatch(editBucketOnServer(this.state.name, id, isAuthenticated));
    this.setState({isEditing: false})
  };

  render() {
    return <BucketCard
        {...this.props}
        {...this.state}
        onChangeName={this.onChangeName}
        onSaving={this.onSaving}
        onEditing={this.onEditing}
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