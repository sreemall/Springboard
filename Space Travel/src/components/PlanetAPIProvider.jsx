import { useState } from "react";
import PlanetAPIContext from "../context/planetAPIContext";
import SpaceTravelApi from "../services/SpaceTravelApi";

export default function PlanetAPIProvider ({children}) {
    const [planets, setPlanets] = useState ([]);
    const [loading, setLoading] = useState (false);

   const getPlanets = async () => {
    setLoading (true);
    try {
        const response = await SpaceTravelApi.getPlanets ();
        if (response.isError) {
            alert (`Error while getting Planets Error: ${response.data}`);
            throw new Error (response.data)
        }
        else {
            setPlanets ((prev) => response.data);
        }
    }
    catch (error) {
        console.error (error);
        alert (`Error: ${error}`);
    }
    finally {
        setLoading (false);
    }
   }

   const sendSpacecraftToPlanet = (spacecraftId, targetPlanetId) => {
        return SpaceTravelApi.sendSpacecraftToPlanet ({spacecraftId, targetPlanetId});
    }   

    return (
        <PlanetAPIContext.Provider value={{planets,
                                            loading,
                                            getPlanets,
                                            sendSpacecraftToPlanet}}>
            {children}
        </PlanetAPIContext.Provider>
    )
}