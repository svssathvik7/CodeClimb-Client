import React, {useState, useEffect} from "react";
import Timer from "../Utilities/Timer";
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Guidelines from "./Guidelines";
const Home = () =>{
    const [start,setStart] = useState(false);
    const [guide, setGuide] = useState(false);
    return(
        <div>
            <button id = "start-button" onClick={() => setStart(true)} >
                Start
            </button>
            <Timer start={start}/>
            <button id = "game-guide-button" onClick = {()=>setGuide(!guide)}>
                <FontAwesomeIcon icon={faBook}/>
            </button>
            {guide && <Guidelines view={guide}/>}
        </div>

    )

}
export default Home;