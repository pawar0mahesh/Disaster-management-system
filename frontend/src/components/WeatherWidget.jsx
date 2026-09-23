import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "d7bf4b47b9f0fabbb988b04909356c16"; // Replace with your key

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
       const res = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
);


          setWeather(res.data);
        } catch (err) {
            console.error(err.response ? err.response.data : err);
          setError("Failed to fetch weather data.");
        }
      },
      () => setError("Location access denied.")
    );
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className="bg-blue-100 rounded-2xl p-4 shadow-md text-center max-w-xs mx-auto">
      <h2 className="text-lg font-bold mb-2">🌦️ Current Weather</h2>
      <p className="text-xl font-semibold">{weather.name}</p>
      <p className="text-2xl mt-1">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="capitalize">{weather.weather[0].description}</p>
      <p>💨 {weather.wind.speed} m/s</p>
      <p>💧 {weather.main.humidity}% humidity</p>
    </div>
  );
};

export default WeatherWidget;
