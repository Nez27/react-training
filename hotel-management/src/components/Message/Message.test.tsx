import renderer from 'react-test-renderer';

import Message from '.';

describe('Message testing snapshot', () => {
  const wrapper = renderer.create(<Message>This is a message!</Message>);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
