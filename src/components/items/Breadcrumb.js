import React from 'react';
import {Link} from 'react-router-dom';

const Breadcrumb = () =>
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
    <li className="breadcrumb-item"><Link to="/buckets">Buckets</Link></li>
    <li className="breadcrumb-item active">BucketItems</li>
  </ol>

export default Breadcrumb