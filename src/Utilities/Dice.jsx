import React, { useContext, useEffect, useRef, useState } from 'react'
// import Dice from 'react-dice-roll';
import "./Dice.css"
import { diceContext } from '../Contexts/DiceContext';
import ReactDice, { ReactDiceRef } from 'react-dice-complete'
export default function DiceObject() {
  const reactDice = useRef(null);
  const { setDiceRoll } = useContext(diceContext);
  // const [dice, setDice] = useState(0);
  // const rollDone = (totalValue, values) => {
  //   setDice(totalValue);
  // }
  // const changeDice = () => {
  //   setDiceRoll((prev) => {
  //     return { ...prev, value: dice }
  //   })
  // }
  const changeDice = () => {
    const random = Math.floor(Math.random() * 6) + 1
    setDiceRoll((prev) => {
      return { ...prev, value: random }
    })
  }
  return <div id='dice-box' onClick={changeDice}>
    {/* <ReactDice
      numDice={1}
      ref={reactDice}
      rollDone={rollDone}
      rollTime={4.5}
      faceColor="#3F0D10"
      dotColor='#ffffff'
      defaultRoll={1}
      dieCornerRadius={8}
    /> */}
  </div>
}
