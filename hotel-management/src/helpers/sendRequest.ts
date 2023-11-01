// Constants
import { BASE_URL } from '../constants/path';

// Types
import { TResponse } from '../globals/types';

type TMethodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * The send request method to the server
 * @param path The path of URL
 * @param body The content will push on
 * @param method HTTP method
 * @returns The status code and message from server
 */
export const sendRequest = async (
  path: string,
  body: BodyInit | null | undefined,
  method: TMethodRequest = 'GET',
): Promise<TResponse> => {
  const response = await fetch(BASE_URL + path, {
    method,
    body,
    headers: {
      // prettier-ignore
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return {
    statusCode: response.status,
    msg: response.statusText,
  };
};
