import React from 'react';
import './Map.css';
import Timer from '../../Utilities/Timer';
import Row from '../Row';
const Map = (props) => {
  const { pawn } = props;
  const blockNumbers = [...Array(10).keys()];
  return (
    <div className='map-head'>
      {blockNumbers.map((key, ind) => {
        return <Row pawn={pawn} key={key} rowId={ind + 1} />
      })}
    </div>
  )
};

export default Map;
