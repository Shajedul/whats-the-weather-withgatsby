import React from "react";
import { useLocation } from "@reach/router";  // Gatsby uses @reach/router
import { useWeatherQuery, useForecastQuery } from "../../hooks/use-weather";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { CurrentWeather } from "../../components/current-weather";
import { HourlyTemperature } from "../../components/hourly-temprature";
import { WeatherDetails } from "../../components/weather-details";
import { WeatherForecast } from "../../components/weather-forecast";
import WeatherSkeleton from "../../components/loading-skeleton";
import { FavoriteButton } from "../../components/favorite-button";

export default function City({pageContext}) {
  console.log(pageContext)
  const location = useLocation();
  const lat = new URLSearchParams(location.search).get("lat") || "0";
  const lon = new URLSearchParams(location.search).get("lon") || "0";
  const cityName = new URLSearchParams(location.search).get("cityName") || "inValid Name";
  const coordinates = { lat: parseFloat(lat), lon: parseFloat(lon) };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
     <div>
       <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
     </div>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !cityName) {
    return <div>
      <WeatherSkeleton />
    </div>
     
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoriteButton
            data={{ ...weatherQuery.data, name: cityName }}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}