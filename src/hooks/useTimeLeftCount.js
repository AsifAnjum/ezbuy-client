import { useEffect, useState, useCallback } from "react";

const useTimeLeftCount = (targetDate) => {
  const calculateTimeLeft = useCallback(() => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();

    let timeLeft = {};

    if (diff > 0) {
      timeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        min: Math.floor((diff / 1000 / 60) % 60),
        sec: Math.floor((diff / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};
export default useTimeLeftCount;
