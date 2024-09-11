import { useState, useEffect, useRef } from "react";

export function useCustomTimer(initialSeconds) {
  const [secconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timer.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 0) {
            clearInterval(timer.current);
            setIsRunning(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(timer.current);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  return { isRunning, start, stop, secconds };
}