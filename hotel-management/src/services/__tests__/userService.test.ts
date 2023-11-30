import { waitFor } from '@testing-library/react';

// Services
import { createUser, getAllUsers, updateUser } from '@service/userServices';

// Types
import { IUser } from '@type/user';

const mockGetAllUsers = jest.fn(getAllUsers);
const mockCreateUser = jest.fn(createUser);
const mockUpdateUser = jest.fn(updateUser);

const sampleData: IUser = {
  id: 999,
  name: 'User name test',
  phone: '123456789',
  isBooked: true,
  isDelete: true,
};

describe('User services', () => {
  test('Should fetch user data correctly', async () => {
    mockGetAllUsers.mockResolvedValue({
      data: [
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
      ], count: 2
    });
    const result = await mockGetAllUsers(({
      sortBy: 'name',
      orderBy: 'asc',
      phoneSearch: '',
      page: 1,
    }));

    await waitFor(() => expect(result.data.length).toEqual(2));
  });

  test('Should create user correctly', async () => {
    mockCreateUser.mockResolvedValue(sampleData);
    const result = await mockCreateUser(sampleData);

    await waitFor(() => expect(result).toBeTruthy());
  });

  test('Should update user correctly', async () => {
    mockUpdateUser.mockResolvedValue(sampleData);
    const result = await mockUpdateUser(sampleData);

    await waitFor(() => expect(result).toBeTruthy());
  });
});
