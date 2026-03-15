import { useEffect, useState, useCallback } from 'react';

function useCountdown(delayInMs = 1000) {
  const [countdown, setCountdown] = useState<number | null>(null);

  const resetCountdown = useCallback((count: number) => {
    setCountdown(count);
  }, []);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, delayInMs);
    return () => {
      clearInterval(interval);
    };
  }, [countdown, delayInMs]);

  return [countdown, resetCountdown] as const;
}

export default useCountdown;
