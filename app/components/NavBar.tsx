"use client";

import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-4 left-0 right-0 mx-auto max-w-7xl px-6 py-4 flex justify-between items-center
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg transition-all
        ${scrolled ? "py-2 bg-white/10 border-white/20" : ""}
        z-50
      `}
    >
      {/* Left: Logo */}
      <div className="text-2xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
        LocalLens
      </div>

      {/* Center: Nav links */}
      <div className="hidden md:flex gap-8 text-white font-semibold text-lg">
        <button className="hover:text-blue-400 transition-colors">Discover</button>
        <button className="hover:text-blue-400 transition-colors">Trending</button>
        <button className="hover:text-blue-400 transition-colors">Favorites</button>
      </div>

      {/* Right: Profile */}
      <div className="text-white hover:text-blue-400 transition-colors">
        <UserCircle className="w-8 h-8" />
      </div>
    </nav>
  );
}