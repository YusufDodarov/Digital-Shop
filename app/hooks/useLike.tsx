"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { FavoriteContext, ProductsWithImages } from "@/app/types";

const FavoritesContext = createContext<FavoriteContext | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<ProductsWithImages[]>([]);

useEffect(()=>{
    const saved=localStorage.getItem("like")
    if(saved){
        setFavorites(JSON.parse(saved))
    } 
},[])

useEffect(()=>{
    localStorage.setItem("like",JSON.stringify(favorites))
},[favorites])

  const toggleFavorite = (product: ProductsWithImages) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id)
      return [...prev, product];
    });
  };

  return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("error code..");
  return ctx;
};