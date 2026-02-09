import "./MissionFilter.css";
import { useState } from "react";

export default function MissionFilter ({onFilterChange}) {
    const filterOptions = ["All", "Planned", "Active", "Completed"];
   
    return (
        <>
            {filterOptions.map ((option, index) => (
                <button key={index} className="MissionFilter-button"
                    onClick={()=>onFilterChange (option)}>{option}</button>
            ))}
        </>
    )
}