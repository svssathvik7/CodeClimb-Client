import React, { useEffect, useState } from 'react';
import { snakes, ladders } from '../Constants/MapConstants';
import ladder from '../Assets/Ladder1.png';
import './Component.css';
import Pawn from './Pawn';
const Block = (props) => {
    const { blockId, pawn } = props;
    const [block, setBlock] = useState({
        isPawn: blockId === pawn.blockId ? true : false,
        blockId: blockId,
        isSnake: snakes[blockId] ? snakes[blockId] : false,
        isLadder: ladders[blockId] ? ladders[blockId] : false,
        noOfUsers: 0,
    });
    const changeBlock = () => {
        setBlock((prev) => {
            return { ...prev, isPawn: blockId === pawn.blockId }
        });
    }
    useEffect(() => {
        changeBlock();
    }, [pawn]);
    return (
        <div id={'block-id-names' + block.blockId} className='block-head'>
            {block.isSnake && <img className={'snake-id-' + block.isSnake.start} src={block.isSnake.snake} alt='snake'></img>}
            {block.isLadder && <img className={'block-id-' + block.blockId} src={ladder} alt='ladder'></img>}
            <span className='no-of-users-count'>
                {block.noOfUsers}
            </span>
            {block.isPawn ? <Pawn pawn={pawn} /> : <p className='block-number'>{block.blockId}</p>}
        </div>
    )
}

export default Block