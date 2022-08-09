import React, { useEffect } from 'react';
import CesiumComponent from './components/main/cesium';

function App() {
  return (
    <div style={{height:"100vh", width:"100vw", overflow:'hidden'}}>
    <CesiumComponent/>
    </div>
  );
}

export default App;
