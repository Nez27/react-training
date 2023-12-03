import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import User from '..';

describe('User', () => {
  const queryClient = new QueryClient();

  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <User />
      </BrowserRouter>
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
