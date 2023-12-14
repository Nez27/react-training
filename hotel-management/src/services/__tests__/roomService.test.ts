import { ERROR_CREATE_ROOM, ERROR_DELETE_ROOM, ERROR_FETCHING_ROOM, ERROR_UPDATE_ROOM } from '@src/constants/messages';
import { createRoom, getAllRooms, getRoomById, setIsDeleteRoom, updateRoom, updateRoomStatus } from '@src/services/roomServices';
import supabase from '@src/services/supabaseService';

jest.mock('@src/services/supabaseService', () => ({
  __esModule: true,
  default: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          like: jest.fn(() => ({
            eq: jest.fn(() => ({
              range: jest.fn(() => ({
                then: jest.fn(),
              })),
              then: jest.fn(),
            })),
          })),
        })),
      })),
    })),
  },
}));

const sampleData = [
  {
    id: 1,
    name: 'Room 1',
    price: 2300,
    status: true,
    isDelete: false,
  },
  {
    id: 2,
    name: 'Room 2',
    price: 2300,
    status: true,
    isDelete: false,
  },
];

describe('getAllRooms', () => {
  test('should fetch all rooms successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData, count: 2 });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          like: jest.fn(() => ({
            eq: jest.fn(() => ({
              range: mockedQuery,
            })),
          })),
        })),
      })),
    }));

    const result = await getAllRooms({
      sortBy: 'name',
      orderBy: 'asc',
      roomSearch: 'test',
      page: 1,
    });

    expect(result.data.length).toEqual(2);
    expect(result.count).toBe(2);
  });

  test('Should return error when fetch failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'Error message' });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          like: jest.fn(() => ({
            eq: jest.fn(() => ({
              range: mockedQuery,
            })),
          })),
        })),
      })),
    }));

    await expect(getAllRooms({
      sortBy: 'name',
      orderBy: 'asc',
      roomSearch: 'test',
      page: 1,
    })).rejects.toThrow(ERROR_FETCHING_ROOM);
  });
});

describe('createRoom', () => {
  test('should create room successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0] });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: mockedQuery
        })),
      })),
    }));

    const result = await createRoom(sampleData[0]);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should return error when create failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'error message' });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: mockedQuery
        })),
      })),
    }));

    await expect(createRoom(sampleData[0])).rejects.toThrow(ERROR_CREATE_ROOM);
  });
});

describe('updateRoom', () => {
  test('should update room successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0] });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: mockedQuery
          })),
        })),
      })),
    }));

    const result = await updateRoom(sampleData[0]);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should return error when fetch failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'error message' });
    (supabase.from as jest.Mock).mockImplementation(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: mockedQuery
          })),
        })),
      })),
    }));

    await expect(updateRoom(sampleData[0])).rejects.toThrow(ERROR_UPDATE_ROOM);
  });
});

describe('setIsDeleteRoom', () => {
  test('should set is delete room successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0] });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: mockedQuery
          })),
        })),
      })),
    }));

    const result = await setIsDeleteRoom(1);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should return error when set is delete room failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'error message' });
    (supabase.from as jest.Mock).mockImplementation(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: mockedQuery
          })),
        })),
      })),
    }));

    await expect(setIsDeleteRoom(1)).rejects.toThrow(ERROR_DELETE_ROOM);
  });
});

describe('getRoomById', () => {
  test('should return the data when get successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0] });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: mockedQuery
        })),
      })),
    }));

    const result = await getRoomById('1');

    expect(result).toEqual(sampleData[0]);
  });

  test('Should return error when set is delete room failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'error message' });

      (supabase.from as jest.Mock).mockImplementation(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: mockedQuery
          })),
        })),
      }));

    await expect(getRoomById('1')).rejects.toThrow(ERROR_FETCHING_ROOM);
  });
});

describe('updateRoomStatus', () => {
  test('should return the data when get successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0] });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: mockedQuery
        })),
      })),
    }));

    const result = await getRoomById('1');

    expect(result).toEqual(sampleData[0]);
  });

  test('Should return error when set is delete room failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'error message' });

      (supabase.from as jest.Mock).mockImplementation(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: mockedQuery
          })),
        })),
      }));

    await expect(getRoomById('1')).rejects.toThrow(ERROR_FETCHING_ROOM);
  });
});

describe('updateRoomStatus', () => {
  test('Should return the data when update status successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: '' });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      update: jest.fn(() => ({
        eq: mockedQuery
      })),
    }));

    const result = await updateRoomStatus(1, false);

    expect(result).toBeUndefined();
  });

  test('Should return error when update status failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'error message' });

      (supabase.from as jest.Mock).mockImplementation(() => ({
        update: jest.fn(() => ({
          eq: mockedQuery
        })),
      }));

    await expect(updateRoomStatus(1, false)).rejects.toThrow(ERROR_UPDATE_ROOM);
  });
});
