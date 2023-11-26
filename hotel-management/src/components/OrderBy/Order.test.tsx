import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import Order from '.';

describe('Order', () => {
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

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
