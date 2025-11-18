import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

export async function getPlaces({
  location,
  keyword,
}: {
  location: string;
  keyword: string;
}) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    keyword
  )}+in+${encodeURIComponent(location)}&key=${API_KEY}`;

  const { data } = await axios.get(url);

  const places = data.results.slice(0, 10).map((p: any) => {
    let photoUrl = "/placeholder.jpg";

    if (p.photos && p.photos.length > 0) {
      const photoRef = p.photos[0].photo_reference;
      photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${API_KEY}`;
    }

    return {
      ...p,
      photoUrl,
      rating: p.rating || null,
      price_level: p.price_level || null,
      geometry: p.geometry || {},
      opening_hours: p.opening_hours || null,
    };
  });

  return places;
}

export async function getPlaceDetails(place_id: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,rating,formatted_address,geometry,opening_hours,photos,url,formatted_phone_number,website&key=${API_KEY}`;

  const { data } = await axios.get(url);

  if (!data.result) return null;

  const p = data.result;

  let photoUrl = "/placeholder.jpg";
  if (p.photos && p.photos.length > 0) {
    const ref = p.photos[0].photo_reference;
    photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${ref}&key=${API_KEY}`;
  }

  return {
    ...p,
    photoUrl,
  };
}