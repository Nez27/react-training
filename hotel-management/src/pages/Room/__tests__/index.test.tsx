import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

// Components
import Room from '..';

describe('Room', () => {
  const queryClient = new QueryClient();

  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Room />
      </BrowserRouter>
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
