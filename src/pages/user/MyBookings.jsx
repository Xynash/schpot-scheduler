import { useState } from "react";
import { BookMarked, Search } from "lucide-react";
import { toast } from "sonner";
import { useMyBookings, useCancelBooking } from "../../hooks/useBookings";
import { fmtDate, fmtRange, getSavedEmail, saveEmail, isPast } from "../../lib/utils";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";

export default function MyBookings() {
  const [email, setEmail] = useState(getSavedEmail());
  const [input, setInput] = useState(email);
  const { data: bookings = [], isLoading } = useMyBookings(email);
  const cancel = useCancelBooking();

  const upcoming = bookings.filter((b) => b.status === "confirmed" && !isPast(b.slots.start_time));
  const past = bookings.filter((b) => b.status !== "confirmed" || isPast(b.slots.start_time));

  const Row = ({ b }) => (
    <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
      <div>
        <p className="text-sm font-bold">{b.slots?.title}</p>
        <p className="mt-0.5 text-sm text-ink/50">
          {fmtDate(b.slots.start_time)} · {fmtRange(b.slots.start_time, b.slots.end_time)}
          {b.slots.location ? ` · ${b.slots.location}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={b.status} />
        {b.status === "confirmed" && !isPast(b.slots.start_time) && (
          <button onClick={() => cancel.mutate(b.id, { onSuccess: () => toast.success("Booking cancelled") })}
            className="btn-ghost">Cancel</button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <p className="eyebrow-boxed mb-5">Your reservations</p>
      <h1 className="display text-4xl md:text-5xl">My Bookings</h1>

      <form onSubmit={(e) => { e.preventDefault(); setEmail(input.toLowerCase()); saveEmail(input); }}
        className="mt-8 flex max-w-md gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" />
          <input type="email" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your email" className="input-field pl-9" />
        </div>
        <button className="btn-primary">Find</button>
      </form>

      {isLoading && <p className="mt-8 text-sm text-ink/40">Loading…</p>}

      {email && !isLoading && bookings.length === 0 && (
        <div className="mt-8">
          <EmptyState icon={BookMarked} title="No bookings found" subtitle="Book a slot to see it here." />
        </div>
      )}

      {upcoming.length > 0 && (
        <>
          <p className="eyebrow mt-10 mb-3">Upcoming</p>
          <div className="space-y-2">{upcoming.map((b) => <Row key={b.id} b={b} />)}</div>
        </>
      )}
      {past.length > 0 && (
        <>
          <p className="eyebrow mt-10 mb-3">Past & cancelled</p>
          <div className="space-y-2 opacity-70">{past.map((b) => <Row key={b.id} b={b} />)}</div>
        </>
      )}
    </div>
  );
}