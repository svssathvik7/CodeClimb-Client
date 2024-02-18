import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "./Timer.css";
import Countdown from 'react-countdown';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
const Timer = () => {
  const {setGameUp} = useContext(loginDataContextProvider);
  const [endTime, setEndTime] = useState(null);
  useEffect(() => {
    const getTime = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user/metrics/get-contest-time");
        if (response.data.status) {
          const time = Date.parse(response.data.startTime);
          setEndTime(time);
        } else {
          toast.error("Failed to fetch contest start time from the server", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Error fetching contest start time:", error);
        toast.error("Failed to fetch contest start time from the server", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
    getTime();
  }, [endTime]);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if(completed)
    {
      setGameUp(true);
    }
    else{
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };
  return (
    <div id='timer'>
      <div id='timer-ui'>
        {endTime && <Countdown date={(endTime)} renderer={renderer} intervalDelay={1000}/>}
      </div>
    </div>
  );
};

export default Timer;
