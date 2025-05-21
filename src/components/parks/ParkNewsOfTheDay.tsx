/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

type Article = {
  id: string;
  url: string;
  title: string;
  listingDescription: string;
  listingImage: {
    url: string;
    altText: string;
  };
};

const API_KEY = "5H2kKAyTFXd4yA6xZOSJgLbS6ocDzs8a1j37kQU1";

const ParkNewsOfTheDay: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("parkArticleOfTheDay");
    const today = new Date().toISOString().split("T")[0];

    if (saved) {
      try {
        const { date, item } = JSON.parse(saved);
        if (date === today) {
          setArticle(item);
          setLoading(false);
          return;
        }
      } catch {
        // ignore invalid cache
      }
    }

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://developer.nps.gov/api/v1/articles?limit=50&api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const filtered: Article[] = (json.data as any[]).filter(
          (a) => a.listingImage?.url && a.title && a.url && a.listingDescription
        );
        if (filtered.length === 0) {
          throw new Error("No valid articles found.");
        }
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        setArticle(random);
        localStorage.setItem(
          "parkArticleOfTheDay",
          JSON.stringify({ date: today, item: random })
        );
      } catch (err: any) {
        console.error("Failed to fetch article:", err);
        setError("Unable to load today’s article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

  if (loading) {
    return (
      <section className="p-8 text-center text-[rgb(var(--copy-secondary))]">
        Loading article…
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-8 text-center text-[rgb(var(--copy-secondary))]">
        {error}
      </section>
    );
  }

  if (!article) {
    return null;
  }
  const cleanText = article.listingDescription.normalize("NFKD");

  return (
    <section className="relative w-full overflow-hidden cursor-default transition hover:shadow-xl">
      {/* Full‑width background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${article.listingImage.url})`,
          filter: "brightness(0.5)",
        }}
      />

      {/* Overlay content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-left text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Park Article Spotlight
        </h2>
        <p className="max-w-3xl text-lg sm:text-xl font-semibold text-[rgb(var(--cta))] drop-shadow-md mb-2">
          {article.title}
        </p>
        <p className="max-w-2xl text-gray-200 drop-shadow-sm mb-6">
          <p className="max-w-2xl text-gray-200 drop-shadow-sm mb-6">
            {cleanText.slice(0, 240)}...
          </p>
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-xl bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold transition"
        >
          Read Full Article
        </a>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-0" />
    </section>
  );
};

export default ParkNewsOfTheDay;
