import { formatCurrency } from '@helper/helper';

describe('Helpers function test', () => {
  test('Format number to currency format', () => {
    const result = formatCurrency(5000);

    expect(result).toEqual('$5,000.00');
  });
});
