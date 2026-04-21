import { useState, useContext, useEffect } from "react"
import PlanetAPIContext from "../context/planetAPIContext";
import SpacecraftAPIContext from "../context/spacecraftAPIContext";
import Loading from "../components/Loading";

export default function PlanetsPage () {
    const [targetPlanetId, setTargetPlanetId] = useState (null);
    const PlanetAPI = useContext (PlanetAPIContext);
    const SpacecraftAPI = useContext (SpacecraftAPIContext);

    const spacecraftsOnPlanet = (planetId) => {
        const scList = [];
        for (let sc of SpacecraftAPI.spacecrafts) {
            if (sc.currentLocation === planetId) {
                scList.push (sc);
            }
        }
        return scList;
    }

    const handlePlanetClick = (planetId) => {
        console.log ("999 handlePlanetClick planetId=", planetId);
        setTargetPlanetId ((prev) => planetId);
        console.log ("999 targetPlanetId = ", targetPlanetId);
    }

    const handleSpacecraftClick = (spacecraftId) => {
        console.log ("9999 handleSpacecraftClick scId=", spacecraftId);
        if (targetPlanetId !== null) {
            const response = PlanetAPI.sendSpacecraftToPlanet (spacecraftId, targetPlanetId);
            if (response.isError) {
                alert (`Error while sending spacecraft id:${spacecraftId} to planet id:${targetPlanetId}`);
                return;
            }
            else {
                //re-fetch spacecrafts and planets
                setTargetPlanetId (null);
                PlanetAPI.getPlanets ();
                SpacecraftAPI.fetchSpacecrafts ();
                console.log ("999 after move planets:", PlanetAPI.planets, SpacecraftAPI.spacecrafts);
            }
        }
    }

    useEffect (() => {
        // console.log ("in planetspage useEffect")
        SpacecraftAPI.fetchSpacecrafts();
        PlanetAPI.getPlanets ();
        // console.log ("planets page spacecrafts=", SpacecraftAPI.spacecrafts)
    }, []);

    return (
        <div className="pp-planets-page">
            {PlanetAPI.loading ? (
                            // <p> Loading ...</p>
                            <Loading />
            ) : (
                PlanetAPI.planets.map ((planet) => (
                    <div className="pp-planet-container" key={planet.id}>
                        <div className="pp-planet-details"
                                onClick={() => handlePlanetClick (planet.id)}>
                            <img className="pp-planet-details-img" src={planet.pictureUrl} />
                            <p>{planet.name}</p>
                            <p>{planet.currentPopulation}</p>
                        </div>
                        <div className="pp-spacecrafts-container">
                        {spacecraftsOnPlanet(planet.id).map ((sc) =>  (
                                <div className="pp-spacecraft-details" key={sc.id}
                                        onClick={() => handleSpacecraftClick (sc.id)}>
                                    <img className="pp-spacecraft-details-img" src={sc.pictureUrl}/>
                                    <p>{sc.name}</p>
                                    <p>{sc.capacity}</p>
                                </div>
                            )
                        )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}