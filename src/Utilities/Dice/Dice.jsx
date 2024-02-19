import React, { useContext, useState, useEffect } from 'react';
import "./Dice.css";
import Hagrid from "../../Assets/hagrid.png";
import { diceContextProvider } from '../../Contexts/DiceContext';
import { pawnContextProvider } from '../../Contexts/PawnContext';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
import axios from 'axios';

export default function DiceObject() {
  const { gameUp,formData } = useContext(loginDataContextProvider);
  const { diceRoll, setDiceRoll } = useContext(diceContextProvider);
  const { updatePawnPosition } = useContext(pawnContextProvider);
  const [enableDice, setEnableDice] = useState(true);
  const [diceRollsHistory, setDiceRollsHistory] = useState([]);
  const [showRollHistory, setShowRollHistory] = useState(false);
  const regNo = formData.username;
  const updateRollValues = async (random) => {
    try {
      if (diceRoll !==0){
      const response = await axios.post('http://localhost:3001/api/user/metrics/update-roll-value', {
        regNo: regNo,
        diceRoll: random,
      });
      const updatedRollValues = response.data.rollValues;
      setDiceRollsHistory(updatedRollValues);
    } 
  }
  catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const updateDiceRoll = () => {
    setEnableDice(false);
    setTimeout(() => {
      setEnableDice(true);
    }, 2000);

    const random = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(random);
    updatePawnPosition(random, 'dice-roll');
  };

  useEffect(() => {
    updateRollValues(diceRoll); 
  }, [diceRoll]);

  const toggleRollHistory = () => {
    setShowRollHistory(!showRollHistory);
  };

  return (
    <div id='dice-box'>
      <div id='hagrid'>
        <img alt='hagrid' src={Hagrid} />
        <button className={`${!enableDice ? " active " : ""}`} disabled={(!enableDice) && (!gameUp)} id='hagrid-btn' onClick={updateDiceRoll}>
          Ask Hagrid a number!
        </button>
      </div>
      <div className='roll-value-holder'>
        <p id='dice-value'>{diceRoll}</p>
        <p>Hagrid's Number</p>
      </div>
      <button id="roll-history-btn" onClick={toggleRollHistory}>
        {!showRollHistory ? "View Roll History" : "Close Roll History"}
      </button>
      {showRollHistory && (
        <div className="roll-history-container">
          <h3>Hagrid's Register</h3>
          <ol>
            {diceRollsHistory.length > 0 ? diceRollsHistory.map((roll, index) => (
              <li style={{fontWeight:"bolder"}} key={index}>{roll}</li>
            )) : <h4>Empty</h4>}
          </ol>
        </div>
      )}
    </div>
  );
}
