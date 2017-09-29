import React from 'react'

const SignUp = () =>
  <div className="container main-content">
    <div className="row">
      <div className=" col-sm-5 mx-sm-auto">
        <div className="card auth-card">
          <div className="card-body">
            <h4 className="card-title">Sign Up</h4>
            <form>
              <div className="form-group">
                <input type="email" className="form-control" aria-describedby="emailHelp"
                       placeholder="Email address" required/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone
                  else.
                </small>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" placeholder="Password" required/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="confirm_password" placeholder="Confirm Password"
                       required/>
              </div>
              <div className="text-center">
                <input type="submit" value="Create Account" className="btn btn-primary"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

export default SignUp

