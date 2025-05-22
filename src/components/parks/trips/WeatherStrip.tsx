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
  const containerBaseClasses = `
    w-full
    bg-[rgb(var(--background-alt))]
    border-t border-[rgb(var(--border))]
    rounded-b-3xl
    p-5
    text-[rgb(var(--copy-secondary))]
    text-sm
  `;

  if (loading) {
    return (
      <div
        className={`${containerBaseClasses} flex items-center justify-center`}
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l-3 3 3 3V4a8 8 0 010 16z"
          />
        </svg>
        Loading…
      </div>
    );
  }

  if (!weather) {
    return (
      <div
        className={`${containerBaseClasses} flex items-center justify-center`}
      >
        N/A
      </div>
    );
  }

  return (
    <div
      className={`
        ${containerBaseClasses}
        flex flex-col gap-6
        md:flex-row md:items-center md:justify-between
      `}
    >
      {/* Section 1: Icon + Temperature */}
      <div className="flex items-center justify-center gap-3 md:gap-4 flex-1">
        <div
          className="
            bg-[rgb(var(--cta))/20]
            rounded-full p-3
            text-[rgb(var(--cta))]
            text-3xl
          "
        >
          <WeatherIcon desc={weather.description} />
        </div>
        <div>
          <div className="text-[rgb(var(--copy-primary))] text-xl md:text-2xl font-semibold">
            {weather.maxTemp}°
          </div>
          <div className="text-xs uppercase tracking-wide text-[rgb(var(--copy-secondary))]">
            Current Temperature
          </div>
        </div>
      </div>

      {/* Section 2: Description */}
      <div className="flex-1 text-center md:text-left">
        <div className="capitalize font-medium text-base md:text-lg">
          {weather.description}
        </div>
        <div className="text-[8px] uppercase text-[rgb(var(--copy-secondary))]">
          Weather Condition
        </div>
      </div>

      {/* Section 3: Metrics */}
      <div className="flex justify-around flex-1 gap-4 md:gap-6">
        <div className="flex flex-col items-center">
          <WiHumidity className="w-6 h-6 md:w-7 md:h-7 text-[rgb(var(--cta))]" />
          <span className="font-medium">{weather.humidity}%</span>
          <span className="text-[8px] uppercase text-center">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="w-6 h-6 md:w-7 md:h-7 text-[rgb(var(--cta))]" />
          <span className="font-medium">{weather.windSpeed} mph</span>
          <span className="text-[8px] uppercase text-center">
            {degToCompass(weather.windDeg)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <WiDaySunny className="w-6 h-6 md:w-7 md:h-7 text-[rgb(var(--cta))]" />
          <span className="font-medium">{weather.feelsLike}°</span>
          <span className="text-[8px] uppercase text-center">Feels Like</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherStrip;
