import { render } from '@testing-library/react';
import Login from '..';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  test('Should render correctly', () => {
    const queryClient = new QueryClient();

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
