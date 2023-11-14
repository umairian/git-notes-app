import moment from "moment";

export const generateTimeDifferenceString = (timestamp: Date) => {
  const now = moment();
  const createdAt = moment(timestamp);

  // Calculate the difference between now and the provided timestamp
  const difference = moment.duration(now.diff(createdAt));

  // Use the `humanize` method to generate a human-readable string
  const timeDifferenceString = moment.duration(difference).humanize();

  return `Created ${timeDifferenceString} ago`;
};
