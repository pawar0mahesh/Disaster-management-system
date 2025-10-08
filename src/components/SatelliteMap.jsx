import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

const SatelliteMap = () => {
  const [date, setDate] = useState("");
  const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Get free key from openweathermap.org

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <h2 style={{ textAlign: "center", padding: "10px" }}>
        🛰️ Live Satellite & Weather View
      </h2>

      <MapContainer center={[30.0668, 79.0193]} zoom={6} style={{ height: "100%" }}>
        <LayersControl position="topright">
          {/* Base OpenStreetMap */}
          <BaseLayer checked name="Street Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
          </BaseLayer>

          {/* NASA GIBS Satellite True Color */}
          <BaseLayer name="NASA True Color">
            <TileLayer
              url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_CorrectedReflectance_TrueColor/default/${date}/{z}/{y}/{x}.jpg`}
              attribution="Imagery © NASA GIBS"
              tileSize={256}
              maxZoom={8}
            />
          </BaseLayer>

          {/* NASA Fires Layer */}
          <Overlay name="Active Fires (MODIS)">
            <TileLayer
              url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Thermal_Anomalies_Day/default/${date}/{z}/{y}/{x}.png`}
              opacity={0.6}
              attribution="NASA MODIS"
            />
          </Overlay>

          {/* OpenWeather Overlays */}
          <Overlay checked name="Clouds (OpenWeather)">
            <TileLayer
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              opacity={0.6}
              attribution="© OpenWeatherMap"
            />
          </Overlay>

          <Overlay name="Precipitation (Rain)">
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              opacity={0.5}
              attribution="© OpenWeatherMap"
            />
          </Overlay>

          <Overlay name="Temperature">
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              opacity={0.5}
              attribution="© OpenWeatherMap"
            />
          </Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default SatelliteMap;
