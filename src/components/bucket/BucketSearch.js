import React from 'react';
import PropTypes from 'prop-types';
import {searchForBucket} from "../../actions/buckets";
import {BucketSearchForm} from "./BucketSearchForm";
import {handleError, showToast} from "../../utilities/Utils";

class BucketSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      query: '',
    }
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({searching: true});
    const query = this.state.query;
    const {dispatch, isAuthenticated} = this.props;
    dispatch(searchForBucket(query, isAuthenticated))
        .then(() => this.onSearchSuccess())
        .catch(error => this.onHandleError(error))
  };

  onSearchSuccess = () => {
    showToast("search results");
    this.setState({searching: false});
  };

  onHandleError = error => {
    handleError(error);
    this.setState({searching: false});
  };

  onChange = event => {
    this.setState({query: event.target.value})
  };

  render() {
    const {searching} = this.state;
    return <BucketSearchForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        searching={searching}
    />
  }
}

BucketSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default BucketSearch