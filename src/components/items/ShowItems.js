import React from 'react';
import Item from "./Item";
import PropTypes from 'prop-types';

export const ShowItems = props => (
    <div className="row">
      {props.items.map((item, index) =>
          <Item key={item.id}
                {...item}
                bucketId={props.bucketId}
                dispatch={props.dispatch}
                index={index}
                isAuthenticated={props.isAuthenticated}
          />
      )}
    </div>
);

ShowItems.propTypes = {
  items: PropTypes.array,
  bucketId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
