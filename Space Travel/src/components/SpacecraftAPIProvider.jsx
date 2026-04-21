import { useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import SpacecraftAPIContext from "../context/spacecraftAPIContext";

export default function SpacecraftAPIProvider ({children}) {
    const [spacecrafts, setSpacecrafts] = useState ([]);
    const [loading, setLoading] = useState (false);
    const [spacecraft, setSpacecraft] = useState (null);


    const buildSpacecraft = async (data) => {
        setLoading (true);
        try {
            
            const response = await SpaceTravelApi.buildSpacecraft (data);
                
            if (response.isError) {
                alert (`Error while building a spacecraft Error: ${response.data}`);
                throw new Error (response.data);
            }
            else {
                await fetchSpacecrafts ();
            }
        }
        catch (error) {
            console.error (error);
            alert (`Error: ${error}`);
        }
        finally {
            setLoading(false);
        }
    }
    const destroySpacecraftById = async (id) => {
        try {
          const response = await SpaceTravelApi.destroySpacecraftById ({id});
          if (response.isError) {
            alert (`Error while decomissioning spacecraft with id=${id}`);
            throw new Error (response.data);
          }
          else {
            setSpacecrafts ((prev) => prev.filter ((spacecraft) => spacecraft.id !== id));
          }
        //   console.log ("destroyed spacecraft id=", id);
        }
        catch (error) {
          console.error (error);
          alert (`Error: ${error}`);
        }
    }

    async function fetchSpacecraftById (id) {
        console.log ("In Fetch by id", id);

        setLoading (true);
        setSpacecraft (spacecrafts.find ((sc) => sc.id === id));
        setLoading(false);  
    }

    async function fetchSpacecrafts() {
        setLoading(true);
        try {
            const response = await SpaceTravelApi.getSpacecrafts();
            
            if (response.isError)
                alert("Error while fetching Spacecrafts :", response.data);
            else
                setSpacecrafts((prev) => response.data);
        }
        catch (error) {
            console.error (error);
            alert (`Error: ${error}`);
        }
        finally {
            setLoading(false);
        }
      }

    // const sendSpacecraftToPlanet = (spacecraft, targetPlanet) => {
    //     try {
    //         const response = SpaceTravelApi.sendSpacecraftToPlanet ({spacecraftId, targetPlanetId});
    //         if (response.isError) {
    //             alert (`Error while sending spacecraft id:${spacecraftId} to planet id:${targetPlanetId} Error:${response.data}`)
    //         }
    //         else {

    //         }
    //     }
    //     catch (error) {
    //         console.err (error);
    //         alert (`Error: ${error}`);
    //     } 
    // }

    return (
        <SpacecraftAPIContext.Provider value={{loading,
                                                spacecraft,
                                                spacecrafts,
                                                fetchSpacecrafts,
                                                fetchSpacecraftById,
                                                buildSpacecraft,
                                                destroySpacecraftById}}>
            {children}
        </SpacecraftAPIContext.Provider>
    )
}