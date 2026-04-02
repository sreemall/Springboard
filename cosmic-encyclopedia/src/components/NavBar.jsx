import { NavLink } from "react-router-dom";

export default function NavBar () {

    return (
      <nav className="navbar">
        <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                to="/">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                    to="mars">Mars</NavLink>
        <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                    to="venus">Venus</NavLink>
        <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                    to="orion">Orion Nebula</NavLink>
        <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"}
                    to="andromeda">Andromeda Galaxy</NavLink>
      </nav>
    );
}