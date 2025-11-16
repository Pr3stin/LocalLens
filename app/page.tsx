"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import ExperienceCard from "./components/ExperienceCard";
import Navbar from "./components/NavBar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResults([]); // clear old results

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f11] to-[#141622] text-white">
      <Navbar />
      {/* HERO */}
      <section className="pt-28 pb-24 text-center px-4">
        <h1 className="text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
          LocalLens
        </h1>

        <p className="text-xl mt-6 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          AI-powered discovery of the best local restaurants, nightlife, coffee,
          hangouts, and hidden gems near you.
        </p>

        {/* Floating Search Bar */}
        <form onSubmit={handleSearch} className="mt-14 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>

            <input
              type="text"
              disabled={loading}
              placeholder="Try: best tacos in Detroit, cozy cafés nearby…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full px-14 py-5 text-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl 
              placeholder-gray-400 text-white transition-all shadow-lg
              focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400/40
              disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          </div>
        </form>
      </section>

      {/* SECTION DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"></div>

      {/* RESULTS SECTION */}
      <section className="px-4 pb-24 max-w-7xl mx-auto">

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-80 bg-white/5 rounded-2xl animate-pulse"
              >
                <div className="w-full h-40 bg-white/10 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 w-40 bg-white/10 rounded"></div>
                  <div className="h-3 w-32 bg-white/10 rounded"></div>
                  <div className="h-3 w-24 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESULTS GRID */}
        {!loading && results.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
          animate-fadeIn"
          >
            {results.map((place: any) => (
              <ExperienceCard
                key={place.place_id}
                name={place.name}
                address={place.formatted_address}
                rating={place.rating}
                photo={place.photoUrl}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && results.length === 0 && (
          <p className="text-center text-gray-500 mt-20 text-lg">
            Start by searching for a place or activity above.
          </p>
        )}
      </section>
    </div>
  );
}
