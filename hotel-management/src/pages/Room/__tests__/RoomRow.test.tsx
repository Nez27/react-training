import renderer from 'react-test-renderer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types
import { IRoom } from '@type/room';

// Components
import RoomRow from '../RoomRow';

describe('RoomRow', () => {
  const tempRoom: IRoom = {
    id: 1,
    name: 'Temp Room',
    price: 250,
    status: true,
  };
  const queryClient = new QueryClient();

  const wrapper = renderer.create(
    <QueryClientProvider client={queryClient}>
      <RoomRow room={tempRoom} key={tempRoom.id} />
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
