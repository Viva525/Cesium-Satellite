import React, { useEffect } from 'react';
import CesiumComponent from './components/cesium';
// @ts-ignore
import * as CM from 'cesium/Cesium';

function App() {
  useEffect(()=>{
    const viewer = new CM.Viewer('cesiumContainer');
  }, []);

  return (
    <div id='cesiumContainer' style={{height:"100vh", width:"100vw", overflow:'hidden'}}>
    </div>
  );
}

export default App;
