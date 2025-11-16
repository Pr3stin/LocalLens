"use client";
import { useState } from "react";

export default function SearchBar({ onResults }: { onResults: (r: any) => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    onResults(data);
    setLoading(false);
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="Try: fun outdoor activity this weekend under $50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-2 border rounded-md"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}