"use client"
import { useFavorites } from '@/app/hooks/useLike'
import { ArticleProps } from '@/app/types'
import { useUser } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Like({product}:ArticleProps) {
    const {toggleFavorite,favorites}=useFavorites()
    const liked =favorites.find(e=>e.id===product.id)
    const {user}=useUser()
    const router=useRouter()

    const handleClick=()=>{
      if(!user){
          router.push('/sign-in')
          return
      }
      toggleFavorite(product)
    }

  return (
    <div>
      <Heart onClick={handleClick} className={`cursor-pointer transition ${!user ? "opacity-40 cursor-not-allowed" : ""} ${liked ? "fill-red-500 text-red-500" : ""}`} />
    </div>
  )
}
