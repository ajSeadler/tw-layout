import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  CloudDrizzle,
  CloudFog,
  Zap,
  Droplets,
  Wind,
  GaugeCircle,
} from "lucide-react";
import type { WeatherData } from "../../utils/fetchWeather";

type WeatherProps = {
  weather: WeatherData | null;
  loading: boolean;
};

// Match description to Lucide icon
const getWeatherIcon = (description: string) => {
  const desc = description.toLowerCase();

  if (desc.includes("clear")) return <Sun size={48} />;
  if (desc.includes("clouds") && desc.includes("few"))
    return <CloudSun size={48} />;
  if (desc.includes("clouds")) return <Cloud size={48} />;
  if (desc.includes("rain") && desc.includes("light"))
    return <CloudDrizzle size={48} />;
  if (desc.includes("rain")) return <CloudRain size={48} />;
  if (desc.includes("thunder")) return <Zap size={48} />;
  if (desc.includes("snow")) return <CloudSnow size={48} />;
  if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze"))
    return <CloudFog size={48} />;

  // Default fallback
  return <Cloud size={48} />;
};

const WeatherCard = ({ weather, loading }: WeatherProps) => {
  if (loading) {
    return (
      <div className="bg-[rgb(var(--card))] p-4 rounded-2xl border border-[rgb(var(--border))] mb-6">
        <p>Loading weather...</p>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-5 rounded-2xl shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="text-[rgb(var(--cta))]">
          {getWeatherIcon(weather.description)}
        </div>
        <div>
          <p className="text-xl font-semibold capitalize">
            {weather.description}
          </p>
          <p className="text-sm text-[rgb(var(--copy-secondary))]">
            {Math.round(weather.minTemp)}° / {Math.round(weather.maxTemp)}° •
            Feels like {Math.round(weather.feelsLike)}°
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-[rgb(var(--copy-secondary))]">
        <div className="flex items-center gap-2">
          <Droplets size={16} />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind size={16} />
          <span>{weather.windSpeed} m/s</span>
        </div>
        <div className="flex items-center gap-2">
          <GaugeCircle size={16} />
          <span>{weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
