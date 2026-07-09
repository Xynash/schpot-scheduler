import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useBookSlot } from "../hooks/useBookings";
import { fmtDate, fmtRange, getSavedEmail, saveEmail } from "../lib/utils";

export default function BookingDialog({ slot, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: getSavedEmail() },
  });
  const book = useBookSlot();
  const firstFieldRef = useRef(null);

  // Escape to close + focus the first field on open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !book.isPending && onClose();
    window.addEventListener("keydown", onKey);
    firstFieldRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, book.isPending]);

  const onSubmit = (values) =>
    book.mutate({ slotId: slot.id, ...values }, {
      onSuccess: () => {
        saveEmail(values.email);
        toast.success("Booking confirmed", {
          description: `${slot.title} · ${fmtDate(slot.start_time)}`,
        });
        onClose();
      },
      onError: (err) => toast.error(err.message),
    });

  const { ref: nameRef, ...nameReg } = register("name", { required: "Name is required" });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-4"
      onClick={() => !book.isPending && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${slot.title}`}
    >
      <div
        className="w-full border-2 border-ink bg-cream p-6 shadow-hard sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow mb-1">Book this slot</p>
            <h2 className="display text-xl leading-tight">{slot.title}</h2>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand">
              {fmtDate(slot.start_time)} · {fmtRange(slot.start_time, slot.end_time)}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={book.isPending}
            aria-label="Close dialog"
            className="border-2 border-ink bg-white p-1 transition-colors hover:bg-ink hover:text-white disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="field-label">Full name</label>
            <input
              className="input-field"
              ref={(el) => { nameRef(el); firstFieldRef.current = el; }}
              {...nameReg}
            />
            {errors.name && <p className="field-error">{errors.name.message}</p>}
          </div>
          <div>
            <label className="field-label">Email</label>
            <input
              type="email"
              className="input-field"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>
          <div>
            <label className="field-label">Phone (optional)</label>
            <input className="input-field" {...register("phone")} />
          </div>
          <button disabled={book.isPending} className="btn-primary w-full">
            {book.isPending ? "Booking…" : "Confirm booking"}
          </button>
        </form>
      </div>
    </div>
  );
}