import React, { useState } from 'react'
const userContextProvider = React.createContext(null);
export default function UserContext({children}) {
    const [user,setUser] = useState(null);
  return (
    <userContextProvider.Provider value={{user,setUser}}>
        {children}
    </userContextProvider.Provider>
  )
}
export {userContextProvider};