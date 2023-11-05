import toast from 'react-hot-toast';

// Types
import { Nullable } from '../types/common';
import { TRoom } from '../types/rooms';
import { TResponse } from '../types/response';

// Helpers
import { sendRequest } from '../helpers/sendRequest';

// Constants
import { STATUS_CODE, RESPONSE_MESSAGE } from '../constants/responseStatus';
import { errorMsg } from '../constants/messages';
import { ROOM_PATH } from '../constants/path';

/**
 * Get all rooms from server
 * @returns Return all rooms in server
 */
const getAllRoom = async (): Promise<Nullable<TRoom[]>> => {
  try {
    const response = await sendRequest<TRoom[]>(ROOM_PATH);

    if (response.statusCode === STATUS_CODE.OK) {
      const rooms = response.data!;

      return rooms;
    } else {
      throw new Error(errorMsg(response.statusCode, response.msg));
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }

  return null;
};

/**
 * Get room by id
 * @param roomId The id room need to be get
 * @returns Return the room object depend on room id
 */
const getRoom = async (roomId: number): Promise<Nullable<TRoom>> => {
  try {
    const response = await sendRequest<TRoom>(ROOM_PATH + '/' + roomId);

    if (response.statusCode === STATUS_CODE.OK) {
      const rooms = response.data!;

      return rooms;
    } else {
      throw new Error(errorMsg(response.statusCode, response.msg));
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }

  return null;
};

/**
 * Update room into server
 * @param room Room object need to be updated
 * @returns The response object
 */
const updateRoom = async (room: TRoom): Promise<Nullable<TResponse<TRoom>>> => {
  try {
    const response = await sendRequest<TRoom>(
      ROOM_PATH + '/' + room.id,
      'PUT',
      JSON.stringify(room)
    );

    if (response.statusCode !== STATUS_CODE.OK) {
      throw new Error(errorMsg(response.statusCode, response.msg));
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }

  return null;
};

/**
 * Update room status
 * @param roomId The id room need to be updated
 * @param status Status of room
 * @param roomIdNew The new id room need to be updated
 * @returns Return the response object
 */
const updateRoomStatus = async (
  roomId: number,
  status: boolean,
  roomIdNew?: number
): Promise<Nullable<TResponse<TRoom>>> => {
  if (!roomIdNew) {
    const response = await sendRequest<TRoom>(
      ROOM_PATH + '/' + roomId,
      'PATCH',
      JSON.stringify({ status: status })
    );

    return response;
  }
  
  // Update new room status
  const resNewRoom = await sendRequest<TRoom>(
    ROOM_PATH + '/' + roomIdNew,
    'PATCH',
    JSON.stringify({ status: status })
  );

  // Update old room status;
  const resOldRoom = await sendRequest<TRoom>(
    ROOM_PATH + '/' + roomId,
    'PATCH',
    JSON.stringify({ status: !status })
  );

  if (
    resNewRoom.statusCode === STATUS_CODE.OK &&
    resOldRoom.statusCode === STATUS_CODE.OK
  ) {
    return {
      statusCode: STATUS_CODE.OK,
      msg: RESPONSE_MESSAGE.UPDATE_SUCCESS,
    };
  }

  return {
    statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
    msg: 'Something went wrong!',
  };
};

export { getRoom, updateRoom, updateRoomStatus, getAllRoom };
