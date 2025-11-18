import { NextResponse } from "next/server";
import { getPlaces } from "@/lib/places";

export async function POST(req: Request) {
  const { query } = await req.json();

  const prompt = `
  You are a parser. Extract structured data from this user query:

  "${query}"

  Return ONLY valid JSON in this structure:
  {
    "category": "string",
    "location": "string",
    "price_level": "string | null",
    "timeframe": "string | null"
  }
  `;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistral",
      prompt,
      stream: true
    })
  });

  const reader = response.body!.getReader();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = new TextDecoder().decode(value);
  
    const lines = chunk.split("\n").filter(Boolean);

    for (const line of lines) {
      try {
        const json = JSON.parse(line);
        if (json.response) fullText += json.response;
      } catch {
        
      }
    }
  }

  fullText = fullText.trim();

  
  let parsed: any;
  try {
    parsed = JSON.parse(fullText);
  } catch (err) {
    console.warn("Failed to parse model output:", fullText);

    parsed = {
      category: "activities",
      location: "Detroit",
      price_level: null,
      timeframe: null
    };
  }

  
  const results = await getPlaces({
    location: parsed.location || "Detroit",
    keyword: parsed.category || "activities",
  });

  return NextResponse.json({ filters: parsed, results });
}