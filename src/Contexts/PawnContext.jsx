import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginDataContextProvider } from './LoginDataContext';
import { toast } from 'react-toastify';
import { socketContextProvider } from './SocketContext';
export const pawnContextProvider = createContext(null);
const PawnContext = ({ children }) => {
    const { socket } = useContext(socketContextProvider);
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
        try {
            socket.emit('getPawnDetails', formData.username);

            socket.on('pawnDetails', (details) => {
                if (details !== false) {
                    setPawn((prev) => {
                        return { ...prev, blockId: details?.currPosition, diceRolls: details?.totalRolls, questions: details?.questions[0], score: details?.score, gameOver: details?.currPosition === 100 }
                    });
                }
                else {
                    toast.error("Error occured while fetching pawn details.", {
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
            })
        } catch (error) {
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
        try {
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
                socket.emit('updatePawnPosition', { diceRoll: value, regNo: formData.username, from: from });

                socket.on('updatedPawnDetails', async (data) => {
                    if (data !== false) {
                        setPawn((prev) => {
                            return { ...prev, blockId: data.newPosition, score: data.score, gameOver: data.newPosition === 100 }
                        });
                    }
                    else {
                        toast.error("Error occured while updating pawn position!", {
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
                });
            }
        }
        catch (err) {
            toast.error("Error occured while updating pawn position!", {
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
    useEffect(() => {
        getPawnDetails();
    }, []);
    return (
        <pawnContextProvider.Provider value={{ pawn, setPawn, updatePawnPosition, getPawnDetails }}>
            {children}
        </pawnContextProvider.Provider>
    )
}

export default PawnContext