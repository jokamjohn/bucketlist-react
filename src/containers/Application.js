import React from 'react'
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../components/home/Home'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'
import SignUp from '../components/auth/SignUp'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Buckets from '../components/bucket/Buckets'
import Items from '../components/items/Items'
import NotFound from '../components/NotFound'

class Application extends React.Component {

    render() {
        const {dispatch, isAuthenticated} = this.props;
        return (
            <BrowserRouter>
                <div>
                    <Navbar isAuthenticated={isAuthenticated} dispatch={dispatch}/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/login"
                               render={() => <Login dispatch={dispatch} isAuthenticated={isAuthenticated}/>}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/logout" render={() => <Logout dispatch={dispatch}/>}/>
                        <Route exact path="/buckets" component={Buckets}/>
                        <Route path="/buckets/:bucketId/items" component={Items}/>
                        <Route component={NotFound}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    const {isAuthenticated, isFetching} = state;
    return {
        isAuthenticated,
        isFetching
    }
};

export default connect(mapStateToProps)(Application)