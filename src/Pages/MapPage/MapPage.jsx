import React, { useCallback, useContext, useEffect, useState } from 'react'
import Map from '../../Components/Map/Map'
import "./MapPage.css";
import Timer from '../../Utilities/Timer/Timer';
import DiceObject from '../../Utilities/Dice/Dice';
import LeaderBoard from '../../Components/Leaderboard/LeaderBoard';
import { leaderBoardContextProvider } from '../../Contexts/LeaderBoardContext';
import { IoIosInformationCircle } from "react-icons/io";
import Guidelines from '../../Components/Guidelines/Guidelines';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
import { pawnContextProvider } from '../../Contexts/PawnContext';
import GameOver from '../GameOver/GameOver';
import { toast } from 'react-toastify';
import { socketContextProvider } from '../../Contexts/SocketContext';
export default function MapPage() {
  const { socket } = useContext(socketContextProvider);
  const { showBoard, setShowBoard } = useContext(leaderBoardContextProvider);
  const { pawn, getPawnDetails } = useContext(pawnContextProvider);
  const [guidelines, setGuideLines] = useState(false);
  const { formData, setGameUp, gameUp } = useContext(loginDataContextProvider);
  const [celebration, setCelebration] = useState(false);
  const setScoreToZero = async () => {
    try {
      socket.emit('set-score-zero', { regNo: formData.username });

      socket.on('on-set-score-zero', async (data) => {
        if (data !== false) {
          getPawnDetails();
          toast.info("Reset successfully", {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        else {
          toast.error('Error occured!', {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
    }
    catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  useEffect(() =>{
    let timeOutId;
    if(pawn.gameOver){
      setCelebration(true);
      toast.success("Congratulations! You have completed the game!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      timeOutId = setTimeout(() => {
        setGameUp(true);
        setCelebration(false);
      }, 5000)
    }
    else{
      setGameUp(false);
    }
    return () => clearTimeout(timeOutId);
  },[pawn]);

  return (
    gameUp ? <GameOver /> : gameUp ? <GameOver /> : <div className={'map-page-container'} id = {celebration ? 'celebration' : ''}>
      
      <div className='score-block'>
        <p>Score : {pawn.score}</p>
        {guidelines && <Guidelines />}
        <button className='leader-board-button' onClick={() => {
          setShowBoard(!showBoard);
        }}>{showBoard ? 'Close' : 'Show'} Leader Board</button>
      </div>
      <h3 id='user-welcome'>Welcome {formData.username}🎉</h3>
      <Timer />
      <Map />
      <DiceObject />
      {showBoard && <LeaderBoard />}
      <IoIosInformationCircle className='guide-lines-button' onClick={() => {
        setGuideLines(!guidelines);
      }} />
      {guidelines && <Guidelines />}
      {(["21331A05G3","21331A05F9","21331A05G5"].includes(formData.username)) && <button onClick={setScoreToZero}>Reset Score and Position</button>}
    </div >
  )
}
