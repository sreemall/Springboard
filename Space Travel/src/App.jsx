import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  useParams,
} from "react-router-dom";
import styles from "./App.module.css";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
// import Content from "./components/Content";
import SpacecraftsPage from "./pages/SpacecraftsPage";
import PlanetsPage from "./pages/PlanetsPage";
import SpacecraftPage from "./pages/SpacecraftPage";
import BuildSpacecraftPage from "./pages/BuildSpacecractPage";
import SpacecraftAPIProvider from "./components/SpacecraftAPIProvider";
import PlanetAPIProvider from "./components/PlanetAPIProvider";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="spacecrafts" element={<SpacecraftsPage />} />
        <Route path="spacecrafts/:id" element={<SpacecraftPage />} />
        <Route path="spacecrafts/new" element={<BuildSpacecraftPage />} />
        <Route path="planets" element={<PlanetsPage />} />
      </Route>
    )
  );
  return (
    <PlanetAPIProvider>
    <SpacecraftAPIProvider>
      <div className="space-travel">
        <RouterProvider router={router} />
      </div>
    </SpacecraftAPIProvider>
    </PlanetAPIProvider>
  );
}

export default App;
