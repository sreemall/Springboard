import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import data from "../../data/db.json"
import Content from "./Content";



export default function CelestialObject () {
    const {objId} = useParams ();
    const celObjData = useLoaderData ();
    const navigate = useNavigate ();
    // console.log ("objId=", objId);
    // console.log ("celObjData=", celObjData);

    // const goBack = (event) => {
    //     if (window.history.length >1)
    //         navigate (-1);
    //     else
    //         navigate ("/");
    // }

    return (
        
        <>
            <div className="content-container">
                <div className="content">
                    <Content celObjData={celObjData} />
                    {/* <h2>{celObjData.title}</h2>
                    <p>{celObjData.content}</p> */}
            {/* {(objId === "mars") && <Mars />}
            {(objId === "venus") && <Venus />}
            {(objId === "orion") && <OrionNebula />}
            {(objId === "andromeda") && <AndromedaGalaxy />} */}
                </div>
                {/* <button className="go-back" onClick={goBack}>Go Back</button> */}
            </div>
        </>
    )
}

export const celObjDataLoader = async ({params}) => {
    
    const {objId} = params;
    // console.log ("in loader objId=", objId);
    // console.log ("in loader =", data.celestialObjects.find ((obj) => (obj.id === objId)));
    return (data.celestialObjects.find (obj => obj.id == objId));
}