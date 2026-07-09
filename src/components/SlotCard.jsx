import { MapPin, Clock, Users } from "lucide-react";
import { fmtDate, fmtRange, spotsLeft } from "../lib/utils";
import StatusBadge from "./StatusBadge";

export default function SlotCard({ slot, action }) {
  const left = spotsLeft(slot);
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="display text-lg leading-tight">{slot.title}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/50">
            {fmtDate(slot.start_time)}
          </p>
        </div>
        <StatusBadge status={left > 0 ? "open" : "full"} />
      </div>

      <div className="mt-4 space-y-1.5 text-sm text-ink/70">
        <p className="flex items-center gap-2">
          <Clock size={14} className="text-brand" strokeWidth={2.5} />
          {fmtRange(slot.start_time, slot.end_time)}
        </p>
        {slot.location && (
          <p className="flex items-center gap-2">
            <MapPin size={14} className="text-brand" strokeWidth={2.5} /> {slot.location}
          </p>
        )}
        <p className="flex items-center gap-2">
          <Users size={14} className="text-brand" strokeWidth={2.5} />
          <span className="font-semibold">{left} of {slot.capacity}</span>
          spot{slot.capacity > 1 ? "s" : ""} left
        </p>
      </div>

      {slot.description && (
        <p className="mt-3 text-sm text-ink/50 line-clamp-2">{slot.description}</p>
      )}

      {action && <div className="mt-5 border-t-2 border-ink/10 pt-4">{action}</div>}
    </div>
  );
}