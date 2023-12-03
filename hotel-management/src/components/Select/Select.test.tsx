import { render } from '@testing-library/react';

// Components
import Select from '.';

describe('Select', () => {
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
  const value = 'Temp value';
  const handleOnChange = jest.fn();

  const wrapper = render(
    <Select
      options={options}
      value={value}
      onChange={handleOnChange}
      ariaLabel="Sort"
    />
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
