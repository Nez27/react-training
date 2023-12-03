// Helpers
import { formatCurrency, getDayDiff } from '@helper/helper';

describe('formatCurrency', () => {
  test('Should format correctly', () => {
    const result = formatCurrency(5000);

    expect(result).toEqual('$5,000.00');
  });
});

describe('getDayDiff', () => {
  test('Should calculate correctly', () => {
    const case_1 = getDayDiff(new Date('2023/11/30'), new Date('2023/12/01'));
    const case_2 = getDayDiff(new Date('2023/12/15'), new Date('2023/12/20'));
    const case_3 = getDayDiff(new Date('2023/12/31'), new Date('2024/01/01'));

    expect(case_1).toEqual(1);
    expect(case_2).toEqual(5);
    expect(case_3).toEqual(1);
  });

  test('Should return 0 if startDate larger than endDate', () => {
    const result = getDayDiff(new Date('2023/11/30'), new Date('2023/11/20'));

    expect(result).toEqual(0);
  });
});
