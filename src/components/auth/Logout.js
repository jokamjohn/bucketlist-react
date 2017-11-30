import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {logoutUser} from "../../actions/logout";
import Loader from "../Loader";
import {DEFAULT_LOADER_COLOR} from "../../utilities/Constants";

class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    this.props.dispatch(logoutUser())
        .then(() => this.setState({loading: false}))
        .catch(error => this.setState({loading: false}))
  }

  render() {
    if (!this.props.isAuthenticated) return <Redirect to="/"/>;
    const {loading} = this.state;
    return <div>{loading && <Loader color={DEFAULT_LOADER_COLOR}/>}</div>
  }

}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Logout