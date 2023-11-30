import { render, act, RenderResult } from '@testing-library/react';
import * as userServices from '@service/userServices';
import * as roomServices from '@service/roomServices';
import App from './App';

jest.mock('@service/userServices');
jest.mock('@service/roomServices');

describe('App', () => {
  let wrapper: RenderResult | null = null;

  beforeEach(async () => {
    await act(async () => {
      wrapper = render(<App />);
    });
  });

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should init room, user data', async () => {
    const mockGetUserNotBooked = jest.spyOn(userServices, 'getAllUsers');
    const mockGetRoomAvailable = jest.spyOn(roomServices, 'getAllRooms');

    mockGetUserNotBooked.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Nezumi',
          phone: '0324432321',
          isBooked: true,
          isDelete: true,
        },
        {
          id: 1,
          name: 'Loi Phan',
          phone: '0324432123',
          isBooked: true,
          isDelete: true,
        },
      ],  
      count: 2,
    });

    mockGetRoomAvailable.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Room 1',
          price: 230,
          status: true,
          isDelete: true,
        },
        {
          id: 2,
          name: 'Room 2',
          price: 242,
          status: true,
          isDelete: true
        },
      ],
      count: 2
    });

    expect(mockGetUserNotBooked).toHaveBeenCalled();
    expect(mockGetRoomAvailable).toHaveBeenCalled();
  });
});
