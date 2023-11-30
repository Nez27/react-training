// Types
import { IRoom } from '@type/rooms';

// Services
import supabase from './supabaseService';

// Constants
import { DEFAULT_PAGE_SIZE } from '@constant/config';
import {
  ERROR_CREATE_ROOM,
  ERROR_DELETE_ROOM,
  ERROR_FETCHING_ROOM,
  ERROR_UPDATE_ROOM,
  ROOMS_TABLE,
} from '@constant/messages';

interface IGetAllRooms {
  sortBy: string;
  orderBy: string;
  roomSearch: string;
  page: number;
}

/**
 * Get all rooms from database
 * @returns Return all rooms in database
 */
const getAllRooms = async ({
  sortBy,
  orderBy,
  roomSearch,
  page,
}: IGetAllRooms): Promise<{ data: IRoom[]; count: number | null }> => {
  const from = (page - 1) * DEFAULT_PAGE_SIZE;
  const to = from + DEFAULT_PAGE_SIZE - 1;

  let query = supabase
    .from(ROOMS_TABLE)
    .select('*', { count: 'exact' })
    .order(sortBy, { ascending: orderBy === 'asc' })
    .like('name', `%${roomSearch}%`);

  if(page) {
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING_ROOM);
  }

  return { data, count };
};

/**
 * Update room into database
 * @param room Room object need to be updated
 */
const updateRoom = async (room: IRoom): Promise<IRoom> => {
  const { data, error } = await supabase
    .from(ROOMS_TABLE)
    .update(room)
    .eq('id', room.id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_UPDATE_ROOM);
  }

  return data;
};

/**
 * Add room to database
 * @param room The room object need to be add
 */
const createRoom = async (room: IRoom): Promise<IRoom> => {
  const { data, error } = await supabase
    .from(ROOMS_TABLE)
    .insert(room)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_CREATE_ROOM);
  }

  return data;
};

/**
 * Delete room in database
 * @param idRoom The id of room need to delete
 */
const deleteRoom = async (idRoom: number) => {
  const { error } = await supabase.from(ROOMS_TABLE).delete().eq('id', idRoom);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_DELETE_ROOM);
  }
};

/**
 * Get room by id in database
 * @param idRoom The id room need to be get
 * @returns The data of room
 */
const getRoomById = async (idRoom: string): Promise<IRoom> => {
  const { data, error } = await supabase
    .from(ROOMS_TABLE)
    .select('*')
    .eq('id', idRoom)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING_ROOM);
  }

  return data;
};


/**
 * Update status of room
 * @param id The id of room need to be change status
 * @param status The status of room
 */
const updateRoomStatus = async (
  id: number,
  status: boolean
): Promise<void> => {
  const { error} = await supabase
    .from(ROOMS_TABLE)
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_UPDATE_ROOM);
  }

};

export {
  getAllRooms,
  updateRoom,
  createRoom,
  deleteRoom,
  getRoomById,
  updateRoomStatus,
};
