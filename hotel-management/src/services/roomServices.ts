import toast from 'react-hot-toast';

// Types
import { Nullable } from '../types/common';
import { IResponse } from '../types/responses';
import { IRoom } from '../types/rooms';

// Helpers
import { sendRequest } from '../helpers/sendRequest';
import { errorMsg } from '../helpers/helper';

// Constants
import { STATUS_CODE, RESPONSE_MESSAGE } from '../constants/responseStatus';
import { ROOM_PATH } from '../constants/path';

/**
 * Get all rooms from server
 * @returns Return all rooms in server
 */
const getAllRoom = async (): Promise<Nullable<IRoom[]>> => {
  try {
    const response = await sendRequest<IRoom[]>(ROOM_PATH);

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
const getRoom = async (roomId: number): Promise<Nullable<IRoom>> => {
  try {
    const response = await sendRequest<IRoom>(ROOM_PATH + '/' + roomId);

    if (response.statusCode !== STATUS_CODE.OK) {
      throw new Error(errorMsg(response.statusCode, response.msg));
    }

    const rooms = response.data!;

    return rooms;
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
const updateRoom = async (room: IRoom): Promise<Nullable<IResponse<IRoom>>> => {
  try {
    const response = await sendRequest<IRoom>(
      ROOM_PATH + '/' + room.id,
      'PUT',
      JSON.stringify(room)
    );

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
): Promise<Nullable<IResponse<IRoom>>> => {
  try {
    if (!roomIdNew) {
      const response = await sendRequest<IRoom>(
        ROOM_PATH + '/' + roomId,
        'PATCH',
        JSON.stringify({ status: status })
      );

      return response;
    }

    // Update new room status
    const resNewRoom = await sendRequest<IRoom>(
      ROOM_PATH + '/' + roomIdNew,
      'PATCH',
      JSON.stringify({ status: status })
    );

    // Update old room status;
    const resOldRoom = await sendRequest<IRoom>(
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
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }

  return null;
};

/**
 * Add room to server
 * @param room The room object need to be add
 * @returns The response object if complete or null
 */
const addRoom = async (room: IRoom): Promise<Nullable<IResponse<IRoom>>> => {
  try {
    // Set default status room
    room.status = false;

    const response = await sendRequest<IRoom>(
      ROOM_PATH,
      'POST',
      JSON.stringify(room)
    );

    if (response.statusCode !== STATUS_CODE.CREATE) {
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

export { getRoom, updateRoom, updateRoomStatus, getAllRoom, addRoom };
