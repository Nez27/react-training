import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';

// Components
import SortBy from '.';

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

describe('SortBy', () => {
  const options = [
    {
      label: 'Option 1',
      value: 'Value1',
    },
    {
      label: 'Option 2',
      value: 'Value2',
    },
  ];
  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <SortBy options={options} />
      </BrowserRouter>
    );
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('handleClick should work correctly', () => {
    const select = wrapper!.getByLabelText('Sort') as HTMLSelectElement;

    fireEvent.change(select, { target: { value: 'Value2' } });

    expect(mockSearchParam.toString()).toEqual('sortBy=Value2');
  });
});
