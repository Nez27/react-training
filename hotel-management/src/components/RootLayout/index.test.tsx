import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import RootLayout from '.';

describe('RootLayout', () => {
  test('Should render correctly', () => {
    const queryClient = new QueryClient();

    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
