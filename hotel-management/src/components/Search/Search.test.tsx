import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { RenderResult, fireEvent, render } from '@testing-library/react';

// Components
import Search from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

jest.mock('@src/hooks/useDebounce', () => ({
  useDebounce: jest.fn((value) => value),
}));

describe('Search', () => {
  const mockSearchParams = new URLSearchParams();
  (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams, jest.fn()]);
  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <Search setPlaceHolder="Search" />
      </BrowserRouter>
    );
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('updates searchParams on input change', () => {
    const searchInput = wrapper!.getByPlaceholderText('Search');

    // Type into the search input
    fireEvent.change(searchInput, { target: { value: 'Search value' } });

    // Expect searchParams to be updated
    expect(mockSearchParams.get('search')).toBe('Search value');
  });
});
