import React from 'react'
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../components/home/Home'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'
import Register from '../components/auth/Register'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Buckets from '../components/bucket/Buckets'
import Items from '../components/items/Items'
import NotFound from '../components/NotFound'
import Pagination from "../components/pagination/Pagination";

class Application extends React.Component {

  render() {
    const {dispatch, isAuthenticated, message, isRegistered, buckets} = this.props;
    return (
        <BrowserRouter>
          <div>
            <Navbar isAuthenticated={isAuthenticated} dispatch={dispatch}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login"
                     render={() => <Login dispatch={dispatch} isAuthenticated={isAuthenticated}/>}/>
              <Route exact path="/signup"
                     render={() => <Register dispatch={dispatch} message={message} isRegistered={isRegistered}/>}/>
              <Route exact path="/logout" render={() => <Logout dispatch={dispatch}/>}/>
              <Route exact path="/buckets"
                     render={() => <Buckets dispatch={dispatch} isAuthenticated={isAuthenticated} buckets={buckets}/>}/>
              <Route path="/buckets/:bucketId/items" component={Items}/>
              {/*<Route path="/page" render={()=> <Pagination next={null} count={1} previous={"http://kbucket-api.herokuapp.com/bucketlists/?page=2"}/>}/>*/}
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  const {isAuthenticated, isFetching, message, isRegistered, buckets} = state;
  return {
    isAuthenticated,
    isFetching,
    isRegistered,
    message,
    buckets
  }
};

export default connect(mapStateToProps)(Application)