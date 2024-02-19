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

  const updateDiceRoll = () => {
    setEnableDice(false);

    setTimeout(() => {
      setEnableDice(true);
    }, 2000);

    const random = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(random);
    updatePawnPosition(random, 'dice-roll');
  }

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
    </div>
  );
}
