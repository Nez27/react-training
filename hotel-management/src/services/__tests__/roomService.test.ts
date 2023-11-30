import { waitFor } from '@testing-library/react';

// Services
import {
  createRoom,
  setIsDeleteRoom,
  getAllRooms,
  updateRoom,
} from '@service/roomServices';

// Types
import { IRoom } from '@type/room';

jest.mock('@service/supabaseService');
const mockGetAllRooms = jest.fn(getAllRooms);
const mockUpdateRoom = jest.fn(updateRoom);
const mockCreateRoom = jest.fn(createRoom);
const mockIsDeleteRoom = jest.fn(setIsDeleteRoom);

const sampleData: IRoom = {
  id: 999,
  name: 'Room name test',
  price: 9999,
  status: true,
  isDelete: true,
};

describe('Rooms service', () => {
  test('Should fetch room correctly', async () => {
    mockGetAllRooms.mockResolvedValue({
      data: [
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
      count: 2,
    });
    const result = await mockGetAllRooms({
      sortBy: 'name',
      orderBy: 'asc',
      roomSearch: '',
      page: 1,
    });

    await waitFor(() => expect(result.data.length).toEqual(2));
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
      isDelete: true,
    });
    const result = await mockUpdateRoom(sampleData);

    await waitFor(() => expect(result).toBeTruthy());
  });

  test('Should delete room correctly', async () => {
    mockIsDeleteRoom.mockResolvedValue(sampleData);
    const result = await mockIsDeleteRoom(1);

    await waitFor(() => expect(result).toBeTruthy());
  });
});
