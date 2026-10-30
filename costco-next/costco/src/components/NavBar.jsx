"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import "./navbar.css";


export default function NavBar () {
  const pathName = usePathname ();
  const router = useRouter();

  async function handleLogout(event) {
    console.log ("999 In  Logout clicked")
    event.preventDefault ();
    console.log ("999 Logout clicked")

    try {
      await axios.post("/api/users/logout");

      console.log ("Logout Successful!");
      window.location = "/login";
    }
    catch (error) {
      console.error("Error logging out:", error);
    }
  }
  
    return (
      <nav className="nav">
        {/* <NavLink className={({isActive}) => isActive ? "active navlink" : "navlink"} */}
        <Link className={pathName === "/" ? "active home-navlink" : "home-navlink"}
                  href="/">Home
        </Link>
        <div className="auth-links">
          <Link className={pathName === "/login" ? "active login-navlink" : "login-navlink"}
                  href="/login">Log In
          </Link>
          <Link className={pathName === "/register" ? "active register-navlink" : "register-navlink"}
                href="/register">Register
          </Link>
          <Link className={pathName === "/logout" ? "active logout-navlink" : "logout-navlink"}
                 href="/logout" onClick={handleLogout}>Logout
          </Link>
          
        </div>
      </nav>
    );
}