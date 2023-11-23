import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import Nav from '.';

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
