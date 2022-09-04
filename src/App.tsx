import React, { useEffect, useState } from 'react';
import CesiumComponent from './components/main/main';
import SatelliteDashboard from './components/satelliteDashboard/satelliteDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './types/type';


function App() {
  const [dashboardInfo, setDashboardInfo] = useState<Dashboard|undefined>(undefined);
  return (
    <div style={{height:"100vh", width:"100vw"}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CesiumComponent setDashboard={setDashboardInfo}/>}></Route>
          <Route path='/satelliteDashboard' element={<SatelliteDashboard type={dashboardInfo?.type} id={dashboardInfo?.id} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
