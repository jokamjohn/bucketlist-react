import PropTypes from 'prop-types';

const {string, number,} = PropTypes;

export const bucketType = {
  name: string.isRequired,
  modifiedAt: string.isRequired,
  id: number.isRequired,
};