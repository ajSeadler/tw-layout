/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const API_KEY = "K0LWPatBD5FxezkVSWOTaD9TAu0lEjeK";

export type Candle = {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
};

const useStockData = (ticker: string, delay = 0) => {
  const [data, setData] = useState<Candle[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;
    let ignore = false;
    let timeout: NodeJS.Timeout;

    async function fetchData() {
      setLoading(true);
      setError(null);
      setData(null);

      const today = new Date();
      const to = today.toISOString().slice(0, 10);
      const fromDate = new Date(today);
      fromDate.setDate(today.getDate() - 30);
      const from = fromDate.toISOString().slice(0, 10);

      try {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=30&apiKey=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const json = await res.json();

        if (!ignore) {
          if (!json.results?.length) {
            setError("No data");
            setData(null);
          } else {
            setData(json.results);
          }
        }
      } catch (e: any) {
        if (!ignore) setError(e.message || "Unknown error");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    timeout = setTimeout(() => {
      fetchData();
    }, delay);

    return () => {
      ignore = true;
      clearTimeout(timeout);
    };
  }, [ticker, delay]);

  return { data, loading, error };
};

export default useStockData;
