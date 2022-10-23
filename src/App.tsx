import React, { useEffect, useState } from "react";
import CesiumComponent from "./components/main/main";
import SatelliteDashboard from "./components/satelliteDashboard/satelliteDashboard";
import ResourcePanel from "./components/resource/resourceMain";
import SatelliteList from "./components/left/satelliteList/index";
import { BrowserRouter, HashRouter, Link, Route, Routes } from "react-router-dom";
import { Dashboard } from "./types/type";
import "antd/dist/antd.min.css";

function App() {
  const [dashboardInfo, setDashboardInfo] = useState<Dashboard | undefined>(
    undefined
  );
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<CesiumComponent />}
          ></Route>

          <Route
            path="/1"
            element={<ResourcePanel />}
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
