import { render, fireEvent, RenderResult } from '@testing-library/react';
import Pagination from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Pagination', () => {
  const count = 10;
  let wrapper: RenderResult | null = null;

  jest.mock('react-router-dom', () => ({
    useSearchParams: jest.fn(() => [new URLSearchParams(), jest.fn()]),
  }));

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <Pagination count={count} />
      </BrowserRouter>
    );
  });

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Next button should be disable when in the last page', () => {
    fireEvent.click(wrapper!.getByText('Next'));

    expect(wrapper!.getByText('Next').closest('button')).toBeDisabled();
  });

  test('Previous button should not be disable when move to second page', () => {
    fireEvent.click(wrapper!.getByText('Next'));

    expect(wrapper!.getByText('Previous').closest('button')).not.toBeDisabled();
  });

  test('Previous button should be disabled when go back to the first page', () => {
    // Navigate to the second page
    fireEvent.click(wrapper!.getByText('Next'));

    // Back to the first page
    fireEvent.click(wrapper!.getByText('Previous'));

    expect(wrapper!.getByText('Previous').closest('button')).toBeDisabled();
  });
});
