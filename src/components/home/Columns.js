import React from 'react'

const Columns = () =>
  <div className="container">
    <div className="row">

      <div className="col-sm-4">
        <div className="text-center">
          <i className="fa fa-plus fa-5x" aria-hidden="true"></i>
        </div>
        <h3 className="text-center">Create</h3>
        <p className="text-center">Create a bucket and add your goals and dreams you want to achieve</p>
      </div>


      <div className="col-sm-4">
        <div className="text-center">
          <i className="fa fa-pencil-square-o fa-5x" aria-hidden="true"></i>
        </div>
        <h3 className="text-center">Edit</h3>
        <p className="text-center">
          Changed your mind or made a typo? No problem you can edit the bucket and its items
        </p>
      </div>


      <div className="col-sm-4">
        <div className="text-center">
          <i className="fa fa-share-alt-square fa-5x text-center" aria-hidden="true"></i>
        </div>
        <h3 className="text-center">Share</h3>
        <p className="text-center">
          We know you always want to share your achievements with family and friends.
          Easily share your goals with them
        </p>
      </div>
    </div>
  </div>

export default Columns