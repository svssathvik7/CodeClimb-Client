import React, { createContext, useState } from 'react'

export const diceContext = createContext(null);

const DiceContext = ({ children }) => {
    const [diceRoll, setDiceRoll] = useState({
        value: 0,
        state: true
    });
    return (
        <diceContext.Provider value={{ diceRoll, setDiceRoll }}>
            {children}
        </diceContext.Provider>
    )
}
export default DiceContext;