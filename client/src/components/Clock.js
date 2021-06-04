import React, { useState, useEffect } from "react";

export const Clock = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setDate(new Date());
  }

  return <>{date.toLocaleTimeString()}</>;
};
