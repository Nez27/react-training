// Constants
import { BASE_URL } from '../constants/path';

// Types
import { TResponse } from '../types/types';

type TMethodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * The send request method to the server
 * @param path The path of URL
 * @param body The content will push on
 * @param method HTTP method
 * @returns The status code and message from server
 */
export const sendRequest = async <T>(
  path: string,
  method: TMethodRequest = 'GET',
  body?: BodyInit
): Promise<TResponse<T>> => {
  const response = await fetch(BASE_URL + path, {
    method,
    body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()) as T;

  return {
    statusCode: response.status,
    msg: response.statusText,
    data,
  };
};
