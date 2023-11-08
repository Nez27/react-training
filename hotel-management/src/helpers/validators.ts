/**
 * Compare the regex with value
 * @param regex The regex to compare
 * @param value Value need to be checked
 * @returns A boolean indicating whether of not the argument has valid
 */
const isValidRegex = (regex: RegExp, value: string): boolean => {
  return regex.test(value);
}

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
 * Check object is empty or not
 * @param obj Object need to be check
 * @returns A boolean indicating whether or not the argument has valid
 */
const isEmptyObj = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export {
  isValidRegex,
  isValidString,
  isValidDiscount,
  isEmptyObj,
};
