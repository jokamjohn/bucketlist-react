import moment from 'moment';

/**
 * Format the date string to a human readable format.
 * @param date
 * @returns {string}
 */
export const formatDate = date => {
  return moment(date).from(moment());
};