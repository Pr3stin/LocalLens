"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";

type Props = {
  name: string;
  address: string;
  rating?: number;
  photo?: string | null;
};

export default function ExperienceCard({ name, address, rating, photo }: Props) {
  const FALLBACK =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&q=80&w=800";

  const imageUrl = photo || FALLBACK;

  return (
    <div className="group bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden hover:-translate-y-1">
      {/* IMAGE */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-white">{name}</h2>

        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{address}</p>
        </div>

        {rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-300 font-medium">{rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}