/* eslint-disable no-irregular-whitespace */
import React from "react";
import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiRain,
  WiSnow,
  WiDayFog,
  WiThunderstorm,
  WiStrongWind,
  WiHumidity,
} from "react-icons/wi";

type Weather =
  | {
      minTemp: number;
      maxTemp: number;
      description: string;
      feelsLike: number;
      humidity: number;
      windSpeed: number;
      windDeg: number;
    }
  | null
  | undefined;

type Props = {
  weather?: Weather;
};

function degToCompass(num: number) {
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
  return arr[Math.floor(num / 22.5 + 0.5) % 16];
}

// choose the main icon component based on description keywords
function WeatherIcon({ desc }: { desc: string }) {
  const d = desc.toLowerCase();
  if (d.includes("thunder")) return <WiThunderstorm />;
  if (d.includes("drizzle") || d.includes("rain")) return <WiRain />;
  if (d.includes("snow")) return <WiSnow />;
  if (d.includes("fog") || d.includes("mist") || d.includes("haze"))
    return <WiDayFog />;
  if (d.includes("cloudy")) return <WiCloudy />;
  if (d.includes("cloud")) return <WiCloud />;
  if (d.includes("clear") || d.includes("sunny")) return <WiDaySunny />;
  return <WiCloud />;
}

const WeatherPanel: React.FC<Props> = ({ weather }) => {
  if (!weather) {
    return (
      <div
        className="
          w-full max-w-[300px]
          p-4
          bg-[rgb(var(--background))]
          border border-[rgb(var(--border))]
          rounded-3xl
          shadow-sm
          flex items-center justify-center
          text-[rgb(var(--copy-secondary))]
          text-xs
          select-none
          transition-colors
          hover:bg-[rgb(var(--background-alt))]
        "
        role="region"
        aria-label="Weather data not available"
      >
        <span className="font-medium">No weather data</span>
      </div>
    );
  }

  return (
    <div
      className="
        w-full max-w-[300px]
        p-5
        bg-[rgb(var(--background))]
        border border-[rgb(var(--border))]
        rounded-3xl
        shadow-sm
        flex flex-col items-center
        select-none
        transition-all
        hover:shadow-md hover:bg-[rgb(var(--background-alt))]
      "
      role="region"
      aria-label={`Current weather: ${weather.description}, high ${weather.maxTemp}°, low ${weather.minTemp}°`}
    >
      {/* Main Weather Icon */}
      <div
        className="
          bg-[rgb(var(--background-alt))]
          rounded-full
          p-4
          mb-3
          text-[rgb(var(--primary))]
          text-4xl
        "
        aria-hidden="true"
      >
        <WeatherIcon desc={weather.description} />
      </div>

      {/* Description & Temperatures */}
      <p
        className="
          text-[rgb(var(--copy-primary))]
          text-sm
          font-semibold
          capitalize
          mb-1
          truncate
          max-w-full
        "
        title={weather.description}
      >
        {weather.description}
      </p>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-[rgb(var(--copy-secondary))] text-xs">High</span>
        <span className="text-[rgb(var(--copy-primary))] font-medium text-sm">
          {weather.maxTemp}°
        </span>
      </div>

      {/* Detailed Metrics */}
      <div className="w-full grid grid-cols-3 gap-3 text-[rgb(var(--copy-secondary))]">
        {/* Feels Like */}
        <div
          className="
            flex flex-col items-center
            bg-[rgb(var(--background-alt))]
            rounded-lg
            px-2 py-2
          "
          aria-label={`Feels like ${weather.feelsLike} degrees Fahrenheit`}
        >
          <WiDaySunny className="w-5 h-5 text-[rgb(var(--primary))] mb-1" />
          <span className="font-medium text-xs">{weather.feelsLike}°F</span>
          <span className="text-[8px] uppercase mt-0.5">Feels Like</span>
        </div>

        {/* Humidity */}
        <div
          className="
            flex flex-col items-center
            bg-[rgb(var(--background-alt))]
            rounded-lg
            px-2 py-2
          "
          aria-label={`Humidity ${weather.humidity} percent`}
        >
          <WiHumidity className="w-5 h-5 text-[rgb(var(--primary))] mb-1" />
          <span className="font-medium text-xs">{weather.humidity}%</span>
          <span className="text-[8px] uppercase mt-0.5">Humidity</span>
        </div>

        {/* Wind */}
        <div
          className="
            flex flex-col items-center
            bg-[rgb(var(--background-alt))]
            rounded-lg
            px-2 py-2
          "
          aria-label={`Wind speed ${
            weather.windSpeed
          } miles per hour from ${degToCompass(weather.windDeg)}`}
        >
          <WiStrongWind className="w-5 h-5 text-[rgb(var(--primary))] mb-1" />
          <span className="font-medium text-xs">{weather.windSpeed} mph</span>
          <span className="text-[8px] uppercase mt-0.5">
            {degToCompass(weather.windDeg)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherPanel;
