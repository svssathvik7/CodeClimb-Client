import React,{useState,useEffect} from "react";
import './Dice.css'

const Dice = () =>{
    const [rolling,setRolling] = useState(false);
    const [value,setValue] = useState(1);
    const [rolls,setRolls] = useState(1);
    const rollDice = () =>{
        if(!rolling){
            setRolling(true);
            console.log(rolls);
            setTimeout(() => {
                setRolling(false);
                setRolls((prev) => prev+1);
              }, 1000);
        }
    }
    useEffect(() => {
        if (rolling) {
          const timeoutId = setTimeout(() => {
            var newValue = Math.floor(Math.random() * 6) + 1;
            setValue(newValue);
          }, 800); 
    
          return () => clearTimeout(timeoutId);
        }
      }, [rolling]);
    return(
        <div id = "dice-component" className={`${rolling ? 'rolling' : ''}`} onClick={rollDice}>
            <span className={`dice-face face-${value}`}></span>
        </div>
    )
    
}

export default Dice;