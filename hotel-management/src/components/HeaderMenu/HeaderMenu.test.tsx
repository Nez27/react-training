import renderer from 'react-test-renderer';

// Components
import HeaderMenu from '.';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('HeaderMenu', () => {
  const queryClient = new QueryClient();

  const wrapper = renderer.create(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HeaderMenu />
      </BrowserRouter>
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
