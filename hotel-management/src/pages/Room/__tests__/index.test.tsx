import Room from '..';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import renderer from 'react-test-renderer';

describe('Room', () => {
  const queryClient = new QueryClient();

  const wrapper = renderer.create(
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
