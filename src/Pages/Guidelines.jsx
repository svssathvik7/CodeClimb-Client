import React from "react";
import { useState } from "react";
import "./Guidelines.css";
 const Guidelines = (props)  =>{
    return (
            <div id = "Guide-Lines">
                <div id = "Guidelines-header">
                    <h1>GUIDELINES</h1>
                </div>
                <div id = "guidelines">
                        <ul>
                            <li>It is a Single Player game</li>
                            <li>You can end the game anytime by clicking on the END button </li>
                            <li>Skipping the question is allowed for level snakes which makes you go to the tail of the snake</li>
                            <li>Skipping the question is allowed for all level ladders which makes you move to the next block only instead of climbing it</li>
                            <li>The game must be completed within a given time</li>
                            <li>The Easy level Questions and fill the code questions will be given in C language only 
                                and the Coding question can be solved in any language based on the users' preference</li>
                            <li>The Number of times a die is rolled will be considered to calculate the score. 
                                So Make sure you reach 100 on a minimum number of rolls</li>
                            <li>The People who reach 100 in a given time will be prioritized</li>
                        </ul>
                </div>
            </div>
    )
 }
 export default Guidelines;