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
      // window.location = `http://localhost:3000/satelliteDashboard/${dashboardInfo.type}/${dashboardInfo.id}`;
      window.location = `http://localhost:3000/satelliteDashboard`;
      console.log(dashboardInfo);
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

          {/* 配合useNavigator使用 */}
          <Route
            path="/satelliteDashboard/"
            element={<SatelliteDashboard />}
          ></Route>

          {/* <Route path='/satelliteDashboard/:type/:id' element={<SatelliteDashboard type={dashboardInfo?.type} id={dashboardInfo?.id} />}></Route> */}
          {/* <Link to={{pathname: "/satelliteDashboard/"}} state={{type: dashboardInfo?.type, id:dashboardInfo?.id}}></Link> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
