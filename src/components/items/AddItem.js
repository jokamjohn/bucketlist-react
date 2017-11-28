import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {createItem} from "../../actions/items";
import {handleAPIError} from "../../utilities/Utils";
import {Modal} from "./Modal";

class AddItemModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      name: '',
      description: '',
    }
  }

  onSubmit = event => {
    event.preventDefault();
    this.setState({saving: true});
    const {name, description} = this.state;
    const {isAuthenticated, bucketId, dispatch} = this.props;
    dispatch(createItem(bucketId, name, description, isAuthenticated))
        .then(() => window.location.reload())
        .catch(error => this.onHandleError(error))
  };

  onHandleError = error => {
    handleAPIError(error);
    this.setState({saving: false});
  };

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value})
  };

  render() {
    return <Modal onSubmit={this.onSubmit} onChange={this.onChange}/>
  }
}

AddItemModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  bucketId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


export default withRouter(AddItemModal)