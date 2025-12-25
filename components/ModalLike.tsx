import { useFavorites } from '@/app/hooks/useLike'
import { Heart } from 'lucide-react'
import Link from 'next/link'

function Like() {
  const { favorites}=useFavorites()
  return (
     <Link href="/favorites">
      <div className="flex gap-1 justify-center relative items-center cursor-pointer">
        <span className="hidden md:inline">Favorites</span>
        <Heart className="text-red-400" />
        {favorites.length > 0 && (
            <span className="absolute -right-1 -top-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{favorites.length}</span>
        )}
      </div>
    </Link>
  )
}
export default Like