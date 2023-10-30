import { useEffect, useState } from 'react';

// Constants
import { BASE_URL } from '../constants/path';
import { searchQuery } from '../helpers/utils';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY } from '../constants/config';

export const useFetch = (
  path: string,
  phoneNum: string,
  tempSortBy: string,
  tempOrderBy: string,
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

      // Set default value
      const sortBy = tempSortBy ? tempSortBy : DEFAULT_SORT_BY;
      const orderBy = tempOrderBy ? tempOrderBy : DEFAULT_ORDER_BY;

      // Query search
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
  }, [path, reload, phoneNum, tempOrderBy, tempSortBy]);
  return { data, isPending, errorMsg };
};
