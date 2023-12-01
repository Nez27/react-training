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
    const result = getDayDiff(new Date('2023/11/30'), new Date('2023/12/01'));

    expect(result).toEqual(1);
  });
});
