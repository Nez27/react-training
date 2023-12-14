// Types
import { IUser } from '@src/types/user';

// Services
import supabase from './supabaseService';

// Constants
import { DEFAULT_PAGE_SIZE } from '@src/constants/config';
import {
  ERROR_CREATE_USER,
  ERROR_DELETE_USER,
  ERROR_FETCHING_USER,
  ERROR_UPDATE_USER,
  USERS_TABLE,
} from '@src/constants/messages';

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
 * Set user in delete status
 * @param idUser The id of user need to delete
 */
const setIsDeleteUser = async (idUser: number) => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .update({isDelete: true})
    .eq('id', idUser)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_DELETE_USER);
  }

  return data;
};

interface IGetAllUsers {
  sortBy: string;
  orderBy: string;
  phoneSearch: string;
  page: number;
}

/**
 * Return data of users from database
 * @param sortBy Sort by column
 * @param orderBy Order by ascending or descending
 * @param phoneSearch The phone need to be search
 * @returns The data of users from database
 */
const getAllUsers = async ({
  sortBy,
  orderBy,
  phoneSearch,
  page,
}: IGetAllUsers): Promise<{ data: IUser[]; count: number | null }> => {
  const from = (page - 1) * DEFAULT_PAGE_SIZE;
  const to = from + DEFAULT_PAGE_SIZE - 1;

  let query = supabase
    .from(USERS_TABLE)
    .select('*', { count: 'exact' })
    .order(sortBy, { ascending: orderBy === 'asc' })
    .like('phone', `%${phoneSearch}%`)
    .eq('isDelete', false);

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
  setIsDeleteUser,
  updateUserBookedStatus,
};
