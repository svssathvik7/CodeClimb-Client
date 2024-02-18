import React, { createContext, useState } from 'react'
export const loginDataContextProvider = createContext(null);
const LoginDataContext = ({ children }) => {
    const [formData, setFormData] = useState({
        username: localStorage.getItem('user') || '',
        password: ''
    });
    const [gameUp,setGameUp] = useState(false);
    return (
        <loginDataContextProvider.Provider value={{ formData, setFormData,gameUp,setGameUp }}>
            {children}
        </loginDataContextProvider.Provider>
    )
}

export default LoginDataContext