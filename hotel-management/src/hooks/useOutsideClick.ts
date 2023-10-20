import { useEffect, useRef } from 'react';

export const useOutsideClick = (
  handler: () => void,
  listeningCapturing = true,
): React.MutableRefObject<HTMLUListElement | null> => {
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
