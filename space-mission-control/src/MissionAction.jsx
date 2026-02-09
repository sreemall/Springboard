import "./MissionAction.css";

export default function MissionAction ({missionId, onActionChange}) {

    return (
        <>
            <button className="MissionAction-button"
                onClick={() => onActionChange (missionId, "Launch")}>Launch</button>
            <button className="MissionAction-button"
                onClick={() => onActionChange (missionId, "Completed")}>Complete</button>
        </>
    )
}