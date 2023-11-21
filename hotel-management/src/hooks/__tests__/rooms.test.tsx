import { useRooms } from '@hook/rooms/useRooms';
import { renderHook, waitFor } from '@testing-library/react';

describe('CRUD Room testing', () => {
  test('Fetch room data', async () => {
    const { result } = renderHook(() => useRooms());
    const { rooms } = result.current;

    await waitFor(() => expect(rooms?.length).toBeGreaterThan(0))
  })
})
