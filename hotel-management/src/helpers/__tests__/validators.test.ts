// Constants
import { REGEX } from '@src/constants/commons';

// Helpers
import {
  compareTwoDates,
  isValidDiscount,
  isValidRegex,
  isValidString,
} from '../validators';

describe('isValidPhone', () => {
  const isValidPhone = (phone: string) =>
    isValidRegex(new RegExp(REGEX.PHONE), phone);

  test('Should is valid phone', () => {
    const case_1 = isValidPhone('0321123212');
    const case_2 = isValidPhone('0533245422');
    const case_3 = isValidPhone('0723342321');
    const case_4 = isValidPhone('0823654321');
    const case_5 = isValidPhone('0943212343');

    expect(case_1).toBeTruthy();
    expect(case_2).toBeTruthy();
    expect(case_3).toBeTruthy();
    expect(case_4).toBeTruthy();
    expect(case_5).toBeTruthy();
  });

  test('Should is not valid phone', () => {
    const case_1 = isValidPhone('0327212321Abc');
    const case_2 = isValidPhone('0021432123');
    const case_3 = isValidPhone('@325542321');
    const case_4 = isValidPhone('A321443232');
    const case_5 = isValidPhone('ValidPhone');
    const case_6 = isValidPhone('000');

    expect(case_1).toBeFalsy();
    expect(case_2).toBeFalsy();
    expect(case_3).toBeFalsy();
    expect(case_4).toBeFalsy();
    expect(case_5).toBeFalsy();
    expect(case_6).toBeFalsy();
  });
});

describe('isValidDiscount', () => {
  test('Should is valid discount', () => {
    const case_1 = isValidDiscount(99.99);
    const case_2 = isValidDiscount(50);
    const case_3 = isValidDiscount(0);
    const case_4 = isValidDiscount(100);

    expect(case_1).toBeTruthy();
    expect(case_2).toBeTruthy();
    expect(case_3).toBeTruthy();
    expect(case_4).toBeTruthy();
  });

  test('Should is not valid discount', () => {
    const case_1 = isValidDiscount(-1);
    const case_2 = isValidDiscount(-0.99);
    const case_3 = isValidDiscount(101);

    expect(case_1).toBeFalsy();
    expect(case_2).toBeFalsy();
    expect(case_3).toBeFalsy();
  });
});

describe('Should is valid string', () => {
  test('Is valid string', () => {
    const case_1 = isValidString('Phan Huu Loi');
    const case_2 = isValidString('Nezumi');

    expect(case_1).toBeTruthy();
    expect(case_2).toBeTruthy();
  });

  test('Should is not valid string', () => {
    const case_1 = isValidString('Le');
    const case_2 = isValidString('1tét');
    const case_3 = isValidString('@!');
    const case_4 = isValidString('     ');

    expect(case_1).toBeFalsy();
    expect(case_2).toBeFalsy();
    expect(case_3).toBeFalsy();
    expect(case_4).toBeFalsy();
  });
});

describe('Should compare two dates correctly', () => {
  test('The start date should greater than end date', () => {
    const result = compareTwoDates(
      new Date('2023/12/05'),
      new Date('2023/12/01')
    );

    expect(result).toBe(true);
  });

  test('The start date should fewer than end date', () => {
    const result = compareTwoDates(
      new Date('2023/12/01'),
      new Date('2023/12/05')
    );

    expect(result).toBe(false);
  });
});
