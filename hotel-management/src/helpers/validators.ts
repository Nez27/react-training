const isValidName = (value: string): boolean => {
  return /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/gm.test(value);
};

const isValidNumber = (value: string): boolean => {
  return /^[0-9]*$/.test(value);
};

const isValidPhoneNumber = (value: string): boolean => {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);
};

const isValidString = (value: string): boolean => {
  return value.trim().length >= 5;
};

const skipCheck = () => true;

export {
  isValidName,
  isValidNumber,
  isValidPhoneNumber,
  isValidString,
  skipCheck,
};
