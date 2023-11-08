import { ForwardedRef, useEffect, useRef } from 'react';

// Types
import { Nullable } from '@type/common';

const useForwardRef = <T>(
  ref: ForwardedRef<T>,
  initialValue: Nullable<T> = null
) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

export { useForwardRef };
