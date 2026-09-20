import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type RequestBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;

  serviceRequired?: string;
  requestType?: string;

  arrivalDate?: string;
  departureDate?: string;
  arrivalTime?: string;
  estimatedArrivalTime?: string;

  travelDestinations?: string[];
  destinations?: string[];

  travelersCount?: number | string;
  travelers?: number | string;

  travelStyle?: string;
  approximateBudget?: string;

  additionalInfo?: string;

  nationality?: string;
  visaDestination?: string;
  visaType?: string;
  expectedTravelDate?: string;
  applicantCount?: number | string;

  vehicleType?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  transportDate?: string;

  trekkingRegion?: string;
  trekkingDifficulty?: string;

  hotelDestination?: string;
  hotelCategory?: string;
  roomRequirements?: string;

  departureCity?: string;
  flightDestination?: string;

  corporateRequirement?: string;
};

function calculateDays(
  arrivalDate: string,
  departureDate: string
): number | null {
  if (!arrivalDate || !departureDate) return null;

  const start = new Date(arrivalDate);
  const end = new Date(departureDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return null;
  }

  const diff = end.getTime() - start.getTime();
  const days = Math.round(diff / (1000 * 60 * 60 * 24)) + 1;

  return days > 0 ? days : null;
}

function normalizeArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function getRequestType(body: RequestBody): string {
  return String(
    body.requestType ||
      body.serviceRequired ||
      "Custom / Other"
  ).trim();
}

function isItineraryService(requestType: string): boolean {
  const value = requestType.toLowerCase();

  return (
    value.includes("inbound") ||
    value.includes("outbound") ||
    value.includes("trekking") ||
    value.includes("custom")
  );
}

