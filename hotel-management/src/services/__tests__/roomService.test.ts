import { waitFor } from '@testing-library/react';
import supabase from '@service/supabaseService';

// Services
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  updateRoom,
} from '@service/roomServices';

// Types
import { IRoom } from '@type/rooms';

jest.mock('@service/supabaseService');
const mockGetAllRooms = jest.fn(getAllRooms);
const mockUpdateRoom = jest.fn(updateRoom);
const mockCreateRoom = jest.fn(createRoom);
const mockDeleteRoom = jest.fn(deleteRoom);

const sampleData: IRoom = {
  id: 999,
  name: 'Room name test',
  price: 9999,
  status: true,
};

describe('Rooms service', () => {
  test('Should fetch room correctly', async () => {
    mockGetAllRooms.mockResolvedValue([
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
    ]);
    const result = await mockGetAllRooms('name', 'asc', '');

    await waitFor(() => expect(result.length).toEqual(2));
  });

  test('Can not fetch data', async () => {
    jest.spyOn(supabase.from('rooms').select(), 'single').mockRejectedValue(() => {
      return {
        error: 'Error'
      }
    })

    await mockGetAllRooms('name', 'asc', '');

    expect(mockGetAllRooms).toThrow();
  });

  test('Should create room correctly', async () => {
    mockCreateRoom.mockResolvedValue(sampleData);

    const result = await mockCreateRoom(sampleData);

    await waitFor(() => expect(result).toBeTruthy());
  });

  test('Should update room correctly', async () => {
    mockUpdateRoom.mockResolvedValue({
      id: 1,
      name: 'Nezumi',
      price: 2500,
      status: true,
    });
    const result = await mockUpdateRoom(sampleData);

    await waitFor(() => expect(result).toBeTruthy());
  });

  test('Should delete room correctly', async () => {
    mockDeleteRoom.mockImplementation(() => Promise.resolve());
    await mockDeleteRoom(1);
  });
});
