/**
 * Convert the ISODate to a Date object
 * @param isoDateString
 * @returns {string}
 */
export const parseISOString = isoDateString => {
  const b = isoDateString.split(/\D+/);
  return timeSince(new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])))
};

/**
 * Format date in terms of ...ago
 * @param date
 * @returns {string}
 */
const timeSince = date => {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};