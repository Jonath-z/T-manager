/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';

interface IOption {
  root: HTMLDivElement;
  rootMargin: string;
  threshold: number;
}

const useIsVisibleOnScreen = (
  options: IOption,
  targetRef: NodeList,
) => {
  const callbackFunction = (entries: any[]) => {
    entries.forEach((entry: any) => {
      !entry.isIntersecting
        ? (entry.target.style.opacity = 0.4)
        : (entry.target.style.opacity = 1);
    });
  };

  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      callbackFunction,
      optionsMemo,
    );
    const Targets = targetRef;

    if (Targets)
      Targets.forEach((target: any) => {
        observer.observe(target);
      });

    return () => {
      if (Targets)
        Targets.forEach((target: any) => {
          observer.unobserve(target);
        });
    };
  }, [targetRef, options, optionsMemo]);
};

export default useIsVisibleOnScreen;
