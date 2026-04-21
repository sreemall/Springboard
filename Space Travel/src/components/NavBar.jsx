import {NavLink} from "react-router-dom";
import "../SpaceTravel.css";

export default function NavBar () {

    return (
        <nav className="navbar">
            <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                to="/">Home</NavLink>
            <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                to="spacecrafts">Spacecrafts</NavLink>
            <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                to="planets">Planets</NavLink>
        </nav>
    )
}