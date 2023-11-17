import toast from 'react-hot-toast';

// Constants
import { USER_PATH } from '@constant/path';
import { STATUS_CODE } from '@constant/responseStatus';

// Types
import { Nullable } from '@type/common';
import { IResponse } from '@type/responses';
import { IUser } from '@type/users';

// Helpers
import { sendRequest } from '@helper/sendRequest';
import { errorMsg } from '@helper/helper';
import supabase from '@constant/supabaseConfig';

const USERS_TABLE = 'users';
const ERROR_FETCHING = "Users can't be loaded!";

/**
 * Create user to the server
 * @param user The user object need to be created
 * @returns The IResponse object if success or null
 */
const createUser = async (user: IUser): Promise<Nullable<IResponse<IUser>>> => {
  // try {
  //   const response = await sendRequest<IUser>(
  //     USER_PATH,
  //     'POST',
  //     JSON.stringify(user)
  //   );

  //   if (response.statusCode !== STATUS_CODE.CREATE) {
  //     throw new Error(errorMsg(response.statusCode, response.msg));
  //   }

  //   return response;
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     toast.error(error.message);
  //   }
  // }

  return null;
};

/**
 * Update the user to the server
 * @param user The user object need to be updated
 * @returns The IResponse object if update success or null
 */
const updateUser = async (user: IUser): Promise<Nullable<IResponse<IUser>>> => {
  // try {
  //   const response = await sendRequest<IUser>(
  //     USER_PATH + '/' + user.id,
  //     'PUT',
  //     JSON.stringify(user)
  //   );

  //   if (response.statusCode !== STATUS_CODE.OK) {
  //     throw new Error(errorMsg(response.statusCode, response.msg));
  //   }

  //   return response;
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     toast.error(error.message);
  //   }
  // }

  return null;
};

/**
 * Checkout user
 * @param user The user need to be checkout
 * @returns The IResponse object if checkout success or not
 */
const checkOutUser = async (
  user: IUser
): Promise<Nullable<IResponse<IUser>>> => {
  // const tempUser = user;

  // if (tempUser) {
  //   tempUser.roomId = 0;
  //   const resUpdateUser = await updateUser(tempUser);

  //   return resUpdateUser;
  // }

  return null;
};

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
    throw new Error(ERROR_FETCHING);
  }

  return data;
};

export { updateUser, checkOutUser, createUser, getAllUsers };
