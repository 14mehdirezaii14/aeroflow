'use client';

import { useEffect, useState } from 'react';

/**
 * Generic debounce hook for real-time search / filter inputs.
 * The returned value updates only after `delay` ms of inactivity.
 * @example const debouncedQuery = useDebounce(query, 350);
 */
export function useDebounce<T>(value: T, delay = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
