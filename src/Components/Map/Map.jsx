import React, { useContext } from 'react';
import './Map.css';
import Row from '../RBP/Row';
const Map = (props) => {
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
