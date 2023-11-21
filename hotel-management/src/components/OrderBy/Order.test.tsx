import renderer from 'react-test-renderer';

import Order from '.';
import { BrowserRouter } from 'react-router-dom';

describe('<Order.test />', () => {
  const options = [
    {
      value: 'Value 1',
      label: 'Option 1',
    },
    {
      value: 'Value 2',
      label: 'Option 2',
    },
  ];

  const wrapper = renderer.create(
    <BrowserRouter>
      <Order options={options} />
    </BrowserRouter>
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
