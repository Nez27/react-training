import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import Search from '.';

describe('Search testing snapshot', () => {
  const placeHolder = 'Search placeholder...';
  const wrapper = renderer.create(
    <BrowserRouter>
      <Search setPlaceHolder={placeHolder} />
    </BrowserRouter>
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
