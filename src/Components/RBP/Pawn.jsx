import React, { useRef } from 'react';
import human1 from '../../Assets/Human1.png';
import human2 from '../../Assets/Human2.png';
import human3 from '../../Assets/Human3.png';
import human4 from '../../Assets/Human4.png';
import { useInView, motion } from 'framer-motion';

const pawnArray = [human1, human2, human3, human4];
const randomPawn = pawnArray[Math.floor(Math.random() * 4)];

const Pawn = () => {
    const pawnRef = useRef();
    const isInView = useInView(pawnRef, {
        once: true
    })
    return <motion.div
        ref={pawnRef}
        style={{
            transform: isInView ? "translateY(0px)" : "translateY(10px)",
            scale: isInView ? 1 : 0.6,
            opacity: isInView ? 1 : 0,
            transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
        }}
        className='token-block'>
        <img src={randomPawn} alt="your-human" />
    </motion.div>
}

export default Pawn