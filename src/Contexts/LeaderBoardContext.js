import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { socketContextProvider } from './SocketContext';
export const leaderBoardContextProvider = React.createContext(null);
export default function LeaderBoardContext({ children }) {
    const [showBoard, setShowBoard] = useState(false);
    const { socket } = useContext(socketContextProvider);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const getLeaderBoard = async () => {
        try {

            socket.emit('get-leader-board', {});

            socket.on('on-leader-board', async (data) => {
                if (data !== false) {
                    setLeaderBoard(data);
                }
                else {
                    throw Error("Failed to retrieve data");
                }
            });
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
        <leaderBoardContextProvider.Provider value={{ showBoard, setShowBoard, getLeaderBoard, leaderBoard }}>
            {children}
        </leaderBoardContextProvider.Provider>
    )
}
