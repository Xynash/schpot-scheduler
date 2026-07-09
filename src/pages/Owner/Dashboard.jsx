import { Link } from "react-router-dom";
import { addDays, format, isSameDay, parseISO } from "date-fns";
import { CalendarDays, Users, TrendingUp, PlusCircle, ArrowRight } from "lucide-react";
import { useSlots } from "../../hooks/useSlots";
import { useAllBookings } from "../../hooks/useBookings";
import { fmtDate, fmtRange, isPast, confirmedCount } from "../../lib/utils";
import StatusBadge from "../../components/StatusBadge";

const Stat = ({ icon: Icon, label, value, to, hint }) => (
  <Link to={to} className="card card-hover group p-6">
    <div className="flex items-center gap-2 text-ink/40">
      <Icon size={14} />
      <p className="text-[10px] font-bold uppercase tracking-widest">{label}</p>
    </div>
    <p className="display mt-3 text-5xl text-brand">{value}</p>
    <p className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ink/30 transition-colors group-hover:text-ink/60">
      {hint} <ArrowRight size={10} />
    </p>
  </Link>
);

export default function Dashboard() {
  const { data: slots = [] } = useSlots();
  const { data: bookings = [] } = useAllBookings();

  const upcoming = slots.filter((s) => !isPast(s.start_time));
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const cap = upcoming.reduce((a, s) => a + s.capacity, 0);
  const filled = upcoming.reduce((a, s) => a + confirmedCount(s), 0);
  const util = cap ? Math.round((filled / cap) * 100) : 0;

  const week = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  const slotsOn = (d) => upcoming.filter((s) => isSameDay(parseISO(s.start_time), d));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow-boxed mb-5">Owner console</p>
          <h1 className="display text-4xl md:text-5xl">Dashboard</h1>
        </div>
        <Link to="/owner/create" className="btn-primary"><PlusCircle size={14} /> New slot</Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Stat icon={CalendarDays} label="Upcoming slots" value={upcoming.length} to="/calendar" hint="View calendar" />
        <Stat icon={Users} label="Confirmed bookings" value={confirmed.length} to="/owner/bookings" hint="View bookings" />
        <Stat icon={TrendingUp} label="Utilization" value={`${util}%`} to="/owner/bookings" hint={`${filled}/${cap || 0} spots filled`} />
      </div>

      <p className="eyebrow mt-14 mb-4">Next 7 days</p>
      <div className="grid grid-cols-7 gap-2">
        {week.map((d) => {
          const n = slotsOn(d).length;
          return (
            <div key={d.toISOString()} className={`border-2 p-3 text-center ${n ? "border-ink bg-white shadow-hard-sm" : "border-ink/15 bg-white/40"}`}>
              <p className="text-[9px] font-bold uppercase tracking-widest text-ink/40">{format(d, "EEE")}</p>
              <p className="display text-2xl">{format(d, "d")}</p>
              <p className={`text-[9px] font-bold uppercase ${n ? "text-brand" : "text-ink/25"}`}>
                {n ? `${n} slot${n > 1 ? "s" : ""}` : "—"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Upcoming slots</p>
          <div className="space-y-3">
            {upcoming.length === 0 && <p className="text-sm text-ink/40">Nothing scheduled yet.</p>}
            {upcoming.slice(0, 5).map((s) => {
              const booked = confirmedCount(s);
              const pct = Math.round((booked / s.capacity) * 100);
              return (
                <div key={s.id} className="card p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold">{s.title}</p>
                      <p className="text-sm text-ink/50">{fmtDate(s.start_time)} · {fmtRange(s.start_time, s.end_time)}</p>
                    </div>
                    <p className="shrink-0 text-xs font-bold uppercase tracking-wider text-ink/50">{booked}/{s.capacity}</p>
                  </div>
                  <div className="mt-3 h-2 border-2 border-ink bg-white">
                    <div className={`h-full ${pct === 100 ? "bg-ink" : "bg-brand"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="eyebrow">Recent bookings</p>
            <Link to="/owner/bookings" className="btn-ghost">View all</Link>
          </div>
          <div className="space-y-3">
            {bookings.length === 0 && <p className="text-sm text-ink/40">No bookings yet.</p>}
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} className="card flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-bold">{b.name} <span className="font-normal text-ink/40">· {b.email}</span></p>
                  <p className="text-sm text-ink/50">{b.slots?.title} · {fmtDate(b.slots.start_time)}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}