
import "./MissionCard.css";


export default function MissionCard ({mission}) {
    return (
        <>
            <h3 className="MissionCard-title">{mission.name}</h3> 
            <p className="MissionCard-p">Status: {mission.status}</p>
            <p className="MissionCard-p"> Crew: {mission.crew.join (", ")} </p>  
        </>
    )
}
