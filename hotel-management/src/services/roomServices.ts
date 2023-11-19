// Types
import { IRoom } from '@type/rooms';

// Services
import supabase from './supabaseService';

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
  roomName: string
): Promise<IRoom[]> => {
  const { data, error } = await supabase
    .from(ROOMS_TABLE)
    .select('*')
    .order(sortBy, { ascending: orderBy === 'asc' })
    .like('name', `%${roomName}%`);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING);
  }

  return data;
};


/**
 * Update room into database
 * @param room Room object need to be updated
 */
const updateRoom = async (room: IRoom): Promise<void> => {
  const { error } = await supabase.from(ROOMS_TABLE).update(room).eq("id", room.id);

  if(error) {
    console.error(error.message);
    throw new Error(ERROR_UPDATE_ROOM);
  }
};

/**
 * Add room to database
 * @param room The room object need to be add
 */
const createRoom = async (room: IRoom): Promise<void> => {
  // Set default status
  room.status = false;

  const { error } = await supabase.from(ROOMS_TABLE).insert([room]);

  if(error) {
    console.error(error.message);
    throw new Error(ERROR_CREATE_ROOM);
  }
};

/**
 * Delete room in database
 * @param idRoom The id of room need to delete
 */
const deleteRoom = async(idRoom: number) => {
  const { error } = await supabase.from(ROOMS_TABLE).delete().eq('id', idRoom);

  if(error) {
    console.error(error.message);
    throw new Error(ERROR_DELETE_ROOM);
  }
}

export { getAllRooms, updateRoom, createRoom, deleteRoom };
