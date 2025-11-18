import { NextResponse } from "next/server";
import { getPlaceDetails } from "@/lib/places";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const place_id = searchParams.get("place_id");

  if (!place_id) return NextResponse.json({ place: null });

  const place = await getPlaceDetails(place_id);
  return NextResponse.json({ place });
}