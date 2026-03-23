import "./space.css"
import Star from "./Star"
import {useState, useEffect, useRef} from "react"

export default function Space () {

    const spaceRef = useRef (null);
    const idRef = useRef (1);
    const [posX, setPosX] = useState (0);
    const [posY, setPosY] = useState (0);
    const [starsData, setStarsData] = useState ([]);
    const STAR_SIZE = 40;

    function destroyStar (event, id) {
        console.log ("In destroyStar");
        setStarsData((prevStarsData) => (prevStarsData.filter ((starData) => starData.id != id)));
    }
    // function renderStar () {
    //     const x = (Math.random() * spaceRef.current.offsetHeight);
    //     const y = (Math.random() * spaceRef.current.offsetWidth);
    //     console.log ("x y=", x, y);
        
    //     return (
    //                 <Star key={idRef.current} id={idRef.current} top={x} left={y} destroyStar={destroyStar}/>
    //             );
    // }

    function renderStar () {
        // const newStar = renderStar ();
        // console.log ("newStar =", newStar);

        const x = Math.random() * (window.innerWidth - STAR_SIZE);
        const y = Math.random() * (window.innerHeight - STAR_SIZE);
        
        idRef.current = idRef.current + 1;

        const starData = {id: idRef.current, position: {x, y}}
        setStarsData((prevStarsData) => [...prevStarsData, starData]);
    }

    useEffect ( ()=> {
        const intervalId = setInterval (renderStar, 2500);

        return (()=>clearInterval(intervalId));
    }, []);

    return (
        <>
            <div id="SpaceDiv" className="space" ref={spaceRef} >
                {/* {stars} */}
                {starsData.map ((starData) => {
                    return (
                        <Star key={starData.id} id={starData.id} position={starData.position}
                                        destroyStar={destroyStar}/>
                    )})
                }
               
                {/* <Star top={posX} left={posY} /> */}
            </div>
        </>
    )
}