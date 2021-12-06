import React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Stopped from './stopped.png'
import Running from './running.png'

const Map = ({ data }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "92vh",
    latitude: 28.424308,
    longitude: 77.4011494,
    zoom: 5.5,
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={'pk.eyJ1IjoiZ2J1bXVrdWwiLCJhIjoiY2t3a3R3dm9nMXZvZTJ2cXY2bG1tMHlsNiJ9.fCNm1qJu_9bVjaYqF94J7w'}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {data?.map((marker, i) => (<Marker key={i} latitude={marker.lastRunningState.lat} longitude={marker.lastRunningState.lng}>
        <img style={{ width: '20px' }} src={marker.lastRunningState?.truckRunningState === 0 ? Stopped : Running} alt='marker' />
      </Marker>))}

    </ReactMapGL>
  );
}
export default Map