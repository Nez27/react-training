import toast from 'react-hot-toast';

// Constants
import { USER_PATH } from '../constants/path';
import { STATUS_CODE } from '../constants/responseStatus';

// Types
import { Nullable } from '../types/common';
import { IResponse } from '../types/responses';
import { IUser } from '../types/users';

// Helpers
import { sendRequest } from '../helpers/sendRequest';
import { errorMsg } from '../helpers/helper';

/**
 * Create user to the server
 * @param user The user object need to be created
 * @returns The IResponse object if success or null
 */
const createUser = async (user: IUser): Promise<Nullable<IResponse<IUser>>> => {
  try {
    const response = await sendRequest<IUser>(
      USER_PATH,
      'POST',
      JSON.stringify(user)
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
}

/**
 * Update the user to the server
 * @param user The user object need to be updated
 * @returns The IResponse object if update success or null
 */
const updateUser = async (user: IUser): Promise<Nullable<IResponse<IUser>>> => {
  try {
    const response = await sendRequest<IUser>(
      USER_PATH + '/' + user.id,
      'PUT',
      JSON.stringify(user)
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
 * Checkout user
 * @param user The user need to be checkout
 * @returns The IResponse object if checkout success or not
 */
const checkOutUser = async (user: IUser): Promise<Nullable<IResponse<IUser>>> => {
  const tempUser = user;

  if (tempUser) {
    tempUser.roomId = 0;
    const resUpdateUser = await updateUser(tempUser);

    return resUpdateUser;
  }

  return null;
};

export { updateUser, checkOutUser, createUser };
