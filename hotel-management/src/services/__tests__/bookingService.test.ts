import {
  ERROR_CHECKOUT,
  ERROR_CREATE_BOOKING,
  ERROR_FETCHING_BOOKING,
  ERROR_UPDATE_BOOKING,
} from '@constant/messages';
import {
  checkOutBooking,
  createBooking,
  getAllBookings,
  updateBooking,
} from '@service/bookingServices';
import supabase from '@service/supabaseService';
import { IBooking } from '@type/booking';

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

const sampleData: IBooking[] = [
  {
    id: 1,
    startDate: '2023/11/12',
    endDate: '2023/11/15',
    amount: 2300,
    status: true,
    roomId: 1,
    userId: 2,
  },
  {
    id: 2,
    startDate: '2023/12/12',
    endDate: '2023/12/15',
    amount: 23001,
    status: false,
    roomId: 2,
    userId: 3,
  },
];

const errorMessage = 'Error message';

describe('getAllBookings', () => {
  test('Should fetch all bookings successfully', async () => {
    const mockedQuery = jest
      .fn()
      .mockReturnValue({ data: sampleData, count: 2 });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn(() => ({
        ilike: jest.fn(() => ({
          range: mockedQuery,
        })),
      })),
    }));

    const result = await getAllBookings({
      userNameSearch: 'test',
      page: 1,
    });

    expect(result.data.length).toEqual(2);
    expect(result.count).toBe(2);
  });

  test('Should throw error when fetch failed.', async () => {
    const mockedQuery = jest.fn().mockReturnValue({ error: errorMessage });

    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: jest.fn(() => ({
        ilike: jest.fn(() => ({
          range: mockedQuery,
        })),
      })),
    }));

    await expect(
      getAllBookings({
        userNameSearch: 'test',
        page: 1,
      })
    ).rejects.toThrow(ERROR_FETCHING_BOOKING);
  });
});

describe('createBooking', () => {
  test('Should create booking successfully', async () => {
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

    const result = await updateBooking(sampleData[0]);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should throw error when create failed.', async () => {
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

    await expect(updateBooking(sampleData[0])).rejects.toThrow(
      ERROR_UPDATE_BOOKING
    );
  });
});

describe('updateBooking', () => {
  test('Should update booking successfully', async () => {
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

    const result = await createBooking(sampleData[0]);

    expect(result).toEqual(sampleData[0]);
  });

  test('Should throw error when update failed.', async () => {
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

    await expect(createBooking(sampleData[0])).rejects.toThrow(
      ERROR_CREATE_BOOKING
    );
  });
});

describe('checkOutBooking', () => {
  test('Should checkout booking successfully', async () => {
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

    const result = await checkOutBooking({
      idBooking: 1,
      roomId: 2,
      userId: 3,
    });

    expect(result).toEqual(sampleData[0]);
  });

  test('Should throw error when checkout failed.', async () => {
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

    await expect(
      checkOutBooking({
        idBooking: 1,
        roomId: 2,
        userId: 3,
      })
    ).rejects.toThrow(ERROR_CHECKOUT);
  });
});
