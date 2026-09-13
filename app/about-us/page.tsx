import SectionTitle from "@/components/SectionTitle";
import { Target, Compass, HeartHandshake, Languages, Sparkles, Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  languages: string[];
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hari Parajuli",
    role: "Managing Director",
    languages: ["English", "Nepali"],
    bio: "Pioneering high-quality travel management and personalized itineraries across Nepal and South Asia.",
  },
  {
    name: "Kamal Paudyal",
    role: "Operation Manager",
    languages: ["English", "Nepali"],
    bio: "Overseeing daily logistics, trekking permits, and ground coordination for seamless customer experiences.",
  },
  {
    name: "Ramesh Bhandari",
    role: "Account Manager",
    languages: ["English", "Nepali"],
    bio: "Managing financial operations, corporate billing, and secure booking transactions.",
  },
  {
    name: "Rana Jung Thapa Chhetri",
    role: "Relationship Manager",
    languages: ["English", "Nepali"],
    bio: "Building long-term agency partnerships and ensuring traveler satisfaction at every touchpoint.",
  },
  {
    name: "Milan Khadgi",
    role: "Transport Manager",
    languages: ["English", "Nepali"],
    bio: "Directing fleet dispatch, airport transfers, and private luxury transport across top destinations.",
  },
  {
    name: "Binod Maharjan",
    role: "Japanese Assistance Lead",
    languages: ["Japanese", "English", "Nepali"],
    bio: "Dedicated support specialist catering to Japanese-speaking travelers and outbound tours.",
  },
  {
    name: "Dipendra Khadka",
    role: "Accountant",
    languages: ["English", "Nepali"],
    bio: "Ensuring accurate accounting, vendor payments, and financial auditing.",
  },
  {
    name: "Krishna Mukhiya",
    role: "IT & Digital Officer",
    languages: ["English", "Nepali"],
    bio: "Powering Kudan’s online platforms, booking channels, and digital guest communication.",
  },
  {
    name: "Naisha Khadgi",
    role: "Operation Assistant",
    languages: ["English", "Nepali"],
    bio: "Assisting guest communications, itinerary schedules, and hotel reservations.",
  },
  {
    name: "Rasul Maharjan",
    role: "Jr. Accountant",
    languages: ["English", "Nepali"],
    bio: "Supporting payment gateway processing, invoicing, and account administration.",
  },
  {
    name: "Adikshya Maharjan",
    role: "Front Desk Officer",
    languages: ["English", "Nepali"],
    bio: "Welcoming visitors and ensuring instant support for walk-in travelers at our Kathmandu office.",
  },
  {
    name: "Sushant Bista",
    role: "Client Interaction Officer",
    languages: ["English", "Nepali"],
    bio: "Handling trip inquiries, customized route quotes, and real-time traveler updates.",
  },
  {
    name: "Lekhnath Dhungel",
    role: " Vehilce Operator & Driver",
    languages: ["English", "Nepali", "Sherpa"],
    bio: "Licensed local mountain guides and safety leads for Everest, Annapurna, and Mustang trails.",
  },
  {
    name: "Dinesh Manadhar",
    role: "Vehilce Operator & Driver",
    languages: ["English", "Nepali"],
    bio: "Expert ticketing officers handling domestic & international flight connections worldwide.",
  },
];

export default function About() {
  return (
    <div className="bg-[#060910] text-slate-100 min-h-screen font-sans">
      
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION                                         */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-[#0d1322] via-[#080c16] to-[#060910] py-24">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        <div className="container-x relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#E5C158] shadow-md">
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>About Kudan Travel</span>
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Local expertise. <br className="hidden sm:inline" />
            Human service.{" "}
            <span className="bg-gradient-to-r from-[#F5D880] via-[#C5A059] to-[#A07D32] bg-clip-text text-transparent">
              Bigger horizons.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
            Kudan Travel & Tours Pvt. Ltd. creates dependable travel experiences in Nepal and beyond, with a focus on thoughtful planning, authentic local hospitality, and responsive operations.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CORE PILLARS SECTION                                 */}
      {/* ---------------------------------------------------- */}
      <section className="container-x py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            [
              Compass,
              "Our Vision",
              "Make travel feel easier, more personal, and more meaningful through transparent service and curated journeys.",
            ],
            [
              Target,
              "Our Mission",
              "Deliver well-planned itineraries backed by dedicated local experts, ethical operations, and 24/7 client support.",
            ],
            [
              HeartHandshake,
              "Our Promise",
              "Be reachable, responsible, and practical at every stage of your trip—from pre-booking inquiry to safe return.",
            ],
          ].map(([Icon, title, desc]: any) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-700/80 bg-[#111827] p-8 shadow-xl hover:border-[#C5A059] transition-all group"
            >
              <div className="inline-flex rounded-xl border border-[#C5A059] bg-[#060910] p-3 text.amber-300 group-hover:scale-110 transition-transform">
                <Icon className="h-7 w-7 text-[#E5C158]" />
              </div>
              <h3 className="mt-5 text-2xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* TEAM SECTION                                         */}
      {/* ---------------------------------------------------- */}
      <section className="border-t border-slate-800 bg-[#080c16] py-20">
        <div className="container-x">
          <SectionTitle
            eyebrow="Our People"
            title="Meet the Team Behind the Journey"
            copy="Our passionate professionals and destination specialists make every trip seamless and unforgettable."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#111827] p-6 shadow-xl hover:border-[#C5A059] transition-all"
              >
                <div>
                  {/* Avatar Placeholder / Index badge */}
                  <div className="relative grid h-36 w-full place-items-center rounded-xl border border-slate-800 bg-[#060910] text-3xl font-black text-[#E5C158] shadow-inner group-hover:border-[#C5A059]/50 transition-colors">
                    <span className="opacity-80">{String(i + 1).padStart(2, "0")}</span>
                    <Users className="absolute bottom-3 right-3 h-5 w-5 text-slate-700 group-hover:text-[#C5A059] transition-colors" />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#E5C158] mt-0.5">
                    {member.role}
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <Languages className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{member.languages.join(" • ")}</span>
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}