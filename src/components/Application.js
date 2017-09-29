import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './home/Home'
import Login from './Login'
import SignUp from './SignUp'
import Navbar from './Navbar'
import Footer from './Footer'

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
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }

}

export default Application