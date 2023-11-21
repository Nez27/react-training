import renderer from 'react-test-renderer';

import Select from '.';

describe('Select testing snapshot', () => {
  const options = [
    {
      label: 'Option 1',
      value: 'Value 1',
    },
    {
      label: 'Option 2',
      value: 'Value 2'
    }
  ];
  const value = 'Temp value';
  const handleOnChange = () => {
    console.log('On change');
  }

  const wrapper = renderer.create(
    <Select
      options={options}
      value={value}
      onChange={handleOnChange}
      ariaLabel="Sort"
    />
  );

  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
