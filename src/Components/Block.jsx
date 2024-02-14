import React, { useState } from 'react';
import { snakes, ladders } from '../Constants/MapConstants';
import ladder from '../Assets/Ladder1.png';
import './Component.css';
const Block = (props) => {
    const { blockId } = props;
    const [block, setBlock] = useState({
        blockId: blockId,
        isSnake: snakes[blockId] ? snakes[blockId] : false,
        isLadder: ladders[blockId] ? ladders[blockId] : false,
        noOfUsers: 0
    });
    return (
        <div id={block.blockId} className='block-head'>
            <p className='block-number'>{block.blockId}</p>
            {block.isSnake && <img className={'snake-id-' + block.isSnake.start} src={block.isSnake.snake} alt='snake'></img>}
            {block.isLadder && <img className={'block-id-' + block.blockId} src={ladder} alt='ladder'></img>}
            <span className='no-of-users-count'>
                {block.noOfUsers}
            </span>
        </div>
    )
}

export default Block