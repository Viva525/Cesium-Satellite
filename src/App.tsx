import React, { useEffect, useState } from "react";
import CesiumComponent from "./components/main/main";
import SatelliteDashboard from "./components/satelliteDashboard/satelliteDashboard";
import { BrowserRouter, HashRouter, Link, Route, Routes } from "react-router-dom";
import { Dashboard } from "./types/type";
import "antd/dist/antd.min.css";

function App() {
  const [dashboardInfo, setDashboardInfo] = useState<Dashboard | undefined>(
    undefined
  );

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HashRouter>
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
      </HashRouter>
    </div>
  );
}

export default App;
