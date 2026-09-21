import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client using your environment API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      fullName, 
      travelDestinations, 
      arrivalDate, 
      departureDate, 
      travelersCount, 
      serviceRequired, 
      additionalInfo 
    } = body;

    // Craft the prompt requesting strict JSON schema output
    const prompt = `
      You are an expert travel consultant for Kudan Travel and Tours Pvt. Ltd.
      Generate a customized ${serviceRequired || "Inbound Tours"} itinerary for:
      - Traveler Name: ${fullName || "Valued Guest"}
      - Destinations: ${travelDestinations && travelDestinations.length > 0 ? travelDestinations.join(", ") : "Nepal"}
      - Dates: ${arrivalDate || "Upcoming"} to ${departureDate || "Upcoming"}
      - Travelers: ${travelersCount || 2} Pax
      - Additional Notes: ${additionalInfo || "None"}

      CRITICAL REQUIREMENT: Return the response strictly as a valid JSON object with NO markdown code blocks or backticks, matching this exact schema:
      {
        "success": true,
        "travelerName": "String",
        "destinations": "String",
        "outline": "A short summary paragraph of the trip",
        "itinerary": [
          {
            "day": "Day 1",
            "date": "Date (e.g., September 25, 2026)",
            "title": "Short catchy title for the day",
            "destination": "Location name",
            "highlights": ["Highlight 1", "Highlight 2"],
            "details": "Paragraph detailing the day's events",
            "meals": "Breakfast, Lunch, Dinner",
            "overnight": "Hotel name or city"
          }
        ]
      }
    `;

    let response;

    // Try current flagship workhorse model, fallback smoothly if necessary
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
    } catch (primaryError) {
      console.warn("Primary model fallback triggered:", primaryError);
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
    }

    const textResponse = response.text;
    
    if (!textResponse) {
      throw new Error("Empty response received from Gemini model.");
    }

    const parsedData = JSON.parse(textResponse);
    return Response.json(parsedData);

  } catch (error: any) {
    console.error("Detailed Gemini Generation Error:", error);
    
    return Response.json(
      { 
        success: false, 
        error: error?.message || "Failed to generate itinerary. Please check server logs." 
      },
      { status: 500 }
    );
  }
}