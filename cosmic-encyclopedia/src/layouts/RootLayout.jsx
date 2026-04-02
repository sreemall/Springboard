import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../components/CelestialObject.css";

export default function RootLayout() {
    const navigate = useNavigate ();
    
    const goBack = (event) => {
        if (window.history.length >1)
            navigate (-1);
        else
            navigate ("/");
    }
  return (
    <div className="root-layout">
      <header>
        <NavBar />
      </header>

      <main className="main">
        <Outlet />
      </main>
      <footer>
        <button className="go-back" onClick={goBack}>Go Back</button>
      </footer>
    </div>
  );
}
