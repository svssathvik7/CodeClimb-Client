import React, { createContext, useState } from 'react'
export const loginDataContextProvider = createContext(null);
const LoginDataContext = ({ children }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    return (
        <loginDataContextProvider.Provider value={{ formData, setFormData }}>
            {children}
        </loginDataContextProvider.Provider>
    )
}

export default LoginDataContext