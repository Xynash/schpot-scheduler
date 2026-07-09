import { format, parseISO, isBefore } from "date-fns";

export const fmtDate = (iso) => format(parseISO(iso), "EEE, d MMM yyyy");
export const fmtTime = (iso) => format(parseISO(iso), "h:mm a");
export const fmtRange = (s, e) => `${fmtTime(s)} – ${fmtTime(e)}`;
export const isPast = (iso) => isBefore(parseISO(iso), new Date());

export const confirmedCount = (slot) =>
  (slot.bookings || []).filter((b) => b.status === "confirmed").length;
export const spotsLeft = (slot) => slot.capacity - confirmedCount(slot);

export const getSavedEmail = () => localStorage.getItem("schpot_email") || "";
export const saveEmail = (e) => localStorage.setItem("schpot_email", e.toLowerCase());