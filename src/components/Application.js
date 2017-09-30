import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './home/Home'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Navbar from './Navbar'
import Footer from './Footer'
import Buckets from './bucket/Buckets'
import Items from './items/Items'

class Application extends React.Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/buckets" component={Buckets}/>
            <Route path="/buckets/:bucketId/items" component={Items}/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default Application