import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import AppLayout from '.';

describe('AppLayout', () => {
  const queryClient = new QueryClient();

  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
