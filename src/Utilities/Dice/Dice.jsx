import React, { useContext, useState } from 'react'
import "./Dice.css"
import Hagrid from "../../Assets/hagrid.png";
import { diceContextProvider } from '../../Contexts/DiceContext';
import { pawnContextProvider } from '../../Contexts/PawnContext';
export default function DiceObject() {
  const { diceRoll, setDiceRoll } = useContext(diceContextProvider);
  const { updatePawnPosition } = useContext(pawnContextProvider);
  const [enableDice, setEnableDice] = useState(true);
  const updateDiceRoll = () => {
    setEnableDice(false);
    setTimeout(
      () => {
        setEnableDice(true);
      }
      , 1300);
    const random = Math.floor(Math.random() * 6);
    setDiceRoll(random);
    updatePawnPosition(random, 'dice-roll');
  }
  return (
    <div id='dice-box'>
      <div id='hagrid'>
        <img alt='hagrid' src={Hagrid} />
        <button disabled={!enableDice} id='hagrid-btn' onClick={updateDiceRoll}>Ask Hagrid a number!</button>
      </div>
      <div className='roll-value-holder'>
        <p id='dice-value'>{diceRoll}</p>
        <p>Hagrid's Number</p>
      </div>
    </div>)
}
