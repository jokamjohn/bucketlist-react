import React from 'react'
import {NavLink} from 'react-router-dom'

const Jumbotron = () =>
  <div className="jumbotron">
    <h1 className="display-3">Dreams and Goals tracking app</h1>
    <p className="lead">
      BucketList app allows you to record and share things you want to achieve or experience before reaching NavBar
      certain
      age.
    </p>
    <hr className="my-4"/>
    <p className="lead text-center">
      <NavLink className="btn btn-primary btn-lg text-center" exact to="/signup" role="button">Get Started</NavLink>
    </p>
  </div>

export default Jumbotron