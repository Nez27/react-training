import { render } from '@testing-library/react';
import RouteProtected from '.';
import AppLayout from '../AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

describe('RouteProtected', () => {
  test('Should render correctly', () => {
    const queryClient = new QueryClient();

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouteProtected>
            <AppLayout />
          </RouteProtected>
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
