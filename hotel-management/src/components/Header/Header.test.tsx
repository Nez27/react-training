import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import Header from '.';

describe('Header', () => {
  const queryClient = new QueryClient();

  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header accountName="Nezumi" />
      </BrowserRouter>
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
