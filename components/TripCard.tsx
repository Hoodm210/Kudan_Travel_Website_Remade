import { MapPin, Calendar, Tag } from "lucide-react";

interface TripCardProps {
  title: string;
  place: string;
  days: string;
  price: string;
  imageClass?: string;
  tag?: string;
}

export default function TripCard({
  title,
  place,
  days,
  price,
  tag,
}: TripCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#111827] shadow-xl hover:border-[#C5A059] transition-all duration-300 overflow-hidden">
      <div>
        {/* Card Image Wrapper */}
        <div className="relative h-60 w-full bg-slate-950 overflow-hidden border-b border-slate-800">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

          {/* Badge Tag */}
          {tag && (
            <span className="absolute top-3 left-3 rounded-md border border-[#C5A059]/40 bg-[#060910]/90 px-3 py-1 text-[10px] font-black uppercase text-[#E5C158] shadow-md backdrop-blur-sm">
              {tag}
            </span>
          )}
        </div>

        {/* Card Body - Dark Background with High-Contrast Text */}
        <div className="p-5 bg-[#111827]">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{place}</span>
          </div>

          {/* Title (High-contrast white turning to gold on hover) */}
          <h3 className="mt-2 text-xl font-black text-white group-hover:text-amber-300 transition-colors">
            {title}
          </h3>
        </div>
      </div>

      {/* Card Footer - Days & Price */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 bg-[#111827] flex items-center justify-between text-xs font-bold">
        <span className="inline-flex items-center gap-1.5 text-slate-200">
          <Calendar className="h-3.5 w-3.5 text-[#C5A059]" />
          {days}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-black text-amber-300">
          <Tag className="h-3.5 w-3.5 text-[#C5A059]" />
          {price}
        </span>
      </div>
    </article>
  );
}