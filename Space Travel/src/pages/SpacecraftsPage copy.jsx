import { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import SpacecraftPage from "./SpacecraftPage";
import BuildSpacecraftPage from "./BuildSpacecractPage";
import { useNavigate } from "react-router-dom";

export default function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [build, setBuild] = useState (false);
  const navigate = useNavigate ();

  const handleBuildSpacecraft = (event) => {
    // setBuild (true);
    navigate ("/spacecrafts/new");
  }

  const handleDestroy = async (id) => {
    try {
      const response = await SpaceTravelApi.destroySpacecraftById ({id});
      if (response.isError) {
        alert (`Error while decomissioning spacecraft with id=${id}`);
      }
      console.log ("destroyed spacecraft id=", id);
    }
    catch (error) {
      console.error (error);
      alert (`Error: ${error}`);
    }
  }

  async function fetchSpacecrafts() {
    setLoading(true);
    const response = await SpaceTravelApi.getSpacecrafts();
    
    if (response.isError)
        alert("Error while fetching Spacecraft Details :", response.data);
    else
      setSpacecrafts(response.data);

    setLoading(false);
  }
  useEffect(() => {
    fetchSpacecrafts();
  }, []);

  return (
    <>
      {!selected && !build && (
        <div className="spacecrafts-page">
          <button className="build-spacecraft" onClick={handleBuildSpacecraft}>Build a Spacecraft</button>
          {loading ? (
            <p className="loading">Loading ...</p>
          ) : (
            spacecrafts.map((spacecraft) => (
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
          )}
        </div>
      )}

      {!selected && build && <BuildSpacecraftPage />}

      {!build && selected && <SpacecraftPage id={selected} />}
    </>
  );
}

// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2sbrRIn2MVrsvNc5UrxYDPyCtNwzqvllxhw&s"
