import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../lib/mockDb";

export const useAllBookings = () =>
  useQuery({ queryKey: ["bookings"], queryFn: db.getBookings });

export const useMyBookings = (email) =>
  useQuery({
    queryKey: ["bookings", email],
    enabled: !!email,
    queryFn: () => db.getBookingsByEmail(email),
  });

export function useBookSlot() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: db.bookSlot, onSuccess: () => qc.invalidateQueries() });
}

export function useCancelBooking() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: db.cancelBooking, onSuccess: () => qc.invalidateQueries() });
}