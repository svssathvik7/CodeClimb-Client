import React from 'react';
import './Map.css';
import { snakes,ladders } from '../../Constants/MapConstants';
import Timer from '../../Utilities/Timer';
import Row from '../Row';
const Map = () => {
  const blockNumbers = [...Array(10).keys()];
  return (
    <div className='map-head'>
      {blockNumbers.map((key, ind) => {
        return <Row key={key} rowId={ind + 1} />
      })}
    </div>
  )
};

export default Map;
