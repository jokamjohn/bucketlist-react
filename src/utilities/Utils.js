import moment from 'moment';

/**
 * Format the date string to a human readable format.
 * @param date
 * @returns {string}
 */
export const formatDate = date => {
  return moment(date).from(moment());
};

/**
 * TokenException function.
 * @constructor
 */
export function TokenException() {
  this.name = "Token missing or invalid";
  this.message = "The authentication token is either missing or invalid"
  this.toString = function () {
    return this.name + this.message
  }
}