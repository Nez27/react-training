// Contexts
import { reducer } from '../UserRoomAvailableContext';

// Types
import { IDataState } from '@src/types/common';

describe('userRoomAvailableContext', () => {
  let initialState: {
    roomsAvailable: IDataState[];
    usersAvailable: IDataState[];
  };

  const sampleRooms = [
    {
      id: 2,
      name: 'Room 2',
    },
    {
      id: 3,
      name: 'Room 3',
    },
  ];

  const sampleUsers = [
    {
      id: 2,
      name: 'Loi Phan',
    },
    {
      id: 3,
      name: 'Van A',
    },
  ];

  beforeEach(() => {
    initialState = {
      roomsAvailable: [
        {
          id: 1,
          name: 'Room 1',
          status: true,
        },
      ],
      usersAvailable: [
        {
          id: 1,
          name: 'Nezumi',
          isBooked: true,
        },
      ],
    };
  });

  test('Should init user correctly', async () => {
    const state = reducer(initialState, {
      type: 'initUser',
      payload: sampleUsers,
    });

    expect(state.usersAvailable.length).toEqual(2);
  });

  test('Should add user correctly', async () => {
    const state = reducer(initialState, {
      type: 'addUser',
      payload: [{ id: 2, name: 'Test Name' }],
    });

    expect(state.usersAvailable.length).toEqual(2);
  });

  test('Should remove user correctly', async () => {
    const state = reducer(initialState, {
      type: 'removeUser',
      payload: [{ id: 1 }],
    });

    expect(state.usersAvailable.length).toEqual(0);
  });

  test('Should update user correctly', async () => {
    const state = reducer(initialState, {
      type: 'updateUserName',
      payload: [{ id: 1, name: 'Update name' }],
    });

    expect(state.usersAvailable[0]).toEqual({
      id: 1,
      name: 'Update name',
      isBooked: true,
    });
  });

  test('Should init room correctly', async () => {
    const state = reducer(initialState, {
      type: 'initRoom',
      payload: sampleRooms,
    });

    expect(state.roomsAvailable.length).toEqual(2);
  });

  test('Should add room correctly', async () => {
    const state = reducer(initialState, {
      type: 'addRoom',
      payload: [{ id: 2, name: 'Test Room' }],
    });

    expect(state.roomsAvailable.length).toEqual(2);
  });

  test('Should remove room correctly', async () => {
    const state = reducer(initialState, {
      type: 'removeRoom',
      payload: [{ id: 1 }],
    });

    expect(state.roomsAvailable.length).toEqual(0);
  });

  test('Should update room correctly', async () => {
    const state = reducer(initialState, {
      type: 'updateRoomName',
      payload: [{ id: 1, name: 'Update name' }],
    });

    expect(state.roomsAvailable[0]).toEqual({
      id: 1,
      name: 'Update name',
      status: true,
    });
  });

  test('Should update room status correctly', async () => {
    const state = reducer(initialState, {
      type: 'updateStatusRoom',
      payload: [{ id: 1, status: false }],
    });

    expect(state.roomsAvailable[0]).toEqual({
      id: 1,
      name: 'Room 1',
      status: false,
    });
  });

  test('Should update user status correctly', async () => {
    const state = reducer(initialState, {
      type: 'updateStatusUser',
      payload: [{ id: 1, isBooked: false }],
    });

    expect(state.usersAvailable[0]).toEqual({
      id: 1,
      name: 'Nezumi',
      isBooked: false,
    });
  });
});
