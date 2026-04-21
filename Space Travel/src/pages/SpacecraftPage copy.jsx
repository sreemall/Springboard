import { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { useParams } from "react-router-dom";

export default function SpacecraftPage ({id: propId}) {
    const [spacecraft, setSpacecraft] = useState (null);
    const [loading, setLoading] = useState (false);
    const {id: paramId} = useParams();
    const id = propId ?? paramId;


    async function fetchSpacecraftById () {
        console.log ("In Fetch by id", id, propId, paramId);

        try {
            setLoading(true);
            const response = await SpaceTravelApi.getSpacecraftById ({id});
            console.log ("In Fetch by Id response=", response);
            
            if (response.isError)
                alert(`Error while fetching Spacecraft Details :${response.data}`);
            else
                setSpacecraft(response.data);
        }
        catch (error) {
            console.error (error);
            console.log ("fetch by id error=", error, id);
            alert (`Error: ${error}`);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect (() => {
        fetchSpacecraftById ();
    }, [id])

    return (
        <>
            {loading ? (
                <p className="loading">Loading ...</p>
            ) :
                spacecraft ? (
                    <div className="spacecraft-page">
                        
                        <img className="image" src={spacecraft.pictureUrl} alt="spacecraft" />
                        <div className="spacecraft-details">
                            <div className="name-capacity">
                                <p>{spacecraft.name}</p>
                                <p>{spacecraft.capacity}</p>
                            </div>
                            <div className="desc">
                                <p>{spacecraft.description}</p>
                            </div>
                        </div>
                        
                    </div>
                ) :
                    <p>No Spacecraft Found with id:{id}</p>
            }
        </>
    )
    
}