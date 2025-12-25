'use client';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get("/api/orders")
      return data
    },
  })
}

export const useDeleteOrders = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (orderId: string) => {
      const { data } = await axios.delete("/api/orders", { data: { orderId } })
      return data
    },
    onSuccess: () => {
      toast.success("Order deleted ✅")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
    onError: () => {
      toast.error("Failed to delete order ❌")
    },
  })
}
