"use client";

import React, { useState } from "react";
import {
  Send,
  Check,
  Plus,
  Minus,
  Calendar,
  Clock,
  Loader2,
  MapPin,
  Printer,
  X,
  Phone,
  Mail,
  Building2,
  Plane,
  FileText,
  Car,
  Mountain,
  Hotel,
  Briefcase,
  Globe,
  Users,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface ItineraryItem {
  day?: string;
  date?: string;
  title?: string;
  destination?: string;
  highlights?: string[];
  details?: string;
  meals?: string;
  overnight?: string;
}

interface GeneratedPlan {
  travelerName: string;
  destinations: string;
  outline?: string;
  itinerary: ItineraryItem[];
  rawContent?: string | null;
}

interface FormDataState {
  fullName: string;
  email: string;
  phone: string;
  country: string;

  serviceRequired: string;

  arrivalDate: string;
  departureDate: string;
  arrivalTime: string;

  travelStyle: string;
  approximateBudget: string;

  nationality: string;
  visaType: string;
  visaDestination: string;

  transportationType: string;
  pickupLocation: string;
  dropoffLocation: string;

  hotelCategory: string;
  roomRequirement: string;

  trekkingRoute: string;
  trekkingDifficulty: string;

  corporateType: string;

  additionalInfo: string;
}

/* =========================================================
   COUNTRIES
========================================================= */

const COUNTRIES = [
  "Nepal",
  "India",
  "China",
  "Thailand",
  "Indonesia",
  "Japan",
  "South Korea",
  "Malaysia",
  "Singapore",
  "Vietnam",
  "Cambodia",
  "Bhutan",
  "Sri Lanka",
  "Maldives",
  "United Arab Emirates",
  "Qatar",
  "Saudi Arabia",
  "Turkey",
  "Georgia",
  "Azerbaijan",
  "Australia",
  "Austria",
  "Belgium",
  "Canada",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Iceland",
  "Ireland",
  "Italy",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
  "Other",
];

/* =========================================================
   DESTINATIONS
========================================================= */

const NEPAL_DESTINATIONS = [
  "Kathmandu",
  "Pokhara",
  "Chitwan",
  "Lumbini",
  "Nagarkot",
  "Muktinath / Mustang",
  "Bandipur",
  "Dhulikhel",
  "Everest Region / Lukla",
  "Annapurna Region",
];

const OUTBOUND_DESTINATIONS = [
  "Thailand",
  "Bali / Indonesia",
  "Malaysia",
  "Singapore",
  "Dubai / UAE",
  "Japan",
  "South Korea",
  "Vietnam",
  "Cambodia",
  "Bhutan",
  "Maldives",
  "Sri Lanka",
  "Europe / Schengen",
  "Australia",
  "United Kingdom",
  "United States",
  "Other",
];

/* =========================================================
   INITIAL STATE
========================================================= */

const INITIAL_FORM_STATE: FormDataState = {
  fullName: "",
  email: "",
  phone: "",
  country: "Nepal",

  serviceRequired: "Inbound Tours",

  arrivalDate: "",
  departureDate: "",
  arrivalTime: "",

  travelStyle: "",
  approximateBudget: "",

  nationality: "Nepal",
  visaType: "",
  visaDestination: "",

  transportationType: "",
  pickupLocation: "",
  dropoffLocation: "",

  hotelCategory: "",
  roomRequirement: "",

  trekkingRoute: "",
  trekkingDifficulty: "",

  corporateType: "",

  additionalInfo: "",
};

/* =========================================================
   SERVICE DEFINITIONS
========================================================= */

const SERVICES = [
  {
    value: "Inbound Tours",
    label: "Inbound Tours – Nepal",
    description: "Nepal tours for international travelers",
    icon: Globe,
  },
  {
    value: "Outbound Tours",
    label: "Outbound Tours",
    description: "International holidays from Nepal",
    icon: Plane,
  },
  {
    value: "Visa Services",
    label: "Visa Services",
    description: "Tourist, business and other visa assistance",
    icon: FileText,
  },
  {
    value: "Transportation",
    label: "Transportation",
    description: "Cars, SUVs, buses and private transfers",
    icon: Car,
  },
  {
    value: "Trekking & Expedition",
    label: "Trekking & Expedition",
    description: "Trekking, hiking and expedition services",
    icon: Mountain,
  },
  {
    value: "Hotel & Accommodation",
    label: "Hotel & Accommodation",
    description: "Hotel reservations and accommodation",
    icon: Hotel,
  },
  {
    value: "Flight & Ticketing",
    label: "Flight & Ticketing",
    description: "Domestic and international air ticketing",
    icon: Plane,
  },
  {
    value: "Corporate / MICE",
    label: "Corporate / MICE",
    description: "Corporate travel, meetings and events",
    icon: Briefcase,
  },
  {
    value: "Custom / Other",
    label: "Custom / Other Enquiry",
    description: "Tell us what you need",
    icon: Users,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function ContactUsPage() {
  const [travelersCount, setTravelersCount] = useState<number>(2);

  const [isGenerating, setIsGenerating] =
    useState<boolean>(false);

  const [submitted, setSubmitted] =
    useState<boolean>(false);

  const [generatedPlan, setGeneratedPlan] =
    useState<GeneratedPlan | null>(null);

  const [travelDestinations, setTravelDestinations] =
    useState<string[]>(["Kathmandu"]);

  const [selectedPreset, setSelectedPreset] =
    useState<string>("");

  const [customDestination, setCustomDestination] =
    useState<string>("");

  const [formData, setFormData] =
    useState<FormDataState>(INITIAL_FORM_STATE);

  /* =========================================================
     FORM HANDLING
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDestination = (
    destName?: string
  ) => {
    const target = (
      destName ||
      customDestination ||
      selectedPreset
    ).trim();

    if (
      target &&
      !travelDestinations.includes(target)
    ) {
      setTravelDestinations((prev) => [
        ...prev,
        target,
      ]);

      setCustomDestination("");
      setSelectedPreset("");
    }
  };

  const handleRemoveDestination = (
    destination: string
  ) => {
    setTravelDestinations((prev) =>
      prev.filter(
        (item) => item !== destination
      )
    );
  };

  const handleIncrementTravelers = () => {
    if (travelersCount < 50) {
      setTravelersCount(
        (prev) => prev + 1
      );
    }
  };

  const handleDecrementTravelers = () => {
    if (travelersCount > 1) {
      setTravelersCount(
        (prev) => prev - 1
      );
    }
  };

  /* =========================================================
     SERVICE LOGIC
  ========================================================= */

  const isInbound =
    formData.serviceRequired ===
    "Inbound Tours";

  const isOutbound =
    formData.serviceRequired ===
    "Outbound Tours";

  const isVisa =
    formData.serviceRequired ===
    "Visa Services";

  const isTransportation =
    formData.serviceRequired ===
    "Transportation";

  const isTrekking =
    formData.serviceRequired ===
    "Trekking & Expedition";

  const isHotel =
    formData.serviceRequired ===
    "Hotel & Accommodation";

  const isFlight =
    formData.serviceRequired ===
    "Flight & Ticketing";

  const isCorporate =
    formData.serviceRequired ===
    "Corporate / MICE";

  const showTravelDates =
    isInbound ||
    isOutbound ||
    isTrekking ||
    isHotel ||
    isCorporate;

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      (isInbound || isOutbound) &&
      travelDestinations.length === 0
    ) {
      alert(
        "Please select at least one destination."
      );
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(
        "/api/generate-itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,

            travelersCount,

            travelDestinations,

            // Keep API compatibility
            estimatedArrivalTime:
              formData.arrivalTime,

            requestType:
              formData.serviceRequired,
          }),
        }
      );

      const data =
        await response.json();

      if (
        response.ok &&
        data &&
        (
          data.success ||
          data.itinerary
        )
      ) {
        const itineraryList =
          data.itinerary ||
          [];

        setGeneratedPlan({
          travelerName:
            data.travelerName ||
            formData.fullName ||
            "Valued Guest",

          destinations:
            data.destinations ||
            travelDestinations.join(
              ", "
            ),

          outline:
            data.outline,

          itinerary:
            Array.isArray(
              itineraryList
            )
              ? itineraryList
              : [],

          rawContent:
            typeof itineraryList ===
            "string"
              ? itineraryList
              : null,
        });

        setSubmitted(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        alert(
          data?.error ||
            "Unable to process your enquiry. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Enquiry error:",
        error
      );

      alert(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetForm = () => {
    setSubmitted(false);
    setGeneratedPlan(null);
    setFormData(
      INITIAL_FORM_STATE
    );
    setTravelersCount(2);
    setTravelDestinations([
      "Kathmandu",
    ]);
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#D4AF37]">
            KUDAN TRAVEL & TOURS
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-white mt-3">
            Plan Your Journey
          </h1>

          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Tell us what you need and our travel
            consultant will prepare a personalized
            response for your journey.
          </p>

        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ===================================================
              FORM / RESULT
          =================================================== */}

          <div className="lg:col-span-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-10 shadow-2xl">

            {submitted &&
            generatedPlan ? (

              /* =================================================
                 GENERATED RESULT
              ================================================= */

              <div className="space-y-7">

                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 flex items-center justify-center gap-3 text-emerald-400">

                  <Check size={20} />

                  <span className="text-sm font-bold">
                    Your enquiry has been processed successfully.
                  </span>

                </div>

                <div className="rounded-2xl border border-[#D4AF37]/30 bg-slate-950 p-6 sm:p-8 shadow-xl space-y-7">

                  <div className="border-b border-slate-800 pb-5">

                    <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                      Kudan Travel
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-black mt-2">
                      {generatedPlan.travelerName}
                    </h2>

                    <div className="text-xs text-slate-400 mt-3 flex flex-wrap gap-4">

                      <span className="flex items-center gap-1.5">
                        <MapPin
                          size={14}
                          className="text-[#D4AF37]"
                        />
                        {generatedPlan.destinations}
                      </span>

                      {formData.arrivalDate &&
                        formData.departureDate && (
                          <span className="flex items-center gap-1.5">
                            <Calendar
                              size={14}
                              className="text-[#D4AF37]"
                            />
                            {
                              formData.arrivalDate
                            }{" "}
                            to{" "}
                            {
                              formData.departureDate
                            }
                          </span>
                        )}

                    </div>

                  </div>

                  {/* OUTLINE */}

                  {generatedPlan.outline && (
                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">

                      <h3 className="text-xs uppercase tracking-widest font-black text-[#D4AF37] mb-2">
                        Trip Overview
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {
                          generatedPlan.outline
                        }
                      </p>

                    </div>
                  )}

                  {/* ITINERARY */}

                  {generatedPlan.itinerary.length >
                  0 ? (

                    <div className="space-y-7 border-l-2 border-[#D4AF37]/40 pl-5 sm:pl-7">

                      {generatedPlan.itinerary.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="relative space-y-3"
                          >

                            <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 h-3 w-3 rounded-full border-2 border-[#D4AF37] bg-slate-950" />

                            <div>

                              <span className="text-xs font-black uppercase tracking-wider text-[#D4AF37]">
                                {
                                  item.day ||
                                  `Day ${
                                    index +
                                    1
                                  }`
                                }
                              </span>

                              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                                {
                                  item.title ||
                                  "Travel Day"
                                }
                              </h3>

                              {item.date && (
                                <p className="text-xs text-slate-500 mt-1">
                                  {
                                    item.date
                                  }
                                </p>
                              )}

                            </div>

                            {item.destination && (
                              <p className="text-xs text-slate-400">

                                <strong className="text-slate-300">
                                  Location:
                                </strong>{" "}

                                {
                                  item.destination
                                }

                              </p>
                            )}

                            {item.highlights &&
                              item.highlights.length >
                                0 && (

                                <div className="space-y-1">

                                  {item.highlights.map(
                                    (
                                      highlight,
                                      hIndex
                                    ) => (
                                      <p
                                        key={
                                          hIndex
                                        }
                                        className="text-sm text-slate-300"
                                      >
                                        •{" "}
                                        {
                                          highlight
                                        }
                                      </p>
                                    )
                                  )}

                                </div>
                              )}

                            {item.details && (
                              <p className="text-sm text-slate-300 leading-relaxed">
                                {
                                  item.details
                                }
                              </p>
                            )}

                            {item.meals && (
                              <p className="text-xs text-slate-400">

                                <strong className="text-slate-300">
                                  Meals:
                                </strong>{" "}

                                {
                                  item.meals
                                }

                              </p>
                            )}

                            {item.overnight && (
                              <p className="text-xs text-slate-400">

                                <strong className="text-slate-300">
                                  Overnight:
                                </strong>{" "}

                                {
                                  item.overnight
                                }

                              </p>
                            )}

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <div className="rounded-xl bg-slate-900 p-5 text-sm text-slate-300">
                      Your enquiry has been received. Our
                      travel consultant will review the
                      requirements and contact you shortly.
                    </div>

                  )}

                  {/* ACTIONS */}

                  <div className="pt-5 border-t border-slate-800 flex flex-wrap gap-4 justify-between">

                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Submit another enquiry
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.print()
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold hover:border-[#D4AF37]"
                    >
                      <Printer
                        size={14}
                      />
                      Print / Save PDF
                    </button>

                  </div>

                </div>

              </div>

            ) : (

              /* =================================================
                 FORM
              ================================================= */

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-8"
              >

                {/* =================================================
                   SERVICE SELECTION
                ================================================= */}

                <section className="space-y-4">

                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                      Step 1
                    </span>

                    <h2 className="text-xl font-bold mt-1">
                      What can we help you with?
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                      Select the service you are interested in.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {SERVICES.map(
                      (service) => {

                        const Icon =
                          service.icon;

                        const active =
                          formData.serviceRequired ===
                          service.value;

                        return (
                          <button
                            key={
                              service.value
                            }
                            type="button"
                            onClick={() =>
                              setFormData(
                                (
                                  prev
                                ) => ({
                                  ...prev,
                                  serviceRequired:
                                    service.value,
                                })
                              )
                            }
                            className={`text-left rounded-2xl border p-4 transition-all ${
                              active
                                ? "border-[#D4AF37] bg-[#D4AF37]/10"
                                : "border-slate-800 bg-slate-950 hover:border-slate-600"
                            }`}
                          >

                            <div className="flex gap-3">

                              <div
                                className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                                  active
                                    ? "bg-[#D4AF37] text-slate-950"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                <Icon
                                  size={18}
                                />
                              </div>

                              <div>

                                <p className="text-sm font-bold">
                                  {
                                    service.label
                                  }
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                  {
                                    service.description
                                  }
                                </p>

                              </div>

                            </div>

                          </button>
                        );
                      }
                    )}

                  </div>

                </section>

                {/* =================================================
                   PERSONAL INFORMATION
                ================================================= */}

                <section className="space-y-4">

                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                      Step 2
                    </span>

                    <h2 className="text-xl font-bold mt-1">
                      Your Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <InputField
                      label="Full Name"
                      name="fullName"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Your full name"
                      required
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="you@example.com"
                      required
                    />

                    <InputField
                      label="WhatsApp / Phone"
                      name="phone"
                      type="tel"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="+977 98XXXXXXXX"
                      required
                    />

                    <SelectField
                      label="Country of Residence"
                      name="country"
                      value={
                        formData.country
                      }
                      onChange={
                        handleChange
                      }
                      options={
                        COUNTRIES
                      }
                    />

                  </div>

                </section>

                {/* =================================================
                   INBOUND
                ================================================= */}

                {isInbound && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Nepal Inbound Tour"
                      description="Tell us about your Nepal holiday."
                    />

                    <DestinationSelector
                      destinations={
                        travelDestinations
                      }
                      setDestinations={
                        setTravelDestinations
                      }
                      selectedPreset={
                        selectedPreset
                      }
                      setSelectedPreset={
                        setSelectedPreset
                      }
                      customDestination={
                        customDestination
                      }
                      setCustomDestination={
                        setCustomDestination
                      }
                      handleAddDestination={
                        handleAddDestination
                      }
                      handleRemoveDestination={
                        handleRemoveDestination
                      }
                      options={
                        NEPAL_DESTINATIONS
                      }
                    />

                    <DateFields
                      formData={
                        formData
                      }
                      handleChange={
                        handleChange
                      }
                      showArrivalTime
                    />

                    <TravelPreferences
                      formData={
                        formData
                      }
                      handleChange={
                        handleChange
                      }
                    />

                    <TravelerCounter
                      travelersCount={
                        travelersCount
                      }
                      increment={
                        handleIncrementTravelers
                      }
                      decrement={
                        handleDecrementTravelers
                      }
                    />

                  </section>

                )}

                {/* =================================================
                   OUTBOUND
                ================================================= */}

                {isOutbound && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Outbound Holiday"
                      description="Tell us where you would like to travel."
                    />

                    <DestinationSelector
                      destinations={
                        travelDestinations
                      }
                      setDestinations={
                        setTravelDestinations
                      }
                      selectedPreset={
                        selectedPreset
                      }
                      setSelectedPreset={
                        setSelectedPreset
                      }
                      customDestination={
                        customDestination
                      }
                      setCustomDestination={
                        setCustomDestination
                      }
                      handleAddDestination={
                        handleAddDestination
                      }
                      handleRemoveDestination={
                        handleRemoveDestination
                      }
                      options={
                        OUTBOUND_DESTINATIONS
                      }
                    />

                    <DateFields
                      formData={
                        formData
                      }
                      handleChange={
                        handleChange
                      }
                      showArrivalTime
                    />

                    <TravelPreferences
                      formData={
                        formData
                      }
                      handleChange={
                        handleChange
                      }
                    />

                    <TravelerCounter
                      travelersCount={
                        travelersCount
                      }
                      increment={
                        handleIncrementTravelers
                      }
                      decrement={
                        handleDecrementTravelers
                      }
                    />

                  </section>

                )}

                {/* =================================================
                   VISA
                ================================================= */}

                {isVisa && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Visa Assistance"
                      description="Provide the basic information so our visa team can understand your requirement."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <SelectField
                        label="Applicant Nationality"
                        name="nationality"
                        value={
                          formData.nationality
                        }
                        onChange={
                          handleChange
                        }
                        options={
                          COUNTRIES
                        }
                      />

                      <InputField
                        label="Visa Destination"
                        name="visaDestination"
                        value={
                          formData.visaDestination
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="e.g. Japan, Finland, Australia"
                        required
                      />

                      <SelectField
                        label="Visa Type"
                        name="visaType"
                        value={
                          formData.visaType
                        }
                        onChange={
                          handleChange
                        }
                        options={[
                          "Tourist Visa",
                          "Business Visa",
                          "Student Visa",
                          "Work Visa",
                          "Family / Visit Visa",
                          "Transit Visa",
                          "Other",
                        ]}
                      />

                      <InputField
                        label="Expected Travel Date"
                        name="arrivalDate"
                        type="date"
                        value={
                          formData.arrivalDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                    <TravelerCounter
                      travelersCount={
                        travelersCount
                      }
                      increment={
                        handleIncrementTravelers
                      }
                      decrement={
                        handleDecrementTravelers
                      }
                    />

                  </section>

                )}

                {/* =================================================
                   TRANSPORTATION
                ================================================= */}

                {isTransportation && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Transportation Requirement"
                      description="Tell us about your vehicle or transfer requirement."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <SelectField
                        label="Transportation Type"
                        name="transportationType"
                        value={
                          formData.transportationType
                        }
                        onChange={
                          handleChange
                        }
                        options={[
                          "Airport Transfer",
                          "Private Car",
                          "SUV / Scorpio",
                          "Hiace",
                          "Coaster",
                          "Bus",
                          "Luxury Vehicle",
                          "Multiple Vehicles",
                          "Other",
                        ]}
                      />

                      <InputField
                        label="Pickup Location"
                        name="pickupLocation"
                        value={
                          formData.pickupLocation
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Airport / Hotel / City"
                      />

                      <InputField
                        label="Drop-off Location"
                        name="dropoffLocation"
                        value={
                          formData.dropoffLocation
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Destination"
                      />

                      <InputField
                        label="Travel / Service Date"
                        name="arrivalDate"
                        type="date"
                        value={
                          formData.arrivalDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                    <TravelerCounter
                      travelersCount={
                        travelersCount
                      }
                      increment={
                        handleIncrementTravelers
                      }
                      decrement={
                        handleDecrementTravelers
                      }
                    />

                  </section>

                )}

                {/* =================================================
                   TREKKING
                ================================================= */}

                {isTrekking && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Trekking & Expedition"
                      description="Tell us about your trekking requirement."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <InputField
                        label="Preferred Trek / Region"
                        name="trekkingRoute"
                        value={
                          formData.trekkingRoute
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Everest, Annapurna, Mustang..."
                      />

                      <SelectField
                        label="Difficulty"
                        name="trekkingDifficulty"
                        value={
                          formData.trekkingDifficulty
                        }
                        onChange={
                          handleChange
                        }
                        options={[
                          "Easy",
                          "Moderate",
                          "Challenging",
                          "Expedition",
                          "Not Sure",
                        ]}
                      />

                    </div>

                    <DateFields
                      formData={
                        formData
                      }
                      handleChange={
                        handleChange
                      }
                    />

                    <TravelerCounter
                      travelersCount={
                        travelersCount
                      }
                      increment={
                        handleIncrementTravelers
                      }
                      decrement={
                        handleDecrementTravelers
                      }
                    />

                  </section>

                )}

                {/* =================================================
                   HOTEL
                ================================================= */}

                {isHotel && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Hotel & Accommodation"
                      description="Tell us about your accommodation requirement."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <InputField
                        label="Destination / City"
                        name="visaDestination"
                        value={
                          formData.visaDestination
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Kathmandu, Pokhara, Bangkok..."
                      />

                      <SelectField
                        label="Hotel Category"
                        name="hotelCategory"
                        value={
                          formData.hotelCategory
                        }
                        onChange={
                          handleChange
                        }
                        options={[
                          "3 Star",
                          "4 Star",
                          "5 Star",
                          "Luxury",
                          "Boutique",
                          "Resort",
                          "Not Sure",
                        ]}
                      />

                      <InputField
                        label="Check-in"
                        name="arrivalDate"
                        type="date"
                        value={
                          formData.arrivalDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                      <InputField
                        label="Check-out"
                        name="departureDate"
                        type="date"
                        value={
                          formData.departureDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                      <InputField
                        label="Room Requirement"
                        name="roomRequirement"
                        value={
                          formData.roomRequirement
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="2 DBL + 1 TWIN"
                      />

                    </div>

                  </section>

                )}

                {/* =================================================
                   FLIGHT
                ================================================= */}

                {isFlight && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Flight & Ticketing"
                      description="Tell us about your flight requirement."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <InputField
                        label="Departure City / Airport"
                        name="pickupLocation"
                        value={
                          formData.pickupLocation
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Kathmandu / KTM"
                      />

                      <InputField
                        label="Destination / Airport"
                        name="dropoffLocation"
                        value={
                          formData.dropoffLocation
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Tokyo / NRT"
                      />

                      <InputField
                        label="Departure Date"
                        name="arrivalDate"
                        type="date"
                        value={
                          formData.arrivalDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                      <InputField
                        label="Return Date"
                        name="departureDate"
                        type="date"
                        value={
                          formData.departureDate
                        }
                        onChange={
                          handleChange
                        }
                      />

                    </div>

                    <TravelerCounter
                      travelersCount={
                        travelersCount
                      }
                      increment={
                        handleIncrementTravelers
                      }
                      decrement={
                        handleDecrementTravelers
                      }
                    />

                  </section>

                )}

                {/* =================================================
                   CORPORATE
                ================================================= */}

                {isCorporate && (

                  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                    <SectionTitle
                      number="3"
                      title="Corporate / MICE"
                      description="Tell us about your corporate travel requirement."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <SelectField
                        label="Requirement"
                        name="corporateType"
                        value={
                          formData.corporateType
                        }
                        onChange={
                          handleChange
                        }
                        options={[
                          "Corporate Tour",
                          "Conference",
                          "Meeting",
                          "Incentive Tour",
                          "Team Building",
                          "Event / Gala Dinner",
                          "Corporate Transportation",
                          "Other",
                        ]}
                      />

                      <InputField
                        label="Destination"
                        name="visaDestination"
                        value={
                          formData.visaDestination
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Destination"
                      />

                    </div>

                    <DateFields
                      formData={
                        formData
                      }
                      handleChange={
                        handleChange
                      }
                    />

                    <TravelerCounter
                      travelersCount={
                        travelersCount
                      }
                      increment={
                        handleIncrementTravelers
                      }
                      decrement={
                        handleDecrementTravelers
                      }
                    />

                  </section>

                )}

                {/* =================================================
                   CUSTOM
                ================================================= */}

                {!isInbound &&
                  !isOutbound &&
                  !isVisa &&
                  !isTransportation &&
                  !isTrekking &&
                  !isHotel &&
                  !isFlight &&
                  !isCorporate && (

                    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">

                      <SectionTitle
                        number="3"
                        title="Your Requirement"
                        description="Tell us what you are looking for."
                      />

                      <TravelerCounter
                        travelersCount={
                          travelersCount
                        }
                        increment={
                          handleIncrementTravelers
                        }
                        decrement={
                          handleDecrementTravelers
                        }
                      />

                    </section>

                  )}

                {/* =================================================
                   ADDITIONAL INFORMATION
                ================================================= */}

                <section className="space-y-3">

                  <label className="text-xs font-bold text-slate-300">
                    Additional Information
                  </label>

                  <textarea
                    name="additionalInfo"
                    rows={5}
                    value={
                      formData.additionalInfo
                    }
                    onChange={
                      handleChange
                    }
                    placeholder={
                      isVisa
                        ? "Tell us about previous visas, travel history, preferred appointment date, family members applying together, or any other visa requirement."
                        : isTransportation
                        ? "Tell us about vehicle preferences, luggage, route, number of vehicles, driver requirements, or any special arrangements."
                        : "Tell us anything else about your trip or service requirement."
                    }
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none resize-y"
                  />

                </section>

                {/* =================================================
                   BUDGET
                ================================================= */}

                {(isInbound ||
                  isOutbound ||
                  isTrekking ||
                  isHotel ||
                  isCorporate) && (

                  <SelectField
                    label="Approximate Budget"
                    name="approximateBudget"
                    value={
                      formData.approximateBudget
                    }
                    onChange={
                      handleChange
                    }
                    options={[
                      "Standard",
                      "Deluxe",
                      "Luxury / Premium",
                      "Not Sure",
                    ]}
                  />

                )}

                {/* =================================================
                   SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  disabled={
                    isGenerating
                  }
                  className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] py-4 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >

                  {isGenerating ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      <span>
                        Preparing Your Enquiry...
                      </span>
                    </>
                  ) : (
                    <>
                      <Send
                        size={16}
                      />

                      <span>
                        Submit Enquiry
                      </span>
                    </>
                  )}

                </button>

              </form>
            )}

          </div>

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside className="lg:col-span-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-7 shadow-2xl">

            <div>

              <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                Kudan Travel
              </span>

              <h2 className="text-2xl font-black text-white mt-2">
                Travel Made Simple
              </h2>

              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Whether you are visiting Nepal,
                travelling abroad, applying for a
                visa or looking for transportation,
                our team can assist with your
                requirement.
              </p>

            </div>

            <div className="space-y-5">

              <ContactItem
                icon={
                  <MapPin size={18} />
                }
                title="Office"
                content={
                  <>
                    Kudan Travel and Tours
                    Pvt. Ltd.
                    <br />
                    Metro Park Building,
                    Lazimpat
                    <br />
                    Kathmandu, Nepal
                  </>
                }
              />

              <ContactItem
                icon={
                  <Phone size={18} />
                }
                title="Phone / WhatsApp"
                content="+977 9851196584 /9851101214
                Phone : 01-4005191 / 92 / 93 / 94 / 95"
              />

              <ContactItem
                icon={
                  <Mail size={18} />
                }
                title="Managing Director"
                content={
                  <>
                    md@kudantravel.com
                    <br />
                    aatma_sl@hotmail.com
                  </>
                }
              />

              <ContactItem
                icon={
                  <Mail size={18} />
                }
                title="Reservations / Enquiries"
                content={
                  <>
                    info@kudantravel.com
                    <br />
                    kamal@kudantravel.com
                    <br />
                    naisha@kudantravel.com
                  </>
                }
              />
                <ContactItem
                icon={
                  <Mail size={18} />
                }
                 title="Accounts / Finance"
                content={
                  <>
                    finance@kudantravel.com
                    <br />
                    dipen@kudantravel.com
                    <br />
                    rasul@kudantravel.com
                  </>
                }
              />
              <ContactItem
  icon={
    <Mail size={18} />
  }
  title="General Enquiries"
  content={
    <>
      krishna@kudantravel.com
      <div className="flex items-center gap-2 mt-1">
        <Phone size={15} />
        <span>+977 9851196584</span>
      </div>
    </>
  }
/>

              <ContactItem
                icon={
                  <Clock size={18} />
                }
                title="Operating Hours"
                content={
                  <>
                    Sun – Fri: 9:00 AM – 6:00 PM
                    <br />
                    Saturday: Emergency Support
                  </>
                }
              />

            </div>

            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">

              <p className="text-xs uppercase tracking-widest font-black text-[#D4AF37]">
                Services
              </p>

              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Inbound • Outbound • Visa •
                Transportation • Trekking •
                Hotels • Ticketing • Corporate
                Travel
              </p>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">

      <label className="text-xs font-bold text-slate-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
      />

    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  options: string[];
}) {
  return (
    <div className="space-y-2">

      <label className="text-xs font-bold text-slate-300">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
      >

        <option value="">
          Select
        </option>

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}

      </select>

    </div>
  );
}

function SectionTitle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>

      <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
        Step {number}
      </span>

      <h2 className="text-lg font-bold text-white mt-1">
        {title}
      </h2>

      <p className="text-xs text-slate-500 mt-1">
        {description}
      </p>

    </div>
  );
}

function TravelerCounter({
  travelersCount,
  increment,
  decrement,
}: {
  travelersCount: number;
  increment: () => void;
  decrement: () => void;
}) {
  return (
    <div className="space-y-2">

      <label className="text-xs font-bold text-slate-300">
        Number of Travelers
      </label>

      <div className="flex items-center justify-between rounded-xl bg-slate-950 border border-slate-800 p-2">

        <button
          type="button"
          onClick={decrement}
          disabled={
            travelersCount <= 1
          }
          className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center disabled:opacity-40"
        >
          <Minus size={14} />
        </button>

        <span className="font-bold text-sm">
          {travelersCount}{" "}
          {travelersCount === 1
            ? "Traveler"
            : "Travelers"}
        </span>

        <button
          type="button"
          onClick={increment}
          disabled={
            travelersCount >= 50
          }
          className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center disabled:opacity-40"
        >
          <Plus size={14} />
        </button>

      </div>

    </div>
  );
}

function DateFields({
  formData,
  handleChange,
  showArrivalTime = false,
}: {
  formData: FormDataState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  showArrivalTime?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      <InputField
        label="Start / Arrival Date"
        name="arrivalDate"
        type="date"
        value={
          formData.arrivalDate
        }
        onChange={
          handleChange
        }
      />

      <InputField
        label="End / Departure Date"
        name="departureDate"
        type="date"
        value={
          formData.departureDate
        }
        onChange={
          handleChange
        }
      />

      {showArrivalTime && (
        <InputField
          label="Arrival Time"
          name="arrivalTime"
          type="time"
          value={
            formData.arrivalTime
          }
          onChange={
            handleChange
          }
        />
      )}

    </div>
  );
}

function TravelPreferences({
  formData,
  handleChange,
}: {
  formData: FormDataState;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      <SelectField
        label="Travel Style"
        name="travelStyle"
        value={
          formData.travelStyle
        }
        onChange={
          handleChange
        }
        options={[
          "Private & Leisure",
          "Family Holiday",
          "Honeymoon",
          "Adventure & Off-road",
          "Luxury",
          "Budget",
          "Corporate / Business",
        ]}
      />

      <SelectField
        label="Approximate Budget"
        name="approximateBudget"
        value={
          formData.approximateBudget
        }
        onChange={
          handleChange
        }
        options={[
          "Standard",
          "Deluxe",
          "Luxury / Premium",
          "Not Sure",
        ]}
      />

    </div>
  );
}

function DestinationSelector({
  destinations,
  setDestinations,
  selectedPreset,
  setSelectedPreset,
  customDestination,
  setCustomDestination,
  handleAddDestination,
  handleRemoveDestination,
  options,
}: {
  destinations: string[];
  setDestinations: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  selectedPreset: string;
  setSelectedPreset: React.Dispatch<
    React.SetStateAction<string>
  >;
  customDestination: string;
  setCustomDestination: React.Dispatch<
    React.SetStateAction<string>
  >;
  handleAddDestination: (
    dest?: string
  ) => void;
  handleRemoveDestination: (
    dest: string
  ) => void;
  options: string[];
}) {
  return (
    <div className="space-y-3">

      <label className="text-xs font-bold text-slate-300">
        Destinations
      </label>

      <div className="flex flex-wrap gap-2">

        {destinations.map(
          (destination) => (
            <span
              key={destination}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37]"
            >

              <MapPin size={12} />

              {destination}

              <button
                type="button"
                onClick={() =>
                  handleRemoveDestination(
                    destination
                  )
                }
              >
                <X size={13} />
              </button>

            </span>
          )
        )}

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">

        <select
          value={selectedPreset}
          onChange={(e) => {
            setSelectedPreset(
              e.target.value
            );

            if (e.target.value) {
              handleAddDestination(
                e.target.value
              );
            }
          }}
          className="sm:col-span-6 rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-xs text-white"
        >

          <option value="">
            Select destination
          </option>

          {options.map(
            (destination) => (
              <option
                key={destination}
                value={destination}
              >
                {destination}
              </option>
            )
          )}

        </select>

        <div className="sm:col-span-6 flex gap-2">

          <input
            type="text"
            value={
              customDestination
            }
            onChange={(e) =>
              setCustomDestination(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                e.preventDefault();
                handleAddDestination();
              }
            }}
            placeholder="Or type destination..."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-xs text-white placeholder-slate-500"
          />

          <button
            type="button"
            onClick={() =>
              handleAddDestination()
            }
            className="px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold shrink-0"
          >
            <Plus size={14} />
          </button>

        </div>

      </div>

    </div>
  );
}

function ContactItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="text-[#D4AF37] mt-1">
        {icon}
      </div>

      <div>

        <p className="font-bold text-white text-sm">
          {title}
        </p>

        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
          {content}
        </p>

      </div>

    </div>
  );
}