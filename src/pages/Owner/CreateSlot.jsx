import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { Clock, MapPin, Users, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useCreateSlot } from "../../hooks/useSlots";

const DURATIONS = [30, 60, 90, 120];
const addMins = (t, m) => {
  if (!t) return "";
  const [h, min] = t.split(":").map(Number);
  const d = new Date(2000, 0, 1, h, min + m);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export default function CreateSlot() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { capacity: 1, date: format(new Date(), "yyyy-MM-dd") },
  });
  const create = useCreateSlot();
  const navigate = useNavigate();
  const v = watch();

  const onSubmit = ({ title, description, location, date, start, end, capacity }) => {
    const start_time = new Date(`${date}T${start}`);
    const end_time = new Date(`${date}T${end}`);
    if (end_time <= start_time) return toast.error("End time must be after start time");
    if (start_time <= new Date()) return toast.error("Slot must be in the future");
    create.mutate(
      { title, description, location, capacity: Number(capacity),
        start_time: start_time.toISOString(), end_time: end_time.toISOString() },
      { onSuccess: () => { toast.success("Slot created"); navigate("/owner"); },
        onError: (e) => toast.error(e.message) }
    );
  };

  return (
    <div>
      <p className="eyebrow-boxed mb-5">Owner console</p>
      <h1 className="display text-4xl md:text-5xl">Create Slot</h1>
      <p className="mt-3 max-w-md text-sm text-ink/50">Publish a bookable time slot. Guests see exactly what's in the preview.</p>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-6 md:p-8">
          <div>
            <label className="field-label">Title</label>
            <input className="input-field" placeholder="Studio A — Photoshoot Hour"
              {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="field-error">{errors.title.message}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Location</label>
              <input className="input-field" placeholder="Indiranagar, Bengaluru" {...register("location")} />
            </div>
            <div>
              <label className="field-label">Capacity</label>
              <div className="flex">
                <button type="button" onClick={() => setValue("capacity", Math.max(1, Number(v.capacity) - 1))}
                  className="border-2 border-ink bg-white px-3 transition-colors hover:bg-ink hover:text-white"><Minus size={14} /></button>
                <input type="number" min={1} className="input-field border-x-0 text-center"
                  {...register("capacity", { required: true, min: 1 })} />
                <button type="button" onClick={() => setValue("capacity", Number(v.capacity) + 1)}
                  className="border-2 border-ink bg-white px-3 transition-colors hover:bg-ink hover:text-white"><Plus size={14} /></button>
              </div>
            </div>
          </div>

          <div>
            <label className="field-label">Description</label>
            <textarea rows={2} className="input-field" placeholder="What makes this slot special?" {...register("description")} />
          </div>

          <div>
            <label className="field-label">Date</label>
            <div className="mb-2 flex gap-1.5">
              {[0, 1, 2].map((i) => {
                const d = format(addDays(new Date(), i), "yyyy-MM-dd");
                const active = v.date === d;
                return (
                  <button type="button" key={i} onClick={() => setValue("date", d)}
                    className={active ? "chip-active" : "chip"}>
                    {i === 0 ? "Today" : i === 1 ? "Tomorrow" : format(addDays(new Date(), i), "EEE d")}
                  </button>
                );
              })}
            </div>
            <input type="date" className="input-field" {...register("date", { required: "Date is required" })} />
            {errors.date && <p className="field-error">{errors.date.message}</p>}
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label">Start time</label>
                <input type="time" className="input-field" {...register("start", { required: "Required" })} />
                {errors.start && <p className="field-error">{errors.start.message}</p>}
              </div>
              <div>
                <label className="field-label">End time</label>
                <input type="time" className="input-field" {...register("end", { required: "Required" })} />
                {errors.end && <p className="field-error">{errors.end.message}</p>}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Duration:</span>
              {DURATIONS.map((m) => {
                const active = v.start && v.end === addMins(v.start, m);
                return (
                  <button type="button" key={m} disabled={!v.start}
                    onClick={() => setValue("end", addMins(v.start, m))}
                    className={`${active ? "chip-active" : "chip"} disabled:opacity-40`}>
                    {m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? "30" : ""}` : `${m}m`}
                  </button>
                );
              })}
            </div>
          </div>

          <button disabled={create.isPending} className="btn-primary w-full">
            {create.isPending ? "Creating…" : "Create slot"}
          </button>
        </form>

        {/* LIVE PREVIEW */}
        <div className="lg:sticky lg:top-8">
          <p className="eyebrow mb-3">Live preview</p>
          <div className="card shadow-hard p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="display text-xl leading-tight">{v.title || "Untitled slot"}</h3>
              <span className="badge bg-brand text-white">Open</span>
            </div>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/50">
              {v.date ? format(new Date(v.date), "EEE, d MMM yyyy") : "Pick a date"}
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-ink/70">
              <p className="flex items-center gap-2"><Clock size={14} className="text-brand" />{v.start && v.end ? `${v.start} – ${v.end}` : "Set times"}</p>
              <p className="flex items-center gap-2"><MapPin size={14} className="text-brand" />{v.location || "Add a location"}</p>
              <p className="flex items-center gap-2"><Users size={14} className="text-brand" />{v.capacity || 1} spot{v.capacity > 1 ? "s" : ""}</p>
            </div>
            {v.description && <p className="mt-3 text-sm text-ink/50">{v.description}</p>}
            <div className="mt-5 border-t-2 border-ink/10 pt-4">
              <div className="btn-primary pointer-events-none w-full opacity-90">Book slot</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink/40">This is exactly how guests will see it.</p>
        </div>
      </div>
    </div>
  );
}