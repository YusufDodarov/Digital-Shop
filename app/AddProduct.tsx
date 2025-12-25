import { Button } from "@/components/ui/button";
import { useCart } from "./hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { ProductsWithImages } from "./types";

interface AddProductProps {
  product: ProductsWithImages;
}

export default function AddProduct({ product }: AddProductProps) {
  const { addToCart } = useCart();
  return <Button onClick={() => addToCart.mutate(product.id)} className="flex items-center justify-center gap-2 py-2 px-4 w-full bg-blue-600 hover:bg-blue-700 text-white">Add to cart<ShoppingCart className="w-5 h-5" /></Button>
}