import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import AppLayout from '.';

describe('AppLayout', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
