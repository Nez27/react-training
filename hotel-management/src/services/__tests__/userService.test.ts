// Services
import { createUser, getAllUsers, setIsDeleteUser, updateUser, updateUserBookedStatus } from '@service/userServices';

// Types
import { IUser } from '@type/user';
import supabase from '@service/supabaseService';
import { ERROR_CREATE_USER, ERROR_DELETE_USER, ERROR_FETCHING_USER, ERROR_UPDATE_USER } from '@constant/messages';

jest.mock('@service/supabaseService', () => ({
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

const sampleData: IUser[] = [
  {
    id: 1,
    name: 'Nezumi',
    phone: '0324422123',
    isBooked: true,
    isDelete: true,
  },
  {
    id: 2,
    name: 'Loi Phan',
    phone: '0324422145',
    isBooked: false,
    isDelete: true,
  },
];

const errorMessage = 'error';

describe('getAllUsers', () => {
  test('Should fetch user data correctly', async () => {
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

    const result = await getAllUsers({
      sortBy: 'name',
      orderBy: 'asc',
      phoneSearch: 'test',
      page: 1,
    });

    expect(result.data.length).toEqual(2);
    expect(result.count).toBe(2);
  });

  test('Should throw error if have problem when fetch data', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData, count: 2, error: errorMessage });

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

    await expect(
      getAllUsers({
        sortBy: 'name',
        orderBy: 'asc',
        phoneSearch: 'test',
        page: 1,
      })
    ).rejects.toThrow(ERROR_FETCHING_USER);
  });
});

describe('createUser', () => {
  test('Should create user successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0], error: '' });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: mockedQuery,
        })),
      })),
    }));

    const result = await createUser(sampleData[0]);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should throw error if have problem when create user', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0], error: errorMessage });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: mockedQuery,
        })),
      })),
    }));

    await expect(createUser(sampleData[0])).rejects.toThrow(ERROR_CREATE_USER);
  });
});

describe('updateUser', () => {
  test('Should update user successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0], error: '' });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: mockedQuery,
          })),
        })),
      })),
    }));

    const result = await updateUser(sampleData[0]);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should throw error if have problem when update user', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData[0], error: errorMessage });

      (supabase.from as jest.Mock).mockImplementation(() => ({
        update: jest.fn(() => ({
          eq: jest.fn(() => ({
            select: jest.fn(() => ({
              single: mockedQuery,
            })),
          })),
        })),
      }));

    await expect(updateUser(sampleData[0])).rejects.toThrow(ERROR_UPDATE_USER);
  });
});

describe('setIsDeleteUser', () => {
  test('Should set is delete user successfully', async () => {
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

    const result = await setIsDeleteUser(1);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should return error when set is delete user failed.', async () => {
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

    await expect(setIsDeleteUser(1)).rejects.toThrow(ERROR_DELETE_USER);
  });
});

describe('updateUserBookedStatus', () => {
  test('Should return the data when get successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: '' });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      update: jest.fn(() => ({
        eq: mockedQuery
      })),
    }));

    const result = await updateUserBookedStatus(1, false);

    expect(result).toBeUndefined();
  });

  test('Should return error when set is delete user failed.', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ error: 'error message' });

      (supabase.from as jest.Mock).mockImplementation(() => ({
        update: jest.fn(() => ({
          eq: mockedQuery
        })),
      }));

    await expect(updateUserBookedStatus(1, false)).rejects.toThrow(ERROR_UPDATE_USER);
  });
});
