import renderer from 'react-test-renderer';

// Components
import HeaderMenu from '.';

describe('HeaderMenu', () => {
  const wrapper = renderer.create(<HeaderMenu />);

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
