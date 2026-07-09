import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export function useAllBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, slots(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useMyBookings(email) {
  return useQuery({
    queryKey: ["bookings", email],
    enabled: !!email,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, slots(*)")
        .eq("email", email.toLowerCase())
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useBookSlot() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ slotId, name, email, phone }) => {
      const { data, error } = await supabase.rpc("book_slot", {
        p_slot_id: slotId,
        p_name: name,
        p_email: email,
        p_phone: phone || null,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries(),
  });
}

export function useCancelBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from("bookings").update({ status: "cancelled" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries(),
  });
}