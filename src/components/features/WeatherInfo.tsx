import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiDayThunderstorm } from "react-icons/wi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingPopUp from "../ui/LoadingPopUp";

const weatherApiKey = "ddff1ccb9997d1718531e1f7f9b1cad7";

export const WeatherInfo: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const city =
                data.address.city || data.address.town || data.address.village;
              console.log("City:", city);
              fetchData(city);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
        function (error) {
          console.error("Error: " + error.message);
          setError(error.message)
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Fall back to another method
    }
  }, []);

  const fetchData = async (city: string) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
      );
      setLoading(false)
      setWeather(response.data);
      setError(null);
    } catch (err: any) {
      setLoading(false)
      setError("Failed to fetch weather data. Please try again.");
      console.error(
        "Error details:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      fetchData(search);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
      <LoadingPopUp isLoading={loading} />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Weather Information
      </h1>

      <div className="w-full max-w-md mb-8 flex space-x-2">
        <Input
          type="text"
          placeholder="Enter city name"
          className="flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        weather && (
          <div className=" shadow-xl rounded-lg p-6 w-full max-w-md border dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              {weather.weather[0].main === "Thunderstorm" ? (
                <WiDayThunderstorm className="w-24 h-24 text-yellow-500" />
              ) : (
                <TiWeatherPartlySunny className="w-24 h-24 text-yellow-500" />
              )}
            </div>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-2 text-gray-800 dark:text-white">
                {weather.name}
              </h2>
              <p className="text-lg sm:text-xl mb-4 text-gray-600 dark:text-gray-300">
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </p>
              <p className="text-5xl sm:text-6xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                {Math.round(weather.main.temp)}°C
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <div className="flex flex-col items-center">
                  <span className="font-medium">Min Temp</span>
                  <span>{Math.round(weather.main.temp_min)}°C</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">Max Temp</span>
                  <span>{Math.round(weather.main.temp_max)}°C</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">Humidity</span>
                  <span>{weather.main.humidity}%</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">Wind Speed</span>
                  <span>{weather.wind.speed} m/s</span>
                </div>
                <div className="flex flex-col items-center col-span-2">
                  <span className="font-medium">Pressure</span>
                  <span>{weather.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherInfo;
