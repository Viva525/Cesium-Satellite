import React, { useEffect, useState } from "react";
import CesiumComponent from "./components/main/main";
import SatelliteDashboard from "./components/satelliteDashboard/satelliteDashboard";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Dashboard } from "./types/type";

function App() {
  const [dashboardInfo, setDashboardInfo] = useState<Dashboard | undefined>(
    undefined
  );
  useEffect(() => {
    if (dashboardInfo !== undefined) {
      //@ts-ignore
      window.location = `http://localhost:3000/satelliteDashboard/${dashboardInfo.type}/${dashboardInfo.id}`;
    }
  }, [dashboardInfo]);
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CesiumComponent setDashboard={setDashboardInfo} />}
          ></Route>

          <Route
            path="/satelliteDashboard/:type/:id"
            element={<SatelliteDashboard />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
