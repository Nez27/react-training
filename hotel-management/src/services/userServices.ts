import toast from 'react-hot-toast';
import { errorMsg } from '../constants/messages';
import { USER_PATH } from '../constants/path';
import { STATUS_CODE } from '../constants/responseStatus';
import { TResponse, TUser } from '../globals/types';
import { sendRequest } from '../helpers/sendRequest';

const updateUser = async (user: TUser): Promise<TResponse<TUser> | null> => {
  try {
    const response = await sendRequest<TUser>(
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

const checkOutUser = async (user: TUser): Promise<TResponse<TUser> | null> => {
  const tempUser = user;

  if (tempUser) {
    tempUser.roomId = 0;
    const resUpdateUser = await updateUser(tempUser);

    return resUpdateUser;
  }

  return null;
};

export { updateUser, checkOutUser };
