import React from 'react'
import PropTypes from 'prop-types'
import {deleteBucketFromServer, editBucketOnServer} from "../../actions/buckets";
import {Link} from 'react-router-dom';


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
    this.props.dispatch(editBucketOnServer(this.state.name, this.props.id, this.props.index,
        this.props.isAuthenticated));

    this.setState({isEditing: false})
  };

  render() {
    return (
        <div className="col-sm-4">
          <div className="card bucket-card">
            <div className="card-body">
              {this.state.isEditing ?
                  <input type="text" value={this.state.name} onChange={event => this.onChangeName(event.target.value)}/>
                  :
                  <h4 className="card-title"><Link to={`/buckets/${this.props.id}/items`}>{this.state.name}</Link></h4>
              }
              <p className="card-text">
                <small>Last Modified: {this.props.modifiedAt}</small>
              </p>
              {this.state.isEditing ?
                  <a href="#" className="btn btn-primary bucket-links" onClick={this.onSaving}>Save</a>
                  :
                  <a href="#" className="btn btn-primary bucket-links" onClick={this.onEditing}>Edit</a>
              }
              <a href="#" className="btn btn-danger"
                 onClick={() => this.props.dispatch(deleteBucketFromServer(this.props.id, this.props.index,
                     this.props.isAuthenticated))}>Delete</a>

            </div>
          </div>
        </div>
    );
  }
}

Bucket.propTypes = {
  name: PropTypes.string,
  modifiedAt: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.number,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default Bucket