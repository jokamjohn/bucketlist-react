import React from 'react';
import PropTypes from 'prop-types';
import Direction from "./Direction";
import {PageNumber} from "./PageNumber";


class Pagination extends React.Component {

  render() {
    const {count, isAuthenticated: isAuth, onChangeUrl, previous, next} = this.props;
    return (
        <div className="container main-content">
          {count
              ?
              <nav aria-label="Buckets List pagination">
                <ul className="pagination">

                  <Direction direction="&laquo;"
                             action={previous}
                             sr="previous"
                             isAuthenticated={isAuth}
                             onChangeUrl={onChangeUrl}
                  />

                  <PageNumber {...this.props}/>

                  <Direction direction="&raquo;"
                             action={next}
                             sr="next"
                             isAuthenticated={isAuth}
                             onChangeUrl={onChangeUrl}/>
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
  onChangeUrl: PropTypes.func.isRequired,
};

export default Pagination