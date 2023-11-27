import { waitFor } from '@testing-library/react';

// Services
import { createUser, getAllUsers, updateUser } from '@service/userServices';

// Types
import { IUser } from '@type/users';

const mockGetAllUsers = jest.fn(getAllUsers);
const mockCreateUser = jest.fn(createUser);
const mockUpdateUser = jest.fn(updateUser);

const sampleData: IUser = {
  id: 999,
  name: 'User name test',
  phone: '123456789',
  isBooked: true,
};

describe('User services', () => {
  test('Should fetch user data correctly', async () => {
    mockGetAllUsers.mockResolvedValue([
      {
        id: 1,
        name: 'Nezumi',
        phone: '0324422123',
        isBooked: true,
      },
      {
        id: 2,
        name: 'Loi Phan',
        phone: '0324422145',
        isBooked: false,
      },
    ]);
    const result = await mockGetAllUsers('name', 'asc', '');

    await waitFor(() => expect(result.length).toEqual(2));
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
