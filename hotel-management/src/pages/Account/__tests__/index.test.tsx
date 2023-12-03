import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import Account from '..';

describe('Account', () => {
  test('Should render correctly', () => {
    const queryClient = new QueryClient();
    const wrapper = render(
      <QueryClientProvider client={queryClient}>
        <Account />
      </QueryClientProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
