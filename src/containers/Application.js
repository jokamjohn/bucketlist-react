import React from 'react'
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../components/home/Home'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Buckets from './Buckets'
import Items from './Items'
import NotFound from '../components/NotFound'
import PasswordReset from "./PasswordReset";
import {PrivateRoute} from "../components/auth/PrivateRoute";
import {LogoutRoute} from "../components/auth/LogoutRoute";

class Application extends React.Component {

  render() {
    const {dispatch, isAuthenticated, isRegistered} = this.props;
    return (
        <BrowserRouter>
          <div>
            <Navbar isAuthenticated={isAuthenticated} dispatch={dispatch}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login"
                     render={() => <Login dispatch={dispatch} isAuthenticated={isAuthenticated}/>}/>
              <Route exact path="/signup"
                     render={() => <Register dispatch={dispatch} isRegistered={isRegistered}/>}/>
              <PrivateRoute path="/buckets/:bucketId/items" component={Items} isAuthenticated={isAuthenticated}/>
              <PrivateRoute path="/buckets" component={Buckets} isAuthenticated={isAuthenticated}/>
              <PrivateRoute path="/auth/password/reset" component={PasswordReset} isAuthenticated={isAuthenticated}/>
              <LogoutRoute path="/logout" isAuthenticated={isAuthenticated} dispatch={dispatch}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  const {auth, isFetching} = state;
  return {
    isAuthenticated: auth.isAuthenticated,
    isFetching,
    isRegistered: auth.isRegistered,
  }
};

export default connect(mapStateToProps)(Application)