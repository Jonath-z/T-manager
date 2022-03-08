/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void): any => {
  const currentRef = useRef<HTMLDivElement>(null);

  const checkParent = (
    t: { parentNode: any },
    elm: HTMLDivElement | null,
  ) => {
    if (t === elm) {
      return true;
    }
    return false;
  };

  const check = useCallback(
    (e) => {
      const target = (e && e.target) || (e && e.srcElement);

      if (checkParent(target, currentRef.current)) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('click', check, true);

    return () => {
      document.removeEventListener('click', check, true);
    };
  }, [check]);

  return currentRef;
};

export default useClickOutside;
