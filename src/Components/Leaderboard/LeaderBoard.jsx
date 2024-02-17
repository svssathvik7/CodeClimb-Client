import React, { useContext, useEffect } from 'react'
import "./LeaderBoard.css";
import { leaderBoardContextProvider } from '../../Contexts/LeaderBoardContext';
export default function LeaderBoard() {
    const {leaderBoard,getLeaderBoard} = useContext(leaderBoardContextProvider);
    useEffect(()=>{
        getLeaderBoard();
    },[]);
  return (
    <div id='leader-board-div'>
      <h2><u>LeaderBoard</u></h2>
      <ol className='leader-board-list'>
        {(leaderBoard && leaderBoard.length) ? 
            leaderBoard.map((seeding,i)=>(
                <li key={i} className='leader-board-seeding'>
                    <h4>{i+1}.{seeding?.regNo}</h4>
                    <p> -{seeding?.score}pts</p>
                </li>
        )) : <></>}
      </ol>
    </div>
  )
}
