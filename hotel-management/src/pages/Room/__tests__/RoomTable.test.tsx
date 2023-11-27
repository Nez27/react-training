import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import RoomTable from '../RoomTable';

describe('RoomTable', () => {
  const queryClient = new QueryClient();

  const wrapper = renderer.create(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RoomTable />
      </QueryClientProvider>
    </BrowserRouter>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
