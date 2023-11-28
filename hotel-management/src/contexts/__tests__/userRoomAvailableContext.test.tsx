import { render, act } from '@testing-library/react';
import * as userServices from '@service/userServices';
import * as roomServices from '@service/roomServices';
import App from '../../App';

jest.mock('@service/userServices');
jest.mock('@service/roomServices');

describe('App', () => {
  test('Should init room, user data', async () => {
    const mockGetUserNotBooked = jest.spyOn(userServices, 'getUserNotBooked');
    const mockGetRoomAvailable = jest.spyOn(roomServices, 'getRoomsAvailable');

    mockGetUserNotBooked.mockResolvedValue([
      {
        id: 1,
        name: 'Nezumi',
      },
      {
        id: 2,
        name: 'Loi Phan',
      },
    ]);

    mockGetRoomAvailable.mockResolvedValue([
      {
        id: 1,
        name: 'Room 1',
      },
      {
        id: 2,
        name: 'Room 2',
      },
    ]);

    await act(async () => {
      render(<App />);
    });
  });
});
