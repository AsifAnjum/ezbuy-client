import { useState, useEffect } from "react";

const useSlowData = (time) => {
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowData(true);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  return showData;
};
export default useSlowData;
