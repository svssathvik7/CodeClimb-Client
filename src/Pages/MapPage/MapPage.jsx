import React, { useEffect, useState } from 'react'
import Map from '../../Components/Map/Map'
import "./MapPage.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import Timer from '../../Utilities/Timer';
import Guidelines from '../../Components/Guidelines/Guidelines';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
export default function MapPage() {
  const params = new URLSearchParams(window.location.search);
  const regNo = params.get('param1');
  const [guide,setGuide] = useState(false)
  const [pawn, setPawn] = useState({
    blockId: null,
    questions: [],
    diceRolls: 0,
    bonus: 0,
  });
  // const getPosition = async () => {
  //   const response = await axios.post('http://localhost:3001/api/details/getPosition', { regNo: regNo });
  //   const data = response.data;
  //   if (data.status === true) {
  //     const details = data.userDetails;
  //     setPawn((prev) => {
  //       return { ...prev, blockId: details ? details.currPosition : null, diceRolls: details ? details.totalRolls : null, questions: details ? details.questions  : null}
  //     });
  //   }
  //   else {
  //     toast.error("Error Occured!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  // }
  // useEffect(() => {
  //   getPosition();
  // }, []);
  return (
    <div className='map-page-container'>
      <Timer/>
      <Map pawn={pawn} />
      <button id = 'game-guide-button' onClick = {() => setGuide(!guide)}>
        <FontAwesomeIcon icon = {faBook}/> 
      </button>
      {guide && <Guidelines view = {guide}/>}
    </div>
  )
}
