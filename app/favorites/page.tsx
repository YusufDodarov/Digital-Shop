"use client";
import { useFavorites } from "../hooks/useLike";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartOff } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <div className="mt-40 text-center text-xl text-gray-500">No favorites yet ❤️</div>
  }

  return (
    <div className="mt-40 max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All your favorite products</h1>

      <div className="flex gap-8 flex-wrap justify-center">
        {favorites.map(product => {
          const img = product.images?.[0]?.image || "/no-image.png";

          return (
            <div key={product.id} className="flex gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition" >
              <div className="relative w-24 h-24">
                <Image src={img} alt={product.title} fill className="object-cover rounded-lg"/>
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="font-semibold line-clamp-2">{product.title}</h2>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <p className="font-bold mt-1">${product.price}</p>
                </div>

                <Button variant="destructive" size="sm" className="mt-2 w-fit" onClick={() => toggleFavorite(product)}><HeartOff className="w-4 h-4 mr-1" />Remove</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
