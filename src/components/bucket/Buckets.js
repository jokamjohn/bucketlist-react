import React from 'react'
import Breadcrumb from './Breadcrumb'
import Bucket from './Bucket'

const Buckets = () =>
  <div className="container main-content">

    <Breadcrumb/>

    {/*Create Bucket */}
    <div className="row">
      <div className="col-sm-5 mx-sm-auto">
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineCreateBucketFormInput"
                   placeholder="Travel" required/>
            <input type="submit" className="btn btn-primary" value="Create Bucket"/>
          </div>
        </form>
      </div>

      {/*Search for a Bucket*/}
      <div className="col-sm-5 mx-sm-auto">
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineSearchFormInput"
                   placeholder="Search" required/>
            <input type="submit" className="btn btn-secondary" value="Search"/>
          </div>
        </form>
      </div>
    </div>
    <hr></hr>

    <div className="row">
      <Bucket name="Travel" createdAt="Monday 23, 2017" modifiedAt="Tuesday 30, 2017"/>
      <Bucket name="Dancing" createdAt="Monday 24, 2017" modifiedAt="Tuesday 31, 2017"/>
      <Bucket name="Touring" createdAt="Monday 25, 2017" modifiedAt="Tuesday 1, 2017"/>
    </div>
  </div>

export default Buckets