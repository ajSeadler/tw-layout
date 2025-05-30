import React from "react";
import SearchParks from "./SearchParks";

const SearchPage: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto p-6 sm:p-12 space-y-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-[rgb(var(--copy-primary))]">
          Explore National Parks
        </h1>
        <p className="mt-2 text-[rgb(var(--copy-secondary))] max-w-xl">
          Search, filter, and discover detailed information about all U.S.
          National Parks, Monuments, Preserves, and more. Use the search box
          below to get started.
        </p>
      </header>

      <SearchParks />

      <footer className="pt-12 border-t border-[rgba(var(--border))] text-[rgb(var(--copy-secondary))] text-center text-sm">
        Data sourced from the National Park Service API — updated regularly.
      </footer>
    </main>
  );
};

export default SearchPage;
