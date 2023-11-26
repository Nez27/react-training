// Types
import { IUser } from '@type/users';

// Services
import supabase from './supabaseService';
import { IDataState } from '@type/common';
import { DEFAULT_PAGE_SIZE } from '@constant/config';
import {
  ERROR_CREATE_USER,
  ERROR_DELETE_USER,
  ERROR_FETCHING_USER,
  ERROR_UPDATE_USER,
  USERS_TABLE,
} from '@constant/messages';

/**
 * Create user to the database
 * @param user The user object need to be created
 */
const createUser = async (user: IUser): Promise<IUser> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .insert(user)
    .select()
    .single();

    console.log('Create');

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_CREATE_USER);
  }

  return data;
};

/**
 * Update the user to the database
 * @param user The user object need to be updated
 */
const updateUser = async (user: IUser): Promise<IUser> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .update(user)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_UPDATE_USER);
  }

  return data;
};

/**
 * Delete user in database
 * @param idUser The id of user need to delete
 */
const deleteUser = async (idUser: number) => {
  const { error } = await supabase.from('users').delete().eq('id', idUser);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_DELETE_USER);
  }
};

/**
 * Return data of users from database
 * @param sortBy Sort by column
 * @param orderBy Order by ascending or descending
 * @param phoneSearch The phone need to be search
 * @returns The data of users from database
 */
const getAllUsers = async (
  sortBy: string,
  orderBy: string,
  phoneSearch: string,
  page: number
): Promise<{ data: IUser[]; count: number | null }> => {
  const from = (page - 1) * DEFAULT_PAGE_SIZE;
  const to = from + DEFAULT_PAGE_SIZE - 1;

  let query = supabase
    .from(USERS_TABLE)
    .select('*', { count: 'exact' })
    .order(sortBy, { ascending: orderBy === 'asc' })
    .like('phone', `%${phoneSearch}%`);

  if (page) {
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING_USER);
  }

  return { data, count };
};

const getUserNotBooked = async (): Promise<IDataState[]> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('id, name, isBooked');

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING_USER);
  }

  return data;
};

const updateUserBookedStatus = async (
  id: number,
  isBooked: boolean
): Promise<number> => {
  const { error, status } = await supabase
    .from(USERS_TABLE)
    .update({ isBooked })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_UPDATE_USER);
  }

  return status;
};

export {
  updateUser,
  createUser,
  getAllUsers,
  deleteUser,
  getUserNotBooked,
  updateUserBookedStatus,
};
