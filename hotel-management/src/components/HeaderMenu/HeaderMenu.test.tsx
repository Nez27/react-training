import renderer from 'react-test-renderer';

// Components
import HeaderMenu from '.';

describe('HeaderMenu testing snapshot', () => {
  const wrapper = renderer.create(<HeaderMenu />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
