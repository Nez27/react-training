import renderer from 'react-test-renderer';

// Components
import Toast from '.';

describe('Toast', () => {
  const wrapper = renderer.create(<Toast />);

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
