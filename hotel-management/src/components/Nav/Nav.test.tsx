import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Nav from '.';

describe('Nav', () => {
  const wrapper = render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
