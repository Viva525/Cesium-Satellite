import React, { useEffect } from 'react';
//@ts-ignore
import * as CM from 'cesium/Cesium';

const CesiumComponent: React.FC<{}> = () => {
useEffect(() => {
    CM.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTg4MTUyNy0zMTA2LTRiMDktOGE1My05ZDA4OTRmOTE3YzciLCJpZCI6MTAzMjg1LCJpYXQiOjE2NTk0MDcyODB9.sfpT8e4oxun23JG--UmUN9ZD4SbQfU-Ljvh2MsPTTcY';
    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new CM.Viewer('cesiumContainer');
}, []);

return <div id='cesiumContainer'></div>;
};

export default CesiumComponent;
