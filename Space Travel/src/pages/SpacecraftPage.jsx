import { useState, useEffect, useContext } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { useParams } from "react-router-dom";
import SpacecraftContext from "../context/spacecraftAPIContext";
import Loading from "../components/Loading";

export default function SpacecraftPage () {
    const {id} = useParams();
    const spacecraftAPI = useContext (SpacecraftContext);

    useEffect (() => {
        spacecraftAPI.fetchSpacecraftById (id);
    }, [id])

    return (
        <>
            {spacecraftAPI.loading ? (
                // <p className="loading">Loading ...</p>
                <Loading />
            ) :
                spacecraftAPI.spacecraft ? (
                    <div className="sp-spacecraft-page">
                        
                        <img className="sp-image" src={spacecraftAPI.spacecraft.pictureUrl} alt="spacecraft" />
                        <div className="sp-spacecraft-details">
                            <div className="sp-sc-details-name-capacity">
                                <p>{spacecraftAPI.spacecraft.name}</p>
                                <p>{spacecraftAPI.spacecraft.capacity}</p>
                            </div>
                            <div className="sp-sc-detail-desc">
                                <p>description:</p>
                                <p>{spacecraftAPI.spacecraft.description}</p>
                            </div>
                        </div>
                        
                    </div>
                ) :
                    <p>No Spacecraft Found with id:{id}</p>
            }
        </>
    )
}