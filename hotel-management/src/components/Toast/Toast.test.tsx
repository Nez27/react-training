import { render } from '@testing-library/react';

// Components
import Toast from '.';

describe('Toast', () => {
  const wrapper = render(<Toast />);

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
