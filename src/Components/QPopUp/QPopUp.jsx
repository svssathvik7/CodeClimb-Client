import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import './QPopUp.css';
import axios from 'axios';
import UserContext from "../../Contexts/UserContext";
const QPopUp = (props) => {
    const { giveUp, from } = props;
    const [code, setCode] = useState(``);
    const {user} = useContext(UserContext);
    const changeCode = (e) => {
        const { value } = e.target;
        setCode(value);
    }
    const pushCode = async (e) => {
        try {
            // replace hard values with qId and etc after frontend
            const response = await axios.post('http://localhost:3001/api/codes/run-code', { 
                code: code,
            });
            const data = response.data;
            console.log(data);
        }
        catch (err) {
            console.log("Error");
        }
    }
    useEffect(() => {
    });
    return (
        <div className='pop-up-block'>
            <div className='pop-up-compiler-block'>
                <div data-pym-src="https://www.jdoodle.com/a/7fRG"></div>
            </div>
            <div className='pop-up-code-block'>
                <textarea onChange={changeCode} name="code" id="code" cols="30" rows="2" placeholder='Paste the code here to submit.'></textarea>
                <div className='pop-up-bottom-block'>
                    <button onClick={pushCode}>Submit</button>
                    <button onClick={() => {
                        giveUp(from);
                    }}>Give Up</button>
                </div>
            </div>
            <Helmet>
                <script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript" />
            </Helmet>
        </div>
    )
}

export default QPopUp