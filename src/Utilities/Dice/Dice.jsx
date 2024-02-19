import React, { useContext, useState, useEffect } from 'react';
import "./Dice.css";
import Hagrid from "../../Assets/hagrid.png";
import { diceContextProvider } from '../../Contexts/DiceContext';
import { pawnContextProvider } from '../../Contexts/PawnContext';
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';

export default function DiceObject() {
  const { gameUp } = useContext(loginDataContextProvider);
  const { diceRoll, setDiceRoll } = useContext(diceContextProvider);
  const { updatePawnPosition } = useContext(pawnContextProvider);
  const [enableDice, setEnableDice] = useState(true);
  const [diceRollsHistory, setDiceRollsHistory] = useState([]);

  const updateDiceRoll = () => {
    setEnableDice(false);

    setTimeout(() => {
      setEnableDice(true);
    }, 1300);

    const random = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(random);
    updatePawnPosition(random, 'dice-roll');
  }

  useEffect(() => {
    setDiceRollsHistory(prevHistory => {
      const newHistory = [...prevHistory, diceRoll];
      console.log('Dice Rolls History:', newHistory);
      return newHistory;
    });
    console.log(gameUp)
  }, [diceRoll]);

  return (
    (gameUp && <div id='dice-box'>
      <div id='hagrid'>
        <img alt='hagrid' src={Hagrid} />
        <button disabled={(!enableDice)} id='hagrid-btn' onClick={updateDiceRoll}>
          Ask Hagrid a number!
        </button>
      </div>
      <div className='roll-value-holder'>
        <p id='dice-value'>{diceRoll}</p>
        <p>Hagrid's Number</p>
      </div>
    </div>)
  );
}
