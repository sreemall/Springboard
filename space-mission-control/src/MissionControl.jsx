import MissionFilter from "./MissionFilter";
import MissionCard from "./MissionCard";
import MissionAction from "./MissionAction";
import "./MissionControl.css";
import { useState } from "react";

export default function MissionControl ({initialMissions}) {
    //const [filteredMissions, setFilteredMissions] = useState (initialMissions);
    const [missions, setMissions] = useState (initialMissions);

    const INITIAL_FILTER = "All";
    const [filter, setFilter] = useState (INITIAL_FILTER);

    const handleMissionActionChange = (missionId, newAction) => {

        if (newAction !== 'Completed') {
            newAction = 'Active';
        }
        //console.log ("missionId =", missionId, newAction);
        setMissions(prev => prev.map (mission => (
                    (mission.id === missionId) ? {...mission, status: newAction} : mission)));
    }
    let filteredMissions = missions.filter ((mission) => (
                    (filter === 'All') || (mission.status === filter)));
        //console.log ("filtered = ", filteredMissions, filter);

    return (
            
            <div className="MissionControl">
                <h2>Space Mission Control</h2>
                <div className="filterContainer">
                    <MissionFilter onFilterChange={setFilter}/>
                </div>
                { filteredMissions.map (mission => (
                    <div key={mission.id} className="missionContainer">
                        <div className="cardContainer">
                            <MissionCard mission={mission} />
                        </div>
                        <div className="actionContainer">
                            <MissionAction missionId={mission.id} onActionChange={handleMissionActionChange}/>
                        </div>
                    </div>
                    ))}  
                
            </div>
    )
}
