import { useCreateRoom } from '@hook/rooms/useCreateRoom';
import { useDeleteRoom } from '@hook/rooms/useDeleteRoom';
import { useRooms } from '@hook/rooms/useRooms';
import { useUpdateRoom } from '@hook/rooms/useUpdateRoom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { IRoom } from '@type/rooms';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-test-renderer';

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
    const { result } = renderHook(() => useRooms(), { wrapper });

    await waitFor(() =>
      expect(result.current.rooms?.length).toBeGreaterThan(0)
    );
  });

  test('Create room', async () => {
    const { result } = renderHook(() => useCreateRoom(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.createRoom(sampleData);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });

  test('Edit room', async () => {
    const { result } = renderHook(() => useUpdateRoom(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.updateRoom(sampleData);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });

  test('Delete room', async () => {
    const { result } = renderHook(() => useDeleteRoom(), { wrapper });

    act(() => {
      const testMethod = async () => {
        result.current.deleteRoom(sampleData.id);
        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      };

      testMethod();
    });
  });
});
