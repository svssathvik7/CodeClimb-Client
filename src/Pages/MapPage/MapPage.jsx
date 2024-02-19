import React, { useContext, useEffect, useState } from 'react'
import Map from '../../Components/Map/Map'
import "./MapPage.css";
import Timer from '../../Utilities/Timer/Timer';
import DiceObject from '../../Utilities/Dice/Dice';
import LeaderBoard from '../../Components/Leaderboard/LeaderBoard';
import { leaderBoardContextProvider } from '../../Contexts/LeaderBoardContext';
import { IoIosInformationCircle } from "react-icons/io";
import Guidelines from '../../Components/Guidelines/Guidelines';
import { pawnContextProvider } from '../../Contexts/PawnContext';
import axios from 'axios';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
export default function MapPage() {
  const { showBoard, setShowBoard } = useContext(leaderBoardContextProvider);
  const { pawn } = useContext(pawnContextProvider);
  const [guidelines, setGuideLines] = useState(false);
  const { formData } = useContext(loginDataContextProvider);
  const setScore = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/user/metrics/set-score-zero", { regNo: formData.username });
      const data = response.data;
      console.log(data);
    }
    catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {

  }, [pawn]);
  return (
    <div className='map-page-container'>
      <div className='score-block'>
        <p>Score : {pawn.score}</p>
        {guidelines && <Guidelines />}
        <button className='leader-board-button' onClick={() => {
          setShowBoard(!showBoard);
        }}>{showBoard ? 'Close' : 'Show'} Leader Board</button>
      </div>
      <Timer />
      <Map />
      <DiceObject />
      {showBoard && <LeaderBoard />}
      <IoIosInformationCircle className='guide-lines-button' onClick={() => {
        setGuideLines(!guidelines);
      }} />
      {guidelines && <Guidelines />}
      {pawn.gameOver && <div className='game-over-block'>
        Game Over!!!
      </div>}
      <button onClick={setScore}>Reset Score</button>
    </div>
  )
}
