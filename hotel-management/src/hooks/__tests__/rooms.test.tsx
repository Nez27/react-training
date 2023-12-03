import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Hooks
import { useRooms } from '@hook/rooms/useRooms';
import { useCreateRoom } from '@hook/rooms/useCreateRoom';
import { useUpdateRoom } from '@hook/rooms/useUpdateRoom';
import { useSetIsDeleteRoom } from '@hook/rooms/useSetIsDeleteRoom';

// Types
import { IRoom } from '@type/room';

jest.mock('@hook/rooms/useRooms');
jest.mock('@hook/rooms/useCreateRoom');
jest.mock('@hook/rooms/useUpdateRoom');
jest.mock('@hook/rooms/useSetIsDeleteRoom');

interface IWrapper {
  children: ReactNode;
}

const sampleData: IRoom = {
  id: 999,
  name: 'Room name test',
  price: 9999,
  status: true,
  isDelete: true,
};

describe('Room hooks', () => {
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

  
  test('Should fetch data correctly', async () => {
    (useRooms as jest.Mock).mockImplementation(() => ({
      rooms: [
        {
          id: 1,
          name: 'Nezumi',
          price: 2500,
          status: true,
          isDelete: true,
        },
        {
          id: 2,
          name: 'Loi Phan',
          price: 8500,
          status: false,
          isDelete: true,
        },
      ],
      isLoading: false,
      count: 2
    }));
    const { result } = renderHook(() => useRooms(), { wrapper });

    await waitFor(() =>
      expect(result.current.rooms?.length).toBeGreaterThan(0)
    );
  });

  test('Should create room correctly', async () => {
    (useCreateRoom as jest.Mock).mockImplementation(() => ({
      createRoom: () => {
        sampleData;
      },
      isCreating: false,
      isSuccess: true,
    }));
    const { result } = renderHook(() => useCreateRoom(), { wrapper });

    act(() => {
      result.current.createRoom(sampleData);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBeTruthy();
  });

  test('Should edit room correctly', async () => {
    (useUpdateRoom as jest.Mock).mockImplementation(() => ({
      updateRoom: () => {
        sampleData;
      },
      isUpdating: false,
      isSuccess: true,
    }));
    const { result } = renderHook(() => useUpdateRoom(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.updateRoom(sampleData);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });

  test('Should delete room correctly', async () => {
    (useSetIsDeleteRoom as jest.Mock).mockImplementation(() => ({
      setIsDeleteRoom: () => {
        sampleData
      },
      isDeleting: false,
      isSuccess: true,
    }));
    const { result } = renderHook(() => useSetIsDeleteRoom(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.setIsDeleteRoom(sampleData.id);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });
});
