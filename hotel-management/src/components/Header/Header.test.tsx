import renderer from 'react-test-renderer';

// Components
import Header from '.';

describe('Header', () => {
  const wrapper = renderer.create(<Header accountName="Nezumi" />);

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
