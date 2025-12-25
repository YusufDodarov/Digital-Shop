"use client"
import { Button } from "@/components/ui/button";
import { ProductsWithImages } from "../types";
import Article from "./products/Article";
import { useEffect, useState } from "react";
import { getProductApi } from "../services";

export default function Product({isAdmin}:{isAdmin:boolean}) {
 try {
   const [products, setProducts] = useState<ProductsWithImages[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
      const getData = async () => {
        const result = await getProductApi();
        setProducts(result);
      };
    getData();
  }, []);

  const searchProducts = products.filter(product => product.title.toLowerCase().includes((searchValue || "").toLowerCase()));

  useEffect(() => {
    const handler = (ev: any) => setSearchValue(ev.detail);
    window.addEventListener("search", handler);
    return () => window.removeEventListener("search", handler);
  }, []);

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-8">
      {searchProducts.length === 0 ? (
        <div className="text-xl font-semibold flex justify-center items-center flex-col gap-3">
          <div>Not found: <span className="text-red-500">{searchValue}</span></div>
        </div>
      ) : (
        searchProducts.map((product) => (<Article key={product.id} product={product} isAdmin={isAdmin} />))
      )}
      {searchValue && (<div className="w-full flex justify-center mt-6"><Button onClick={() => setSearchValue("")}>Other Products</Button></div>)}
    </div>
  );
 } catch (error) {
  return <div></div>
 }
}