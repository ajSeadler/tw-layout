// src/utils/fetchWeather.ts
const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string;

export type WeatherData = {
  icon: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number; // in mph
  windDeg: number; // degrees
  pressure: number; // hPa
} | null;

export async function fetchWeather(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lon.toString());
    url.searchParams.set("appid", OPENWEATHER_KEY);
    url.searchParams.set("units", "imperial");

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);

    const j = await res.json();

    return {
      icon: `https://openweathermap.org/img/wn/${j.weather[0].icon}@2x.png`,
      minTemp: Math.round(j.main.temp_min),
      maxTemp: Math.round(j.main.temp_max),
      description: j.weather[0].description,
      feelsLike: Math.round(j.main.feels_like),
      humidity: j.main.humidity,
      windSpeed: j.wind.speed,
      windDeg: j.wind.deg,
      pressure: j.main.pressure,
    };
  } catch (e) {
    console.error("Weather fetch error", e);
    return null;
  }
}
