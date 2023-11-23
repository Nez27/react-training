// Types
import { IRoom } from '@type/rooms';

// Services
import supabase from './supabaseService';
import { IDataState } from '@type/common';
import { DEFAULT_PAGE_SIZE } from '@constant/config';

// Constants
const ROOMS_TABLE = 'rooms';
const ERROR_FETCHING = "Can't fetch room data!";
const ERROR_UPDATE_ROOM = "Can't update room!";
const ERROR_CREATE_ROOM = "Can't create room!";
const ERROR_DELETE_ROOM = "Can't delete room!";

/**
 * Get all rooms from database
 * @returns Return all rooms in database
 */
const getAllRooms = async (
  sortBy: string,
  orderBy: string,
  roomName: string,
  page: number
): Promise<{ data: IRoom[]; count: number | null }> => {
  const from = (page - 1) * DEFAULT_PAGE_SIZE;
  const to = from + DEFAULT_PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from(ROOMS_TABLE)
    .select('*', { count: 'exact' })
    .range(from, to)
    .order(sortBy, { ascending: orderBy === 'asc' })
    .like('name', `%${roomName}%`);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING);
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

const getRoomsAvailable = async (): Promise<IDataState[]> => {
  const { data, error } = await supabase
    .from(ROOMS_TABLE)
    .select('id, name')
    .eq('status', false);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING);
  }

  return data;
};

export { getAllRooms, updateRoom, createRoom, deleteRoom, getRoomsAvailable };
