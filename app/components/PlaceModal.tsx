"use client";

import { useEffect, useState } from "react";
import { X, MapPin, Star, Heart, HeartCrack, Loader2 } from "lucide-react";

type PlaceModalProps = {
  place: any | null;
  onClose: () => void;
  loading?: boolean;
};

function formatPriceLevel(level?: number | null) {
    if (level === null || level === undefined) return null;
    return "$".repeat(level);
  }

export default function PlaceModal({ place, onClose, loading = false }: PlaceModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 bg-[#141622] text-white p-6 rounded-xl shadow-lg">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading place details...
        </div>
      </div>
    );
  }

  if (!place) return null;

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f11] text-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden transform transition-transform scale-95 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image */}
        <div className="relative w-full h-64">
          <img
            src={place?.photoUrl || "/placeholder.jpg"}
            alt={place?.name || "Place"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{place?.name || "Unknown Place"}</h2>

            {/* Rating */}
            {(place?.rating || place?.user_ratings_total) && (
              <div className="mt-1">
                <div className="flex items-center gap-2 text-yellow-400">
                  {place.rating && (
                    <>
                      <Star className="w-5 h-5 fill-yellow-400" />
                      <span>{Number(place.rating).toFixed(1)}</span>
                    </>
                  )}
                </div>

                {/* Review count — FIXED */}
                {place.user_ratings_total && (
                  <p className="text-gray-400 text-sm mt-1">
                    {place.user_ratings_total} reviews
                  </p>
                )}
              </div>
            )}

            {/* Price Range */}
            {formatPriceLevel(place?.price_level) && (
             <p className="text-gray-300 font-medium tracking-wide">
             {formatPriceLevel(place.price_level)}
           </p>
            )}
          </div>

          {/* Favorite + Close */}
          <div className="flex gap-4 items-center">
            <button
              onClick={toggleFavorite}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              {isFavorite ? (
                <Heart className="w-6 h-6 fill-red-500" />
              ) : (
                <HeartCrack className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Address */}
        {place?.formatted_address && (
          <div className="px-6 pb-4 flex items-center gap-2 text-gray-300">
            <MapPin className="w-5 h-5" />
            <p>{place.formatted_address}</p>
          </div>
        )}

        {/* Opening Hours */}
        {place?.opening_hours?.weekday_text && (
          <div className="px-6 pb-4">
            <h3 className="font-semibold mb-2">Opening Hours</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              {place.opening_hours.weekday_text.map((line: string, i: number) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Map */}
        {place?.geometry?.location?.lat && place?.geometry?.location?.lng && (
          <div className="px-6 pb-6">
            <h3 className="font-semibold mb-2">Location</h3>
            <iframe
              width="100%"
              height="200"
              loading="lazy"
              className="rounded-xl"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&q=${place.geometry.location.lat},${place.geometry.location.lng}`}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}