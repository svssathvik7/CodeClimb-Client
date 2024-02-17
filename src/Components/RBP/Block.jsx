import React, { useContext, useEffect, useState } from 'react';
import { snakes, ladders } from '../../Constants/MapConstants';
import QPopUp from '../QPopUp/QPopUp.jsx';
import ladder from '../../Assets/Ladder1.png';
import './RBP.css';
import Pawn from './Pawn';
import { diceContextProvider } from '../../Contexts/DiceContext.jsx';
const Block = (props) => {
    const { setDiceRoll } = useContext(diceContextProvider);
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
        setDiceRoll((prev) => {
            return { ...prev, state: false }
        });
        setBlock((prev) => {
            return { ...prev, isPawn: false }
        });
        const value = from === 'snake' ? block.isSnake.start + 1 : block.isLadder.end;
        console.log(value);
        updatePawn(value, 'ladder-or-snake');
    }
    const giveUp = (from) => {
        console.log('gived up');
        setDiceRoll((prev) => {
            return { ...prev, state: false }
        })
        setBlock((prev) => {
            return { ...prev, isPawn: false }
        });
        const value = from === 'snake' ? block.isSnake.end : block.isLadder.start + 1;
        console.log(value);
        updatePawn(value, 'ladder-or-snake');
    }
    useEffect(() => {
        changeBlock();
    }, [pawn]);
    return (
        <div id={'block-id-names' + block.blockId} className='block-head'>
            {block.isSnake && <img title={block?.title} className={'snake-id-' + block.isSnake.start + " snakes-gif"} src={block.isSnake.snake} alt='snake'></img>}
            {block.isLadder && <img className={'block-id-' + block.blockId} src={ladder} alt='ladder'></img>}
            {block.isPawn ? <Pawn pawn={pawn} /> : <p className='block-number'>{block.blockId}</p>}
            {(block.isPawn && block.isSnake) ? <QPopUp pawn={pawn} changePositionOnSuccess={changePositionOnSuccess} setPawn={setPawn} difficulty={block.isSnake.difficulty} from='snake' giveUp={giveUp} /> : null}
            {(block.isPawn && block.isLadder) ? <QPopUp pawn={pawn} changePositionOnSuccess={changePositionOnSuccess} setPawn={setPawn} difficulty={block.isLadder.difficulty} from='ladder' giveUp={giveUp} /> : null}
        </div>
    )
}

export default Block