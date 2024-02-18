import React, { createContext, useState } from 'react'

export const diceContextProvider = createContext(null);

const DiceContext = ({ children }) => {
    const [diceRoll, setDiceRoll] = useState(0);
    return (
        <diceContextProvider.Provider value={{ diceRoll, setDiceRoll }}>
            {children}
        </diceContextProvider.Provider>
    )
}
export default DiceContext;