// Constants
import { BASE_URL } from '../constants/path';
import { TResponse } from '../globals/types';
type TMethodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const sendRequest = async (
  path: string,
  body: BodyInit | null | undefined,
  method: TMethodRequest = 'GET',
): Promise<TResponse> => {
  const controller = new AbortController();
  const signal = controller.signal;

  const response = await fetch(BASE_URL + path, {
    method,
    body,
    headers: {
      // prettier-ignore
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    signal,
  });

  return {
    statusCode: response.status,
    msg: response.statusText,
  };
};
