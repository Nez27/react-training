import { RenderResult, fireEvent, render } from '@testing-library/react';

// Components
import OrderBy from '.';

jest.mock('react-router-dom');

describe('Order', () => {
  const options = [
    {
      value: 'value1',
      label: 'Option 1',
    },
    {
      value: 'value2',
      label: 'Option 2',
    },
  ];

  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(<OrderBy options={options} />);
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('handleClick should work correctly', async () => {
    const mockSearchParams = jest.fn();
    // useSearchParams.search = mockSearchParams;
    // setSearchParams = jest.fn();

    const nameButton = wrapper!.getByText('Name');
    fireEvent.click(nameButton);

    expect(mockSearchParams).toHaveBeenCalled();
  });
});
