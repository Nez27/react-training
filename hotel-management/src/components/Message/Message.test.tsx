import { render } from '@testing-library/react';

// Components
import Message from '.';

describe('Message', () => {
  const wrapper = render(<Message>This is a message!</Message>);

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
