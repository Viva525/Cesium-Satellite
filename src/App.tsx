import React, { useEffect } from 'react';
import CesiumComponent from './components/main/main';
import SatelliteDashboard from './components/satelliteDashboard/satelliteDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div style={{height:"100vh", width:"100vw"}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CesiumComponent/>}></Route>
          <Route path='/satelliteDashboard' element={<SatelliteDashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
