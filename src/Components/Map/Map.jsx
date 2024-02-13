import React from 'react';
import './Map.css';
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
