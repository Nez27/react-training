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

    expect(mockGetUserNotBooked).toHaveBeenCalled();
    expect(mockGetRoomAvailable).toHaveBeenCalled();
  });
});
