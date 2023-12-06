import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// Components
import BookingTable from '@src/pages/Booking/BookingTable';

describe('UserTable', () => {
  const queryClient = new QueryClient();

  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BookingTable />
      </BrowserRouter>
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
