import React, { useEffect } from 'react';
import "cesium/widgets.css";
import * as CM from 'cesium';

const Cesium: React.FC<{}> = () => {
useEffect(() => {
    CM.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTg4MTUyNy0zMTA2LTRiMDktOGE1My05ZDA4OTRmOTE3YzciLCJpZCI6MTAzMjg1LCJpYXQiOjE2NTk0MDcyODB9.sfpT8e4oxun23JG--UmUN9ZD4SbQfU-Ljvh2MsPTTcY';
    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new CM.Viewer('cesiumContainer', {
    terrainProvider: CM.createWorldTerrain(),
    });
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = viewer.scene.primitives.add(
        CM.createOsmBuildings()
    );
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
    destination: CM.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
        heading: CM.Math.toRadians(0.0),
        pitch: CM.Math.toRadians(-15.0),
    },
    });
}, []);

return <div id='cesiumContainer' style={{ width: '100%', height: '100%' }}></div>;
};

export default Cesium;
