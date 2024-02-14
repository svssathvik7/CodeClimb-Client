import React, { useState } from 'react'
import Map from '../../Components/Map/Map'
import "./MapPage.css";
export default function MapPage() {
  const [start, setStart] = useState(false);
  const changeStart = () => {
    setStart(true);
  }
  return (
    <div className='map-page-container'>
      <Map start={start} />
      <button style={{ zIndex: 1000 }} onClick={changeStart}>Start</button>
    </div>
  )
}
