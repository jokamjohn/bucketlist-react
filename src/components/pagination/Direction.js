import React from 'react';
import PropTypes from 'prop-types';
import {getBuckets} from "../../actions/buckets";

/**
 * This component holds the pagination directions (<< >>);
 * @param props Properties
 * @constructor
 */
const Direction = props => (
    <li className={props.action ? "page-item" : "page-item disabled"}>
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true"
              onClick={() => props.onChangeUrl(props.action)}>{props.direction}</span>
        <span className="sr-only">{props.sr}</span>
      </a>
    </li>
);

Direction.propTypes = {
  action: PropTypes.string,
  direction: PropTypes.string,
  sr: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  onChangeUrl: PropTypes.func
};

export default Direction