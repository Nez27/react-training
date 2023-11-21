import renderer from 'react-test-renderer';

import Search from '.';
import { BrowserRouter } from 'react-router-dom';

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
