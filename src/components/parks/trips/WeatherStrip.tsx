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
  const baseClasses =
    "w-full bg-[rgb(var(--background-alt))] border-t border-[rgb(var(--border))] rounded-b-3xl";

  if (loading) {
    return (
      <div className={`${baseClasses} flex items-center justify-center p-4`}>
        <svg
          className="animate-spin w-6 h-6 mr-2 text-[rgb(var(--cta))]"
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
        <span className="text-[rgb(var(--copy-secondary))] text-base">
          Loading…
        </span>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className={`${baseClasses} flex items-center justify-center p-4`}>
        <span className="text-[rgb(var(--copy-secondary))] italic">
          Weather data not available
        </span>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} p-4 sm:p-6`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Main Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-[rgb(var(--cta))/20] rounded-full p-4 text-[rgb(var(--cta))] text-7xl sm:text-6xl">
            <WeatherIcon desc={weather.description} />
          </div>
          <div>
            <div className="text-[rgb(var(--copy-primary))] text-2xl sm:text-3xl font-semibold">
              {weather.maxTemp}°
            </div>
            <div className="uppercase tracking-wide text-xs sm:text-sm text-[rgb(var(--copy-secondary))]">
              Feels like {weather.feelsLike}° &bull; {weather.description}
            </div>
          </div>
        </div>

        {/* Metrics for desktop, collapse into scrollable on mobile */}
        <div className="mt-4 sm:mt-0 flex sm:flex-none overflow-x-auto no-scrollbar gap-6 sm:gap-8">
          {/* Humidity */}
          <div className="flex flex-col items-center min-w-[80px]">
            <WiHumidity className="w-7 h-7 text-[rgb(var(--cta))]" />
            <span className="font-medium text-sm">{weather.humidity}%</span>
            <span className="text-[8px] uppercase text-[rgb(var(--copy-secondary))]">
              Humidity
            </span>
          </div>
          {/* Wind */}
          <div className="flex flex-col items-center min-w-[80px]">
            <WiStrongWind className="w-7 h-7 text-[rgb(var(--cta))]" />
            <span className="font-medium text-sm">{weather.windSpeed} mph</span>
            <span className="text-[8px] uppercase text-[rgb(var(--copy-secondary))]">
              {degToCompass(weather.windDeg)}
            </span>
          </div>
          {/* Pressure or feels like repeated? */}
          <div className="flex flex-col items-center min-w-[80px]">
            <WiDaySunny className="w-7 h-7 text-[rgb(var(--cta))]" />
            <span className="font-medium text-sm">{weather.feelsLike}°</span>
            <span className="text-[8px] uppercase text-[rgb(var(--copy-secondary))]">
              Feels Like
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherStrip;
