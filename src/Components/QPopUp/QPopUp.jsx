import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import './QPopUp.css';
import { toast } from 'react-toastify';
import { userContextProvider } from '../../Contexts/UserContext';
import { motion } from "framer-motion";
import { loginDataContextProvider } from '../../Contexts/LoginDataContext';
import { pawnContextProvider } from '../../Contexts/PawnContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
const QPopUp = (props) => {
    const { formData } = useContext(loginDataContextProvider);
    const { pawn } = useContext(pawnContextProvider);
    const regNo = formData.username;
    const { giveUp, from, difficulty, changePositionOnSuccess, currPosition } = props;
    const [code, setCode] = useState(``);
    const { user } = useContext(userContextProvider);
    const [question, setQuestion] = useState();
    const [questionHeading, setQuestionHeading] = useState();
    const [loading, setLoading] = useState(false);
    const changeCode = (e) => {
        const { value } = e.target;
        console.log(value);
        setCode(value);
    }
    const pushCode = async (e) => {
        e.preventDefault();
        console.log(code);
        if (code === ``) {
            toast.info("Try Something!!", {
                position: "top-right",
                autoClose: 7000,
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
                    changePositionOnSuccess(from);
                }
                else {
                    giveUp(from);
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
    const submit = (title, description, event, callBackFunction) => {
        confirmAlert({
            title: `Confirm to ${title}`,
            message: `${description}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if (title === 'give up') {
                            callBackFunction(from);
                        }
                        else {
                            callBackFunction(event);
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
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
        toast.info(`You are at position : ${currPosition} and there is a ${from} over here ${(from === 'snake') ? " and will end up at position " + props.endPos : ""}`, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: -20, }}
            animate={{ opacity: 1, y: 0 }}
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
                        {(difficulty === 'medium') && <img className='medium-question-image' src={`http://localhost:3001/${question?.question}`} alt="" />}
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
                        <button onClick={(event) => { submit('submit', 'You can only submit once be sure.', event, pushCode); }} disabled={loading} style={{ opacity: loading ? 0.5 : 1 }}>Submit</button>

                        <button onClick={(event) => { submit('give up', "If you give up, you won't be able to enjoy the benefits of solving this question.", event, giveUp) }}>Give Up</button>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default QPopUp;