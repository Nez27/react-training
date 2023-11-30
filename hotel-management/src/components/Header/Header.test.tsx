import renderer from 'react-test-renderer';

// Components
import Header from '.';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Header', () => {
  const queryClient = new QueryClient();

  const wrapper = renderer.create(
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
