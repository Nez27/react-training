/**
 * Check value is valid number or not
 * @param value Value need to be checked
 * @returns A boolean indicating whether or not the argument has valid
 */
const isValidNumber = (value: unknown): boolean => {
  return /^[0-9]*$/.test(value as string);
};

/**
 * Check value is valid discount or not
 * @param value Value need to be checked
 * @returns A boolean indicating whether or not the argument has valid
 */
const isValidDiscount = (value: string): boolean => {
  return +value >= 0 && +value <= 100;
};

/**
 * Check value is valid phone number or not
 * @param value Value need to be checked
 * @returns A boolean indicating whether or not the argument has valid
 */
const isValidPhoneNumber = (value: string): boolean => {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
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
 * A method skip check value
 * @returns Return true
 */
const skipCheck = () => true;

const isEmptyObj = (obj: object) => {
  return Object.keys(obj).length === 0;
}

export {
  isValidNumber,
  isValidPhoneNumber,
  isValidString,
  skipCheck,
  isValidDiscount,
  isEmptyObj
};
