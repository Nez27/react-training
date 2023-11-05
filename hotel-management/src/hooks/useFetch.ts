import { useEffect, useState } from 'react';

// Constants
import { BASE_URL } from '../constants/path';
import { DEFAULT_ORDER_BY, DEFAULT_SORT_BY } from '../constants/config';

// Helpers
import { searchQuery } from '../helpers/utils';

// Types
import { Nullable } from '../globals/types';

/**
 * The function use to fetch data on server API.
 * @param path The path of url
 * @param columnSearch Column need to search
 * @param keyWord The key word to search
 * @param tempSortBy Sort by
 * @param tempOrderBy Order by
 * @param reload Fetch again
 * @returns data: A data after fetch, isPending: A boolean indicating whether or not the progress of fetch data is done, errorMsg: A error message from the server.
 */
const useFetch = (
  path: string,
  columnSearch: string = '',
  keyWord: string = '',
  tempSortBy?: string,
  tempOrderBy?: string,
  reload?: boolean
) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [errorFetchMsg, setErrorFetchMsg] = useState<Nullable<string>>(null);

  useEffect(() => {
    // Clear data
    setData(null);

    const fetchData = async () => {
      setIsPending(true);

      // Set default value
      const sortBy = tempSortBy
        ? tempSortBy
        : DEFAULT_SORT_BY;
      const orderBy = tempOrderBy
        ? tempOrderBy
        : DEFAULT_ORDER_BY;

      // Query search
      const query = searchQuery(columnSearch, keyWord, sortBy, orderBy);

      try {
        const response = await fetch(BASE_URL + path + '?' + query);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(
            `Error code: ${response.status} \n Messages: ${response.text}`
          );
        }

        setIsPending(false);
        setData(json);
        setErrorFetchMsg(null);
      } catch (error) {
        setErrorFetchMsg(`Could not fetch data.\n ${error}`);
        setIsPending(false);
      }
    };

    fetchData();
  }, [path, reload, columnSearch, keyWord, tempOrderBy, tempSortBy]);
  return { data, isPending, errorFetchMsg };
};

export { useFetch };
