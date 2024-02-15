import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import './QPopUp.css';
const QPopUp = (props) => {
    const { giveUp, from } = props;
    const [code, setCode] = useState({
        actualCode: '',
    });
    const changeCode = (e) => {
        console.log(e);
    }

    useEffect(() => {
        const codeElement = document.querySelectorAll("#code .ace_content .ace_text_layer .ace_line span");
        console.log(codeElement);
    }, [])
    return (
        <div className='pop-up-block'>
            <div className='pop-up-compiler-block'>
                <div data-pym-src="https://www.jdoodle.com/a/7fRG"></div>
            </div>
            <div className='pop-up-bottom-block'>
                <button onClick={() => {
                    giveUp(from);
                }}>Give Up</button>
                <button>Submit</button>
            </div>
            <Helmet>
                <script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript" />
            </Helmet>
        </div>
    )
}

export default QPopUp