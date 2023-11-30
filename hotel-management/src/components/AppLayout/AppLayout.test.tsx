import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

// Components
import AppLayout from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('AppLayout', () => {
  const queryClient = new QueryClient();

  const wrapper = renderer.create(
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
