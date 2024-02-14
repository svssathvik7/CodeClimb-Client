import React, { useState } from 'react';
import { snakes, ladders } from '../Constants/MapConstants';
import ladder from '../Assets/Ladder1.png';
import './Component.css';
import Pawn from './Pawn';
const Block = (props) => {
    const { blockId, start } = props;
    const [block, setBlock] = useState({
        blockId: blockId,
        isSnake: snakes[blockId] ? snakes[blockId] : false,
        isLadder: ladders[blockId] ? ladders[blockId] : false,
        noOfUsers: 0,
        pawnPresent: false
    });
    const changePawn = () => {
        setBlock((prev) => {
            return { ...prev, pawnPresent: true }
        });
    }
    return (
        <div id={'block-id-names' + block.blockId} className='block-head' onClick={changePawn}>
            <p className='block-number'>{block.blockId}</p>
            {block.isSnake && <img className={'snake-id-' + block.isSnake.start} src={block.isSnake.snake} alt='snake'></img>}
            {block.isLadder && <img className={'block-id-' + block.blockId} src={ladder} alt='ladder'></img>}
            <span className='no-of-users-count'>
                {block.noOfUsers}
            </span>
            {(block.pawnPresent || (start === true && block.blockId === 1)) && <Pawn block={block} setBlock={setBlock} />}
        </div>
    )
}

export default Block