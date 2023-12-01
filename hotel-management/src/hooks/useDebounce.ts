import { useEffect, useState } from 'react';

/**
 * The debounce hooks use to execute the callback function every x delay time
 * @param value The value need to be pass
 * @param delay The number of time want to delay
 * @returns Return the value after delay number
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
