import React, { useContext, useEffect } from 'react'
import "./GameOver.css";
import { motion } from 'framer-motion'; // Import motion components
import { leaderBoardContextProvider } from '../../Contexts/LeaderBoardContext';
import { pawnContextProvider } from '../../Contexts/PawnContext';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
function FinalLeaderBoard() {
    const { leaderBoard, getLeaderBoard } = useContext(leaderBoardContextProvider);
    const {pawn} = useContext(pawnContextProvider);
    useEffect(() => {
        getLeaderBoard();
    }, [pawn]);

    return (
        <motion.div
            id='final-leader-board-div'
            initial={{ opacity: 0, y: -50 }} // Initial animation properties
            animate={{ opacity: 1, y: 0 }} // Animation properties when component is mounted
            transition={{ duration: 0.5 }} // Animation duration
        >
            <h2 style={{backgroundColor:"white"}}><u>LeaderBoard</u></h2>
            <motion.ol
                className='final-leader-board-list'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }} // Add delay for stagger effect
            >
                {(leaderBoard && leaderBoard.length) ?
                    leaderBoard.map((seeding, i) => (
                        <motion.li
                            key={i}
                            className='leader-board-seeding'
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }} // Staggered animation delay
                        >
                            <h4>{i + 1}.{seeding?.regNo}</h4>
                            <p> -{seeding?.score}pts</p>
                        </motion.li>
                    )) : <></>}
            </motion.ol>
        </motion.div>
    )
}
export default function GameOver() {
    const { formData } = useContext(loginDataContextProvider);
  return (
    <div id='game-over'>
      <FinalLeaderBoard/>
      <div id='end-notes'>
        <p>Great {formData.username}! Let's wait for the session to end!</p>
        <ul>
            <li>Winners are decided based on the score!</li>
            <li>As a tie break players with least number of die rolls are preferred</li>
            <li>Your presence is greatly appreciated</li>
            <li>Feel free to provide any feedback to the developers</li>
        </ul>
      </div>
    </div>
  )
}
