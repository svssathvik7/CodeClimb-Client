import React from 'react'
import Block from './Block';
import Pawn from './Pawn';

const Row = (props) => {
    const { rowId, start } = props;
    const rowConstants = [...Array(10).keys()]
    return (
        <div className='row-head'>
            {rowConstants.map((key, ind) => {
                return <Block start={start} rowId={rowId} key={key} blockId={(rowId - 1) * 10 + ind + 1} />
            })}
        </div>
    )
}

export default Row