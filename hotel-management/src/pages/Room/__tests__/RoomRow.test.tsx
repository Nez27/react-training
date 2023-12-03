import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

// Types
import { IRoom } from '@type/room';

// Components
import RoomRow from '../RoomRow';

describe('RoomRow', () => {
  const tempRoom: IRoom = {
    id: 1,
    name: 'Temp Room',
    price: 2399,
    status: false,
    isDelete: true,
  };

  const queryClient = new QueryClient();
  const wrapper = render(
    <QueryClientProvider client={queryClient}>
      <RoomRow room={tempRoom} />
    </QueryClientProvider>
  );

  test('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
