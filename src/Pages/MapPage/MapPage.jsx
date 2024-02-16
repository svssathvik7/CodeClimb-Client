import React, { useContext, useEffect, useState } from 'react'
import Map from '../../Components/Map/Map'
import "./MapPage.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import Timer from '../../Utilities/Timer/Timer';
import DiceObject from '../../Utilities/Dice/Dice';
import { diceContext } from '../../Contexts/DiceContext';
import { userContextProvider } from '../../Contexts/UserContext';
export default function MapPage() {
  const { diceRoll } = useContext(diceContext);
  const params = new URLSearchParams(window.location.search);
  const regNo = params.get('param1');
  const { setUser } = useContext(userContextProvider);
  const [guide, setGuide] = useState(false)
  const [pawn, setPawn] = useState({
    blockId: null,
    questions: {
      easy: [],
      medium: [],
      hard: []
    },
    diceRolls: 0,
    bonus: 0,
  });
  const getPosition = async () => {
    const response = await axios.post('http://localhost:3001/api/details/getPosition', { regNo: regNo });
    const data = response.data;
    setUser(regNo);
    if (data.status === true) {
      const details = data.userDetails;
      setPawn((prev) => {
        return { ...prev, blockId: details ? details.currPosition : null, diceRolls: details ? details.totalRolls : null, questions: details ? details.questions : null }
      });
    }
    else {
      toast.error("Error Occured!", {
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
  }
  const updatePawn = async (value, from) => {
    console.log(value, from);
    const response = await axios.post('http://localhost:3001/api/user/metrics/updatePosition', { diceRoll: value, regNo: regNo, from: from });
    const data = response.data;
    if (data.status) {
      setPawn((prev) => {
        return { ...prev, blockId: data.newPosition }
      });
    }
    else {
      toast.error("Error Occured!", {
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
  }
  useEffect(() => {
    getPosition();
  }, []);
  useEffect(() => {
    updatePawn(diceRoll.value, 'dice-roll');
  }, [diceRoll]);
  return (
    <div className='map-page-container'>
      <Timer />
      <Map setPawn={setPawn} regNo={regNo} updatePawn={updatePawn} pawn={pawn} />
      <DiceObject />
    </div>
  )
}
