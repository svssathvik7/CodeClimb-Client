import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginDataContextProvider } from './LoginDataContext';
import { toast } from 'react-toastify';
import { socketContextProvider } from './SocketContext';
import { Helmet } from 'react-helmet';
import { userContextProvider } from './UserContext';
import { motion } from "framer-motion";
import "../Components/QPopUp/QPopUp.css"
import axios from 'axios';
export const pawnContextProvider = createContext(null);
const snakeSections = {
    s3 : "Hodrics Hallow",
    s2 : "Diagon Alley",
    s1 : "Hogwarts"
}
const PrintToast = (placeName)=>{
    toast.error(`Please solve atleast 1 question to cross ${placeName}!`, {
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
export const ClearThreshold = (props)=>{
    const {pawn,setPawn,section,setShow} = props;
    console.log(section,"For threshold")
    const { formData } = useContext(loginDataContextProvider);
    const regNo = formData.username;
    const difficulty = "easy";
    const [code, setCode] = useState(``);
    const { user } = useContext(userContextProvider);
    const [question, setQuestion] = useState();
    const [questionHeading, setQuestionHeading] = useState();
    const [loading, setLoading] = useState(false);
    const changeCode = (e) => {
        const { value } = e.target;
        setCode(value);
    }
    const grantEligibility = async()=>{
        setShow(false);
        if(section === 's1')
        {
            await setPawn((prev)=>{
                return {...prev,section1:true};
            });
        }
        else if(section === 's2')
        {
            await setPawn((prev)=>{
                return {...prev,section2:true};
            });
        }
        else if(section === 's3')
        {
            await setPawn((prev)=>{
                return {...prev,section3:true};
            });
        }
        toast.success(`Hurray! You are eligible to cross ${snakeSections[section]} successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        console.log("Pawn status after success : ",pawn);
    }
    const pushCode = async (e) => {
        e.preventDefault();
        if (code === ``) {
            toast.info("Try Something!!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                    color: 'blue',
                },
                progressStyle: {
                    backgroundColor: 'blue',
                },
            });
        }
        else {
            try {
                setLoading(true);
                const submissionId = await user + new Date().getTime();
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/codes/run-code`, {
                    code: code,
                    submissionId: submissionId,
                    qId: question.qId,
                    difficulty: difficulty
                });
                const data = response.data;
                if (data.status) {
                    await grantEligibility();
                    toast.success(`${data.message}!`, {
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
                else {
                    fetchQuestion("easy");
                    toast.error("Code failed!", {
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
            catch (err) {
                console.log("Error");
            }
            finally {
                setLoading(false);
            }
        }
    }
    const fetchQuestion = async (difficulty) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/details/getQuestion`, { difficulty: difficulty, regNo: regNo });
            const data = response.data;
            if (data.status === true) {
                setQuestion(data.question);
            }
            else {
                console.log(data.message);
            }
        }
        catch (err) {
            console.log(err.message, 'Error Occured');
        }
    }
    const changeQuestionHeading = (difficulty) => {
        if (difficulty === 'easy') {
            setQuestionHeading("Correct the syntax and rewrite the code in the box below:");
        }
        else if (difficulty === 'medium') {
            setQuestionHeading("Fill the missing Code to get the desired output:");
        }
        else {
            setQuestionHeading('Solve the problem:');
        }
    }
    useState(() => {
        changeQuestionHeading(difficulty);
        fetchQuestion(difficulty);
        toast.info(`You have to solve atleast 1 problem to pass ${snakeSections[section]}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }, [section]);
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, }} // Initial state (invisible and slightly above)
            animate={{ opacity: 1, y: 0 }} // Animation state (visible and no movement)
            transition={{ delay: 1, duration: 0.5 }}
            className='pop-up-block'
        >
            <div className='pop-up-block-child'>
                <div className='pop-up-question-block' >
                    <p>{questionHeading}</p>
                    {difficulty !== 'medium' && <div className='question-block'><p>{question?.question}</p></div>}
                </div>
                <div className='pop-up-code-block' >
                    <div className='pop-up-code-dynamics'>
                        {(difficulty === 'medium') && <img className='medium-question-image' src={process.env.REACT_APP_BACKEND_URL+`/${question?.question}`} alt="" />}
                        {(difficulty === 'hard') &&
                            <div className='pop-up-compiler-block'>
                                <div data-pym-src="https://www.jdoodle.com/a/7fRG"></div>
                                <Helmet>
                                    <script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript" />
                                </Helmet>
                            </div>
                        }
                        <textarea className='code-input-text-area' onChange={changeCode} name="code" id="code" placeholder='Paste the code here to submit.'></textarea>
                    </div>
                    <div className='pop-up-bottom-block'>
                        <button onClick={pushCode}>Submit</button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
const PawnContext = ({ children }) => {
    const { socket } = useContext(socketContextProvider);
    const [show,setShow] = useState(false);
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
        gameOver: false,
        section1 : false,
        section2 : false,
        section3 : false
    });
    const [quesData,setQuesData] = useState({
        pawn : pawn,
        setPawn : setPawn,
        section : null
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
                    if(pawn.section3)
                    {
                        setShow(false);
                        setPawn((prev) => {
                            return { ...prev, gameOver: true }
                        });
                    }
                    else{
                        flag = pawn.section3;
                        PrintToast(snakeSections["s3"]);
                        setShow(true);
                        setQuesData((prev)=>{
                            return {...prev,pawn:pawn,setPawn:setPawn,section:"s3"}
                        });
                    }
                }
                else if (pawn.blockId + value > 100) {
                    if(pawn.section3)
                    {
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
                        setShow(false);
                        flag = false;
                    }
                    else{
                        flag = false;
                        PrintToast(snakeSections["s3"]);
                        setShow(true);
                        setQuesData((prev)=>{
                            return {...prev,pawn:pawn,setPawn:setPawn,section:"s3"}
                        });
                    }
                }
                else if(pawn.blockId + value > 61)
                {
                    flag = pawn.section2;
                    if(!flag){
                        PrintToast(snakeSections["s2"]);
                        setShow(true);
                        setQuesData((prev)=>{
                            return {...prev,pawn:pawn,setPawn:setPawn,section:"s2"}
                        });
                    }
                    else{
                        setShow(false);
                    }
                }
                else if(pawn.blockId + value > 40)
                {
                    flag = pawn.section1;
                    if(!flag){
                        PrintToast(snakeSections["s1"]);
                        setShow(true);
                        setQuesData((prev)=>{
                            return {...prev,pawn:pawn,setPawn:setPawn,section:"s1"}
                        });
                    }
                    else{
                        setShow(false);
                    }
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
        console.log(pawn);
    }, [pawn]);
    return (
        <pawnContextProvider.Provider value={{ pawn, setPawn, updatePawnPosition, getPawnDetails }}>
            {children}
            {show && <ClearThreshold pawn={quesData.pawn} setPawn={quesData.setPawn} section={quesData.section} setShow={setShow}/>}
        </pawnContextProvider.Provider>
    )
}

export default PawnContext