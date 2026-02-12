import { useState, useEffect, useRef } from "react";
import Circle from "./Circle";
import "./BattleSimulator.css"

export default function BattleSimulator ({DAMAGE_RANGE}) {
    const [pHealth, setPHealth] = useState(100);
    const [eHealth, setEHealth] = useState(100);
    const [gameStatus, setGameStatus] = useState("Engage The Enemy! ☄️");
    const [playBtnType, setPlayBtnType] = useState ("Fire");
    const isFirstRender = useRef (true);

    //console.log ("eHealth =", eHealth, (eHealth === 0));
    const processAttack = () => {
       
        if (playBtnType === "Restart") {   //reset game parameters
            setGameStatus("Engage The Enemy! ☄️");
            setPlayBtnType("Fire");
            setPHealth(100);
            setEHealth(100);
        }
        else {  //play the game and update scores
            let playerRand = Math.floor (Math.random () * DAMAGE_RANGE) + 1;
            let enemyRand = Math.floor (Math.random () * DAMAGE_RANGE) + 1;

            setPHealth (prev => ((prev - playerRand) < 0 ? 0 : (prev - playerRand)));
            setEHealth (prev => ((prev - enemyRand) < 0 ? 0 : (prev - enemyRand)));
        }
    }

    useEffect ( () => {
        //console.log ("In useEffect ...", isFirstRender.current, pHealth, eHealth);
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
        else {  //calculate game results
          if (pHealth === 0 && eHealth === 0) {
            setGameStatus( "It's a draw! 🤝 Both spacecrafts have been neutralized.");
            setPlayBtnType("Restart");
          }
          else if (pHealth === 0) {
            setGameStatus( "Mission Failed. 😔 Your spacecraft has been defeated.");
            setPlayBtnType("Restart");
          }
          else if (eHealth === 0) {
            setGameStatus( "Congratuations! 😎💪 You've successfully defended your  spacecraft.");
            setPlayBtnType("Restart");
          }
        }

    }, [pHealth, eHealth]);
   
    return (
        <>
            <div className="BattleSimulator">
                <h2>Space Battle Simulator</h2>
                <div className="BattleSimulator-gamePlay">
                    <h3>Player Health {
                                ((pHealth === 100) && " 100 ❤️") ||
                                ((pHealth < 100) && (pHealth > 0) && ` ${pHealth} ❤️‍🩹`)  ||
                                ((pHealth === 0) && ` ${pHealth} 💀`)
                                }
                    </h3>
                    <div>
                        <Circle btnType = {playBtnType} processAttack = {processAttack}/>
                    </div>
                    {/* <h3>Enemy Health {eHealth}❤️</h3> */}
                    <h3>Enemy Health 
                                {((eHealth === 100) && " 100 ❤️") ||
                                ((eHealth < 100) && (eHealth > 0) && ` ${eHealth} ❤️‍🩹`)  ||
                                ((eHealth === 0) && ` ${eHealth} 💀`)}
                    </h3>
                </div>
                <div className="BattleSimulator-gameStatus">
                    {gameStatus}
                </div>
            </div>
        </>
    )
}