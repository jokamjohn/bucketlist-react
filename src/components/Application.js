import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './home/Home'
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
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }

}

export default Application