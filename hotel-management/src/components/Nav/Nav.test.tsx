import renderer from 'react-test-renderer';

// Components
import Nav from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Nav testing snapshot', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
