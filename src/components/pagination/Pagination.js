import React from 'react';
import PropTypes from 'prop-types';
import {BASE_URL, NUMBER_OF_ITEMS_PER_PAGE_FROM_API} from "../../utilities/Constants";
import Direction from "./Direction";
import {getBuckets} from "../../actions/buckets";


class Pagination extends React.Component {

  /**
   * Get the number of pages by dividing total item count by the number of items returned per page.
   * Add one to the value so that after slicing the array values start fom one.
   * @param count
   * @returns {Array.<*>}
   */
  getNumberOfPage = count => {
    const pages = (Math.ceil(count / NUMBER_OF_ITEMS_PER_PAGE_FROM_API) + 1);
    return [...Array(pages).keys()].slice(1)
  };

  /**
   * Fetch the Buckets at the provided URL when a pagination number is clicked.
   * @param url Buckets URL
   */
  onChangeUrl = url => {
    this.props.dispatch(getBuckets(url, this.props.isAuthenticated, this.props.isSearch))
  };

  render() {
    let url = BASE_URL + "bucketlists/?page=";
    if (this.props.isSearch && this.props.query) {
      url = BASE_URL + `bucketlists/?q=${this.props.query}&page=`;
    }
    const count = this.props.count;
    const isAuthenticated = this.props.isAuthenticated;

    return (
        <div className="container main-content">
          {count
              ?
              <nav aria-label="Buckets List pagination">
                <ul className="pagination">
                  <Direction direction="&laquo;" action={this.props.previous} sr="previous"
                             isAuthenticated={isAuthenticated} onChangeUrl={this.onChangeUrl}/>
                  {this.getNumberOfPage(this.props.count).map((page, index) =>
                      <li key={index} className="page-item">
                        <a className="page-link" onClick={() => this.onChangeUrl(url + page)}>{page}</a></li>
                  )}
                  <Direction direction="&raquo;" action={this.props.next} sr="next" isAuthenticated={isAuthenticated}
                             onChangeUrl={this.onChangeUrl}/>
                </ul>
              </nav>
              :
              ''
          }
        </div>)

  }
}

Pagination.propTypes = {
  count: PropTypes.number,
  next: PropTypes.string,
  previous: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func,
  bucketUrl: PropTypes.string,
  isSearch: PropTypes.bool,
  query: PropTypes.string,
};

export default Pagination