import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../lib/mockDb";

export const useSlots = () =>
  useQuery({ queryKey: ["slots"], queryFn: db.getSlots });

export function useCreateSlot() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: db.createSlot,
    onSuccess: () => qc.invalidateQueries(),
  });
}