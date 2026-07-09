// src/lib/mockDb.js — temporary in-memory database (swapped for Supabase later)

const slotTime = (hoursFromNow, mins = 60) => {
  const start = new Date(Date.now() + hoursFromNow * 3600 * 1000);
  const end = new Date(start.getTime() + mins * 60 * 1000);
  return { start_time: start.toISOString(), end_time: end.toISOString() };
};

let slots = [
  {
    id: "1",
    title: "Studio A — Photoshoot Hour",
    location: "Indiranagar, BLR",
    description: "Natural light studio with backdrops.",
    capacity: 2,
    ...slotTime(26),
  },
  {
    id: "2",
    title: "The Create Room",
    location: "Koramangala, BLR",
    description: "Music room with full backline.",
    capacity: 1,
    ...slotTime(30),
  },
  {
    id: "3",
    title: "Rooftop Terrace Evening",
    location: "HSR Layout, BLR",
    description: "Cozy rooftop with city views.",
    capacity: 5,
    ...slotTime(50, 120),
  },
];

let bookings = [
  {
    id: "b1",
    slot_id: "2",
    name: "Ansh Sharma",
    email: "ansh@test.com",
    phone: "9876543210",
    status: "confirmed",
    created_at: new Date().toISOString(),
  },
];

const withBookings = (slot) => ({
  ...slot,
  bookings: bookings.filter((b) => b.slot_id === slot.id),
});

const withSlot = (booking) => ({
  ...booking,
  slots: slots.find((s) => s.id === booking.slot_id),
});

export const db = {
  getSlots: async () =>
    slots.map(withBookings).sort((a, b) => a.start_time.localeCompare(b.start_time)),

  createSlot: async (slot) => {
    slots.push({ ...slot, id: crypto.randomUUID() });
  },

  getBookings: async () => bookings.map(withSlot),

  getBookingsByEmail: async (email) =>
    bookings.filter((b) => b.email === email.toLowerCase()).map(withSlot),

  bookSlot: async ({ slotId, name, email, phone }) => {
    const slot = slots.find((s) => s.id === slotId);
    if (!slot) throw new Error("Slot not found");

    const confirmed = bookings.filter(
      (b) => b.slot_id === slotId && b.status === "confirmed"
    );
    if (confirmed.length >= slot.capacity)
      throw new Error("This slot is fully booked");
    if (confirmed.some((b) => b.email === email.toLowerCase()))
      throw new Error("You have already booked this slot");

    bookings.push({
      id: crypto.randomUUID(),
      slot_id: slotId,
      name,
      email: email.toLowerCase(),
      phone,
      status: "confirmed",
      created_at: new Date().toISOString(),
    });
  },

  cancelBooking: async (id) => {
    const b = bookings.find((x) => x.id === id);
    if (b) b.status = "cancelled";
  },
};