import React from 'react';
import PropTypes from 'prop-types';
import {NUMBER_OF_ITEMS_PER_PAGE_FROM_API} from "../../utilities/Constants";

/**
 * This function displays the pagination numbers.
 * @param props
 * @returns {Array}
 * @constructor
 */
export const PageNumber = props => {
  return getNumberOfPage(props.count).map((page, index) =>
      <li key={index} className="page-item">
        <a className="page-link"
           onClick={() => props.onChangeUrl(props.paginationUrl() + page)}
        >
          {page}
        </a>
      </li>
  )
};

PageNumber.propTypes = {
  count: PropTypes.number.isRequired,
};

/**
 * Get the number of pages by dividing total item count by the number of items returned per page.
 * Add one to the value so that after slicing the array values start fom one.
 * @param count
 * @returns {Array.<*>}
 */
export const getNumberOfPage = count => {
  const pages = (Math.ceil(count / NUMBER_OF_ITEMS_PER_PAGE_FROM_API) + 1);
  return [...Array(pages).keys()].slice(1)
};