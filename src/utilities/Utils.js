import moment from 'moment';
import toastr from 'toastr';

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

/**
 * Show a toast after a successful event
 * @param message Success Message
 */
export const showToast = message => {
  toastr.success(message);
};

/**
 * show a toast with an error message when an error occurs
 * @param error Error
 */
export const handleError = error => {
  if (error.response) {
    toastr.error(error.response.data.message)
  } else {
    toastr.error("Error occurred, Try again")
  }
};