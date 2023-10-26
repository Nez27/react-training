const isValidString = (value: string): boolean =>
  /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/gm.test(value);

const isValidNumber = (value: string): boolean => /^[0-9]*$/.test(value);

const isValidPhoneNumber = (value: string): boolean =>
  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value);

const isValidAddress = (value: string): boolean => value.trim().length >= 10;

export { isValidString, isValidNumber, isValidPhoneNumber, isValidAddress };
