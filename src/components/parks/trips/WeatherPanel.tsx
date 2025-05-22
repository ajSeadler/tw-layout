import React from "react";
import { Thermometer, Droplet, Wind, Gauge } from "lucide-react";

type Weather =
  | {
      icon: string;
      minTemp: number;
      maxTemp: number;
      description: string;
      feelsLike: number;
      humidity: number;
      windSpeed: number;
      windDeg: number;
      pressure: number;
    }
  | null
  | undefined;

type Props = {
  weather?: Weather;
};

function degToCompass(num: number) {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

const WeatherPanel: React.FC<Props> = ({ weather }) => {
  if (!weather) {
    return (
      <div
        className="
          bg-[rgb(var(--background))]
          border border-[rgb(var(--border))]
          rounded-xl
          p-3
          flex flex-col items-center
          text-center
          text-xs
          text-[rgb(var(--copy-secondary))]
          w-full max-w-[140px]
          select-none
          shadow-sm
        "
        role="region"
        aria-label="Weather data not available"
      >
        Weather N/A
      </div>
    );
  }

  return (
    <div
      className="
        bg-[rgb(var(--background))]
        border border-[rgb(var(--border))]
        rounded-xl
        p-4
        flex flex-col items-center
        text-center
        text-xs
        w-full max-w-[140px]
        select-none
        shadow-md
      "
      aria-label="Current Weather"
      role="region"
    >
      <img
        src={weather.icon}
        alt={weather.description}
        className="w-12 h-12 mb-2 sm:w-14 sm:h-14"
        draggable={false}
        loading="lazy"
      />
      <p
        className="font-semibold leading-snug capitalize text-[rgb(var(--copy-primary))] truncate max-w-[110px]"
        title={weather.description}
      >
        {weather.description}
      </p>
      <p className="text-[rgb(var(--copy-secondary))] font-medium leading-snug mb-3">
        {weather.minTemp}° – {weather.maxTemp}°
      </p>

      <div className="w-full grid grid-cols-2 gap-2 text-[rgb(var(--copy-secondary))]">
        <div
          className="flex items-center space-x-1 justify-start bg-[rgb(var(--background-alt))] rounded-md px-2 py-1 shadow-inner"
          aria-label={`Feels like temperature ${weather.feelsLike} degrees Fahrenheit`}
        >
          <Thermometer className="w-5 h-5 text-[rgb(var(--primary))]" />
          <span className="font-semibold">{weather.feelsLike}°F</span>
        </div>
        <div
          className="flex items-center space-x-1 justify-start bg-[rgb(var(--background-alt))] rounded-md px-2 py-1 shadow-inner"
          aria-label={`Humidity level ${weather.humidity} percent`}
        >
          <Droplet className="w-5 h-5 text-[rgb(var(--primary))]" />
          <span className="font-semibold">{weather.humidity}%</span>
        </div>
        <div
          className="flex items-center space-x-1 justify-start col-span-2 bg-[rgb(var(--background-alt))] rounded-md px-2 py-1 shadow-inner"
          aria-label={`Wind speed ${
            weather.windSpeed
          } miles per hour from ${degToCompass(weather.windDeg)}`}
        >
          <Wind className="w-5 h-5 text-[rgb(var(--primary))]" />
          <span className="font-semibold">
            {weather.windSpeed} mph {degToCompass(weather.windDeg)}
          </span>
        </div>
        <div
          className="flex items-center space-x-1 justify-start col-span-2 bg-[rgb(var(--background-alt))] rounded-md px-2 py-1 shadow-inner"
          aria-label={`Atmospheric pressure ${weather.pressure} hectopascals`}
        >
          <Gauge className="w-5 h-5 text-[rgb(var(--primary))]" />
          <span className="font-semibold">{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherPanel;
