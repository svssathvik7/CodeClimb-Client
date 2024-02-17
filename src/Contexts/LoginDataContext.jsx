import React, { createContext, useState } from 'react'
export const loginDataContextProvider = createContext(null);
const LoginDataContext = ({ children }) => {
    const [formData, setFormData] = useState({
        username: localStorage.getItem('user') || '',
        password: ''
    });
    return (
        <loginDataContextProvider.Provider value={{ formData, setFormData }}>
            {children}
        </loginDataContextProvider.Provider>
    )
}

export default LoginDataContext