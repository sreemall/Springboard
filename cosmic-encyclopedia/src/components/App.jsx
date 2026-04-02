import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

// import './App.css'
import "./CelestialObject.css";
import RootLayout from "../layouts/rootLayout";
import HomePage from "./HomePage";
import CelestialObject from "./CelestialObject";
import { celObjDataLoader } from "./CelestialObject";

function App() {
  const router = createBrowserRouter (createRoutesFromElements (
                  <Route path="/" element={<RootLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path=":objId"
                          element={<CelestialObject />}
                          loader={celObjDataLoader}
                    />
                  </Route>
  ))


  return (
    <div className="cel-encyclopedia">
      {/* <h2> Celestial Encyclopedia</h2> */}
      <RouterProvider router={router} />  
      </div>  
  );
}

export default App
