import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import Nav from '.';

describe('Nav', () => {
  const wrapper = renderer.create(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
