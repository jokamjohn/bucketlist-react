import React from 'react'
import Item from './Item'
import Breadcrumb from './Breadcrumb'

const Items = () =>
  <div className="container main-content">

    <Breadcrumb/>

    <div className="row">
      <div className="col-sm-5 mx-sm-auto">
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                   placeholder="Kampala" required/>
            <input type="submit" className="btn btn-primary" value="Add Item"/>
          </div>
        </form>
      </div>

      <div className="col-sm-5 mx-sm-auto">
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                   placeholder="Search" required/>
            <input type="submit" className="btn btn-secondary" value="Search"/>
          </div>
        </form>
      </div>
    </div>
    <hr></hr>

    <div className="row">
      <Item name="Nairobi" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            modifiedAt="Monday 23, 2017"/>
      <Item name="Mombasa" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            modifiedAt="Monday 24, 2017"/>
      <Item name="Nakuru" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            modifiedAt="Monday 25, 2017"/>
    </div>

  </div>

export default Items