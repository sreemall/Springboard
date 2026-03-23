import "./star.css";
import {useEffect, useRef} from "react"

export default function Star ({id, position, destroyStar}) {

    //console.log ("in Star top left = ", position.x, position.y);

    const starRef = useRef(null);

	useEffect(() =>
	          {
		          const star = starRef.current;
		          star.focus();
	          }, []);
              
    return (
        <>
            <div ref={starRef} className="star" tabIndex="0" style={{left: position.x, top: position.y}}
                        onClick={(event) => destroyStar(event, id)}>
                &#9733;
            </div>
        </>
    )
}