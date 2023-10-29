import { useEffect, useState } from 'react';

// Constants
import { BASE_URL } from '../constants/path';

export const useFetch = (path: string, reload?: boolean) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Clear data
    setData(null);

    const fetchData = async () => {
      setIsPending(true);

      try {
        const response = await fetch(BASE_URL + path);
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
  }, [path, reload]);
  return { data, isPending, errorMsg };
};
