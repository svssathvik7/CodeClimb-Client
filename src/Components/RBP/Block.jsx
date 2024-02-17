import React, { useContext, useEffect, useState } from 'react';
import { snakes, ladders } from '../../Constants/MapConstants';
import QPopUp from '../QPopUp/QPopUp.jsx';
import ladder from '../../Assets/Ladder1.png';
import './RBP.css';
import Pawn from './Pawn';
import { diceContextProvider } from '../../Contexts/DiceContext.jsx';
import { leaderBoardContextProvider } from '../../Contexts/LeaderBoardContext.js';
const Block = (props) => {
    const { setDiceRoll } = useContext(diceContextProvider);
    const { showBoard, setShowBoard } = useContext(leaderBoardContextProvider);
    const { blockId, pawn, updatePawn, setPawn } = props;
    const [block, setBlock] = useState({
        isPawn: blockId === pawn.blockId ? true : false,
        blockId: blockId,
        isSnake: snakes[blockId] ? snakes[blockId] : false,
        isLadder: ladders[blockId] ? ladders[blockId] : false,
        noOfUsers: 0,
        title: snakes[blockId]?.title
    });
    const changeBlock = () => {
        setBlock((prev) => {
            return { ...prev, isPawn: blockId === pawn.blockId, title: snakes[blockId]?.title }
        });
    }
    const changePositionOnSuccess = (from) => {
        if (from === 'snake') {
            updatePawn(1, from);
        }
        else {
            const value = (block?.isLadder?.end - block?.isLadder?.start);
            updatePawn(value, from);
        }
    }
    const giveUp = (from) => {
        setBlock((prev) => {
            return { ...prev, isPawn: false }
        });
        const value = from === 'snake' ? block.isSnake.end : block.isLadder.start + 1;
        updatePawn(value, 'ladder-or-snake');
    }
    useEffect(() => {
        changeBlock();
    }, [pawn]);
    return (
        <div id={'block-id-names' + block.blockId} className='block-head'>
            {block.isSnake && <img title={block?.title} className={'snake-id-' + block.isSnake.start + " snakes-gif"} src={block.isSnake.snake} alt='snake'></img>}
            {block.isLadder && <img className={'block-id-' + block.blockId} src={ladder} alt='ladder'></img>}
            <span className='no-of-users-count' onClick={() => { setShowBoard(!showBoard) }}>
                {block.noOfUsers}
            </span>
            {block.isPawn ? <Pawn pawn={pawn} /> : <p className='block-number'>{block.blockId}</p>}
            {(block.isPawn && block.isSnake) ? <QPopUp pawn={pawn} changePositionOnSuccess={changePositionOnSuccess} setPawn={setPawn} difficulty={block.isSnake.difficulty} from='snake' giveUp={giveUp} /> : null}
            {(block.isPawn && block.isLadder) ? <QPopUp pawn={pawn} changePositionOnSuccess={changePositionOnSuccess} setPawn={setPawn} difficulty={block.isLadder.difficulty} from='ladder' giveUp={giveUp} /> : null}
        </div>
    )
}

export default Block