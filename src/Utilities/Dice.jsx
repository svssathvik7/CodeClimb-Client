import React, { useEffect, useState } from 'react'
import Dice from 'react-dice-roll';
import "./Dice.css"
export default function DiceObject() {
    const [rollValue,setRollValue] = useState(null);
  return (
    <div id='dice-box'>
      <Dice onRoll={(value) => setRollValue(value)} size={50} rollingTime={500} faceBg='black' cursor='pointer'/>
    </div>
  )
}
