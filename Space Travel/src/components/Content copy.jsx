import { useParams } from "react-router-dom";
import SpacecraftsPage from "../pages/SpacecraftsPage";

export default function Content() {
    const {reqComp} = useParams ();
    console.log ("In Content reqComp =", reqComp);

    return (
        <div className="content-container">
            {/* <h2>Content {reqComp}</h2> */}
            {(reqComp === "spacecrafts") && <SpacecraftsPage />}
        </div>
    )
}