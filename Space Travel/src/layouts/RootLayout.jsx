import NavBar from "../components/NavBar";
// import ContentPage from "../components/Content";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header className="header">
        <NavBar />
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
