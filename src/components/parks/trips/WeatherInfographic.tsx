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

const WeatherInfographic: React.FC<Props> = ({ weather }) => {
  if (!weather) {
    return (
      <div className="w-full p-4 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-3xl shadow-sm text-center text-[rgb(var(--copy-secondary))] text-xs">
        No weather data
      </div>
    );
  }

  // SVG gauge parameters
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  // for simplicity we map minTemp→0%, maxTemp→100% (you could map to real-world scale)
  const fillPct = 100; // full arc is always shown
  const dashArray = `${(fillPct / 100) * circumference} ${circumference}`;

  return (
    <div className="w-full max-w-xs sm:max-w-none lg:w-52 p-4 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-3xl shadow-sm flex flex-col items-center space-y-4">
      {/* 1. Radial Gauge */}
      <svg width="120" height="120" className="transform -rotate-90">
        {/* background track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgb(var(--border))"
          strokeWidth="8"
          fill="none"
        />
        {/* filled arc */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgb(var(--primary))"
          strokeWidth="8"
          fill="none"
          strokeDasharray={dashArray}
          strokeLinecap="round"
        />
      </svg>

      {/* 2. Icon & Description */}
      <div className="absolute translate-y-[-50px] bg-[rgb(var(--background-alt))] rounded-full p-3 text-[rgb(var(--primary))] text-3xl">
        <WeatherIcon desc={weather.description} />
      </div>
      <div className="pt-8 text-center space-y-1">
        <p className="text-[rgb(var(--copy-primary))] font-semibold capitalize">
          {weather.description}
        </p>
        <p className="text-[rgb(var(--copy-secondary))] text-xs">
          {weather.minTemp}° – {weather.maxTemp}°
        </p>
      </div>

      {/* 3. Metrics Bar */}
      <div className="w-full flex justify-between items-center text-[rgb(var(--copy-secondary))] text-xs">
        <div className="flex flex-col items-center">
          <WiDaySunny className="w-5 h-5 text-[rgb(var(--primary))]" />
          <span>Feels {weather.feelsLike}°F</span>
        </div>
        <div className="flex flex-col items-center">
          <WiHumidity className="w-5 h-5 text-[rgb(var(--primary))]" />
          <span>Hum {weather.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="w-5 h-5 text-[rgb(var(--primary))]" />
          <span>{weather.windSpeed} mph</span>
          <span className="uppercase">{degToCompass(weather.windDeg)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfographic;
