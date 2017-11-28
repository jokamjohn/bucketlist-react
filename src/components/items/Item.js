import React from 'react'
import PropTypes from 'prop-types'
import {deleteItem, editItem} from "../../actions/items";
import {ItemCard} from "./ItemCard";
import {handleAPIError, showToast} from "../../utilities/Utils";

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description,
      isEditing: false,
      updating: false,
      deleting: false,
    }
  }

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  };

  onEditing = () => this.setState({isEditing: true});

  onUpdate = () => {
    this.setState({isEditing: false});
    this.setState({updating: true});
    const {bucketId, id: itemId, isAuthenticated, dispatch} = this.props;
    const {name, description} = this.state;
    dispatch(editItem(bucketId, itemId, name, description, isAuthenticated))
        .then(() => this.onUpdateSuccess())
        .catch(error => this.onHandleError(error))
  };

  onCancel = () => this.setState({isEditing: false});

  onDelete = () => {
    this.setState({deleting: true});
    const {bucketId, id: itemId, index, isAuthenticated, dispatch} = this.props;
    dispatch(deleteItem(bucketId, itemId, index, isAuthenticated))
        .then(() => showToast("Item Deleted Successfully"))
        .catch(error => this.onHandleError(error))
  };

  onUpdateSuccess = () => {
    showToast("Item Updated Successfully");
    this.setState({updating: false});
  };

  onHandleError = error => {
    handleAPIError(error);
    this.setState({updating: false});
    this.setState({deleting: false});
  };

  render() {
    return <ItemCard
        onChange={this.onChange}
        onUpdate={this.onUpdate}
        onCancel={this.onCancel}
        onDelete={this.onDelete}
        onEditing={this.onEditing}
        modifiedAt={this.props.modifiedAt}
        {...this.state}
    />
  }
}

Item.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  modifiedAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  bucketId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default Item