import toast from 'react-hot-toast';
import { TResponse, TRoom } from '../globals/types';
import { sendRequest } from '../helpers/sendRequest';
import { STATUS_CODE, RESPONSE_MESSAGE } from '../constants/responseStatus';
import { errorMsg } from '../constants/messages';
import { ROOM_PATH } from '../constants/path';

const getAllRoom = async (): Promise<TRoom[] | null> => {
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

const getRoom = async (roomId: number): Promise<TRoom | null> => {
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

const updateRoom = async (room: TRoom): Promise<TResponse<TRoom> | null> => {
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

const updateRoomStatus = async (
  roomId: number,
  status: boolean,
  roomIdNew?: number
): Promise<TResponse<TRoom> | null> => {
  if (!roomIdNew) {
    const response = await sendRequest<TRoom>(
      ROOM_PATH + '/' + roomId,
      'PATCH',
      JSON.stringify({ status: status })
    );

    return response;
  } else {
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
  }

  // if (rooms?.length) {
  //   const oldRoom = rooms.find((room) => room.id === roomId);
  //   const newRoom = rooms.find((room) => room.id === roomIdNew);

  //   if(newRoom) {

  //   }

  //   oldRoom!.status = status;
  //   const response = await updateRoom(oldRoom!);

  //   return response;
  // }

  return null;
};

export { getRoom, updateRoom, updateRoomStatus, getAllRoom };
