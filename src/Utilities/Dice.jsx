import React, { useContext, useEffect, useState } from 'react'
// import Dice from 'react-dice-roll';
import "./Dice.css"
import { diceContext } from '../Contexts/DiceContext';
export default function DiceObject() {
  const { setDiceRoll } = useContext(diceContext);
  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceRoll((prev) => {
      return { ...prev, value: randomNumber }
    });
  }
  return <div id='dice-box' onClick={getRandomNumber}>
  </div>
}
