import renderer from 'react-test-renderer';

// Components
import Message from '.';

describe('Message testing snapshot', () => {
  const wrapper = renderer.create(<Message>This is a message!</Message>);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
