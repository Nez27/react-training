import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import AppLayout from '.';

describe('AppLayout testing snapshot', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
