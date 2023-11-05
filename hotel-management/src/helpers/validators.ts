/**
 * Check value is valid name or not
 * @param value Values need to be checked
 * @returns A boolean indicating whether or not the argument has valid
 */
const isValidName = (value: string): boolean => {
  return /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/gm.test(value);
};

/**
 * Check value is valid number or not
 * @param value Value need to be checked
 * @returns A boolean indicating whether or not the argument has valid
 */
const isValidNumber = (value: string): boolean => {
  return /^[0-9]*$/.test(value);
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

/**
 * Check object is empty or not
 * @param obj Object need to be check
 * @returns A boolean indicating whether or not the argument has valid
 */
const isEmptyObj = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export {
  isValidName,
  isValidNumber,
  isValidPhoneNumber,
  isValidString,
  skipCheck,
  isValidDiscount,
  isEmptyObj,
};
