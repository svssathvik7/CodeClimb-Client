import React,{useState} from 'react'
import Map from '../../Components/Map/Map'
import "./MapPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Guidelines from '../../Components/Guidelines/Guidelines';
import DiceObject from '../../Utilities/Dice';
import Timer from '../../Utilities/Timer';
export default function MapPage() {
  const [guide, setGuide] = useState(false);
  return (
    <div>
      <div className='map-page-container'>
        <Map />
      </div>
      <div>
            <Timer />
            <DiceObject/>
            <button id = "game-guide-button" onClick = {()=>setGuide(!guide)}>
                <FontAwesomeIcon icon={faBook}/>
            </button>
            {guide && <Guidelines />}
        </div>
    </div>
  )
}
