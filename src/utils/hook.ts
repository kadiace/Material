import { useCallback, useEffect, useState } from 'react';

const idleTimeout = 1000 * 5; // 5 seconds

export const useEventTimeout = <K extends keyof WindowEventMap>(
  callback: () => void,
  events: K[] | string[],
  timeout: number = idleTimeout,
) => {
  const [idleTime, setIdleTime] = useState(new Date());

  const resetTimer = useCallback(() => {
    setIdleTime(new Date());
  }, []);

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return function cleanup() {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  useEffect(() => {
    const idleTimer = setTimeout(() => {
      callback();
    }, timeout);

    return function cleanup() {
      clearTimeout(idleTimer);
    };
  }, [idleTime, timeout]);
};
