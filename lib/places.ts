import axios from "axios";

export async function getPlaces({
  location,
  keyword,
}: {
  location: string;
  keyword: string;
}) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    keyword
  )}+in+${encodeURIComponent(location)}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  const { data } = await axios.get(url);

  const places = data.results.slice(0, 10).map((p: any) => {
    let photoUrl = null;

    // If Google provided photo references, generate photo URL
    if (p.photos && p.photos.length > 0) {
      const photoRef = p.photos[0].photo_reference;
      photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${process.env.GOOGLE_PLACES_API_KEY}`;
    }

    return {
      ...p,
      photoUrl,
    };
  });

  return places;
}