/**
 * Compare the regex with value
 * @param regex The regex to compare
 * @param value Value need to be checked
 * @returns A boolean indicating whether of not the argument has valid
 */
const isValidRegex = (regex: RegExp, value: string): boolean => {
  return regex.test(value);
};

/**
 * Check value is valid discount or not
 * @param value Value need to be checked
 * @returns A boolean indicating whether or not the argument has valid
 */
const isValidDiscount = (value: number): boolean => {
  return value >= 0 && value <= 100;
};

/**
 * Check value is valid string or not
 * @param value Value need to be checked
 * @returns A boolean indicating whether or not the argument has valid
 */
const isValidString = (value: string): boolean => {
  return value.trim().length >= 5;
};

/**
 * Compare two days
 * @param startDate The start date
 * @param endDate The end date
 * @returns Return true if start date greater than end date
 */
const compareTwoDates = (startDate: Date, endDate: Date): boolean => {
  return startDate > endDate;
};

export {
  isValidRegex,
  isValidString,
  isValidDiscount,
  compareTwoDates
};
