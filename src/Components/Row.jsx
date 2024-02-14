import React from 'react'
import Block from './Block';

const Row = (props) => {
    const { rowId } = props;
    const rowConstants = [...Array(10).keys()]
    return (
        <div className='row-head'>
            {rowConstants.map((key, ind) => {
                return <Block rowId={rowId} key={key} blockId={(rowId - 1) * 10 + ind + 1} />
            })}
        </div>
    )
}

export default Row