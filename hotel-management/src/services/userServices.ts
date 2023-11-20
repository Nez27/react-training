// Types
import { IUser } from '@type/users';

// Services
import supabase from './supabaseService';
import { IDataState } from '@type/common';

const USERS_TABLE = 'users';
const ERROR_FETCHING = "Users can't be loaded!";
const ERROR_CREATE_USER = "Can't create user!";
const ERROR_UPDATE_USER = "Can't update user!";

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
 * Return data of users from database
 * @param sortBy Sort by column
 * @param orderBy Order by ascending or descending
 * @param phoneSearch The phone need to be search
 * @returns The data of users from database
 */
const getAllUsers = async (
  sortBy: string,
  orderBy: string,
  phoneSearch: string
): Promise<IUser[]> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .order(sortBy, { ascending: orderBy === 'asc' })
    .like('phone', `%${phoneSearch}%`);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING);
  }

  return data;
};

const getUserNotBooked = async (): Promise<IDataState[]> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('id, name')
    .eq('isBooked', false);

  if (error) {
    console.error(error.message);
    throw new Error(ERROR_FETCHING);
  }

  return data;
};

export { updateUser, createUser, getAllUsers, getUserNotBooked };
