import React, { useContext, useEffect, useState } from 'react';
import { snakes, ladders } from '../../Constants/MapConstants';
import QPopUp from '../QPopUp/QPopUp.jsx';
import ladder from '../../Assets/Ladder1.png';
import './RBP.css';
import Pawn from './Pawn';
import { pawnContextProvider } from '../../Contexts/PawnContext.jsx';
import { toast } from 'react-toastify';
const Block = (props) => {
    const { blockId } = props;
    const { pawn, setPawn, updatePawnPosition } = useContext(pawnContextProvider);
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
    const changePositionOnSuccess = async (from) => {
        var section;
        if(from === "snake")
        {
            section = await (block.isSnake.start >= 62 && block.isSnake.start <= 100) ? "section3" : (block.isSnake.start > 40 && block.isSnake.start <= 63) ? "section2" : "section1";
        }
        else{
            section = await (block.isLadder.start >= 62 && block.isLadder.start <= 100) ? "section3" : (block.isLadder.start > 40 && block.isLadder.start <= 63) ? "section2" : "section1";
        }
        await setBlock((prev) => {
            return { ...prev, isPawn: false, [section] : true };
        });
        const value = from === 'snake' ? block.isSnake.start + 1 : block.isLadder.end;
        const message = from === 'snake' ? `Hurray! You successfully avoided the snake bite at ${block.isSnake.start}. You've been moved to the next block` : `Congratulations! You've successfully solved the question for the ladder ${block.isLadder.start}. You've been moved to ${block.isLadder.end}`
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        updatePawnPosition(value, 'ladder-or-snake');
    }
    const giveUp = (from) => {
        setBlock((prev) => {
            return { ...prev, isPawn: false }
        });
        const value = from === 'snake' ? block.isSnake.end : block.isLadder.start + 1;
        const message = from === 'snake' ? `Oh no! The snake at position ${block.isSnake.start} has bitten you! You've been moved to ${block.isSnake.end}` : `Oops! You didn't solve the question for the ladder ${block.isLadder.start}. You've been moved to the next block.`;
        toast.info(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        updatePawnPosition(value, 'ladder-or-snake');
    }
    useEffect(() => {
        changeBlock();
    }, [pawn]);
    return (
        <div id={'block-id-names' + block.blockId} className={'block-head block-' + block?.isSnake?.difficulty}>
            {block.isSnake && <img title={block?.title} className={'snake snake-id-' + block.isSnake.start + " snakes-gif"} src={block.isSnake.snake} alt='snake'></img>}
            {block.isLadder && <img className={'ladder block-id-' + block.blockId + " ladders"} src={ladder} alt='ladder'></img>}
            {block.isPawn ? <Pawn pawn={pawn} /> : <p className='block-number'>{block.blockId}</p>}
            {(block.isPawn && block.isSnake) ? <QPopUp pawn={pawn} currPosition={block.blockId} changePositionOnSuccess={changePositionOnSuccess} setPawn={setPawn} difficulty={block.isSnake.difficulty} from='snake' giveUp={giveUp} /> : null}
            {(block.isPawn && block.isLadder) ? <QPopUp pawn={pawn} currPosition={block.blockId} changePositionOnSuccess={changePositionOnSuccess} setPawn={setPawn} difficulty={block.isLadder.difficulty} from='ladder' giveUp={giveUp} /> : null}
        </div>
    )
}

export default Block