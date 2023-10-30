import { useEffect, useState } from 'react';

// Constants
import { BASE_URL } from '../constants/path';
import { searchQuery } from '../helpers/utils';

export const useFetch = (
  path: string,
  phoneNum: string,
  sortBy: string,
  orderBy: string,
  reload?: boolean,
) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Clear data
    setData(null);

    const fetchData = async () => {
      setIsPending(true);

      const query = searchQuery(phoneNum, sortBy, orderBy);

      try {
        const response = await fetch(BASE_URL + path + '?' + query);
        const json = await response.json();

        if (!response.ok)
          throw new Error(
            `Error code: ${response.status} \n Messages: ${response.statusText}`,
          );

        setIsPending(false);
        setData(json);
        setErrorMsg(null);
      } catch (error) {
        setErrorMsg(`Could not fetch data.\n ${error}`);
        setIsPending(false);
      }
    };

    fetchData();
  }, [path, reload, phoneNum, orderBy, sortBy]);
  return { data, isPending, errorMsg };
};
