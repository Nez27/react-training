import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import SortBy from '.';

describe('<SortBy.test />', () => {
  const options = [
    {
      label: 'Option 1',
      value: 'Value 1',
    },
    {
      label: 'Option 2',
      value: 'Value 2',
    },
  ];
  const wrapper = renderer.create(
    <BrowserRouter>
      <SortBy options={options} />
    </BrowserRouter>
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
