import React, { createContext, useState } from 'react'

export const diceContextProvider = createContext(null);

const DiceContext = ({ children }) => {
    const [diceRoll, setDiceRoll] = useState({
        value: 0,
        state: false
    });
    return (
        <diceContextProvider.Provider value={{ diceRoll, setDiceRoll }}>
            {children}
        </diceContextProvider.Provider>
    )
}
export default DiceContext;