function buildFallbackResponse(
  body: RequestBody,
  requestType: string,
  destinations: string[],
  totalDays: number | null
) {
  const clientName = body.fullName || "Valued Client";

  if (requestType.toLowerCase().includes("visa")) {
    return {
      success: true,
      aiGenerated: false,
      requestType,
      responseType: "visa_enquiry",
      clientName,
      summary: `Visa enquiry received for ${body.visaDestination || "the requested destination"}.`,
      requirements: [
        `Nationality: ${body.nationality || "Not specified"}`,
        `Visa destination: ${body.visaDestination || "Not specified"}`,
        `Visa type: ${body.visaType || "Not specified"}`,
        `Expected travel date: ${
          body.expectedTravelDate || "Not specified"
        }`,
        `Number of applicants: ${
          body.applicantCount || body.travelersCount || "Not specified"
        }`,
      ],
      nextSteps: [
        "Kudan Travel and Tours will review the enquiry.",
        "Required visa documents and application procedures will be confirmed.",
        "Our team will contact the applicant with the applicable requirements and service charges.",
      ],
      notes: body.additionalInfo || "",
    };
  }

  if (requestType.toLowerCase().includes("transport")) {
    return {
      success: true,
      aiGenerated: false,
      requestType,
      responseType: "transportation_enquiry",
      clientName,
      summary: "Transportation enquiry received.",
      requirements: {
        vehicleType: body.vehicleType || "Not specified",
        pickupLocation: body.pickupLocation || "Not specified",
        dropoffLocation: body.dropoffLocation || "Not specified",
        date: body.transportDate || "Not specified",
        travelers:
          body.travelersCount || body.travelers || "Not specified",
      },
      nextSteps: [
        "Vehicle availability will be checked.",
        "Applicable vehicle and driver charges will be calculated.",
        "Kudan Travel and Tours will contact the client with the transportation proposal.",
      ],
      notes: body.additionalInfo || "",
    };
  }

  if (requestType.toLowerCase().includes("hotel")) {
    return {
      success: true,
      aiGenerated: false,
      requestType,
      responseType: "hotel_enquiry",
      clientName,
      summary: "Hotel accommodation enquiry received.",
      requirements: {
        destination: body.hotelDestination || "Not specified",
        category: body.hotelCategory || "Not specified",
        checkIn: body.arrivalDate || "Not specified",
        checkOut: body.departureDate || "Not specified",
        rooms: body.roomRequirements || "Not specified",
        travelers:
          body.travelersCount || body.travelers || "Not specified",
      },
      nextSteps: [
        "Hotel availability will be checked.",
        "Suitable hotel options will be shortlisted.",
        "Rates and booking conditions will be shared with the client.",
      ],
      notes: body.additionalInfo || "",
    };
  }

  if (requestType.toLowerCase().includes("flight")) {
    return {
      success: true,
      aiGenerated: false,
      requestType,
      responseType: "flight_enquiry",
      clientName,
      summary: "Flight and ticketing enquiry received.",
      requirements: {
        departureCity: body.departureCity || "Not specified",
        destination: body.flightDestination || "Not specified",
        departureDate: body.arrivalDate || "Not specified",
        returnDate: body.departureDate || "Not specified",
        travelers:
          body.travelersCount || body.travelers || "Not specified",
      },
      nextSteps: [
        "Flight availability and routing will be checked.",
        "Suitable airline options and fares will be reviewed.",
        "Kudan Travel and Tours will provide the applicable ticketing options.",
      ],
      notes: body.additionalInfo || "",
    };
  }

  if (requestType.toLowerCase().includes("corporate")) {
    return {
      success: true,
      aiGenerated: false,
      requestType,
      responseType: "corporate_enquiry",
      clientName,
      summary: "Corporate / MICE travel enquiry received.",
      requirements: {
        requirementType:
          body.corporateRequirement || "Not specified",
        destination:
          destinations.length > 0
            ? destinations.join(", ")
            : "Not specified",
        dates: `${body.arrivalDate || "Not specified"} - ${
          body.departureDate || "Not specified"
        }`,
        travelers:
          body.travelersCount || body.travelers || "Not specified",
      },
      nextSteps: [
        "Our corporate travel team will review the requirement.",
        "Transportation, accommodation, meetings and event requirements will be assessed.",
        "A customized proposal will be prepared.",
      ],
      notes: body.additionalInfo || "",
    };
  }

  if (isItineraryService(requestType)) {
    const days = totalDays || 7;

    const itinerary = [];

    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: `Day ${i}`,
        date: "",
        title:
          i === 1
            ? "Arrival & Welcome"
            : i === days
            ? "Departure"
            : `Exploration of ${destinations[i % Math.max(destinations.length, 1)] || "the destination"}`,
        destination:
          destinations[i % Math.max(destinations.length, 1)] ||
          destinations[0] ||
          "Destination",
        highlights: [
          "Sightseeing and local experiences",
          "Comfortable transportation",
          "Professional assistance",
        ],
        details:
          i === 1
            ? `Arrival and welcome transfer for ${clientName}. The day will include airport assistance, hotel transfer, check-in and orientation according to the confirmed travel arrangements.`
            : i === days
            ? "Breakfast and hotel check-out followed by the scheduled transfer for departure."
            : "Enjoy a professionally arranged day of sightseeing, cultural experiences and local exploration.",
        meals: "Breakfast",
        overnight: i === days ? "—" : "Hotel",
        photoSearchTerms: [
          destinations[i % Math.max(destinations.length, 1)] ||
            destinations[0] ||
            "Nepal destination",
        ],
      });
    }

    return {
      success: true,
      aiGenerated: false,
      requestType,
      responseType: "itinerary",
      clientName,
      email: body.email || "",
      phone: body.phone || "",
      country: body.country || "",
      travelersCount:
        body.travelersCount || body.travelers || 1,
      travelStyle: body.travelStyle || "",
      approximateBudget: body.approximateBudget || "",
      arrivalDate: body.arrivalDate || "",
      departureDate: body.departureDate || "",
      destinations,
      totalDays: days,
      totalNights: Math.max(days - 1, 0),
      summary: `A customized ${days}-day itinerary for ${clientName} covering ${destinations.join(
        ", "
      )}.`,
      itinerary,
      importantNotes: body.additionalInfo || "",
    };
  }

  return {
    success: true,
    aiGenerated: false,
    requestType,
    responseType: "general_enquiry",
    clientName,
    summary: "Your enquiry has been received by Kudan Travel and Tours.",
    requirements: {
      service: requestType,
      travelers:
        body.travelersCount || body.travelers || "Not specified",
      dates: `${body.arrivalDate || "Not specified"} - ${
        body.departureDate || "Not specified"
      }`,
      destinations:
        destinations.length > 0
          ? destinations.join(", ")
          : "Not specified",
    },
    nextSteps: [
      "Our travel team will review your requirement.",
      "We will contact you with suitable options.",
      "A customized quotation or proposal can then be prepared.",
    ],
    notes: body.additionalInfo || "",
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as RequestBody;

    const requestType = getRequestType(body);

    const destinations = normalizeArray(
      body.travelDestinations || body.destinations
    );

    const totalDays = calculateDays(
      body.arrivalDate || "",
      body.departureDate || ""
    );

    const travelersCount =
      Number(body.travelersCount || body.travelers || 1) || 1;

    const clientName = body.fullName || "Valued Client";

    const apiKey = process.env.GEMINI_API_KEY;

    /*
     * If Gemini is not configured, return a useful service-specific
     * fallback instead of creating a fake generic itinerary.
     */
    if (!apiKey) {
      return NextResponse.json(
        buildFallbackResponse(
          body,
          requestType,
          destinations,
          totalDays
        )
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const itineraryService = isItineraryService(requestType);

    const itineraryInstruction = itineraryService
      ? `
The requested service requires a COMPLETE PROFESSIONAL ITINERARY.

Create exactly ${totalDays || 7} itinerary days.

For each day provide:
- day
- date
- title
- destination
- highlights as an array
- details as a professional paragraph
- meals
- overnight
- photoSearchTerms as an array containing 1-3 useful destination/location search terms.

The itinerary must be operationally realistic.

Do not invent confirmed flight numbers, hotel names, ticket numbers,
reservation numbers or exact timings unless they were provided by the client.

Use the client's selected destinations and preferences.

The itinerary should be suitable for a professional travel agency
proposal that can be printed and sent to the client.
`
      : `
DO NOT create a day-by-day travel itinerary.

Instead create a professional service enquiry response specifically
for the selected service.

Return the information necessary for Kudan Travel and Tours to follow
up with the client.
`;

    const prompt = `
You are the senior travel consultant and itinerary specialist
for Kudan Travel and Tours Pvt. Ltd., Kathmandu, Nepal.

You are responding to a NEW WEBSITE ENQUIRY.

CLIENT INFORMATION
------------------
Client Name: ${clientName}
Email: ${body.email || "Not provided"}
Phone: ${body.phone || "Not provided"}
Country: ${body.country || "Not provided"}

SERVICE
-------
Requested Service: ${requestType}

TRAVEL INFORMATION
------------------
Destinations:
${
  destinations.length
    ? destinations.join(", ")
    : "Not specified"
}

Arrival Date:
${body.arrivalDate || "Not specified"}

Departure Date:
${body.departureDate || "Not specified"}

Arrival Time:
${body.arrivalTime || body.estimatedArrivalTime || "Not specified"}

Number of Travelers:
${travelersCount}

Travel Style:
${body.travelStyle || "Not specified"}

Budget:
${body.approximateBudget || "Not specified"}

ADDITIONAL INFORMATION
----------------------
${body.additionalInfo || "None"}

VISA INFORMATION
----------------
Nationality: ${body.nationality || "Not applicable"}
Visa Destination: ${body.visaDestination || "Not applicable"}
Visa Type: ${body.visaType || "Not applicable"}
Expected Travel Date:
${body.expectedTravelDate || "Not applicable"}
Applicants:
${body.applicantCount || "Not applicable"}

TRANSPORTATION INFORMATION
--------------------------
Vehicle:
${body.vehicleType || "Not applicable"}

Pickup:
${body.pickupLocation || "Not applicable"}

Drop-off:
${body.dropoffLocation || "Not applicable"}

Transport Date:
${body.transportDate || "Not applicable"}

TREKKING INFORMATION
--------------------
Region:
${body.trekkingRegion || "Not applicable"}

Difficulty:
${body.trekkingDifficulty || "Not applicable"}

HOTEL INFORMATION
-----------------
Hotel Destination:
${body.hotelDestination || "Not applicable"}

Hotel Category:
${body.hotelCategory || "Not applicable"}

Room Requirement:
${body.roomRequirements || "Not applicable"}

FLIGHT INFORMATION
------------------
Departure City:
${body.departureCity || "Not applicable"}

Flight Destination:
${body.flightDestination || "Not applicable"}

CORPORATE / MICE
----------------
Requirement:
${body.corporateRequirement || "Not applicable"}

${itineraryInstruction}

IMPORTANT RULES
---------------
1. Do not fabricate confirmed bookings.
2. Do not claim that a hotel, airline, vehicle or guide has already
   been booked.
3. Do not invent prices unless the client specifically supplied them.
4. Do not invent visa approval or visa eligibility.
5. Keep the response professional and suitable for Kudan Travel.
6. Use clear, practical travel-agency language.
7. If information is missing, clearly identify it as "To be confirmed".
8. If this is an itinerary, use the client's dates exactly.
9. If this is NOT an itinerary service, do not create fake itinerary days.
10. Destination photoSearchTerms must contain place names that can be
    used by the website to find suitable destination photographs.

RETURN ONLY VALID JSON.

JSON STRUCTURE:

{
  "success": true,
  "requestType": "${requestType}",
  "responseType": "itinerary | visa_enquiry | transportation_enquiry | hotel_enquiry | flight_enquiry | corporate_enquiry | general_enquiry",
  "clientName": "${clientName}",
  "summary": "Professional summary",

  "itinerary": [
    {
      "day": "Day 1",
      "date": "YYYY-MM-DD or To be confirmed",
      "title": "Day title",
      "destination": "Destination",
      "highlights": [
        "Highlight 1",
        "Highlight 2",
        "Highlight 3"
      ],
      "details": "Professional paragraph",
      "meals": "Breakfast / Lunch / Dinner / —",
      "overnight": "Hotel / Overnight location / —",
      "photoSearchTerms": [
        "Destination landmark",
        "Destination city"
      ]
    }
  ],

  "requirements": {},
  "nextSteps": [],
  "importantNotes": []
}
`;

    let response;

    try {
      response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });
    } catch (geminiError) {
      console.error("Gemini API Error:", geminiError);

      return NextResponse.json(
        buildFallbackResponse(
          body,
          requestType,
          destinations,
          totalDays
        )
      );
    }

    let responseText = response.text || "";

    responseText = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsed: any;

    try {
      parsed = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Gemini JSON Parse Error:", parseError);
      console.error("Gemini Response:", responseText);

      return NextResponse.json(
        buildFallbackResponse(
          body,
          requestType,
          destinations,
          totalDays
        )
      );
    }

    /*
     * Make sure important client-side fields are always present,
     * even if Gemini forgets them.
     */
    parsed.success = true;
    parsed.aiGenerated = true;
    parsed.requestType = requestType;
    parsed.clientName = clientName;

    parsed.email = body.email || "";
    parsed.phone = body.phone || "";
    parsed.country = body.country || "";

    parsed.travelersCount = travelersCount;

    parsed.arrivalDate = body.arrivalDate || "";
    parsed.departureDate = body.departureDate || "";

    parsed.destinations = destinations;

    if (
      parsed.responseType === "itinerary" &&
      Array.isArray(parsed.itinerary)
    ) {
      parsed.totalDays = parsed.itinerary.length;
      parsed.totalNights = Math.max(
        parsed.itinerary.length - 1,
        0
      );
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Critical Generate Itinerary API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Unable to process the travel enquiry.",
      },
      {
        status: 500,
      }
    );
  }
}