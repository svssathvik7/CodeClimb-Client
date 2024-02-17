import React, { useContext, useEffect, useRef, useState } from 'react'
// import Dice from 'react-dice-roll';
import "./Dice.css"
import { diceContextProvider } from '../../Contexts/DiceContext';
import ReactDice, { ReactDiceRef } from 'react-dice-complete'
export default function DiceObject() {
  // const reactDice = useRef(null);
  const { diceRoll, setDiceRoll } = useContext(diceContextProvider);
  // const [select, setSelect] = useState(false);
  // const [disableButton, setDisableButton] = useState(true);
  // const rollDone = (totalValue, values) => {
  //   setDisableButton(!disableButton);
  //   console.log(totalValue, select);
  //   if (select === true) {
  //     setDiceRoll((prev) => {
  //       return { ...prev, value: totalValue }
  //     });
  //     setSelect(false);
  //   }
  // }
  // useEffect(() => {
  // }, [diceRoll]);
  const updateDiceRoll = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    setDiceRoll((prev) => {
      return { ...prev, value: random }
    });
  }
  return <div id='dice-box' onClick={updateDiceRoll}>
    {/* <ReactDice
      numDice={1}
      ref={reactDice}
      rollDone={rollDone}
      rollTime={2}
      faceColor="#3F0D10"
      dotColor='#ffffff'
      defaultRoll={1}
      dieCornerRadius={8}
    />
    <button disabled={disableButton || diceRoll.state} onClick={async () => {
      setSelect(true);
      setDisableButton(!disableButton);
      await reactDice.current?.rollAll();
    }}>Roll Dice</button> */}
  </div>
}
