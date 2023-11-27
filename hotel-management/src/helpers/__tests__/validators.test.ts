// Constants
import { REGEX } from '@constant/commons';

// Helpers
import {
  isValidDiscount,
  isValidRegex,
  isValidString,
} from '@helper/validators';

describe('isValidPhone', () => {
  test('Should is valid phone', () => {
    const result = isValidRegex(new RegExp(REGEX.PHONE), '0327212321');

    expect(result).toEqual(true);
  });

  test('Should is not valid phone', () => {
    const result = isValidRegex(new RegExp(REGEX.PHONE), '0327212321Abc');

    expect(result).toEqual(false);
  });
});

describe('isValidDiscount', () => {
  test('Should is valid discount', () => {
    const result = isValidDiscount(23);

    expect(result).toEqual(true);
  });

  test('Should is not valid discount', () => {
    const result = isValidDiscount(101);

    expect(result).toEqual(false);
  });
});

describe('Should is valid string', () => {
  test('Is valid string', () => {
    const result = isValidString('Phan Huu Loi');

    expect(result).toEqual(true);
  });

  test('Should is not valid string', () => {
    const result = isValidString('Phan');

    expect(result).toEqual(false);
  });
});
