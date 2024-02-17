import React, { useContext, useEffect, useRef, useState } from 'react'
// import Dice from 'react-dice-roll';
import "./Dice.css"
import { diceContextProvider } from '../../Contexts/DiceContext';
import ReactDice, { ReactDiceRef } from 'react-dice-complete'
export default function DiceObject() {
  const reactDice = useRef(null);
  const { setDiceRoll } = useContext(diceContextProvider);
  const [select, setSelect] = useState(false);
  const rollDone = (totalValue, values) => {
    if (select === true) {
      setDiceRoll((prev) => {
        return { ...prev, value: totalValue }
      });
    }
  }
  return <div id='dice-box'>
    <ReactDice
      numDice={1}
      ref={reactDice}
      rollDone={rollDone}
      rollTime={4.5}
      faceColor="#3F0D10"
      dotColor='#ffffff'
      defaultRoll={1}
      dieCornerRadius={8}
    />
    <button onClick={async () => {
      setSelect(true);
      await reactDice.current?.rollAll();
    }}>Roll Dice</button>
  </div>
}
