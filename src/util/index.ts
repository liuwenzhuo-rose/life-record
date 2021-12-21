import { useCallback } from 'react';

export const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 500
) => {
  let timer: NodeJS.Timeout;
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }, []);
};
