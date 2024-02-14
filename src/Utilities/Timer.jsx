import React, { useState, useEffect } from "react";
import "./Timer.css";
const Timer = (props) => {
   const EndTime = new Date("2024-02-21T15:00:00");
   const initialTime = Math.floor((EndTime - new Date()) / 1000);
   const [time, setTime] = useState(initialTime);
   if (time>3600) {
    setTime(3600);
  }
  const [formattedTime, setFormattedTime] = useState('60:00');

  useEffect(() => {
    if ( time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [ time]);

  useEffect(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    setFormattedTime(`${formattedMinutes}:${formattedSeconds}`);
  }, [time]);

    return (
        <div>
            <div id = "timer">{formattedTime}</div>
        </div>
    );
};

export default Timer;
