import { MutableRefObject, useEffect, useRef } from 'react';

// Types
import { Nullable } from '../types/common';

/**
 * Custom hook to call handler when click outside element
 * @param handler Handler function
 * @param listeningCapturing A boolean value indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree. If not specified, defaults to false.
 * @returns Return a mutable ref object
 */
export const useOutsideClick = (
  handler: () => void,
  listeningCapturing = true
): MutableRefObject<Nullable<HTMLUListElement>> => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, listeningCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listeningCapturing);
  }, [handler, listeningCapturing]);

  return ref;
};
