import { useState } from "react";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, parseISO, startOfMonth, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSlots } from "../hooks/useSlots";
import { fmtRange, spotsLeft } from "../lib/utils";

export default function CalendarPage() {
  const { data: slots = [] } = useSlots();
  const [month, setMonth] = useState(new Date());
  const [day, setDay] = useState(new Date());

  const days = eachDayOfInterval({ start: startOfWeek(startOfMonth(month)), end: endOfWeek(endOfMonth(month)) });
  const slotsOn = (d) => slots.filter((s) => isSameDay(parseISO(s.start_time), d));
  const daySlots = slotsOn(day);

  return (
    <div>
      <p className="eyebrow-boxed mb-5">Month view</p>
      <h1 className="display text-4xl md:text-5xl">Calendar</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Month grid */}
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="display text-2xl">{format(month, "MMMM yyyy")}</p>
            <div className="flex gap-1.5">
              <button onClick={() => setMonth(addMonths(month, -1))} className="border-2 border-ink p-2 transition-colors hover:bg-ink hover:text-white"><ChevronLeft size={14} /></button>
              <button onClick={() => setMonth(addMonths(month, 1))} className="border-2 border-ink p-2 transition-colors hover:bg-ink hover:text-white"><ChevronRight size={14} /></button>
            </div>
          </div>
          <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-bold uppercase text-ink/40">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const count = slotsOn(d).length;
              const sel = isSameDay(d, day);
              return (
                <button key={d.toISOString()} onClick={() => setDay(d)}
                  className={`relative aspect-square text-sm transition-colors
                    ${!isSameMonth(d, month) ? "text-ink/25" : ""}
                    ${sel ? "border-2 border-ink bg-brand font-bold text-white" : "hover:bg-ink/5"}
                    ${isToday(d) && !sel ? "border-2 border-ink/30" : ""}`}>
                  {format(d, "d")}
                  {count > 0 && <span className={`absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 ${sel ? "bg-white" : "bg-brand"}`} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day panel */}
        <div>
          <div className="border-b-2 border-ink pb-3">
            <p className="display text-2xl">{format(day, "EEEE")}</p>
            <p className="eyebrow mt-1">{format(day, "d MMMM yyyy")}</p>
          </div>
          <div className="mt-4 space-y-2">
            {daySlots.length === 0 && <p className="text-sm text-ink/40">No slots on this day.</p>}
            {daySlots.map((s) => (
              <div key={s.id} className="card card-hover p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold">{s.title}</p>
                  <span className={`badge ${spotsLeft(s) > 0 ? "bg-brand text-white" : "bg-white text-brand"}`}>
                    {spotsLeft(s) > 0 ? `${spotsLeft(s)} open` : "Full"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/50">{fmtRange(s.start_time, s.end_time)}</p>
                {s.location && <p className="text-sm text-ink/40">{s.location}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}