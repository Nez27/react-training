import { REGEX } from '@constant/commons';
import { isValidDiscount, isValidRegex, isValidString } from '@helper/validators';

describe('Check value is valid phone', () => {
  test('Is valid phone', () => {
    const result = isValidRegex(new RegExp(REGEX.PHONE), '0327212321');

    expect(result).toEqual(true);
  });

  test('Is invalid phone', () => {
    const result = isValidRegex(new RegExp(REGEX.PHONE), '0327212321Abc');

    expect(result).toEqual(false);
  });
});

describe('Check value is valid discount', () => {
  test('Is valid discount', () => {
    const result = isValidDiscount(23);

    expect(result).toEqual(true);
  });

  test('Is invalid discount', () => {
    const result = isValidDiscount(101);

    expect(result).toEqual(false);
  });
});

describe('Check value is valid string', () => {
  test('Is valid string', () => {
    const result = isValidString('Phan Huu Loi');

    expect(result).toEqual(true);
  });

  test('Is valid string', () => {
    const result = isValidString('Phan');

    expect(result).toEqual(false);
  });
});
