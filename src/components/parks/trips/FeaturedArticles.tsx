/* eslint-disable @typescript-eslint/no-explicit-any */
import { Newspaper } from "lucide-react";
import React, { useEffect, useState } from "react";

type Article = {
  id: string;
  title: string;
  url: string;
  listingDescription: string;
  listingImage?: {
    url: string;
    altText?: string;
  };
};

const FeaturedArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_NPS_KEY;
        if (!apiKey)
          throw new Error("API key not found in environment variables.");

        const response = await fetch(
          `https://developer.nps.gov/api/v1/articles?limit=20&api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        const mappedArticles: Article[] = data.data
          .filter((item: any) => item.title && item.url)
          .map((item: any) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            listingDescription: item.listingDescription,
            listingImage: item.listingImage
              ? {
                  url: item.listingImage.url,
                  altText: item.listingImage.altText,
                }
              : undefined,
          }));

        setArticles(mappedArticles);
      } catch (err: any) {
        setError(err.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return (
      <p className="text-center text-xs italic text-[rgba(var(--copy-secondary)/0.7)] py-4 select-none">
        Loading featured articles...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-xs font-semibold text-[rgba(255,0,0,0.8)] py-4 select-none">
        Error loading articles: {error}
      </p>
    );

  return (
    <section
      aria-label="Featured articles"
      className="flex flex-col gap-4 pt-5"
    >
      <Newspaper className="w-8 h-8 text-[rgba(var(--cta))] mb-3" />
      <h2
        className="text-2xl font-semibold tracking-wide mb-2"
        style={{ color: `rgb(var(--copy-primary))` }}
      >
        Featured Articles
      </h2>

      {articles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 p-2 rounded-md transition-colors duration-200
            hover:bg-[rgba(var(--cta)/0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--cta))]"
          style={{ color: `rgba(var(--copy-primary))` }}
        >
          {article.listingImage?.url && (
            <img
              src={article.listingImage.url}
              alt={article.listingImage.altText || article.title}
              loading="lazy"
              className="w-14 h-14 rounded-md flex-shrink-0 border border-[rgba(var(--border))] object-cover bg-[rgba(var(--card))]"
            />
          )}
          <div className="flex flex-col min-w-0">
            <h3
              className="text-base font-semibold leading-snug line-clamp-2"
              style={{ color: `rgba(var(--copy-primary))` }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm mt-1 line-clamp-3"
              style={{ color: `rgba(var(--copy-secondary))` }}
            >
              {article.listingDescription || "No description available."}
            </p>
          </div>
        </a>
      ))}
    </section>
  );
};

export default FeaturedArticles;
