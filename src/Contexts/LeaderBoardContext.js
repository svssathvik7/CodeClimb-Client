import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
export const leaderBoardContextProvider = React.createContext(null);
export default function LeaderBoardContext({children}) {
    const [showBoard,setShowBoard] = useState(false);
    const [leaderBoard,setLeaderBoard] = useState([]);
    const getLeaderBoard = async ()=>{
        try {
            const response = (await axios.get("http://localhost:3001/api/details/leader-board")).data;
            if(response.status){
                setLeaderBoard(response.leaderBoard);
            }
            else{
                throw Error("Failed to retrieve data");
            }
        } catch (error) {
            toast.error("Failed retreiving data!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log(error);
        }
    }
  return (
    <leaderBoardContextProvider.Provider value={{showBoard,setShowBoard,getLeaderBoard,leaderBoard}}>
        {children}
    </leaderBoardContextProvider.Provider>
  )
}
