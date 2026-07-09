import { useState } from "react";
import { ClipboardList, Search } from "lucide-react";
import { toast } from "sonner";
import { useAllBookings, useCancelBooking } from "../../hooks/useBookings";
import { fmtDate, fmtRange } from "../../lib/utils";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";

const TABS = ["all", "confirmed", "cancelled"];

export default function Bookings() {
  const { data: bookings = [] } = useAllBookings();
  const cancel = useCancelBooking();
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");

  const filtered = bookings
    .filter((b) => (tab === "all" ? true : b.status === tab))
    .filter((b) =>
      q ? `${b.name} ${b.email} ${b.slots?.title}`.toLowerCase().includes(q.toLowerCase()) : true
    );

  return (
    <div>
      <p className="eyebrow-boxed mb-5">Owner console</p>
      <h1 className="display text-4xl md:text-5xl">Bookings</h1>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`${tab === t ? "chip-active" : "chip"} capitalize`}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, slot…" className="input-field py-2 pl-9 text-xs" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {filtered.length === 0 && <EmptyState icon={ClipboardList} title="No bookings here" />}
        {filtered.map((b) => (
          <div key={b.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="text-sm font-bold">
                {b.name} <span className="font-normal text-ink/40">· {b.email}{b.phone ? ` · ${b.phone}` : ""}</span>
              </p>
              <p className="text-sm text-ink/50">
                {b.slots?.title} · {fmtDate(b.slots.start_time)} · {fmtRange(b.slots.start_time, b.slots.end_time)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={b.status} />
              {b.status === "confirmed" && (
                <button onClick={() => cancel.mutate(b.id, { onSuccess: () => toast.success("Cancelled") })}
                  className="btn-ghost">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}