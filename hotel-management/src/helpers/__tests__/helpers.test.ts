// Helpers
import { formatCurrency } from '@helper/helper';

describe('formatCurrency', () => {
  test('Should format correctly', () => {
    const result = formatCurrency(5000);

    expect(result).toEqual('$5,000.00');
  });
});
