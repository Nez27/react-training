import { useState } from 'react';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import OrderBy from '.';

let mockSearchParam = '';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
    return [
      params,
      (newParams: string) => {
        mockSearchParam = newParams;
        setParams(new URLSearchParams(newParams));
      },
    ];
  },
}));

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
    wrapper = render(
      <MemoryRouter>
        <OrderBy options={options} />
      </MemoryRouter>
    );
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('handleClick should work correctly', async () => {
    const nameButton = wrapper!.getByText('Option 2');
    fireEvent.click(nameButton);

    expect(mockSearchParam.toString()).toEqual('orderBy=value2');
  });
});
