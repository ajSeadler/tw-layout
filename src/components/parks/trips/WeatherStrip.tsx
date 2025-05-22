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

export type Weather =
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
  loading?: boolean;
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

function WeatherIcon({ desc }: { desc: string }) {
  const d = desc.toLowerCase();
  if (d.includes("thunder")) return <WiThunderstorm />;
  if (d.includes("rain")) return <WiRain />;
  if (d.includes("snow")) return <WiSnow />;
  if (d.includes("fog") || d.includes("mist") || d.includes("haze"))
    return <WiDayFog />;
  if (d.includes("cloudy")) return <WiCloudy />;
  if (d.includes("cloud")) return <WiCloud />;
  if (d.includes("clear") || d.includes("sunny")) return <WiDaySunny />;
  return <WiDaySunny />;
}

const WeatherStrip: React.FC<Props> = ({ weather, loading }) => {
  if (loading) {
    return (
      <div
        className="
        w-full flex items-center justify-center
        bg-[rgb(var(--background-alt))]
        border-t border-[rgb(var(--border))]
        rounded-b-3xl
        p-4
        text-[rgb(var(--copy-secondary))]
        text-sm
      "
      >
        <svg
          className="animate-spin w-5 h-5 mr-2 text-[rgb(var(--cta))]"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l-3 3 3 3V4a8 8 0 010 16z"
          ></path>
        </svg>
        Loading…
      </div>
    );
  }

  if (!weather) {
    return (
      <div
        className="
        w-full flex items-center justify-center
        bg-[rgb(var(--background-alt))]
        border-t border-[rgb(var(--border))]
        rounded-b-3xl
        p-4
        text-[rgb(var(--copy-secondary))]
        text-sm
      "
      >
        N/A
      </div>
    );
  }

  return (
    <div
      className="
      w-full
      bg-[rgb(var(--background-alt))]
      border-t border-[rgb(var(--border))]
      rounded-b-3xl
      p-4
      flex flex-col md:flex-row items-center
      text-[rgb(var(--copy-secondary))]
      text-sm
      space-y-3 md:space-y-0 md:space-x-6
    "
    >
      {/* 1. Icon & Current (maxTemp) */}
      <div className="flex items-center space-x-2 flex-1 justify-center">
        <div
          className="
          bg-[rgb(var(--cta))/30]
          rounded-full p-2
          text-[rgb(var(--cta))]
          text-2xl md:text-3xl
        "
        >
          <WeatherIcon desc={weather.description} />
        </div>
        <div className="text-[rgb(var(--copy-primary))] text-xl md:text-2xl font-semibold">
          {weather.maxTemp}°
        </div>
      </div>

      {/* 2. Description */}
      <div className="flex-1 text-center md:text-left">
        <div className="capitalize font-medium">{weather.description}</div>
        <div className="text-[8px] uppercase text-[rgb(var(--copy-secondary))]">
          Condition
        </div>
      </div>

      {/* 3. Metrics */}
      <div className="flex-1 flex justify-between">
        <div className="flex flex-col items-center">
          <WiHumidity className="w-6 h-6 text-[rgb(var(--cta))]" />
          <span className="font-medium">{weather.humidity}%</span>
          <span className="text-[8px] uppercase">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="w-6 h-6 text-[rgb(var(--cta))]" />
          <span className="font-medium">{weather.windSpeed} mph</span>
          <span className="text-[8px] uppercase">
            {degToCompass(weather.windDeg)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <WiDaySunny className="w-6 h-6 text-[rgb(var(--cta))]" />
          <span className="font-medium">{weather.feelsLike}°</span>
          <span className="text-[8px] uppercase">Feels Like</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherStrip;
