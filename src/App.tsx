import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";
import TopTracks from "./TopTrack";

const App = () => {
  const mapRef = useRef<mapboxgl.Map | null>();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <>
      <TopTracks />
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
};

export default App;
