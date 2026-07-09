import { useRef, useState } from "react";
import { CalendarX, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useSlots } from "../../hooks/useSlots";
import { isPast, spotsLeft } from "../../lib/utils";
import SlotCard from "../../components/SlotCard";
import BookingDialog from "../../components/BookingDialog";
import EmptyState from "../../components/EmptyState";
import RotatingText from "../../components/RotatingText";
import Marquee from "../../components/Marquee";

const ACTIVITIES = ["Photoshoot", "Podcast", "Workshop", "Supper Club", "Screening", "Co-working"];

export default function AvailableSlots() {
  const { data: slots = [], isLoading } = useSlots();
  const [selected, setSelected] = useState(null);
  const railRef = useRef(null);
  const available = slots.filter((s) => !isPast(s.start_time) && spotsLeft(s) > 0);
  const totalSpots = available.reduce((a, s) => a + spotsLeft(s), 0);

  const scroll = (dir) =>
    railRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <div>
      {/* HERO */}
      <div className="grid items-end gap-10 pb-14 md:grid-cols-[1fr_auto] md:pb-20">
        <div>
          <p className="eyebrow-boxed mb-5">Curated slots, by the hour</p>
          <h1 className="display text-5xl leading-[0.95] md:text-7xl">
            A space for your
            <br />
            <RotatingText words={ACTIVITIES} className="text-brand" />
          </h1>
          <p className="mt-6 max-w-md text-sm text-ink/50">
            Browse open slots across our spaces and lock yours in seconds. No back-and-forth, no calls.
          </p>
        </div>
        <div className="hidden border-l-2 border-ink pl-8 md:block">
          <p className="display text-6xl text-brand">{available.length}</p>
          <p className="eyebrow mt-1">Open slots</p>
          <p className="display mt-6 text-6xl">{totalSpots}</p>
          <p className="eyebrow mt-1">Spots left</p>
        </div>
      </div>

      {/* TICKER */}
      <Marquee items={["Book by the hour", "Verified spaces", "Instant confirmation", "Bengaluru", "No calls, no back-and-forth"]} />

      {/* SLOT CAROUSEL */}
      <div className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <p className="eyebrow">Available now</p>
          {available.length > 2 && (
            <div className="hidden gap-1.5 md:flex">
              <button onClick={() => scroll(-1)} className="border-2 border-ink bg-white p-2 transition-colors hover:bg-ink hover:text-white"><ChevronLeft size={14} /></button>
              <button onClick={() => scroll(1)} className="border-2 border-ink bg-white p-2 transition-colors hover:bg-ink hover:text-white"><ChevronRight size={14} /></button>
            </div>
          )}
        </div>

        {isLoading ? (
          <p className="text-sm text-ink/40">Loading…</p>
        ) : available.length === 0 ? (
          <EmptyState icon={CalendarX} title="No slots available" subtitle="Check back soon." />
        ) : (
          <div ref={railRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {available.map((slot) => (
              <div key={slot.id} className="w-[85%] shrink-0 snap-start sm:w-[340px]">
                <SlotCard slot={slot}
                  action={
                    <button onClick={() => setSelected(slot)} className="btn-primary w-full">
                      Book slot <ArrowRight size={13} />
                    </button>
                  } />
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && <BookingDialog slot={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}