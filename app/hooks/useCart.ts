'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { OrderPayload, ProductsWithCartAndImages } from "../types"
import { useRouter } from "next/navigation"

export const useCart = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: cart, error, isLoading } = useQuery<ProductsWithCartAndImages[]>({
    queryKey: ['cart'] as const,
    queryFn: async () => {
      const { data } = await axios.get('/api/cart')
      return data
    },
    staleTime: 5 * 60 * 1000
  })

  const addToCart = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await axios.post('/api/cart', { productId })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] as const })
      toast.success('Product added to cart ✅')
    },
    onError: () => {
      toast.error('Please sign in to add items to cart')
      router.push('/sign-in')
    }
  })

  const removeItem = useMutation({
    mutationFn: async (productId: string) => {
      const result = await fetch('/api/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-type': 'application/json' },
      })
      return result.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] as const })
      toast.success('Item removed from cart ✅')
    },
    onError: () => {
      toast.error('Failed to remove item from cart ❌')
    }
  })

  const increaseQuantity = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await axios.patch('/api/cart', { productId, action: 'increase' })
      return data
    },
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] as const })
      const previousCart = queryClient.getQueryData<ProductsWithCartAndImages[]>(['cart'] as const)
      queryClient.setQueryData<ProductsWithCartAndImages[]>(['cart'] as const, old =>
        old?.map(item => item.product?.id === productId ? { ...item, quantity: item.quantity + 1 } : item)
      )
      return { previousCart }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['cart'] as const, context?.previousCart)
      toast.error('Failed to increase quantity ❌')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] as const })
    }
  })

  const decreaseQuantity = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await axios.patch('/api/cart', { productId, action: 'decrease' })
      return data
    },
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] as const })
      const previousCart = queryClient.getQueryData<ProductsWithCartAndImages[]>(['cart'] as const)
      queryClient.setQueryData<ProductsWithCartAndImages[]>(['cart'] as const, old =>
        old
          ?.map(item => {
            if (item.product?.id !== productId) return item
            if (item.quantity === 1) return null
            return { ...item, quantity: item.quantity - 1 }
          })
          .filter(Boolean) as ProductsWithCartAndImages[]
      )
      return { previousCart }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['cart'] as const, context?.previousCart)
      toast.error('Failed to decrease quantity ❌')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] as const })
    }
  })

  const createOrder = useMutation({
    mutationFn: async (payload: OrderPayload) => {
      const { data } = await axios.post('/api/orders', payload, { withCredentials: true })
      return data
    },
    onSuccess: () => {
      toast.success('Order sent successfully ✅')
      queryClient.invalidateQueries({ queryKey: ['cart'] as const })
    },
    onError: (err) => {
      console.log(err)
      toast.error('Order failed ❌')
    }
  })

  return { cart, isLoading, error, addToCart, removeItem, increaseQuantity, decreaseQuantity, createOrder }
}
