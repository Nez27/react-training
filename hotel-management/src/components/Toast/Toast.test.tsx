import renderer from 'react-test-renderer';

import Toast from '.';

describe('Toast testing snapshot', () => {
  const wrapper = renderer.create(<Toast />);

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
