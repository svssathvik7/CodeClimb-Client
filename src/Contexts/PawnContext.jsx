import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginDataContextProvider } from './LoginDataContext';
import axios from 'axios';
import { toast } from 'react-toastify';
export const pawnContextProvider = createContext(null);
const PawnContext = ({ children }) => {
    const { formData } = useContext(loginDataContextProvider);
    const [pawn, setPawn] = useState({
        blockId: null,
        questions: {
            easy: [],
            medium: [],
            hard: []
        },
        diceRolls: 0,
        bonus: 0,
        score: 0,
        gameOver: false
    });

    const getPawnDetails = async () => {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/details/getPawnDetails", { regNo: formData.username });
        const data = response.data;
        if (data.status === true) {
            const details = data.userDetails;
            setPawn((prev) => {
                return { ...prev, blockId: details.currPosition, diceRolls: details.totalRolls, questions: details.questions[0], score: details.score, gameOver: details.currPosition === 100 }
            });
        }
        else {
            toast.error("Error Occured!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const updatePawnPosition = async (value, from) => {
        var flag = true;
        if (from === 'dice-roll') {
            if (pawn.blockId + value === 100) {
                setPawn((prev) => {
                    return { ...prev, gameOver: true }
                });
            }
            else if (pawn.blockId + value > 100) {
                toast.error("Move Not Possible", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                flag = false;
            }
        }
        if (flag === true) {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+"/api/user/metrics/updatePosition", { diceRoll: value, regNo: formData.username, from: from });
            const data = response.data;
            if (data.status) {
                setPawn((prev) => {
                    return { ...prev, blockId: data.newPosition, score: data.score, gameOver: data.newPosition === 100 }
                });
            }
            else {
                toast.error("Error Occured!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    }
    useEffect(() => {
        getPawnDetails();
    }, []);
    return (
        <pawnContextProvider.Provider value={{ pawn, setPawn, updatePawnPosition }}>
            {children}
        </pawnContextProvider.Provider>
    )
}

export default PawnContext