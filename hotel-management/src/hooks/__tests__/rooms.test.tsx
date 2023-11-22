import { useRooms } from '@hook/rooms/useRooms';
// import { useCreateRoom } from '@hook/rooms/useCreateRoom';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
// import { IRoom } from '@type/rooms';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { supabaseUrl } from '@constant/config';

const mockUseRooms = jest.fn(useRooms);
// const mockUseCreateRoom = jest.fn(useCreateRoom);
// const mockUseUpdateRoom = useUpdateRoom;
// const mockUseDeleteRoom = useDeleteRoom;

jest.mock('@hook/rooms/useRooms');
jest.mock('@hook/rooms/useUpdateRoom');
jest.mock('@hook/rooms/useDeleteRoom');

interface IWrapper {
  children: ReactNode;
}

// const sampleData: IRoom = {
//   id: 999,
//   name: 'Room name test',
//   price: 9999,
//   status: true,
// };
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const queryCache = new QueryCache();
const wrapper = ({ children }: IWrapper) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

const server = setupServer(
  http.post(supabaseUrl, async ({ request }) => {
    const data = await request.formData();

    console.log(data);
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
afterAll(() => server.close());

describe('CRUD Room testing', () => {
  test('Fetch room data', async () => {
    mockUseRooms.mockImplementation(() => ({
      rooms: [
        {
          id: 1,
          name: 'Nezumi',
          price: 2500,
          status: true,
        },
        {
          id: 2,
          name: 'Loi Phan',
          price: 8500,
          status: false,
        },
      ],
      isLoading: false,
    }));
    const { result } = renderHook(() => mockUseRooms(), { wrapper });

    await waitFor(() =>
      expect(result.current.rooms?.length).toBeGreaterThan(0)
    );
  });

  // test('Create room', async () => {
  //   const { result } = renderHook(() => useCreateRoom(), { wrapper });

  //   act(() => {
  //     result.current.createRoom(sampleData);
  //   });

  //   await waitFor(() => result.current.isSuccess);

  //   expect(result.current.isSuccess).toBeTruthy();
  // });

  // test('Edit room', async () => {
  //   const { result } = renderHook(() => useUpdateRoom(), { wrapper });

  //   act(() => {
  //     const testMethod = async () => {
  //       result.current.updateRoom(sampleData);
  //       await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
  //     };

  //     testMethod();
  //   });
  // });

  // test('Delete room', async () => {
  //   const { result } = renderHook(() => useDeleteRoom(), { wrapper });

  //   act(() => {
  //     const testMethod = async () => {
  //       result.current.deleteRoom(sampleData.id);
  //       await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
  //     };

  //     testMethod();
  //   });
  // });
});
