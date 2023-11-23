import { useRooms } from '@hook/rooms/useRooms';
import { useCreateRoom } from '@hook/rooms/useCreateRoom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { IRoom } from '@type/rooms';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

const mockUseRooms = jest.fn(useRooms);
const mockUseCreateRoom = jest.fn(useCreateRoom);
// const mockUseUpdateRoom = useUpdateRoom;
// const mockUseDeleteRoom = useDeleteRoom;

jest.mock('@hook/rooms/useRooms');
jest.mock('@hook/rooms/useUpdateRoom');
jest.mock('@hook/rooms/useDeleteRoom');

interface IWrapper {
  children: ReactNode;
}

const sampleData: IRoom = {
  id: 999,
  name: 'Room name test',
  price: 9999,
  status: true,
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: IWrapper) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

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
      count: 1,
    }));
    const { result } = renderHook(() => mockUseRooms(), { wrapper });

    await waitFor(() =>
      expect(result.current.rooms?.length).toBeGreaterThan(0)
    );
  });

  test('Create room', async () => {
    mockUseCreateRoom.mockImplementation(() => ({
      createRoom: () => {sampleData},
      isCreating: false,
      isSuccess: true
    }));
    const { result } = renderHook(() => mockUseCreateRoom(), { wrapper });

    act(() => {
      result.current.createRoom(sampleData);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBeTruthy();
  });

  test('Create failed room', async () => {
    mockUseCreateRoom.mockImplementation(() => ({
      createRoom: () => {sampleData},
      isCreating: false,
      isSuccess: false
    }));
    const { result } = renderHook(() => mockUseCreateRoom(), { wrapper });

    act(() => {
      result.current.createRoom(sampleData);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBeFalsy();
  });

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
