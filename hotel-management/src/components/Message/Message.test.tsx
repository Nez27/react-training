import renderer from 'react-test-renderer';

// Components
import Message from '.';

describe('Message', () => {
  const wrapper = renderer.create(<Message>This is a message!</Message>);

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
