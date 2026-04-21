import { useState, useEffect, useContext } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import SpacecraftPage from "./SpacecraftPage";
import BuildSpacecraftPage from "./BuildSpacecractPage";
import { useNavigate } from "react-router-dom";
import SpacecraftContext from "../context/spacecraftAPIContext";
import Loading from "../components/Loading";

export default function SpacecraftsPage() {
  const spacecraftAPI = useContext (SpacecraftContext);
  const navigate = useNavigate ();

  const handleBuildSpacecraft = (event) => {
    navigate ("/spacecrafts/new");
  }

  const handleDestroy = (id) => {
    spacecraftAPI.destroySpacecraftById (id);
  }
  
  
  useEffect(() => {
    spacecraftAPI.fetchSpacecrafts();
  }, []);

  return (
    <>
      {spacecraftAPI.loading ? (
        // <p className="loading">Loading ...</p>
        <Loading />
      ) : (
        <div className="spacecrafts-page">
          
          <button className="build-spacecraft" onClick={handleBuildSpacecraft}>Build a Spacecraft</button>
          {/* {spacecraftAPI.loading ? (
            // <p className="loading">Loading ...</p>
            <Loading />
          ) : ( */}
          {
            spacecraftAPI.spacecrafts.map((spacecraft) => (
              <div className="spacecraft-container" key={spacecraft.id}>
                <img
                  className="image"
                  src={spacecraft.pictureUrl}
                  alt="spacecraft"
                  onClick={() => navigate(`/spacecrafts/${spacecraft.id}`)}
                  // onClick={() => setSelected(spacecraft.id)}
                />
                <div className="spacecraft-details">
                  <p>Name: {spacecraft.name}</p>
                  <p>Capacity: {spacecraft.capacity}</p>
                </div>
                <button className="destroy" onClick={() => handleDestroy(spacecraft.id)}>Destroy</button>
              </div>
            ))
          }
        </div>
      )}
      </>
  );
}

// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2sbrRIn2MVrsvNc5UrxYDPyCtNwzqvllxhw&s"
